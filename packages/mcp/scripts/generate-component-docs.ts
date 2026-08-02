/**
 * Converts the per-component documentation that Storybook renders into markdown
 * the MCP server can serve.
 *
 * The prose lives in `__storybook__/docs/content.html` next to each component.
 * Code examples are not part of that HTML: each one is an empty
 * `<div class="sds-doc-example" data-example="...">` placeholder that
 * Storybook portals a live preview into. Here the placeholder is replaced with
 * the example's actual source, so a model reading these docs gets code it can
 * compile rather than a reference to a rendered widget.
 */
import * as fs from "fs";
import * as path from "path";
import TurndownService from "turndown";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const COMPONENTS_CORE = path.join(dirname, "../../components/src/core");
const DATA_VIZ_CORE = path.join(dirname, "../../data-viz/src/core");
const DESIGN_PAGES = path.join(dirname, "../../../design-docs/pages");
const REPO_ROOT = path.join(dirname, "../../..");

const COMPONENT_LIST_PATH = path.join(dirname, "../data/component-list.json");
const OUTPUT_DIR = path.join(dirname, "../data/component-docs");
const INDEX_PATH = path.join(OUTPUT_DIR, "index.json");

interface ComponentList {
  components: string[];
  "data-viz": string[];
}

interface DocsIndexEntry {
  file: string;
  package: string;
  source: string;
}

type DocsIndex = Record<string, DocsIndexEntry>;

/**
 * The slice of the DOM that Turndown hands to a rule. Turndown parses HTML
 * with its own bundled implementation, and this package compiles without the
 * `dom` lib, so the shape is declared here rather than pulled in globally.
 */
interface DomNode {
  children: ArrayLike<DomNode>;
  firstChild: DomNode | null;
  innerHTML: string;
  nodeName: string;
  tagName: string;
  textContent: string | null;
  getAttribute(name: string): string | null;
  querySelectorAll(selectors: string): ArrayLike<DomNode>;
}

function asElement(node: unknown): DomNode {
  return node as DomNode;
}

/**
 * Resolve a `data-example` id to its file path, minus the extension. Ids come
 * in three shapes: `core/<Component>/<Name>`, `data-viz/<Component>/<Name>`,
 * and `<DesignPage>/<Name>`. The component part may itself be nested, as in
 * `core/Bases/Typography/<Name>`. This mirrors `modulePath()` in
 * `docs-kit/SdsExample.tsx`, which resolves the same ids for Storybook.
 */
function resolveExamplePath(id: string): string {
  const segments = id.split("/");
  const name = segments[segments.length - 1];
  const component = segments.slice(1, -1).join("/");

  if (segments[0] === "core") {
    return path.join(
      COMPONENTS_CORE,
      component,
      "__storybook__/docs/examples",
      name
    );
  }

  if (segments[0] === "data-viz") {
    return path.join(
      DATA_VIZ_CORE,
      component,
      "__storybook__/docs/examples",
      name
    );
  }

  return path.join(DESIGN_PAGES, segments[0], "examples", name);
}

function fence(code: string, language: string): string {
  return `\`\`\`${language}\n${code.trim()}\n\`\`\``;
}

/** The source of one example, plus its companion stylesheet when it has one. */
function readExample(id: string): string | null {
  const base = resolveExamplePath(id);
  const tsxPath = `${base}.tsx`;

  if (!fs.existsSync(tsxPath)) {
    return null;
  }

  const name = id.split("/").pop();
  const blocks = [
    `**Example: ${name}**`,
    fence(fs.readFileSync(tsxPath, "utf-8"), "tsx"),
  ];

  const cssPath = `${base}.css`;
  if (fs.existsSync(cssPath)) {
    blocks.push(fence(fs.readFileSync(cssPath, "utf-8"), "css"));
  }

  return blocks.join("\n\n");
}

function languageOf(code: DomNode): string {
  const match = /language-([\w-]+)/.exec(code.getAttribute("class") ?? "");
  return match ? match[1] : "";
}

/**
 * Storybook's own docs pages are addressed with `./?path=/docs/...`, which
 * resolves to nothing outside a running Storybook. Only the link text carries
 * meaning here, so the anchor is flattened to it.
 */
function isInternalLink(href: string): boolean {
  return href.startsWith("./?path=") || href.startsWith("?path=");
}

