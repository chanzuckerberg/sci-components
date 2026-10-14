import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { DESIGN_ASSETS_PATH } from "../constants";

/**
 * Holds the images and links in the documentation to paths that survive
 * publication.
 *
 * Storybook mounts `design-docs/assets` under `DESIGN_ASSETS_PATH`, and the
 * published site is served from a subpath,
 * `chanzuckerberg.github.io/sci-components/`. So a page that names an image
 * from the root of the domain finds it in development, where Storybook is the
 * whole of `localhost:6006`, and nowhere at all once deployed — the one place
 * nobody sees the pages before merging them.
 */
const ROOT = process.cwd();

const ASSETS = resolve(ROOT, "design-docs/assets");

/** The trees that hold a documentation page's imported HTML. */
const DOCS = [
  "design-docs/pages",
  "packages/components/src",
  "packages/data-viz/src",
  "packages/icons/src",
  "packages/mcp/docs",
];

/** Anything a page points the browser at. */
const REFERENCE = /(?:src|href)="([^"]*)"/g;

/** A reference that leaves the site, and so resolves against nothing here. */
const EXTERNAL = /^(?:[a-z][\w+.-]*:|\/\/|#)/i;

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return walk(path);
    return entry.name === "content.html" ? [path] : [];
  });
}

interface Reference {
  /** Path of the file the reference was read from, relative to the repo. */
  page: string;
  url: string;
}

const pages: string[] = DOCS.flatMap((docs) => walk(resolve(ROOT, docs)));

const references: Reference[] = pages.flatMap((path) =>
  Array.from(readFileSync(path, "utf8").matchAll(REFERENCE), (match) => ({
    page: relative(ROOT, path),
    url: match[1],
  })).filter((reference) => !EXTERNAL.test(reference.url))
);

/**
 * The assets the renderer itself names, as CSS rather than as markup: the cover
 * the documentation opens on and the marks in an element's status row.
 */
const styled: Reference[] = Array.from(
  readFileSync(resolve(ROOT, "docs-kit/SdsDoc.tsx"), "utf8").matchAll(
    /url\("\$\{DESIGN_ASSETS_PATH\}\/([^"]+)"\)/g
  ),
  (match) => ({ page: "docs-kit/SdsDoc.tsx", url: match[1] })
);

describe("the documentation's images and links", () => {
  it("finds the pages", () => {
    // A move that broke the walk above would leave every assertion below
    // trivially satisfied.
    expect(pages.length).toBeGreaterThan(40);
    expect(references.length).toBeGreaterThan(1000);
    expect(styled.length).toBeGreaterThan(0);
  });

  it("resolves every reference against the current document", () => {
    const absolute = references
      .filter((reference) => reference.url.startsWith("/"))
      .map((reference) => `${reference.page}: ${reference.url}`);

    expect(absolute).toEqual([]);
  });

  it("points at assets that are committed", () => {
    const prefix = `${DESIGN_ASSETS_PATH}/`;
    const missing = [
      ...references.flatMap((reference) =>
        reference.url.startsWith(prefix)
          ? [{ ...reference, file: reference.url.slice(prefix.length) }]
          : []
      ),
      ...styled.map((reference) => ({ ...reference, file: reference.url })),
    ]
      .filter(({ file }) => !existsSync(join(ASSETS, file)))
      .map(({ file, page }) => `${page}: ${file}`);

    expect(missing).toEqual([]);
  });
});
