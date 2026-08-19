import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "node-html-parser";
import { describe, expect, it } from "vitest";

/**
 * Holds the props tables to what the MCP server publishes.
 *
 * `packages/mcp/data/component-props/<Name>.json` is generated from the
 * component's source and its story's `argTypes`, and it is what an assistant
 * answers questions about the component from. Anything in there that the page
 * does not carry a row for is a prop the docs do not mention, which is how the
 * two drifted apart in the first place.
 *
 * The deep check is `yarn docs:audit`, which parses the source. This one only
 * reads two files per component, so it can run on every commit.
 */
const ROOT = process.cwd();
const PROPS_DATA = resolve(ROOT, "packages/mcp/data/component-props");
const PROPS_TABLE_HEADER = "Name|Type|Default|Description";

const CORE_DIRECTORIES = [
  resolve(ROOT, "packages/components/src/core"),
  resolve(ROOT, "packages/data-viz/src/core"),
];

/** Every name the page's props tables carry a row for. */
function documentedProps(contentPath: string): Set<string> {
  const root = parse(readFileSync(contentPath, "utf-8"));
  const names = new Set<string>();

  for (const table of root.querySelectorAll("table")) {
    const rows = table.querySelectorAll("tr");
    const header = rows[0]
      ?.querySelectorAll("td, th")
      .map((cell) => cell.textContent.replace(/\s+/g, " ").trim())
      .join("|");

    if (header !== PROPS_TABLE_HEADER) continue;

    for (const row of rows.slice(1)) {
      const name = row.querySelector("td")?.textContent.trim();
      // A row that names two props at once - a mouse enter beside its leave -
      // documents both.
      for (const word of name?.split(/\s+/) ?? []) {
        if (word) names.add(word);
      }
    }
  }

  return names;
}

interface Component {
  contentPath: string;
  name: string;
  /** Every prop the props data publishes, across all of its subcomponents. */
  published: string[];
}

function contentPathFor(name: string): string | undefined {
  return CORE_DIRECTORIES.map((directory) =>
    resolve(directory, name, "__storybook__/docs/content.html")
  ).find((path) => existsSync(path));
}

const components: Component[] = readdirSync(PROPS_DATA)
  .filter((file) => file.endsWith(".json"))
  .flatMap((file) => {
    const name = file.replace(/\.json$/, "");
    const contentPath = contentPathFor(name);

    // A deprecated component keeps its stories, and so its props data, without
    // a documentation page to hold it to.
    if (!contentPath) return [];

    const data: Record<string, { props: Record<string, unknown> }> = JSON.parse(
      readFileSync(resolve(PROPS_DATA, file), "utf-8")
    );

    return [
      {
        contentPath,
        name,
        published: Object.values(data).flatMap((owner) =>
          Object.keys(owner.props)
        ),
      },
    ];
  });

describe("the props data against the props tables", () => {
  it("finds the components", () => {
    // A move that broke the lookup above would leave every assertion below
    // trivially satisfied.
    expect(components.length).toBeGreaterThan(40);
    expect(
      components.every((component) => component.published.length > 0)
    ).toBe(true);
  });

  it.each(components)(
    "$name documents every prop it publishes",
    (component) => {
      const documented = documentedProps(component.contentPath);
      const missing = component.published.filter(
        (prop) => !documented.has(prop)
      );

      expect(missing).toEqual([]);
    }
  );
});
