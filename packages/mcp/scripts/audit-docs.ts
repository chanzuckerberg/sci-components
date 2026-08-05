/**
 * Checks every component's documentation page against the component's source.
 *
 * Three places describe a component's API and nothing keeps them in step: the
 * props interfaces in the source, the `argTypes` in the story, and the props
 * table hand-written in `__storybook__/docs/content.html`. The page is what a
 * reader sees, the first two are what the MCP server ships, and any of the
 * three can be the one that is out of date.
 *
 * This walks all three and reports where they disagree. It writes nothing but
 * a report: what to do about each disagreement is a judgement call, since the
 * answer is sometimes to correct the page and sometimes to correct the
 * component.
 *
 * Run with `yarn docs:audit`, or `yarn docs:audit Dialog Tabs` for a subset.
 */
import * as fs from "fs";
import * as path from "path";
import { HTMLElement, parse } from "node-html-parser";
import { ComponentDoc, PropItem } from "react-docgen-typescript";
import * as ts from "typescript";
import { fileURLToPath } from "url";
import { parser, resolveType } from "./lib/docgen.js";
import {
  ArgType,
  extractArgTypesFromStorybook,
} from "./lib/story-arg-types.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const REPO_ROOT = path.join(dirname, "../../..");
const REPORT_PATH = path.join(REPO_ROOT, "docs-audit/report.md");

/**
 * Props no page is asked to carry: `theme` is plumbing every component
 * inherits from the shared style types, and `title` is the global HTML
 * attribute, which a page documents only where the component gives it a
 * meaning of its own. Rows about either are still checked.
 */
const INTERNAL_PROPS = new Set(["theme", "title"]);

/**
 * `react-docgen-typescript` never reports `children`, even where a component
 * declares it outright, so the source cannot confirm or deny a row about it.
 * Whether the page should carry one is a question for a reader of the code.
 */
const INVISIBLE_TO_DOCGEN = new Set(["children"]);

/**
 * What the parser returns for a component it could not read: the two props
 * every React element has. A source that yields nothing else has told us
 * nothing about the component.
 */
const PARSER_NOISE = new Set(["key", "ref"]);

/**
 * Props a component's type surface carries but its code never reads. Leaving
 * them out of the documentation is right - documenting them would promise
 * behavior that does not exist - so the audit stops asking for them. Each one
 * is written up in `docs-audit/findings.md`.
 */
const NOT_REALLY_PROPS = new Map<string, Set<string>>([
  ["Autocomplete", new Set(["count", "icon"])],
  ["CellBasic", new Set(["component", "isRowHovered"])],
  ["Notification", new Set(["extraContent"])],
  ["InputSearch", new Set(["customTheme"])],
  ["NavigationJumpTo", new Set(["isSubItem"])],
  ["Pagination", new Set(["disabled", "selected"])],
  ["Tag", new Set(["tagColor"])],
  ["DropdownMenu", new Set(["count", "icon", "isMultiColumn"])],
  ["InputDropdown", new Set(["children", "size"])],
]);

/**
 * Rows whose type the parser reads differently from the compiler, checked by
 * hand and left as they are. A component built from an intersection narrows
 * what it inherits - `InputSearch` takes MUI's `label?: ReactNode` and its own
 * `label: string`, so only a string will compile - but the parser reports the
 * wider half.
 */
const VERIFIED_TABLE_TYPES = new Map<string, Set<string>>([
  // The row says "Set on AccordionHeader", and that is where the narrower
  // `"xs" | "s"` is declared. `Accordion`'s own style props offer four sizes,
  // which nothing reads.
  ["Accordion", new Set(["chevronSize"])],
  // The parser prints one key of the ten `classes` offers. The page lists them
  // all in its description and calls the type `object`.
  ["ContentCard", new Set(["classes"])],
  // ECharts' own names for a callback and for a chart instance
  // (`SymbolSizeCallback`, `EChartsType`) say nothing to a reader of the page,
  // which spells the signature out and uses the exported `ECharts` alias.
  ["HeatmapChart", new Set(["onEvents", "symbolSize"])],
  // `DialogExtraProps.classes` offers `title` and `actions` alongside `root`
  // and `paper`, and the component reads only the latter two. The page lists
  // the keys that work and says so.
  ["Dialog", new Set(["classes"])],
  ["InputSearch", new Set(["label"])],
]);

/**
 * Rows naming a prop the parser cannot see, either because it is inherited
 * through a generic or because it is declared on an internal subcomponent the
 * parser is never pointed at. Each has been checked by hand against the
 * declaration and found to be real. Without this the audit would keep
 * reporting them as describing something that does not exist.
 */
