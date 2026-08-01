/* eslint-disable sonarjs/no-duplicate-string */
/**
 * Extracts the props of every SDS component into `data/component-props/`.
 *
 * The set of props to document comes from each component's Storybook
 * `argTypes`, and their types come from `react-docgen-typescript`. Every
 * component is parsed by a single shared TypeScript program: the parser builds
 * a new program on each `parse()` call, and building one per component means
 * re-reading all of React, MUI and emotion's type definitions each time.
 */
import * as fs from "fs";
import * as path from "path";
import {
  withDefaultConfig,
  ComponentDoc,
  ParserOptions,
  PropItem,
} from "react-docgen-typescript";
import * as ts from "typescript";
import { fileURLToPath } from "url";
import {
  PropsTable,
  PropsTableEntry,
  readPropsTable,
} from "./lib/props-tables.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const REPO_ROOT = path.join(dirname, "../../..");

interface SimplifiedProp {
  defaultValue?: string | number | boolean | null;
  type: string;
  isRequired: boolean;
  description?: string;
}

interface ComponentProps {
  props: Record<string, SimplifiedProp>;
}

interface MultiComponentProps {
  [componentName: string]: ComponentProps;
}

/** One component to document, with every input resolved before parsing. */
interface ComponentTarget {
  argTypes: ArgType[];
  /** Props as written in the component's documentation page. */
  authoredProps: PropsTable;
  componentPath: string;
  name: string;
  /** Exported subcomponents that have their own directory, by name. */
  subcomponents: Map<string, string>;
}

/**
 * For a named export, `exp.getName()` is the name the component is published
 * as. For a default export it is instead the anonymous type React wraps the
 * component in, so those fall back to the directory name.
 */
const ANONYMOUS_EXPORT_NAMES = new Set([
  "default",
  "ExoticComponent",
  "ForwardRefExoticComponent",
  "FunctionComponent",
  "MemoExoticComponent",
  "NamedExoticComponent",
]);

function resolveComponentName(
  exp: ts.Symbol,
  source: ts.SourceFile
): string | undefined {
  const name = exp.getName();

  if (!name || name.startsWith("__") || ANONYMOUS_EXPORT_NAMES.has(name)) {
    return path.basename(path.dirname(source.fileName));
  }

  return name;
}

// Configure the parser to extract ALL props without filtering
const parserOptions: ParserOptions = {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
  // Don't filter any props - we filter later based on argTypes
  propFilter: () => true,
  componentNameResolver: resolveComponentName,
};

// Note: despite the name, `withDefaultConfig` does not read a tsconfig. It uses
// react-docgen-typescript's own hardcoded compiler options.
const parser = withDefaultConfig(parserOptions);

/**
 * Extract exported subcomponents from a component file
 */
