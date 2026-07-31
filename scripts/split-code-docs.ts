/**
 * ONE-TIME MIGRATION SCRIPT.
 *
 * Splits the "Code" half out of the design pages under `zeroheight-docs/pages/`
 * and relocates it, one component at a time, to
 * `packages/components/src/core/<Component>/__storybook__/docs/`, carrying the
 * live examples it references along with it.
 *
 * Whatever the Code section holds that is not about a single component — group
 * overviews, "Visual Preview" blocks, component recipes — stays on the design
 * page. Where a page's entire Code section moves out, the `<h2>Code</h2>`
 * heading and its callout go with it.
 *
 * Re-running is safe: a page whose Code section is already gone is skipped, and
 * a mapping entry whose target already exists is treated as done.
 *
 * Usage: npx tsx scripts/split-code-docs.ts [--dry-run]
 */
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import * as prettier from "prettier";

const REPO_ROOT = path.resolve(__dirname, "..");
const PAGES_DIR = path.join(REPO_ROOT, "zeroheight-docs", "pages");
const CORE_DIR = path.join(REPO_ROOT, "packages", "components", "src", "core");

interface PageMigration {
  /**
   * Text of a top-level `<h2>` inside the page's Code section, mapped to the
   * component folder its block belongs in.
   */
  sections?: Record<string, string>;
  /**
   * Move the whole Code section to one component instead. Used where the prose
   * documents a component family as a unit (shared intro, shared examples)
   * rather than one self-contained `<h2>` block per component.
   */
  whole?: string;
}

/**
 * Pages absent from this table keep their Code section: Theming (dark mode
 * setup) and Responsive-Design (breakpoint helpers) document the system rather
 * than a component.
 *
 * A target may be a nested path (`Bases/Typography`) where the component lives
 * in a subfolder of `src/core`.
 */
const MIGRATIONS: Record<string, PageMigration> = {
  Accordion: { sections: { Accordion: "Accordion" } },
  Banner: { sections: { Banner: "Banner" } },
  Buttons: {
    sections: {
      Button: "Button",
      ButtonDropdown: "ButtonDropdown",
      ButtonGroup: "ButtonGroup",
      ButtonToggle: "ButtonToggle",
    },
  },
  Callout: { sections: { Callout: "Callout" } },
  "Content-Card": { sections: { "Content Card": "ContentCard" } },
  "Control-Inputs": {
    sections: {
      InputCheckbox: "InputCheckbox",
      InputRadio: "InputRadio",
      InputSlider: "InputSlider",
      InputToggle: "InputToggle",
    },
  },
  Dialog: { sections: { Dialog: "Dialog" } },
  "Dropdown-Input": { sections: { InputDropdown: "InputDropdown" } },
  "Dropdown-Menu": {
    sections: {
      Dropdown: "Dropdown",
      DropdownMenu: "DropdownMenu",
      MenuItem: "MenuItem",
    },
  },
  "Field-Inputs": {
    sections: { InputSearch: "InputSearch", InputText: "InputText" },
  },
  Filters: { sections: { ComplexFilter: "ComplexFilter" } },
  Hero: { sections: { Hero: "Hero" } },
  Icons: { sections: { Icon: "Icon" } },
  Intent: { sections: { IntentMessage: "IntentMessage" } },
  Link: { sections: { "Deprecated: the Link component": "Link" } },
  Lists: { whole: "List" },
  "Loading-Indicators": { sections: { LoadingIndicator: "LoadingIndicator" } },
  Navigation: {
    sections: {
      NavigationFooter: "NavigationFooter",
      NavigationHeader: "NavigationHeader",
      NavigationJumpTo: "NavigationJumpTo",
    },
  },
  Panel: { sections: { Panel: "Panel" } },
  "Segmented-Control": { sections: { SegmentedControl: "SegmentedControl" } },
  Table: {
    sections: {
      CellBasic: "CellBasic",
      CellComponent: "CellComponent",
      CellHeader: "CellHeader",
      Pagination: "Pagination",
      PreComposedTable: "PreComposedTable",
      Table: "Table",
      TableHeader: "TableHeader",
      TableRow: "TableRow",
    },
  },
  Tabs: { sections: { Tabs: "Tabs" } },
  Tags: { sections: { Tag: "Tag", TagFilter: "TagFilter" } },
  Tooltips: {
    sections: {
      Tooltip: "Tooltip",
      TooltipCondensed: "TooltipCondensed",
      TooltipTable: "TooltipTable",
    },
  },
  Typography: { whole: "Bases/Typography" },
};

const CODE_HEADING = "<h2>Code</h2>";

const dryRun = process.argv.includes("--dry-run");

function docsDirFor(component: string): string {
  return path.join(CORE_DIR, component, "__storybook__", "docs");
}

function headingText(line: string): string {
  return line.replace(/<[^>]*>/g, "").trim();
}

/**
 * The "code examples must install dependencies" banner ZeroHeight put at the
 * top of every Code section. It belongs to the examples, so it leaves with them
 * when a page's whole Code section moves out.
 */
function isOnlyCallout(lines: string[]): boolean {
  const content = lines.filter((line) => line.trim() !== "");
  if (content.length === 0) return true;
  return (
    content[0].startsWith("<div") &&
    content[content.length - 1] === "</div>" &&
    content.join("\n").includes("zeroheight-callout")
  );
}

function stripLeadingCallout(lines: string[]): string[] {
  const first = lines.findIndex((line) => line.trim() !== "");
  if (first === -1 || !lines[first].startsWith("<div")) return lines;

  const close = lines.findIndex(
    (line, index) => index > first && line === "</div>"
  );
  if (close === -1) return lines;

  const callout = lines.slice(first, close + 1);
  return isOnlyCallout(callout) ? lines.slice(close + 1) : lines;
}