const VERIFIED_INHERITED = new Map<string, Set<string>>([
  [
    "DropdownMenu",
    new Set([
      "groupBy",
      "isOptionEqualToValue",
      "multiple",
      "noOptionsText",
      "open",
      "options",
    ]),
  ],
  // The multi-column form of Autocomplete is a separate component under
  // `components/AutocompleteMultiColumn`, and these are its props.
  [
    "Autocomplete",
    new Set([
      "ClickAwayListenerProps",
      "PopperBaseProps",
      "PopperComponent",
      "PopperPlacement",
    ]),
  ],
  // `ButtonDropdownProps extends Omit<ButtonProps, "sdsType">`, and the parser
  // gets no further than the `Omit`: it resolves two props of a component that
  // takes everything a Button does.
  [
    "ButtonDropdown",
    new Set([
      "backgroundAppearance",
      "backgroundOnHover",
      "disabled",
      "onClick",
      "sdsStyle",
      "size",
      "startIcon",
    ]),
  ],
  // Everything ComplexFilter does not redeclare reaches it through
  // `DropdownProps`, and from there through MUI's Autocomplete.
  [
    "ComplexFilter",
    new Set([
      "buttonPosition",
      "buttons",
      "DropdownMenuProps",
      "isTriggerChangeOnOptionClick",
      "keepSearchOnSelect",
      "multiple",
      "options",
      "search",
      "value",
    ]),
  ],
  // `forwardRef(function Tabs(...))` leaves the parser with nothing, so none of
  // `TabsProps` reaches it. `sdsSize` and `underlined` are declared in
  // `style.tsx`, and `selectionFollowsFocus` comes from MUI's Tabs.
  ["Tabs", new Set(["sdsSize", "selectionFollowsFocus", "underlined"])],
]);

/**
 * PropTypes-era spellings still scattered through the tables. They mean the
 * same thing as the TypeScript names the majority of rows already use, so they
 * are not type mismatches, only inconsistencies worth tidying.
 */
const LEGACY_TYPE_NAMES = new Map([
  ["bool", "boolean"],
  ["fn", "function"],
  ["func", "function"],
  ["node", "ReactNode"],
]);

/**
 * Types `resolveType` produces when it gives up on printing the real one.
 * A table row is usually more precise than these, so comparing against them
 * reports differences that are not errors.
 */
const LOSSY_TYPES = new Set([
  "any",
  "complex",
  "function",
  "Partial",
  "ReactElement",
  "ReactNode",
]);

const PRIMITIVE_TYPES = new Set(["boolean", "number", "string"]);

/** The header row shared by every authored props table. */
const PROPS_TABLE_HEADER = "Name|Type|Default|Description";

/** Cell contents the authors use to mean "nothing to say here". */
const EMPTY_CELLS = new Set(["", "-", "--", "N/A", "n/a", "—"]);

interface TableRow {
  name: string;
  type?: string;
  defaultValue?: string;
  description?: string;
  /** The nearest heading above the table this row belongs to. */
  heading: string;
}

interface Component {
  name: string;
  dir: string;
  entry: string;
  storyPath: string;
  contentPath: string;
  /** Exported subcomponents that have their own directory, by name. */
  subcomponents: Map<string, string>;
  /** Names of the types the component declares, lowercased. */
  declaredTypes: Set<string>;
  /**
   * Whether the props type takes type parameters. The parser cannot follow
   * those through to what the component extends, so for these the source is
   * only a partial account of the props and a row it cannot match may still be
   * describing something real.
   */
  generic: boolean;
}

interface SourceProp {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required: boolean;
  /** The component or subcomponent whose docs the prop was found on. */
  owner: string;
  /** Where the prop is declared: SDS source, or a dependency. */
  origin: "sds" | "external";
  /**
   * Whether the prop is declared both here and in a dependency, as happens
   * when a component narrows or replaces something it inherits. The parser
   * reports one description for the prop and does not say which declaration it
   * came from, so for these it may well be MUI's.
   */
  mixedOrigin: boolean;
}

interface Finding {
  kind:
    | "missing-from-table"
    | "unmatched-row"
    | "type-mismatch"
    | "default-mismatch"
    | "description-mismatch"
    | "legacy-type-name"
    | "phantom-arg-type"
    | "published-undocumented"
    | "unreadable-source";
  prop: string;
  detail: string;
}

/* -------------------------------------------------------------------------
 * Reading the authored table
 * ---------------------------------------------------------------------- */

function cells(row: HTMLElement): string[] {
  return row
    .querySelectorAll("td, th")
    .map((cell) => cell.textContent.replace(/\s+/g, " ").trim());
}

function meaningful(value = ""): string | undefined {
  return EMPTY_CELLS.has(value) ? undefined : value;
}

/** Every heading on a page, in order, however deep. */
function readHeadings(contentPath: string): string[] {
  if (!fs.existsSync(contentPath)) {
    return [];
  }

  return parse(fs.readFileSync(contentPath, "utf-8"))
    .querySelectorAll("h1, h2, h3, h4, h5, h6")
    .map((node) => node.textContent.replace(/\s+/g, " ").trim());
}

