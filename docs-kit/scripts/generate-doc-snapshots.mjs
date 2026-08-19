#!/usr/bin/env node

/**
 * Writes one story per documentation page into `docs-kit/generated`, so that
 * Chromatic has something to snapshot for the docs.
 *
 * Chromatic captures stories and nothing else: a documentation page is a `docs`
 * entry in Storybook's index, and no parameter opts one in. So each page is
 * given a story that renders the very same element the page does — the body of
 * its `.mdx` with the `<Meta />` taken out — and the pair stay in step because
 * one is written from the other every time Storybook is built.
 *
 * The stories are snapshots and nothing else: `!dev` keeps them out of the
 * sidebar, where the real pages already are, and `!test` with the accessibility
 * parameters keeps the test suites off content whose components they cover
 * already.
 *
 * Run: node docs-kit/scripts/generate-doc-snapshots.mjs
 */

import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT_DIR = resolve(ROOT, "docs-kit/generated");

/** Where documentation pages live, as `.storybook/main.ts` lists them. */
const PAGES = [
  /** Per-component documentation, beside the component it documents. */
  /__storybook__\/docs\/[^/]+\.mdx$/,
  /** The design pages: the foundations, and the design half of each component. */
  /^design-docs\/.+\.mdx$/,
  /** Guide to the MCP server, kept in the package it documents. */
  /^packages\/mcp\/docs\/.+\.mdx$/,
];

/** Directories to walk for those pages, and what to skip on the way down. */
const SEARCH = ["design-docs", "packages"];
const SKIP = new Set(["node_modules", "dist", "__tests__", "__snapshots__"]);

/**
 * The sidebar the snapshots are filed under. They are hidden from Storybook's
 * own sidebar, so this names them in Chromatic, where the whole point is to
 * find the page a change belongs to.
 */
const SECTION = "Docs Snapshots";

/**
 * Pages Chromatic will not capture. It refuses a snapshot larger than 25
 * million pixels, and at the 1,200px width it captures at, these two run past
 * 26,000px tall — the longest pages in the documentation by a wide margin, and
 * the only two over the line. Capturing them means splitting them up, so until
 * that is worth doing they are left out and reviewed in the published
 * Storybook as they were before.
 */
const TOO_TALL = new Set([
  "Design Documentation/Bases/Colors",
  "Design Documentation/Bases/Typography",
]);

/** The `<Meta />` a page declares itself with, and the title it carries. */
const META_ELEMENT = /^\s*<Meta\b[^>]*\/>\s*$/m;
const META_TITLE = /\btitle=(?:"([^"]*)"|'([^']*)')/;

/** The import that brings `<Meta />` in, which the story has no use for. */
const META_IMPORT =
  /^import\s+.*from\s+["']@storybook\/addon-docs\/blocks["'];?\s*$/;

const IMPORT_SOURCE = /(from\s+)(["'])(\.[^"']*)\2/;

function walk(directory) {
  const found = [];

  for (const entry of readdirSync(resolve(ROOT, directory), {
    withFileTypes: true,
  })) {
    const path = `${directory}/${entry.name}`;

    if (entry.isDirectory()) {
      if (!SKIP.has(entry.name)) found.push(...walk(path));
    } else if (entry.name.endsWith(".mdx")) {
      found.push(path);
    }
  }

  return found;
}

/**
 * A page's title, the imports its body needs, and the element it renders — or
 * the reason it could not be read, for anything that is not a page of that
 * shape. Reported rather than passed over in silence: a page with no story is a
 * page Chromatic goes back to ignoring.
 */
function parse(path) {
  const source = readFileSync(resolve(ROOT, path), "utf-8");

  const meta = META_ELEMENT.exec(source);
  const title = meta && META_TITLE.exec(meta[0]);
  if (!title) return { reason: "no <Meta title> found" };

  const lines = source
    .replace(meta[0], "")
    .split("\n")
    .filter((line) => !META_IMPORT.test(line));

  const imports = lines
    .filter((line) => line.startsWith("import "))
    .map((line) => rewriteImport(line, path));
  const body = lines
    .filter((line) => !line.startsWith("import "))
    .join("\n")
    .trim();

  // Prose and doc blocks are the docs renderer's, not a story's. Every page is
  // a single <SdsDoc /> today; one that is not needs a hand-written story.
  if (!body.startsWith("<") || !body.endsWith(">")) {
    return { reason: "body is not a single element" };
  }

  return { body, imports, title: title[1] ?? title[2] };
}

/** Re-point a page-relative import at the page, from the generated file. */
function rewriteImport(line, path) {
  return line.replace(IMPORT_SOURCE, (match, from, quote, specifier) => {
    const [target, query] = specifier.split("?");
    const resolved = relative(OUT_DIR, resolve(ROOT, dirname(path), target));

    return `${from}${quote}${resolved}${query ? `?${query}` : ""}${quote}`;
  });
}

/** A page's title as a filename: "Components/Table/TableRow" is one word. */
function filename(title) {
  return `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}.stories.tsx`;
}

function story({ body, imports, path, title }) {
  return `/**
 * Generated from ${path} by docs-kit/scripts/generate-doc-snapshots.mjs.
 * Edit the page, not this file.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SdsDocSnapshot } from "../SdsDocSnapshot";
${imports.join("\n")}

const meta: Meta = {
  parameters: {
    /**
     * The page is documentation the accessibility suite reaches through the
     * real thing, and the components in it through their own stories. Both
     * switches are needed, one per suite: addon-a11y reads the first, and
     * axe-storybook-testing reads the second.
     */
    a11y: { test: "off" },
    axe: { skip: true },
    layout: "fullscreen",
  },
  tags: ["!autodocs", "!dev", "!test"],
  title: "${SECTION}/${title}",
};

export default meta;

export const Page: StoryObj = {
  render: () => (
    <SdsDocSnapshot>
${body
  .split("\n")
  .map((line) => (line ? `      ${line}` : line))
  .join("\n")}
    </SdsDocSnapshot>
  ),
};
`;
}

const pages = SEARCH.flatMap(walk).filter((path) =>
  PAGES.some((pattern) => pattern.test(path))
);

rmSync(OUT_DIR, { force: true, recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const skipped = [];
const omitted = [];
const taken = new Map();

for (const path of pages.sort()) {
  const page = parse(path);

  if (!page.title) {
    skipped.push(`${path} (${page.reason})`);
    continue;
  }

  if (TOO_TALL.has(page.title)) {
    omitted.push(page.title);
    continue;
  }

  const file = filename(page.title);
  const owner = taken.get(file);

  // Two titles that come down to the same name would leave one page writing
  // over the other's story, and the page written over silently unsnapshotted.
  if (owner) {
    skipped.push(`${path} (its title is ${owner}'s once slugged)`);
    continue;
  }

  taken.set(file, path);
  writeFileSync(resolve(OUT_DIR, file), story({ ...page, path }));
}

const written = taken.size;

process.stdout.write(
  `Wrote ${written} documentation snapshot ${written === 1 ? "story" : "stories"} to docs-kit/generated` +
    (omitted.length > 0
      ? `, leaving out ${omitted.join(" and ")} as too tall for Chromatic to capture\n`
      : "\n")
);

if (skipped.length > 0) {
  process.stdout.write(
    `Warning: no snapshot story for ${skipped.join(", ")}. ` +
      "Chromatic will not see changes to those pages.\n"
  );
}