function exampleIds(lines: string[]): string[] {
  return Array.from(
    lines.join("\n").matchAll(/data-example="([^"]+)"/g),
    (match) => match[1]
  );
}

function gitMv(from: string, to: string): void {
  if (dryRun) return;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  execFileSync("git", ["mv", from, to], { cwd: REPO_ROOT });
}

async function writeFormatted(file: string, contents: string): Promise<void> {
  if (dryRun) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, await prettier.format(contents, { filepath: file }));
}

const MDX_TEMPLATE = `import { Meta } from "@storybook/addon-docs/blocks";
import { SdsDoc } from "@sds-docs/SdsDoc";
import html from "./content.html?raw";
import * as Stories from "../index.stories";

<Meta of={Stories} name="Documentation" />

<SdsDoc html={html} />
`;

/**
 * Write one component's code docs and move the examples it references out of
 * the design page's `examples/` folder. Returns how many examples moved.
 */
async function writeComponentDocs(
  component: string,
  page: string,
  block: string[]
): Promise<number> {
  const stories = path.join(
    CORE_DIR,
    component,
    "__storybook__",
    "index.stories.tsx"
  );
  if (!fs.existsSync(stories)) {
    throw new Error(
      `${page}: no stories file to attach ${component} docs to (${stories})`
    );
  }

  const docsDir = docsDirFor(component);
  const ids = exampleIds(block);

  for (const id of ids) {
    const [idPage, name] = id.split("/");
    if (idPage !== page) {
      throw new Error(`${page}: example "${id}" does not belong to this page`);
    }

    for (const extension of [".tsx", ".css"]) {
      const from = path.join(
        PAGES_DIR,
        page,
        "examples",
        `${name}${extension}`
      );
      if (fs.existsSync(from)) {
        gitMv(from, path.join(docsDir, "examples", `${name}${extension}`));
      }
    }
  }

  const html = block
    .join("\n")
    .replace(
      /data-example="([^"]+)"/g,
      (_match, id: string) =>
        `data-example="core/${component}/${id.split("/")[1]}"`
    );

  await writeFormatted(path.join(docsDir, "content.html"), `${html}\n`);
  if (!dryRun) {
    fs.writeFileSync(path.join(docsDir, "index.mdx"), MDX_TEMPLATE);
  }

  return ids.length;
}

interface PageResult {
  docs: number;
  examples: number;
  retained: number;
}

async function splitPage(
  page: string,
  migration: PageMigration
): Promise<PageResult | null> {
  const file = path.join(PAGES_DIR, page, "content.html");
  const lines = fs.readFileSync(file, "utf8").replace(/\n$/, "").split("\n");

  const codeStart = lines.indexOf(CODE_HEADING);
  if (codeStart === -1) return null;

  const before = lines.slice(0, codeStart);
  const headings: number[] = [];
  for (let index = codeStart + 1; index < lines.length; index += 1) {
    if (lines[index].startsWith("<h2>")) headings.push(index);
  }

  const moved: { component: string; block: string[] }[] = [];
  const retained: string[][] = [];
  let pageLines: string[];

  if (migration.whole) {
    moved.push({
      block: stripLeadingCallout(lines.slice(codeStart + 1)),
      component: migration.whole,
    });
    pageLines = before;
  } else {
    const sections = migration.sections ?? {};
    const seen = new Set<string>();

    for (const [start, index] of headings.entries()) {
      const block = lines.slice(index, headings[start + 1] ?? lines.length);
      const heading = headingText(block[0]);
      const component = sections[heading];

      if (component) {
        seen.add(heading);
        moved.push({ block, component });
      } else {
        retained.push(block);
      }
    }

    for (const [heading, component] of Object.entries(sections)) {
      if (seen.has(heading)) continue;
      if (fs.existsSync(docsDirFor(component))) continue;
      throw new Error(`${page}: no "<h2>${heading}</h2>" in the Code section`);
    }

    // Everything between `<h2>Code</h2>` and the first component heading.
    const intro = lines.slice(codeStart, headings[0] ?? lines.length);
    if (retained.length > 0) {
      pageLines = [...before, ...intro, ...retained.flat()];
    } else {
      if (!isOnlyCallout(intro.slice(1))) {
        throw new Error(
          `${page}: the Code section has content outside any component block`
        );
      }
      pageLines = before;
    }
  }

  let examples = 0;
  for (const { component, block } of moved) {
    examples += await writeComponentDocs(component, page, block);
  }

  await writeFormatted(file, `${pageLines.join("\n")}\n`);

  const examplesDir = path.join(PAGES_DIR, page, "examples");
  if (
    !dryRun &&
    fs.existsSync(examplesDir) &&
    fs.readdirSync(examplesDir).length === 0
  ) {
    fs.rmdirSync(examplesDir);
  }

  return { docs: moved.length, examples, retained: retained.length };
}

async function main(): Promise<void> {
  let docs = 0;
  let examples = 0;

  for (const [page, migration] of Object.entries(MIGRATIONS)) {
    const result = await splitPage(page, migration);

    if (!result) {
      // eslint-disable-next-line no-console
      console.log(`- ${page}: no Code section, skipped`);
      continue;
    }

    docs += result.docs;
    examples += result.examples;
    // eslint-disable-next-line no-console
    console.log(
      `- ${page}: ${result.docs} component doc(s), ${result.examples} example(s)` +
        `${result.retained > 0 ? `, ${result.retained} section(s) kept` : ""}`
    );
  }

  // eslint-disable-next-line no-console
  console.log(
    `\n${dryRun ? "[dry run] " : ""}${docs} component docs, ${examples} examples`
  );
}

void main();