/**
 * Unlike the reader the props generator uses, this one keeps each row's
 * heading. Pages carry several tables and the secondary ones often describe a
 * nested data shape rather than the component's own props, so a row that
 * matches no prop is only worth reporting once you can see which table it came
 * from.
 */
function readTables(contentPath: string): TableRow[] {
  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const root = parse(fs.readFileSync(contentPath, "utf-8"));
  const rows: TableRow[] = [];
  const headings = root.querySelectorAll("h1, h2, h3, h4, h5, h6, table");

  // A page puts each subcomponent's table under its own heading and then heads
  // the table itself "Props", so only the path through both says whose props
  // the rows are.
  const open: string[] = [];
  let heading = "(no heading)";

  for (const node of headings) {
    if (node.tagName !== "TABLE") {
      const level = Number(node.tagName[1]);
      open.length = level - 1;
      open[level - 1] = node.textContent.replace(/\s+/g, " ").trim();
      heading = open.filter(Boolean).join(" > ");
      continue;
    }

    const tableRows = node.querySelectorAll("tr");
    if (!tableRows[0] || cells(tableRows[0]).join("|") !== PROPS_TABLE_HEADER) {
      continue;
    }

    for (const row of tableRows.slice(1)) {
      const [name, type, defaultValue, description] = cells(row);
      if (name) {
        rows.push({
          defaultValue: meaningful(defaultValue),
          description: meaningful(description),
          heading,
          name,
          type: meaningful(type),
        });
      }
    }
  }

  return rows;
}

/* -------------------------------------------------------------------------
 * Reading the source
 * ---------------------------------------------------------------------- */

function extractExportedSubcomponents(componentPath: string): string[] {
  const sourceFile = ts.createSourceFile(
    componentPath,
    fs.readFileSync(componentPath, "utf-8"),
    ts.ScriptTarget.Latest,
    true
  );

  const names: string[] = [];

  ts.forEachChild(sourceFile, (node) => {
    if (
      ts.isExportDeclaration(node) &&
      node.exportClause &&
      ts.isNamedExports(node.exportClause)
    ) {
      for (const element of node.exportClause.elements) {
        names.push(element.name.text);
      }
    }
  });

  return names;
}

/**
 * Every type and interface the component declares, by the name it is declared
 * under. A page that heads a table with one of these is describing a shape the
 * component takes in - the entries of `buttonDefinition`, the meta on a column
 * - rather than props of its own.
 */
function declaredTypeNames(dir: string): Set<string> {
  const names = new Set<string>();
  const files = fs
    .readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        /\.tsx?$/.test(entry.name) &&
        !entry.parentPath.includes("__")
    );

  for (const file of files) {
    const source = fs.readFileSync(
      path.join(file.parentPath, file.name),
      "utf-8"
    );
    for (const [, name] of source.matchAll(/(?:interface|type)\s+(\w+)/g)) {
      names.add(name.toLowerCase());
    }
  }

  return names;
}