function extractExportedSubcomponents(componentPath: string): string[] {
  try {
    const fileContent = fs.readFileSync(componentPath, "utf-8");
    const sourceFile = ts.createSourceFile(
      componentPath,
      fileContent,
      ts.ScriptTarget.Latest,
      true
    );

    const exportedComponents: string[] = [];

    const visit = (node: ts.Node) => {
      // Look for export { ComponentA, ComponentB } statements
      if (
        ts.isExportDeclaration(node) &&
        node.exportClause &&
        ts.isNamedExports(node.exportClause)
      ) {
        node.exportClause.elements.forEach((element) => {
          if (ts.isExportSpecifier(element) && ts.isIdentifier(element.name)) {
            exportedComponents.push(element.name.text);
          }
        });
      }
    };

    ts.forEachChild(sourceFile, visit);
    return exportedComponents;
  } catch (error) {
    console.log(
      `    ⚠️  Could not extract subcomponents: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return [];
  }
}

/** The `argTypes` entry for one prop, as authored in a story. */
interface ArgType {
  name: string;
  options?: string[];
  required?: boolean;
}

function propertyValue(
  object: ts.ObjectLiteralExpression,
  name: string
): ts.Expression | undefined {
  for (const property of object.properties) {
    if (
      ts.isPropertyAssignment(property) &&
      (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
      property.name.text === name
    ) {
      return property.initializer;
    }
  }

  return undefined;
}

function readStringArray(expression?: ts.Expression): string[] | undefined {
  if (!expression || !ts.isArrayLiteralExpression(expression)) {
    return undefined;
  }

  const values = expression.elements
    .filter(ts.isStringLiteralLike)
    .map((element) => element.text);

  return values.length === expression.elements.length && values.length > 0
    ? values
    : undefined;
}

function readArgType(property: ts.ObjectLiteralElementLike): ArgType | null {
  if (
    !ts.isPropertyAssignment(property) ||
    !(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
  ) {
    return null;
  }

  const name = property.name.text;

  if (!ts.isObjectLiteralExpression(property.initializer)) {
    return { name };
  }

  return {
    name,
    options: readStringArray(propertyValue(property.initializer, "options")),
    required:
      propertyValue(property.initializer, "required")?.kind ===
      ts.SyntaxKind.TrueKeyword,
  };
}

/** Locate the `argTypes` object on a story file's default-exported meta. */
function findArgTypesObject(
  sourceFile: ts.SourceFile
): ts.ObjectLiteralExpression | undefined {
  let found: ts.ObjectLiteralExpression | undefined;

  const visit = (node: ts.Node): void => {
    if (found) {
      return;
    }

    if (ts.isExportAssignment(node)) {
      // Unwrap an `as Meta` assertion.
      const meta = ts.isAsExpression(node.expression)
        ? node.expression.expression
        : node.expression;

      if (ts.isObjectLiteralExpression(meta)) {
        const argTypes = propertyValue(meta, "argTypes");

        if (argTypes && ts.isObjectLiteralExpression(argTypes)) {
          found = argTypes;
          return;
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return found;
}

/**
 * The story's `argTypes` decide which props get documented: they are the
 * curated public surface, as opposed to everything a component inherits from
 * MUI.
 */
function extractArgTypesFromStorybook(storybookPath: string): ArgType[] | null {
  try {
    if (!fs.existsSync(storybookPath)) {
      return null;
    }

    const sourceFile = ts.createSourceFile(
      storybookPath,
      fs.readFileSync(storybookPath, "utf-8"),
      ts.ScriptTarget.Latest,
      true
    );

    const argTypesObject = findArgTypesObject(sourceFile);

    if (!argTypesObject) {
      return null;
    }

    const argTypes = argTypesObject.properties
      .map(readArgType)
      .filter((argType): argType is ArgType => argType !== null);

    return argTypes.length > 0 ? argTypes : null;
  } catch (error) {
    console.log(
      `    ⚠️  Could not extract argTypes: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return null;
  }
}

/**
 * React's node and event types expand into unions too large to be worth
 * printing, so they collapse back to the names people write.
 */
function collapseReactTypes(type: string): string | undefined {
  if (type.includes("ReactNode")) {
    return "ReactNode";
  }
  if (type.includes("ReactElement")) {
    return "ReactElement";
  }
  if (type.includes("MouseEvent") || type.includes("ChangeEvent")) {
    return "function";
  }

  return undefined;
}

function simplifyType(type: string): string {
  // Clean up the type string
  type = type.replace(/\s+/g, " ").trim();

  const react = collapseReactTypes(type);
  if (react) {
    return react;
  }

  // Extract union types
  const unionMatch = type.match(/"([^"]+)"/g);
  if (unionMatch && unionMatch.length > 1 && unionMatch.length < 10) {
    return unionMatch.join(" | ");
  }

  // Simplify complex generic types
  if (type.includes("<") && type.length > 100) {
    const baseType = type.substring(0, type.indexOf("<"));
    return baseType || "complex";
  }

  // Truncate very long types
  if (type.length > 150) {
    return "complex";
  }

  return type;
}