/**
 * An example placeholder is an empty `<div>`, and Turndown discards empty
 * block elements before any rule of ours gets to see them. So the placeholders
 * are swapped for text tokens up front and the sources spliced in once the
 * surrounding prose has been converted.
 */
const EXAMPLE_PLACEHOLDER =
  /<div\b[^>]*\bdata-example="([^"]+)"[^>]*>\s*<\/div>/g;

function token(index: number): string {
  return `@@SDS_EXAMPLE_${index}@@`;
}

function tokenizeExamples(html: string): { html: string; ids: string[] } {
  const ids: string[] = [];

  const tokenized = html.replace(EXAMPLE_PLACEHOLDER, (_match, id: string) => {
    ids.push(id);
    return `<p>${token(ids.length - 1)}</p>`;
  });

  const expected = (html.match(/\bdata-example="/g) ?? []).length;
  if (ids.length !== expected) {
    throw new Error(
      `Recognized ${ids.length} of ${expected} example placeholders. The placeholder markup has changed.`
    );
  }

  return { html: tokenized, ids };
}

function baseService(): TurndownService {
  const service = new TurndownService({
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "_",
    headingStyle: "atx",
    strongDelimiter: "**",
  });

  // Prop names and type signatures are full of characters Turndown would
  // backslash-escape (`_`, `*`, `<`), which reads worse than the raw text.
  service.escape = (text: string) => text;

  service.addRule("internalLink", {
    filter: (node) => {
      const element = asElement(node);
      return (
        element.nodeName === "A" &&
        isInternalLink(element.getAttribute("href") ?? "")
      );
    },
    replacement: (content) => content,
  });

  return service;
}

/** Converts the contents of one table cell to a single line of markdown. */
function createInlineConverter(): (html: string) => string {
  const service = baseService();

  return (html: string) =>
    service
      .turndown(html)
      .replace(/\s*\n+\s*/g, " ")
      // A pipe would end the cell early, so it has to be escaped — and so does
      // the backslash itself, otherwise a literal `\|` in the source would
      // escape our escape and split the row. Both are replaced in one pass so
      // the backslashes added here are not re-escaped.
      .replace(/[\\|]/g, "\\$&")
      .trim();
}

function createConverter(): TurndownService {
  const service = baseService();
  const inline = createInlineConverter();

  service.addRule("codeBlock", {
    filter: (node) => {
      const element = asElement(node);
      return (
        element.nodeName === "PRE" && element.firstChild?.nodeName === "CODE"
      );
    },
    replacement: (_content, node) => {
      const code = asElement(node).firstChild as DomNode;
      return `\n\n${fence(code.textContent ?? "", languageOf(code))}\n\n`;
    },
  });

  // A code snippet's `<figcaption>` names the language or file it belongs to.
  service.addRule("figcaption", {
    filter: "figcaption",
    replacement: (content) => (content.trim() ? `\n\n**${content}**\n\n` : ""),
  });

  /**
   * The docs tables were imported without a `<thead>`, so the first `<tr>`
   * holds the column names. GFM has no way to express a headerless table, and
   * Turndown's own table handling skips them, so the first row is promoted.
   */
  service.addRule("table", {
    filter: "table",
    replacement: (_content, node) => {
      const rows = Array.from(asElement(node).querySelectorAll("tr")).map(
        (row) =>
          Array.from(row.children)
            .filter((cell) => cell.tagName === "TD" || cell.tagName === "TH")
            .map((cell) => inline(cell.innerHTML))
      );

      if (rows.length === 0) return "";

      const width = Math.max(...rows.map((cells) => cells.length));
      const line = (cells: string[]) =>
        `| ${Array.from({ length: width }, (_, i) => cells[i] ?? "").join(" | ")} |`;

      const [header, ...body] = rows;
      const divider = `| ${Array.from({ length: width }, () => "---").join(" | ")} |`;

      return `\n\n${[line(header), divider, ...body.map(line)].join("\n")}\n\n`;
    },
  });

  return service;
}

function inlineExamples(markdown: string, ids: string[]): string {
  return ids.reduce((text, id, index) => {
    const example = readExample(id);

    if (!example) {
      console.log(`    ⚠️  Missing example source for "${id}"`);
    }

    return text.replace(token(index), example ?? "");
  }, markdown);
}

/**
 * The snippets the pages write by hand, already fenced by the time the prose is
 * cleaned up. Splitting on them keeps their indentation out of the rules below,
 * which would otherwise flatten a nested JSX tag onto the margin.
 */
const FENCED_BLOCK = /(^```[\s\S]*?^```$)/m;

function tidyProse(markdown: string): string {
  return (
    markdown
      .replace(/\u00a0/g, " ")
      // The source HTML wraps inline links across lines, which leaves the
      // converted text with stray spaces before punctuation and between links.
      .replace(/ ([.,;:])(?=\s|$)/g, "$1")
      .replace(/ {2,}/g, " ")
      .replace(/[ \t]+$/gm, "")
      .replace(/\n{3,}/g, "\n\n")
  );
}

/**
 * Cleans up the prose. This runs before the examples are spliced in, so that
 * collapsing whitespace cannot reach into their source and reindent it.
 */
function tidy(markdown: string): string {
  return markdown
    .split(FENCED_BLOCK)
    .map((part, index) => (index % 2 === 0 ? tidyProse(part) : part))
    .join("")
    .trim();
}

interface PackageConfig {
  corePath: string;
  name: string;
  packageName: string;
}

function generateForPackage(
  { corePath, name, packageName }: PackageConfig,
  components: string[],
  index: DocsIndex
): { generated: number; skipped: string[] } {
  console.log(`📦 Processing ${name}...\n`);

  const converter = createConverter();
  const skipped: string[] = [];
  let generated = 0;

  for (const component of components) {
    const contentPath = path.join(
      corePath,
      component,
      "__storybook__/docs/content.html"
    );

    if (!fs.existsSync(contentPath)) {
      skipped.push(component);
      continue;
    }

    console.log(`  🔍 Converting ${component}...`);

    const { html, ids } = tokenizeExamples(
      fs.readFileSync(contentPath, "utf-8")
    );
    const markdown = `${inlineExamples(tidy(converter.turndown(html)), ids)}\n`;
    const file = `${component}.md`;

    fs.writeFileSync(path.join(OUTPUT_DIR, file), markdown);

    index[component] = {
      file,
      package: packageName,
      source: path.relative(REPO_ROOT, contentPath),
    };
    generated += 1;
  }

  console.log(`\n  ✅ Generated ${generated} documents`);
  if (skipped.length > 0) {
    console.log(`  ⚠️  No docs for: ${skipped.join(", ")}`);
  }

  return { generated, skipped };
}

function generateComponentDocs(): void {
  console.log("🚀 Generating component docs from Storybook content\n");

  if (!fs.existsSync(COMPONENT_LIST_PATH)) {
    console.error(
      "Component list not found. Please run 'yarn generate:components-list' first."
    );
    process.exitCode = 1;
    return;
  }

  const componentList: ComponentList = JSON.parse(
    fs.readFileSync(COMPONENT_LIST_PATH, "utf-8")
  );

  // Rebuilt from scratch so a component whose docs were removed does not keep
  // serving a stale file.
  fs.rmSync(OUTPUT_DIR, { force: true, recursive: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const index: DocsIndex = {};

  const components = generateForPackage(
    {
      corePath: COMPONENTS_CORE,
      name: "@czi-sds/components",
      packageName: "@czi-sds/components",
    },
    componentList.components,
    index
  );

  console.log("\n");

  const dataViz = generateForPackage(
    {
      corePath: DATA_VIZ_CORE,
      name: "@czi-sds/data-viz",
      packageName: "@czi-sds/data-viz",
    },
    componentList["data-viz"],
    index
  );

  const sorted = Object.keys(index)
    .sort()
    .reduce<DocsIndex>((acc, key) => ({ ...acc, [key]: index[key] }), {});

  fs.writeFileSync(INDEX_PATH, `${JSON.stringify(sorted, null, 2)}\n`);

  console.log(`\n${"=".repeat(50)}`);
  console.log("📊 SUMMARY");
  console.log("=".repeat(50));
  console.log(
    `✅ Documented: ${components.generated + dataViz.generated} components`
  );
  console.log(
    `⚠️  Undocumented: ${components.skipped.length + dataViz.skipped.length} components`
  );
  console.log(`📂 Output directory: ${OUTPUT_DIR}`);
}

generateComponentDocs();