function directoriesUnder(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function collectComponents(names: string[], corePath: string): Component[] {
  const components: Component[] = [];

  for (const name of names) {
    const dir = path.join(REPO_ROOT, corePath, name);
    const entry = path.join(dir, "index.tsx");
    const contentPath = path.join(dir, "__storybook__/docs/content.html");

    if (!fs.existsSync(entry) || !fs.existsSync(contentPath)) {
      continue;
    }

    const headings = readHeadings(contentPath).join("\n");
    const subcomponents = new Map<string, string>();

    // A subcomponent counts when the entry re-exports it, and also when the
    // page gives it a section of its own: `Dialog` heads a table each for
    // `DialogTitle`, `DialogActions` and `DialogContent` without exporting any
    // of the three. A name that only comes up in prose is an implementation
    // detail being explained, and pulling its props in would ask the page to
    // document them.
    for (const subName of [
      ...extractExportedSubcomponents(entry),
      ...directoriesUnder(path.join(dir, "components")).filter((subName) =>
        headings.includes(subName)
      ),
    ]) {
      const subPath = path.join(dir, "components", subName, "index.tsx");
      if (fs.existsSync(subPath)) {
        subcomponents.set(subName, subPath);
      }
    }

    components.push({
      contentPath,
      declaredTypes: declaredTypeNames(dir),
      dir,
      entry,
      generic: /(?:type|interface)\s+\w*Props\s*</.test(
        fs.readFileSync(entry, "utf-8")
      ),
      name,
      storyPath: path.join(dir, "__storybook__/index.stories.tsx"),
      subcomponents,
    });
  }

  return components;
}

/**
 * A prop counts as the design system's own when the component declares it
 * itself, in its own directory. Everything else arrives from MUI, React or
 * another component, and a page is free to leave it out: the tables document
 * "custom SDS props and MUI props required for implementation", not the whole
 * inherited surface.
 *
 * Reading the whole batch as one program leaves the parser attributing a name
 * to any declaration of it that it has seen, so `title` comes back declared in
 * a popper's style file for every component in the run. Requiring the
 * declaration to sit under the component keeps those out.
 */
function originOf(
  prop: PropItem,
  /** The component's directory, relative to the repository root. */
  dir: string
): Pick<SourceProp, "mixedOrigin" | "origin"> {
  const declarations = prop.declarations?.length
    ? prop.declarations
    : prop.parent
      ? [prop.parent]
      : [];

  // The parser reports a file however it was handed one, absolute here and
  // relative to the working directory there, so the two are compared on the
  // part they share.
  const sds = declarations.filter((declaration) =>
    declaration.fileName.includes(`${dir}/`)
  );

  return {
    mixedOrigin: sds.length > 0 && sds.length < declarations.length,
    origin: sds.length > 0 ? "sds" : "external",
  };
}

/**
 * A file often re-exports the emotion-styled wrappers it builds on, for callers
 * who need to extend them. The parser reads those as components of their own,
 * but what look like their props are the values the template literal
 * interpolates - a count to lay columns out by, a width to size a popper - and
 * none of them belong on the page of the component that re-exported them.
 */
function docsFor(
  byFile: Map<string, ComponentDoc[]>,
  file: string
): ComponentDoc[] {
  return (byFile.get(file) ?? []).filter(
    (doc) => !doc.displayName.startsWith("Styled")
  );
}

/**
 * Every prop of the component and of the subcomponents its page documents,
 * kept both per owner and merged. A page with a table for each subcomponent
 * needs the first, since `classes` on `Dialog` and `classes` on `DialogTitle`
 * are different props with the same name.
 */
interface ComponentProps {
  byOwner: Map<string, Map<string, SourceProp>>;
  merged: Map<string, SourceProp>;
}

function sourceProps(
  component: Component,
  byFile: Map<string, ComponentDoc[]>
): ComponentProps {
  const owners: { owner: string; docs: ComponentDoc[] }[] = [
    { docs: docsFor(byFile, component.entry), owner: component.name },
    ...[...component.subcomponents].map(([subName, subPath]) => ({
      docs: docsFor(byFile, subPath),
      owner: subName,
    })),
  ];

  const byOwner = new Map<string, Map<string, SourceProp>>();
  const merged = new Map<string, SourceProp>();

  for (const { owner, docs } of owners) {
    const own = new Map<string, SourceProp>();
    byOwner.set(owner, own);

    for (const doc of docs) {
      for (const [name, prop] of Object.entries(doc.props)) {
        const { mixedOrigin, origin } = originOf(
          prop,
          path.relative(REPO_ROOT, component.dir)
        );

        const resolved: SourceProp = {
          defaultValue: prop.defaultValue?.value,
          description: prop.description,
          mixedOrigin,
          name,
          origin,
          owner: doc.displayName || owner,
          required: prop.required,
          type: resolveType(prop),
        };

        own.set(name, resolved);

        // An SDS declaration is the more interesting one when a prop is
        // declared in both places, as `className` and `children` often are.
        const existing = merged.get(name);
        if (!existing || (existing.origin === "external" && origin === "sds")) {
          merged.set(name, resolved);
        }
      }
    }
  }

  return { byOwner, merged };
}

/* -------------------------------------------------------------------------
 * Comparing
 * ---------------------------------------------------------------------- */

/** Union members are compared as a set: the tables order them for reading. */
function normalizeType(value: string): string {
  return sortMembers(
    collapseBoolean(
      value
        // Tables annotate the members of a union where a size or a restriction is
        // worth knowing: `"xs" (12px)`, `"bottom" (overlay only)`. The annotation
        // is for the reader, not part of the type.
        .replace(/(["'][^"']+["'])\s*\([^)]*\)/g, "$1")
        .replace(/\s+/g, "")
        // A trailing separator inside an object literal is a printing detail.
        .replace(/[;,](?=\})/g, "")
        // `React.ReactNode` and `ReactNode` are the same type written two ways.
        .replace(/\b(?:React|JSX)\./g, "")
        // Components import types as `X as MUIX`, `X as SdsX` or `XProps as
        // XPropsType` where the name would otherwise collide, and the tables use
        // the name the type was declared under.
        .replace(/\b(?:MUI|Sds)(?=[A-Z])/g, "")
        .replace(/PropsType\b/g, "Props")
        .split("|")
        .map((member) => {
          const bare = member.replace(/^["']|["']$/g, "");
          return LEGACY_TYPE_NAMES.get(bare) ?? bare;
        })
        // `string & {}` is how a union of string literals keeps its suggestions
        // without closing itself to other strings. It says nothing to a reader.
        .filter((member) => member !== "" && member !== "string&{}")
        .sort()
        .join("|")
    )
  );
}

/**
 * An object literal written out in full, with its members in whatever order
 * each source happened to use. `{ active, width, height }` and
 * `{ active, height, width }` are the same type.
 */
function sortMembers(value: string): string {
  const literal = /^\{(.+)\}$/.exec(value);

  if (!literal?.[1] || literal[1].includes("{")) {
    return value;
  }

  const members = literal[1].split(";").filter(Boolean).sort().join(";");

  return `{${members}}`;
}

/**
 * The parser prints `boolean` as the union it stands for, and no table should
 * follow it there.
 */
function collapseBoolean(value: string): string {
  const members = value.split("|");

  if (!members.includes("false") || !members.includes("true")) {
    return value;
  }

  return [
    ...members.filter((member) => member !== "false" && member !== "true"),
    "boolean",
  ]
    .sort()
    .join("|");
}

/** Wrappers that shape another type without being the type in question. */
const TYPE_WRAPPERS = new Set([
  "Array",
  "Omit",
  "Partial",
  "Pick",
  "Readonly",
  "Record",
  "Required",
]);

function namedTypes(value: string): Set<string> {
  return new Set(
    (value.match(/[A-Z]\w+/g) ?? []).filter((name) => !TYPE_WRAPPERS.has(name))
  );
}

/**
 * Whether a difference between the two type strings is worth reporting.
 *
 * Two kinds of difference are not: a source type `resolveType` could not print
 * faithfully, where only a table claiming a plain primitive is clearly saying
 * something else, and a generic whose arguments the parser expanded, where the
 * two still name the same underlying type.
 */
function typesDisagree(tableType: string, sourceType: string): boolean {
  if (normalizeType(tableType) === normalizeType(sourceType)) {
    return false;
  }

  // The tables name a handler `function` and spell its signature out in the
  // description, which reads better than a signature squeezed into a cell.
  // There is nothing left in the cell to compare against.
  if (tableType === "function") {
    return false;
  }

  // An optional prop that also takes `null` reaches the parser without it, so
  // a table that keeps the `null` is saying more than the source can.
  if (normalizeType(`${tableType}`) === normalizeType(`${sourceType}|null`)) {
    return false;
  }

  // `CSSProperties["width"]` is a name the parser cannot print at all, and a
  // table naming it is being precise about where the type comes from.
  if (/\w+\["\w+"\]/.test(tableType)) {
    return false;
  }

  // `string & {}` is the trick React uses to suggest `"_blank"` and friends
  // while still taking any string. The union it sits in is a `string`.
  if (sourceType.includes("string & {}")) {
    return normalizeType(tableType) !== "string";
  }

  // A union of every HTML tag name is the truth, but not one any table should
  // print, so a page that names the alias instead is doing the right thing.
  if (LOSSY_TYPES.has(sourceType) || sourceType.length > 150) {
    return PRIMITIVE_TYPES.has(normalizeType(tableType));
  }

  // `InputSearchProps["intent"]` comes back as `InputSearchProps`: the parser
  // keeps the interface and drops the key. The table spelling the union out is
  // the more useful of the two, so it stands.
  if (/^\w+Props$/.test(sourceType) && tableType.includes('"')) {
    return false;
  }

  // An alias the parser keeps whole - `IntentMessageIntent[]`,
  // `CategoryAxisData` - against a table that spells out what it stands for.
  // The table is the more useful of the two.
  if (/^\w+(?:\[\])?$/.test(sourceType) && /["{(|]/.test(tableType)) {
    return false;
  }

  const inTable = namedTypes(normalizeType(tableType));
  const inSource = namedTypes(normalizeType(sourceType));

  // `Partial<TooltipProps>` reaches the parser as `TooltipProps`, and a
  // generic's arguments come back expanded. Either way the two still name the
  // same type, and only the shaping around it reads differently.
  if (inSource.size > 0 && inSource.size === inTable.size) {
    return ![...inSource].every((name) => inTable.has(name));
  }

  if (sourceType.includes("<")) {
    return ![...inSource].some((name) => inTable.has(name));
  }

  return true;
}

/**
 * Prose is reworded freely between the two, and the shorter one is usually the
 * same sentence trimmed. Where they open on the same claim and then go their
 * own way - the page adding a caveat for readers, the JSDoc a note for whoever
 * maintains the component - they are still saying the same thing. Only
 * genuinely separate wordings are worth a look.
 */
function descriptionsDisagree(table: string, jsdoc: string): boolean {
  const [a, b] = [normalizeText(table), normalizeText(jsdoc)];

  if (a.includes(b) || b.includes(a)) {
    return false;
  }

  return firstSentence(a) !== firstSentence(b);
}

function firstSentence(text: string): string {
  return text.split(/(?<=\.)\s/)[0] ?? text;
}

function normalizeDefault(value: string): string {
  return value
    .replace(/\s+/g, "")
    .replace(/^["'`]|["'`]$/g, "")
    .toLowerCase();
}

/** Enough of a description to recognize it, on one line of the report. */
function excerpt(value: string): string {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length > 80 ? `${text.slice(0, 79)}…` : text;
}

function normalizeText(value: string): string {
  return (
    value
      .replace(/[`"'*]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      // Both sides mark a prop as on its way out before saying anything about
      // it, one with a JSDoc tag and one with a word in bold.
      .replace(/^@?deprecated[:.]?\s*/, "")
  );
}

/** What one prop of the source says about the page and the story. */
function auditProp(
  prop: SourceProp,
  documented: Set<string>,
  argTypes: Set<string>
): Finding[] {
  // A prop the component only inherits is the page's to skip, unless the story
  // puts a control on it: then it ships in the props data as part of the
  // component's API while the page says nothing about it.
  if (prop.origin !== "sds") {
    if (argTypes.has(prop.name) && !documented.has(prop.name)) {
      return [
        {
          detail: `${prop.type} - inherited, but the story exposes it and the props data publishes it`,
          kind: "published-undocumented",
          prop: prop.name,
        },
      ];
    }
    return [];
  }

  if (!documented.has(prop.name)) {
    return [
      {
        detail: `${prop.owner}.${prop.name}: ${prop.type}${prop.required ? " (required)" : ""}`,
        kind: "missing-from-table",
        prop: prop.name,
      },
    ];
  }

  return [];
}

/** What the source has that the page and the story do not. */
function auditSource(
  component: Component,
  props: Map<string, SourceProp>,
  documented: Set<string>,
  argTypes: Set<string>
): Finding[] {
  const notReallyProps = NOT_REALLY_PROPS.get(component.name);

  return [...props.values()]
    .filter(
      (prop) =>
        !INTERNAL_PROPS.has(prop.name) && !notReallyProps?.has(prop.name)
    )
    .flatMap((prop) => auditProp(prop, documented, argTypes));
}

/** What one row of the page claims, against the prop it names. */
function auditRow(
  component: Component,
  row: TableRow,
  prop?: SourceProp
): Finding[] {
  const findings: Finding[] = [];
  const legacy = row.type && LEGACY_TYPE_NAMES.get(row.type);

  if (legacy) {
    findings.push({
      detail: `\`${row.type}\` should be \`${legacy}\``,
      kind: "legacy-type-name",
      prop: row.name,
    });
  }

  if (!prop) {
    const known =
      INVISIBLE_TO_DOCGEN.has(row.name) ||
      VERIFIED_INHERITED.get(component.name)?.has(row.name);

    if (!known) {
      findings.push({
        detail: component.generic
          ? `documented under "${row.heading}" and not found in the source, which for a generic component may mean it is inherited: check it against the component it extends`
          : `documented under "${row.heading}" but no such prop exists in the source`,
        kind: "unmatched-row",
        prop: row.name,
      });
    }
    return findings;
  }

  if (prop.origin !== "sds") {
    return findings;
  }

  return [
    ...findings,
    ...compareRow(row, prop, {
      trustTableType: Boolean(
        VERIFIED_TABLE_TYPES.get(component.name)?.has(row.name)
      ),
    }),
  ];
}

/** How a row's three cells read against the prop the source describes. */
function compareRow(
  row: TableRow,
  prop: SourceProp,
  { trustTableType }: { trustTableType: boolean }
): Finding[] {
  const findings: Finding[] = [];

  if (!trustTableType && row.type && typesDisagree(row.type, prop.type)) {
    findings.push({
      detail: `table says \`${row.type}\`, source says \`${prop.type}\``,
      kind: "type-mismatch",
      prop: row.name,
    });
  }

  // A prop the component redeclares is exempt from both of the checks below:
  // the parser reports one default and one description for the prop without
  // saying which declaration they came from, and for these it is as likely to
  // be MUI's - which describes MUI's component, not this one.
  if (
    row.defaultValue &&
    prop.defaultValue &&
    !prop.mixedOrigin &&
    normalizeDefault(row.defaultValue) !== normalizeDefault(prop.defaultValue)
  ) {
    findings.push({
      detail: `table says \`${row.defaultValue}\`, source says \`${prop.defaultValue}\``,
      kind: "default-mismatch",
      prop: row.name,
    });
  }

  // The generated props data prefers the JSDoc, so where the two disagree the
  // page and the MCP server tell readers different things.
  if (
    row.description &&
    prop.description &&
    !prop.mixedOrigin &&
    descriptionsDisagree(row.description, prop.description)
  ) {
    findings.push({
      detail: `page says "${excerpt(row.description)}", JSDoc says "${excerpt(prop.description)}"`,
      kind: "description-mismatch",
      prop: row.name,
    });
  }

  return findings;
}

function audit(
  component: Component,
  byFile: Map<string, ComponentDoc[]>
): Finding[] {
  const { byOwner, merged } = sourceProps(component, byFile);
  const rows = readTables(component.contentPath);
  const argTypes = new Set(
    (extractArgTypesFromStorybook(component.storyPath) ?? []).map(
      (argType: ArgType) => argType.name
    )
  );

  const documented = new Set(rows.map((row) => row.name));

  // An argType that names neither a real prop nor a documented one is a
  // control the story invented for itself, and the props generator publishes
  // it as though the component accepted it.
  const verified = VERIFIED_INHERITED.get(component.name);
  const phantom = [...argTypes]
    .filter(
      (name) =>
        !merged.has(name) &&
        !documented.has(name) &&
        !INVISIBLE_TO_DOCGEN.has(name) &&
        !verified?.has(name)
    )
    .map(
      (name): Finding => ({
        detail: component.generic
          ? "not found in the source and not documented: either a story-only control or an inherited prop the parser cannot see"
          : "a story-only control: the generator drops it, but the Storybook controls panel still offers it as though it were a prop",
        kind: "phantom-arg-type",
        prop: name,
      })
    );

  // Nothing at all came back for some components - a generic wrapped in
  // `forwardRef` defeats the parser entirely - and against a silent source
  // every row looks like it describes a prop that does not exist. Say so once
  // rather than two dozen times.
  const readable = [...merged.keys()].filter((name) => !PARSER_NOISE.has(name));

  if (readable.length === 0) {
    return [
      {
        detail: `${rows.length} rows could not be checked: the parser reports no props for this component`,
        kind: "unreadable-source",
        prop: "-",
      },
      ...phantom,
    ];
  }

  return [
    ...auditSource(component, merged, documented, argTypes),
    ...rows
      .filter((row) => !describesAShape(component, row))
      .flatMap((row) =>
        auditRow(component, row, propForRow(row, byOwner, merged))
      ),
    ...phantom,
  ];
}

/**
 * Whether a row belongs to a table about a shape the component takes in rather
 * than about its props. `SegmentedControl` heads one "SingleButtonDefinition",
 * after the type of the entries in `buttonDefinition`, and its `label` has
 * nothing to do with any prop of that name.
 */
function describesAShape(component: Component, row: TableRow): boolean {
  const own = row.heading.split(" > ").pop() ?? row.heading;
  const words = own.toLowerCase().match(/\w+/g) ?? [];

  if (words.length === 0 || words.every((word) => word === "props")) {
    return false;
  }

  // "SectionProps and ActionItem" heads one table over two shapes, so any word
  // naming a declared type is enough.
  return words.some((word) => component.declaredTypes.has(word));
}

/**
 * The prop a row is about. A page that splits its tables by subcomponent -
 * "DialogTitle Props" over one, "DialogActions Props" over the next - is
 * describing that subcomponent's prop, which may share a name with the parent's
 * and mean something else entirely.
 */
function propForRow(
  row: TableRow,
  byOwner: Map<string, Map<string, SourceProp>>,
  merged: Map<string, SourceProp>
): SourceProp | undefined {
  // Longest name first: "DialogTitle Props" contains "Dialog" too, and the
  // subcomponent is the one the heading means.
  const owners = [...byOwner.keys()].sort((a, b) => b.length - a.length);

  for (const owner of owners) {
    const props = byOwner.get(owner);
    if (row.heading.includes(owner) && props?.has(row.name)) {
      return props.get(row.name);
    }
  }

  return merged.get(row.name);
}

/* -------------------------------------------------------------------------
 * Reporting
 * ---------------------------------------------------------------------- */

const KIND_TITLES: Record<Finding["kind"], string> = {
  "default-mismatch": "Default disagrees with the source",
  "description-mismatch": "Description disagrees with the JSDoc",
  "legacy-type-name": "PropTypes-era type name",
  "missing-from-table": "SDS prop missing from the props table",
  "phantom-arg-type": "argType for something that is not a prop",
  "published-undocumented":
    "Published in the props data but missing from the page",
  "type-mismatch": "Type disagrees with the source",
  "unmatched-row": "Table row matches no prop",
  "unreadable-source": "Source could not be read",
};

/** Short column headers, so the summary table stays readable. */
const KIND_COLUMNS: Record<Finding["kind"], string> = {
  "default-mismatch": "Default",
  "description-mismatch": "Description",
  "legacy-type-name": "Legacy name",
  "missing-from-table": "Missing",
  "phantom-arg-type": "Phantom",
  "published-undocumented": "Undocumented",
  "type-mismatch": "Type",
  "unmatched-row": "Unmatched",
  "unreadable-source": "Unreadable",
};

const KIND_ORDER: Finding["kind"][] = [
  "missing-from-table",
  "published-undocumented",
  "unmatched-row",
  "phantom-arg-type",
  "type-mismatch",
  "default-mismatch",
  "legacy-type-name",
  "description-mismatch",
  "unreadable-source",
];

function countOf(findings: Finding[], kind: Finding["kind"]): number {
  return findings.filter((finding) => finding.kind === kind).length;
}

function renderSummary(withFindings: [string, Finding[]][]): string[] {
  const header = ["Component", ...KIND_ORDER.map((kind) => KIND_COLUMNS[kind])];

  const rows = withFindings.map(([name, findings]) => [
    name,
    ...KIND_ORDER.map((kind) => String(countOf(findings, kind) || "")),
  ]);

  const totals = KIND_ORDER.map((kind) =>
    String(
      withFindings.reduce(
        (sum, [, findings]) => sum + countOf(findings, kind),
        0
      )
    )
  );

  const body = [...rows, ["**Total**", ...totals]];
  const widths = header.map((cell, column) =>
    body.reduce(
      (width, row) => Math.max(width, row[column].length),
      cell.length
    )
  );
  const line = (cells: string[]) =>
    `| ${cells.map((cell, column) => cell.padEnd(widths[column])).join(" | ")} |`;

  return [
    "## Summary",
    "",
    line(header),
    `| ${widths.map((width) => "-".repeat(width)).join(" | ")} |`,
    ...body.map(line),
    "",
  ];
}

function renderComponent(name: string, findings: Finding[]): string[] {
  const lines = [`### ${name}`, ""];

  for (const kind of KIND_ORDER) {
    const ofKind = findings.filter((finding) => finding.kind === kind);
    if (ofKind.length === 0) {
      continue;
    }

    lines.push(
      `${KIND_TITLES[kind]}:`,
      "",
      ...ofKind.map((finding) => `- \`${finding.prop}\` - ${finding.detail}`),
      ""
    );
  }

  return lines;
}

function renderReport(results: Map<string, Finding[]>): string {
  const withFindings = [...results].filter(
    ([, findings]) => findings.length > 0
  );
  const clean = [...results]
    .filter(([, findings]) => findings.length === 0)
    .map(([name]) => name);

  return [
    "# Component documentation audit",
    "",
    `Generated by \`yarn docs:audit\` on ${new Date().toISOString().slice(0, 10)}.`,
    "",
    "Each finding is a disagreement between a component's source, its story's",
    "`argTypes`, and the props table on its documentation page. A finding is not",
    "automatically a documentation bug: sometimes the page is right and the",
    "component is wrong.",
    "",
    ...renderSummary(withFindings),
    "## By component",
    "",
    ...withFindings.flatMap(([name, findings]) =>
      renderComponent(name, findings)
    ),
    ...(clean.length > 0
      ? ["## Clean", "", ...clean.map((name) => `- ${name}`), ""]
      : []),
  ].join("\n");
}

function main(): void {
  const only = new Set(process.argv.slice(2));

  const componentList = JSON.parse(
    fs.readFileSync(path.join(dirname, "../data/component-list.json"), "utf-8")
  );

  const components = [
    ...collectComponents(
      componentList.components,
      "packages/components/src/core"
    ),
    ...collectComponents(
      componentList["data-viz"],
      "packages/data-viz/src/core"
    ),
  ].filter((component) => only.size === 0 || only.has(component.name));

  console.log(`Auditing ${components.length} documented components\n`);

  const files = components.flatMap((component) => [
    component.entry,
    ...component.subcomponents.values(),
  ]);

  const started = Date.now();
  const docs = parser.parse(files);
  console.log(
    `Parsed ${files.length} files in ${((Date.now() - started) / 1000).toFixed(1)}s\n`
  );

  const byFile = new Map<string, ComponentDoc[]>();
  for (const doc of docs) {
    const key = path.resolve(REPO_ROOT, doc.filePath);
    byFile.set(key, [...(byFile.get(key) ?? []), doc]);
  }

  const results = new Map<string, Finding[]>();
  for (const component of components) {
    results.set(component.name, audit(component, byFile));
  }

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, renderReport(results));

  const withFindings = [...results].filter(
    ([, findings]) => findings.length > 0
  );
  const total = withFindings.reduce(
    (sum, [, findings]) => sum + findings.length,
    0
  );

  for (const [name, findings] of withFindings) {
    console.log(`  ${name}: ${findings.length}`);
  }

  console.log(
    `\n${total} findings across ${withFindings.length} of ${components.length} components`
  );
  console.log(`Report written to ${path.relative(REPO_ROOT, REPORT_PATH)}`);
}

main();