function parseDefaultValue(value: string): string | number | boolean | null {
  // Try to parse as JSON first
  try {
    return JSON.parse(value);
  } catch {
    // If not JSON, use as string but clean it up
    const cleanValue = value.replace(/['"]/g, "");
    if (cleanValue === "true") return true;
    if (cleanValue === "false") return false;
    if (!isNaN(Number(cleanValue))) return Number(cleanValue);
    return cleanValue;
  }
}

/**
 * Rebuild a union from the members docgen resolved.
 *
 * Members arrive already quoted when they are string literals, so they are
 * joined as they are: re-quoting everything would render `width` as though it
 * accepted the strings "string" and "number".
 */
function enumUnion(typeValue: PropItem["type"]): string | null {
  if (typeValue.name !== "enum" || !typeValue.value) {
    return null;
  }

  const members: string[] = (
    typeValue.value as ({ value?: unknown } | string | number)[]
  )
    .map((v) =>
      typeof v === "object" && v !== null && v.value !== undefined
        ? String(v.value)
        : String(v)
    )
    .filter((v) => v !== "" && v !== "|");

  if (members.length === 0) {
    return null;
  }

  // `shouldExtractLiteralValuesFromEnum` splits a boolean into its two
  // literals, which reads as if the prop took the strings "true" and "false".
  if (
    members.length === 2 &&
    members.every((v) => v === "true" || v === "false")
  ) {
    return "boolean";
  }

  return members.join(" | ");
}

/**
 * A union built from resolved members is already in its final shape, so it
 * skips the heuristics `simplifyType` uses to rescue something readable out of
 * a raw type string.
 */
function resolveType(propInfo: PropItem): string {
  const union = enumUnion(propInfo.type);

  if (union === null) {
    return simplifyType(propInfo.type.raw || propInfo.type.name);
  }

  return collapseReactTypes(union) ?? union;
}

/**
 * Combine what the three sources each know best: the program resolves types,
 * the story knows the curated option lists, and the authored table is the only
 * place descriptions and documented defaults exist.
 */
function mergeProp(
  argType: ArgType,
  docgenProp?: PropItem,
  authored?: PropsTableEntry
): SimplifiedProp {
  const docgenType = docgenProp ? resolveType(docgenProp) : undefined;
  const optionsType = argType.options
    ?.map((option) => `"${option}"`)
    .join(" | ");
  const rawDefault = docgenProp?.defaultValue?.value ?? authored?.defaultValue;

  return {
    defaultValue: rawDefault ? parseDefaultValue(rawDefault) : undefined,
    description: docgenProp?.description || authored?.description,
    isRequired: docgenProp?.required || argType.required || false,
    type:
      (docgenType !== "any" && docgenType) ||
      optionsType ||
      authored?.type ||
      "any",
  };
}

/**
 * Resolve every component that has both a source file and Storybook argTypes.
 */
function collectTargets(
  corePath: string,
  components: string[]
): ComponentTarget[] {
  const targets: ComponentTarget[] = [];

  for (const name of components) {
    const componentDir = path.join(dirname, corePath, name);
    const componentPath = path.join(componentDir, "index.tsx");
    const storybookPath = path.join(
      componentDir,
      "__storybook__",
      "index.stories.tsx"
    );

    if (!fs.existsSync(componentPath)) {
      console.log(`❌ ${name} - Component file not found`);
      continue;
    }

    if (!fs.existsSync(storybookPath)) {
      console.log(`❌ ${name} - Storybook file not found`);
      continue;
    }

    const argTypes = extractArgTypesFromStorybook(storybookPath);
    if (!argTypes || argTypes.length === 0) {
      console.log(`⚠️  ${name} - No argTypes found in Storybook file`);
      continue;
    }

    const subcomponents = new Map<string, string>();
    for (const subName of extractExportedSubcomponents(componentPath)) {
      const subPath = path.join(
        componentDir,
        "components",
        subName,
        "index.tsx"
      );
      if (fs.existsSync(subPath)) {
        subcomponents.set(subName, subPath);
      }
    }

    targets.push({
      argTypes,
      authoredProps: readPropsTable(
        path.join(componentDir, "__storybook__", "docs", "content.html")
      ),
      componentPath,
      name,
      subcomponents,
    });
  }

  return targets;
}

/**
 * docgen reports `filePath` either absolute or relative to the repo root
 * depending on where the script is run from, so both are normalized to the
 * same key.
 */
function fileKey(filePath: string): string {
  return path.resolve(REPO_ROOT, filePath);
}

/** Parse every component in one shared TypeScript program. */
function parseAll(targets: ComponentTarget[]): Map<string, ComponentDoc[]> {
  const files = targets.flatMap((target) => [
    target.componentPath,
    ...target.subcomponents.values(),
  ]);

  console.log(
    `🔍 Parsing ${files.length} files in a single TypeScript program...`
  );

  const started = Date.now();
  const docs = parser.parse(files);
  console.log(
    `   Found ${docs.length} components in ${((Date.now() - started) / 1000).toFixed(1)}s\n`
  );

  const byFile = new Map<string, ComponentDoc[]>();
  for (const doc of docs) {
    const key = fileKey(doc.filePath);
    const existing = byFile.get(key);
    if (existing) {
      existing.push(doc);
    } else {
      byFile.set(key, [doc]);
    }
  }

  return byFile;
}

/**
 * The docs a prop may belong to, most specific first: the component itself,
 * then each subcomponent, then anything else the entry file exports (named
 * re-exports and styled components).
 */
function searchOrder(
  target: ComponentTarget,
  byFile: Map<string, ComponentDoc[]>
): { owner: string; doc: ComponentDoc }[] {
  const entryDocs = byFile.get(fileKey(target.componentPath)) ?? [];
  const main = entryDocs.filter((doc) => doc.displayName === target.name);
  const rest = entryDocs.filter((doc) => doc.displayName !== target.name);

  const subs = [...target.subcomponents].flatMap(([subName, subPath]) =>
    (byFile.get(fileKey(subPath)) ?? []).map((doc) => ({
      owner: subName,
      doc,
    }))
  );

  return [
    ...main.map((doc) => ({ owner: target.name, doc })),
    ...subs,
    ...rest.map((doc) => ({ owner: doc.displayName, doc })),
  ];
}

function extractProps(
  target: ComponentTarget,
  byFile: Map<string, ComponentDoc[]>
): MultiComponentProps {
  const candidates = searchOrder(target, byFile);
  const componentPropsMap: Record<string, Record<string, SimplifiedProp>> = {
    [target.name]: {},
  };

  let unresolved = 0;

  for (const argType of target.argTypes) {
    const match = candidates.find(({ doc }) => doc.props[argType.name]);
    const owner = match?.owner ?? target.name;
    const prop = mergeProp(
      argType,
      match?.doc.props[argType.name],
      target.authoredProps.get(argType.name)
    );

    if (prop.type === "any") {
      unresolved += 1;
    }

    componentPropsMap[owner] ??= {};
    componentPropsMap[owner][argType.name] = prop;
  }

  const allComponents: MultiComponentProps = {};
  for (const [compName, props] of Object.entries(componentPropsMap)) {
    if (Object.keys(props).length > 0) {
      allComponents[compName] = { props };
    }
  }

  const resolved = target.argTypes.length - unresolved;
  console.log(
    `  ✅ ${target.name}: ${resolved}/${target.argTypes.length} props resolved` +
      (unresolved > 0 ? ` (${unresolved} unresolved)` : "")
  );

  return allComponents;
}

interface ProcessResult {
  successCount: number;
  failCount: number;
  propsCount: Record<string, number>;
  unresolvedCount: number;
}

function writeComponentProps(
  targets: ComponentTarget[],
  byFile: Map<string, ComponentDoc[]>,
  outputDir: string
): ProcessResult {
  let successCount = 0;
  let failCount = 0;
  let unresolvedCount = 0;
  const propsCount: Record<string, number> = {};

  for (const target of targets) {
    const allComponents = extractProps(target, byFile);

    if (Object.keys(allComponents).length === 0) {
      console.log(`⚠️  ${target.name} - No props extracted`);
      failCount += 1;
      continue;
    }

    fs.writeFileSync(
      path.join(outputDir, `${target.name}.json`),
      JSON.stringify(allComponents, null, 2)
    );

    successCount += 1;
    propsCount[target.name] = Object.values(allComponents).reduce(
      (sum, comp) => sum + Object.keys(comp.props).length,
      0
    );
    unresolvedCount += Object.values(allComponents).reduce(
      (sum, comp) =>
        sum + Object.values(comp.props).filter((p) => p.type === "any").length,
      0
    );
  }

  return { successCount, failCount, propsCount, unresolvedCount };
}

function printSummary(
  result: ProcessResult,
  totalProps: number,
  outputDir: string
): void {
  console.log("\n" + "=".repeat(50));
  console.log("📊 SUMMARY");
  console.log("=".repeat(50));
  console.log(`✅ Successfully processed: ${result.successCount} components`);
  console.log(`⚠️  Failed: ${result.failCount} components`);
  console.log(
    `❓ Props with an unresolved type: ${result.unresolvedCount}/${totalProps}`
  );
  console.log(`📂 Output directory: ${outputDir}`);

  const sorted = Object.entries(result.propsCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  if (sorted.length > 0) {
    console.log("\n📈 Top components by prop count:");
    for (const [name, count] of sorted) {
      console.log(`   ${name}: ${count} props`);
    }
  }
}

function generatePropsWithDocgen() {
  console.log("🚀 Generating component props using react-docgen-typescript\n");

  const componentListPath = path.join(dirname, "../data/component-list.json");
  if (!fs.existsSync(componentListPath)) {
    console.error(
      "Component list not found. Please run 'yarn generate:components-list' first."
    );
    return;
  }

  const componentList = JSON.parse(fs.readFileSync(componentListPath, "utf-8"));
  const outputDir = path.join(dirname, "../data/component-props");

  // Rebuilt from scratch so a component that has been removed or renamed does
  // not keep shipping a file no tool can reach.
  fs.rmSync(outputDir, { force: true, recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const targets = [
    ...collectTargets("../../components/src/core", componentList.components),
    ...collectTargets("../../data-viz/src/core", componentList["data-viz"]),
  ];

  console.log(`\n📦 ${targets.length} components to document\n`);

  const byFile = parseAll(targets);
  const result = writeComponentProps(targets, byFile, outputDir);
  const totalProps = Object.values(result.propsCount).reduce(
    (sum, count) => sum + count,
    0
  );

  printSummary(result, totalProps, outputDir);
}

// Run the script
generatePropsWithDocgen();
