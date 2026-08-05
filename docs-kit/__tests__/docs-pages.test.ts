import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Holds each component's documentation page to the stories it sits beside.
 *
 * The pages name their own place in the sidebar rather than taking it from the
 * stories through `<Meta of={Stories} />`. Attaching a page that way makes
 * Storybook match the imported module against the one its story store loaded,
 * by object identity: in dev, Vite hands the two sides different instances of
 * the same file whenever the stories module is rebuilt while the page is served
 * from the browser's module cache, and the page dies with "<Meta of={} /> must
 * reference a CSF file module export" until it is reloaded by hand. The pages
 * render documentation and no stories, so they have nothing to gain from the
 * attachment, and a title is the whole of what they lose by dropping it.
 *
 * The title is therefore written out on both sides, and the two must agree:
 * Storybook files a page under whatever title it declares, so a page whose
 * title has drifted from its stories quietly opens a second entry in the
 * sidebar beside the component it documents.
 */
const ROOT = process.cwd();

const PACKAGES = ["packages/components/src", "packages/data-viz/src"];

/** A story's title, as its `export default` declares it. */
const STORY_TITLE = /title:\s*["']([^"']+)["']/;

/** The title and name a documentation page files itself under. */
const META = /<Meta\s+title="([^"]+)"(?:\s+name="([^"]+)")?\s*\/>/;

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return walk(path);
    return entry.name.endsWith(".stories.tsx") ? [path] : [];
  });
}

interface Page {
  mdx: string;
  title: string;
}

/** Every component whose stories are documented by a page of their own. */
const pages: Page[] = PACKAGES.flatMap((pkg) =>
  walk(resolve(ROOT, pkg)).flatMap((storiesPath) => {
    const mdx = join(dirname(storiesPath), "docs/index.mdx");
    if (!existsSync(mdx)) return [];

    const title = STORY_TITLE.exec(readFileSync(storiesPath, "utf8"))?.[1];
    if (!title) return [];

    return [{ mdx, title }];
  })
);

/** Every documentation page, including the section overviews without stories. */
const allPages: string[] = PACKAGES.flatMap((pkg) =>
  walk(resolve(ROOT, pkg))
    .map((storiesPath) => join(dirname(storiesPath), "docs/index.mdx"))
    .filter((mdx) => existsSync(mdx))
);

describe("the component documentation pages", () => {
  it("finds the pages", () => {
    // A move that broke the walk above would leave every assertion below
    // trivially satisfied.
    expect(pages.length).toBeGreaterThan(40);
  });

  it.each(pages)("$title is filed under its stories' title", (page) => {
    const meta = META.exec(readFileSync(page.mdx, "utf8"));

    expect(meta?.[1]).toBe(page.title);
    expect(meta?.[2]).toBe("Documentation");
  });

  it("attaches no page to a CSF file", () => {
    const attached = allPages.filter((mdx) =>
      readFileSync(mdx, "utf8").includes("<Meta of=")
    );

    expect(attached).toEqual([]);
  });
});
