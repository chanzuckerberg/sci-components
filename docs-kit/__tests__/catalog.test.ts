import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { sanitize } from "storybook/internal/csf";
import { describe, expect, it } from "vitest";
import {
  catalog,
  type CatalogEntry,
} from "../../design-docs/pages/Overview/catalog";

const ROOT = process.cwd();

/**
 * The packages the catalog covers. Everything with stories under one of these
 * belongs on the Overview page, which is what this file is here to hold us to:
 * a component nobody added to the catalog is a component nobody can find.
 */
const PACKAGES = [
  "packages/components/src",
  "packages/data-viz/src",
  "packages/icons/src",
];

/**
 * Sections of the sidebar the catalog does not list. `Bases` is the design
 * tokens, documented by the design pages rather than as components, and
 * `Deprecated` is what the catalog exists to steer people away from.
 */
const LISTED_ROOTS = ["Components", "Data Viz", "Icons"];

/** A story's title, as its `export default` declares it. */
const TITLE =
  /title:\s*["']((?:Components|Data Viz|Bases|Deprecated|Icons)\/[^"']+)["']/;

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return walk(path);
    return entry.name.endsWith(".stories.tsx") ? [path] : [];
  });
}

interface Story {
  /** Absolute path of the file the title was read from. */
  path: string;
  title: string;
}

const stories: Story[] = PACKAGES.flatMap((pkg) =>
  walk(resolve(ROOT, pkg)).flatMap((path) => {
    const title = TITLE.exec(readFileSync(path, "utf8"))?.[1];
    return title ? [{ path, title }] : [];
  })
);

const listed = stories.filter((story) =>
  LISTED_ROOTS.some((root) => story.title.startsWith(`${root}/`))
);

const entries: CatalogEntry[] = catalog.flatMap((category) => category.entries);

/** The file an example id names, as the docs' registry resolves it. */
function examplePath(id: string): string {
  const segments = id.split("/");
  const name = segments[segments.length - 1];
  const component = segments.slice(1, -1).join("/");

  if (segments[0] === "core") {
    return resolve(
      ROOT,
      `packages/components/src/core/${component}/__storybook__/docs/examples/${name}.tsx`
    );
  }

  if (segments[0] === "data-viz") {
    return resolve(
      ROOT,
      `packages/data-viz/src/core/${component}/__storybook__/docs/examples/${name}.tsx`
    );
  }

  if (segments[0] === "icons") {
    return resolve(
      ROOT,
      `packages/icons/src/__storybook__/docs/examples/${name}.tsx`
    );
  }

  return resolve(ROOT, `design-docs/pages/${segments[0]}/examples/${name}.tsx`);
}

describe("the Overview page's component catalog", () => {
  it("reads its stories", () => {
    // A rename or a move that broke the walk above would otherwise leave every
    // comparison below trivially satisfied.
    expect(listed.length).toBeGreaterThan(40);
  });

  it("lists every component with stories, and nothing else", () => {
    expect(new Set(entries.map((entry) => entry.docs))).toEqual(
      new Set(listed.map((story) => sanitize(story.title)))
    );
  });

  it("lists each component once", () => {
    const docs = entries.map((entry) => entry.docs);
    expect(docs).toHaveLength(new Set(docs).size);

    const names = entries.map((entry) => entry.name);
    expect(names).toHaveLength(new Set(names).size);
  });

  it("links to pages that exist", () => {
    // Each card's href is `<docs>--documentation`, which Storybook publishes
    // from the docs page attached to that component's stories.
    const missing = listed
      .filter(
        (story) => !existsSync(join(dirname(story.path), "docs/index.mdx"))
      )
      .map((story) => story.title);

    expect(missing).toEqual([]);
  });

  it("renders examples that exist", () => {
    const missing = entries
      .filter((entry) => !existsSync(examplePath(entry.example)))
      .map((entry) => entry.example);

    expect(missing).toEqual([]);
  });

  it("has a section on the page for every category, and no empty ones", () => {
    const html = readFileSync(
      resolve(ROOT, "design-docs/pages/Overview/content.html"),
      "utf8"
    );
    const sections = Array.from(
      html.matchAll(/data-catalog="([^"]+)"/g),
      (match) => match[1]
    );

    expect(sections).toEqual(catalog.map((category) => category.slug));
    catalog.forEach((category) => {
      expect(category.entries.length).toBeGreaterThan(0);
    });
  });
});
