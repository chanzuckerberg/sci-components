/**
 * ONE-TIME MIGRATION SCRIPT.
 *
 * Imports the SDS ZeroHeight styleguide into Storybook as standalone MDX docs
 * pages under a top-level "Documentation" section, downloading all images
 * locally so the output is fully self-contained. ZeroHeight is being
 * decommissioned, so this is not part of an ongoing sync: once ZeroHeight is
 * gone the generated content in `zeroheight-docs/` (which is committed) becomes
 * the canonical source and should be edited directly. This script is retained
 * only for provenance.
 *
 * Re-running it is no longer safe without manual reconciliation: the "Code" half
 * of each page has since been split out per component into
 * `packages/components/src/core/<Component>/__storybook__/docs/` (see
 * `scripts/split-code-docs.ts`), and a re-import would restore it here.
 */
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as prettier from "prettier";
import { getZeroheightConfig } from "./zeroheight-config.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// packages/mcp/scripts -> repo root
const REPO_ROOT = path.resolve(dirname, "../../..");
const OUTPUT_DIR = path.join(REPO_ROOT, "zeroheight-docs");
const PAGES_DIR = path.join(OUTPUT_DIR, "pages");
const ASSETS_DIR = path.join(OUTPUT_DIR, "assets");
// Path (as served by Storybook `staticDirs`) where assets are mounted.
const ASSETS_PUBLIC_PATH = "/zeroheight-assets";
// Cache lives at the output-dir root (which, unlike `pages/`, is not wiped on
// each run). It is gitignored since it is a transient build cache.
const CACHE_FILE = path.join(OUTPUT_DIR, ".cache.json");

const BASE_URL = "https://zeroheight.com/open_api/v2";
const RATE_LIMIT_DELAY_MS = 500;

// Only import pages under these top-level ZeroHeight navigations (compared
// case-insensitively). The styleguide also contains `CZ ID`, `CZ GEN EPI`, and
// `napari hub + .org` navigations, which we intentionally exclude.
const INCLUDED_NAVIGATIONS = new Set(["sds"]);

interface ZeroheightTab {
  id?: string | number;
  uid?: string;
  name: string;
  order?: number;
  hidden?: boolean;
  content: string;
}

interface ZeroheightPage {
  id: number;
  uid: string;
  name: string;
  slug: string;
  url: string;
  hidden: boolean;
  locked: boolean;
  created_at: string;
  updated_at: string;
  introduction?: string;
  content?: string;
  tabs?: ZeroheightTab[];
}

interface ZeroheightPagesResponse {
  data: { pages: ZeroheightPage[] };
}

interface ZeroheightPageResponse {
  data: { page: ZeroheightPage };
}

interface TreeNode {
  id: number | string;
  type: "category" | "navigation" | "page" | "tab";
  name: string;
  uid?: string;
  hidden?: boolean;
  url?: string;
  children?: TreeNode[];
}

interface ZeroheightTreeResponse {
  data: { tree: TreeNode[] };
}

interface ZeroheightReleasesResponse {
  data: { releases?: Array<{ id: number | string }> };
}

/** Raw page (original remote image URLs) plus URL->local filename map. */
interface CachedRawPage {
  cachedAt: string;
  updatedAt: string;
  raw: Pick<
    ZeroheightPage,
    "name" | "introduction" | "content" | "tabs" | "uid"
  >;
  assetMap: Record<string, string>;
}

interface CacheData {
  lastFetch: string;
  pages: Record<number, CachedRawPage>;
}

const config = getZeroheightConfig();
const headers: Record<string, string> = {
  Accept: "application/json",
  "X-API-KEY": config.apiKey,
  "X-API-CLIENT": config.apiClient,
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

function sanitizeSegment(value: string): string {
  return value
    .replace(/[^a-zA-Z0-9\-_\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function loadCache(): CacheData {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cache = JSON.parse(
        fs.readFileSync(CACHE_FILE, "utf8")
      ) as CacheData;
      console.log(
        `✓ Loaded cache with ${Object.keys(cache.pages).length} pages (last fetch: ${cache.lastFetch})`
      );
      return cache;
    }
  } catch {
    console.warn("⚠️  Could not load cache, starting fresh");
  }
  return { lastFetch: "", pages: {} };
}

function saveCache(cache: CacheData): void {
  try {
    cache.lastFetch = new Date().toISOString();
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
    console.log(`✓ Saved cache with ${Object.keys(cache.pages).length} pages`);
  } catch (error) {
    console.warn("⚠️  Could not save cache:", error);
  }
}

/** `fetch` with an abort timeout so a stalled request can never hang the run. */
async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs = 30000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function apiGet<T>(url: string): Promise<T> {
  const response = await fetchWithTimeout(url, { method: "GET", headers });
  if (!response.ok) {
    throw new Error(
      `GET ${url} failed: ${response.status} ${response.statusText}`
    );
  }
  return (await response.json()) as T;
}

async function fetchLatestReleaseId(): Promise<string | undefined> {
  try {
    const data = await apiGet<ZeroheightReleasesResponse>(
      `${BASE_URL}/styleguides/${config.styleguideId}/releases`
    );
    const releases = data.data.releases ?? [];
    if (releases.length > 0) {
      return String(releases[0].id);
    }
  } catch (error) {
    console.warn(
      "⚠️  Could not fetch releases:",
      error instanceof Error ? error.message : error
    );
  }
  return undefined;
}

async function fetchTree(): Promise<TreeNode[] | null> {
  const attempt = async (releaseId?: string): Promise<TreeNode[]> => {
    const query = releaseId
      ? `?release_id=${encodeURIComponent(releaseId)}`
      : "";
    const data = await apiGet<ZeroheightTreeResponse>(
      `${BASE_URL}/styleguides/${config.styleguideId}/tree${query}`
    );
    return data.data.tree;
  };

  try {
    return await attempt();
  } catch {
    // The tree endpoint often requires a release_id; retry with the latest.
    const releaseId = await fetchLatestReleaseId();
    if (releaseId) {
      try {
        return await attempt(releaseId);
      } catch (error) {
        console.warn(
          "⚠️  Could not fetch styleguide tree, falling back to flat structure:",
          error instanceof Error ? error.message : error
        );
      }
    }
  }
  return null;
}

/**
 * Walk the styleguide tree and build a map of `pageId -> [category, ...]`
 * describing the sidebar path for each page. Only pages under an allowlisted
 * top-level navigation (see `INCLUDED_NAVIGATIONS`) are recorded; `navigation`
 * nodes are otherwise transparent (name dropped, children kept). Hidden nodes
 * are skipped. Pages absent from the returned map are excluded from the import.
 */
function buildPagePaths(tree: TreeNode[]): Map<number, string[]> {
  const paths = new Map<number, string[]>();

  const walkNode = (
    node: TreeNode,
    trail: string[],
    included: boolean
  ): void => {
    if (node.hidden) return;

    if (node.type === "page") {
      if (included) paths.set(Number(node.id), trail);
      return;
    }
    if (!node.children) return;

    if (node.type === "navigation") {
      // Enter (or stay within) an allowlisted navigation subtree.
      const nowIncluded =
        included ||
        INCLUDED_NAVIGATIONS.has((node.name ?? "").trim().toLowerCase());
      walkNodes(node.children, trail, nowIncluded);
      return;
    }

    // category (or any other container): only extend the trail when included.
    const nextTrail = included && node.name ? [...trail, node.name] : trail;
    walkNodes(node.children, nextTrail, included);
  };

  const walkNodes = (
    nodes: TreeNode[],
    trail: string[],
    included: boolean
  ): void => {
    for (const node of nodes) walkNode(node, trail, included);
  };

  walkNodes(tree, [], false);
  return paths;
}

async function fetchPages(): Promise<ZeroheightPage[]> {
  const data = await apiGet<ZeroheightPagesResponse>(
    `${BASE_URL}/styleguides/${config.styleguideId}/pages`
  );
  return data.data.pages;
}

async function fetchPageHtml(pageId: number): Promise<ZeroheightPage> {
  const data = await apiGet<ZeroheightPageResponse>(
    `${BASE_URL}/pages/${pageId}?format=html`
  );
  return data.data.page;
}

/** Decode the handful of HTML entities that appear in ZeroHeight image URLs. */
function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#38;/g, "&")
    .replace(/&#x26;/gi, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * ZeroHeight returns each HTML field wrapped in a full document
 * (`<!DOCTYPE html><html><body>...</body></html>`). Extract just the body's
 * inner HTML so combined fragments render cleanly inside a single container.
 */
function unwrapHtmlDocument(html: string): string {
  const withoutDoctype = html.replace(/<!DOCTYPE[^>]*>/gi, "");
  const bodyMatch = withoutDoctype.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) return bodyMatch[1].trim();
  return withoutDoctype.replace(/<\/?html[^>]*>/gi, "").trim();
}

/** Collect the raw `src` values (as they appear in the HTML) of every image. */
function extractImageUrls(html: string): string[] {
  const urls = new Set<string>();
  const regex = /<img\b[^>]*?\bsrc\s*=\s*["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const url = match[1].trim();
    if (url && /^https?:\/\//i.test(url)) urls.add(url);
  }
  return [...urls];
}

function extensionForUrl(url: string, contentType?: string | null): string {
  const fromType: Record<string, string> = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "image/avif": ".avif",
  };
  if (contentType && fromType[contentType.split(";")[0].trim()]) {
    return fromType[contentType.split(";")[0].trim()];
  }
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname);
    if (ext && ext.length <= 6) return ext.toLowerCase();
  } catch {
    /* ignore */
  }
  return ".png";
}

/** Stable filename hash based on the S3 object path only (ignores the signed
 * query string, which changes on every export) so images de-duplicate and keep
 * the same name across runs. */
function assetHash(decodedUrl: string): string {
  let key = decodedUrl;
  try {
    const parsed = new URL(decodedUrl);
    key = parsed.origin + parsed.pathname;
  } catch {
    /* fall back to the full URL */
  }
  return crypto.createHash("sha1").update(key).digest("hex").slice(0, 16);
}

/**
 * Download every image referenced in `html` into the persistent assets dir and
 * return a map of `rawSrc -> localFileName`, where `rawSrc` is the URL exactly
 * as it appears in the HTML (entity-encoded) so it can be string-replaced
 * later. Filenames are stable across runs (see `assetHash`).
 */
async function downloadImages(html: string): Promise<Record<string, string>> {
  const assetMap: Record<string, string> = {};
  const rawSrcs = extractImageUrls(html);

  for (const rawSrc of rawSrcs) {
    const fetchUrl = decodeHtmlEntities(rawSrc);
    const hash = assetHash(fetchUrl);
    try {
      const response = await fetchWithTimeout(fetchUrl);
      if (!response.ok) {
        console.warn(`  ⚠️  Image download failed (${response.status})`);
        continue;
      }
      const ext = extensionForUrl(
        fetchUrl,
        response.headers.get("content-type")
      );
      const fileName = `${hash}${ext}`;
      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(path.join(ASSETS_DIR, fileName), buffer);
      assetMap[rawSrc] = fileName;
    } catch (error) {
      console.warn(
        `  ⚠️  Image download error:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  return assetMap;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Rewrite remote image URLs to the locally-served asset path. */
function rewriteImageUrls(
  html: string,
  assetMap: Record<string, string>
): string {
  let result = html;
  for (const [url, fileName] of Object.entries(assetMap)) {
    result = result.replace(
      new RegExp(escapeRegExp(url), "g"),
      `${ASSETS_PUBLIC_PATH}/${fileName}`
    );
  }
  return result;
}

/** Combine introduction + content/tabs of a raw page into a single HTML blob. */
function buildPageHtml(raw: CachedRawPage["raw"]): string {
  const parts: string[] = [];
  if (raw.introduction?.trim()) {
    parts.push(unwrapHtmlDocument(raw.introduction));
  }

  if (raw.tabs && raw.tabs.length > 0) {
    raw.tabs
      .filter((tab) => !tab.hidden)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .forEach((tab) => {
        parts.push(`<h2>${tab.name}</h2>`);
        if (tab.content?.trim()) parts.push(unwrapHtmlDocument(tab.content));
      });
  } else if (raw.content?.trim()) {
    parts.push(unwrapHtmlDocument(raw.content));
  }

  return parts.filter(Boolean).join("\n");
}

function hasMeaningfulContent(raw: CachedRawPage["raw"]): boolean {
  const text = buildPageHtml(raw)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length >= 20;
}

function assetsExist(assetMap: Record<string, string>): boolean {
  return Object.values(assetMap).every((file) =>
    fs.existsSync(path.join(ASSETS_DIR, file))
  );
}

/**
 * ZeroHeight sometimes exposes the same section under different casing (e.g.
 * `GENES` and `Genes`). Storybook story IDs are case-insensitive, so collapse
 * each segment to the first-seen casing to avoid duplicate sidebar groups.
 */
function canonicalizeSegment(
  segment: string,
  canonical: Map<string, string>
): string {
  const key = segment.toLowerCase();
  const existing = canonical.get(key);
  if (existing) return existing;
  canonical.set(key, segment);
  return segment;
}

function mdxTitle(
  pathSegments: string[],
  pageName: string,
  canonical: Map<string, string>
): string {
  const segments = [...pathSegments, pageName]
    .map((segment) => segment.trim())
    .filter(Boolean)
    // Drop ZeroHeight's internal, "___"-prefixed grouping (e.g. `___cover`).
    .filter((segment) => !/^_{2,}/.test(segment))
    // MDX <Meta title> uses "/" as the hierarchy separator, so strip any
    // slashes that appear inside a single segment's name.
    .map((segment) => segment.replace(/\//g, " "))
    .map((segment) => canonicalizeSegment(segment, canonical));
  return ["Documentation", ...segments].join("/");
}

/** Approximate Storybook's (case-insensitive) story-id derivation. */
function normalizeId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const TABLE_RE = /<table\b[^>]*>[\s\S]*?<\/table>/gi;
const ROW_RE = /<tr\b[^>]*>[\s\S]*?<\/tr>/gi;
const CELL_RE = /<(td|th)\b[^>]*>[\s\S]*?<\/(?:td|th)>/gi;

/** A cell is "empty" if it has no text and no media (ZeroHeight spacer cell). */
function cellIsEmpty(cell: string): boolean {
  if (/<(img|svg|video|iframe|picture)\b/i.test(cell)) return false;
  const text = cell
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text === "";
}

/** Column indices that are empty in every row (ZeroHeight layout spacers). */
function findSpacerColumns(grid: string[][], colCount: number): Set<number> {
  const spacers = new Set<number>();
  for (let col = 0; col < colCount; col++) {
    let present = false;
    let allEmpty = true;
    for (const cells of grid) {
      if (col >= cells.length) continue;
      present = true;
      if (!cellIsEmpty(cells[col])) {
        allEmpty = false;
        break;
      }
    }
    if (present && allEmpty) spacers.add(col);
  }
  return spacers;
}

/** Rebuild a `<tr>` keeping only the given cells, preserving the row's tag. */
function rebuildRow(row: string, cells: string[]): string {
  const openTag = row.match(/^<tr\b[^>]*>/i)?.[0] ?? "<tr>";
  return `${openTag}${cells.join("")}</tr>`;
}

/**
 * Remove ZeroHeight's empty spacer columns (and fully-empty rows) from a single
 * table so it renders tightly. Safe because the export contains no nested
 * tables (verified) and spacer columns are empty across all rows.
 */
function tightenTable(table: string): string {
  const rows = table.match(ROW_RE);
  if (!rows || rows.length === 0) return table;

  const grid = rows.map((row) => row.match(CELL_RE) ?? []);
  const colCount = Math.max(0, ...grid.map((cells) => cells.length));
  const spacerCols = findSpacerColumns(grid, colCount);

  const newRows = grid
    .map((cells, i) => ({
      row: rows[i],
      cells: cells.filter((_, col) => !spacerCols.has(col)),
    }))
    .filter(({ cells }) => cells.length > 0 && !cells.every(cellIsEmpty))
    .map(({ row, cells }) => rebuildRow(row, cells));

  if (newRows.length === 0) return table;

  const firstStart = table.indexOf(rows[0]);
  const lastRow = rows[rows.length - 1];
  const lastEnd = table.lastIndexOf(lastRow) + lastRow.length;
  return table.slice(0, firstStart) + newRows.join("") + table.slice(lastEnd);
}

/** Tighten every table in the page HTML (strip spacer columns/rows). */
function tightenTables(html: string): string {
  return html.replace(TABLE_RE, tightenTable);
}

/**
 * Pretty-print the (minified) ZeroHeight HTML so the committed `content.html`
 * files are readable and easy to hand-edit. Whitespace changes are cosmetic
 * (the browser collapses them), so rendering is unaffected. Falls back to the
 * original string if Prettier can't parse it.
 */
async function formatHtml(html: string): Promise<string> {
  try {
    return await prettier.format(html, {
      parser: "html",
      printWidth: 100,
      htmlWhitespaceSensitivity: "ignore",
    });
  } catch {
    return html;
  }
}

async function writePage(
  slug: string,
  title: string,
  html: string
): Promise<void> {
  const pageDir = path.join(PAGES_DIR, slug);
  fs.mkdirSync(pageDir, { recursive: true });

  fs.writeFileSync(
    path.join(pageDir, "content.html"),
    await formatHtml(tightenTables(html)),
    "utf8"
  );

  const mdx = `import { Meta } from "@storybook/addon-docs/blocks";
import { SdsDoc } from "@sds-docs/SdsDoc";
import html from "./content.html?raw";

<Meta title=${JSON.stringify(title)} />

<SdsDoc html={html} />
`;
  fs.writeFileSync(path.join(pageDir, "index.mdx"), mdx, "utf8");
}

function writeLandingPage(titles: string[]): void {
  const list = titles
    .sort((a, b) => a.localeCompare(b))
    .map((title) => `- ${title.replace(/^Documentation\//, "")}`)
    .join("\n");

  const mdx = `import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Design Documentation/Overview" />

# Documentation

The SDS design guidelines, hosted directly in Storybook. These pages were
migrated (a one-time import) from the SDS ZeroHeight styleguide, which is being
decommissioned. They are now self-contained (all images are bundled locally) and
are the canonical source going forward: edit the \`.mdx\` / \`content.html\` files
under \`zeroheight-docs/pages/\` directly. Use the sidebar to browse.

These pages cover design guidance only. Implementation documentation for a
component — props, SDS vs MUI differences, and live code examples — lives with
the component itself, under its "Documentation" tab in the Components section.

## Pages

${list}
`;
  fs.writeFileSync(path.join(OUTPUT_DIR, "Documentation.mdx"), mdx, "utf8");
}

interface ImportStats {
  created: number;
  skipped: number;
  cacheHits: number;
  apiCalls: number;
}

/** Return the raw page entry for `page`, using the cache when still valid. */
async function loadPageEntry(
  page: ZeroheightPage,
  cache: CacheData,
  stats: ImportStats
): Promise<CachedRawPage> {
  const cached = cache.pages[page.id];
  const cacheValid =
    cached &&
    new Date(page.updated_at).getTime() <=
      new Date(cached.cachedAt).getTime() &&
    assetsExist(cached.assetMap);

  if (cacheValid) {
    console.log("  ↳ Using cached content");
    stats.cacheHits++;
    return cached;
  }

  console.log("  ↳ Fetching fresh HTML");
  stats.apiCalls++;
  const full = await fetchPageHtml(page.id);
  const assetMap = await downloadImages(buildPageHtml(full));
  const entry: CachedRawPage = {
    cachedAt: new Date().toISOString(),
    updatedAt: page.updated_at,
    raw: {
      name: full.name,
      uid: full.uid,
      introduction: full.introduction,
      content: full.content,
      tabs: full.tabs,
    },
    assetMap,
  };
  cache.pages[page.id] = entry;
  await sleep(RATE_LIMIT_DELAY_MS);
  return entry;
}

interface ProcessContext {
  cache: CacheData;
  pagePaths: Map<number, string[]>;
  canonicalSegments: Map<string, string>;
  usedSlugs: Set<string>;
  usedIds: Set<string>;
  seenContent: Set<string>;
  usedAssets: Set<string>;
  generatedTitles: string[];
  stats: ImportStats;
}

/**
 * Ensure a unique sidebar title by suffixing collisions with " (n)". Uniqueness
 * is checked against the normalized story id so case/punctuation-only variants
 * (which would collide in Storybook) are disambiguated too.
 */
function uniqueTitle(title: string, usedIds: Set<string>): string {
  let candidate = title;
  let counter = 1;
  while (usedIds.has(normalizeId(candidate))) {
    counter++;
    candidate = `${title} (${counter})`;
  }
  usedIds.add(normalizeId(candidate));
  return candidate;
}

async function processPage(
  page: ZeroheightPage,
  context: ProcessContext
): Promise<void> {
  const {
    cache,
    pagePaths,
    canonicalSegments,
    usedSlugs,
    usedIds,
    seenContent,
    usedAssets,
    generatedTitles,
    stats,
  } = context;
  console.log(`Processing: ${page.name} (ID: ${page.id})`);

  const entry = await loadPageEntry(page, cache, stats);

  if (!hasMeaningfulContent(entry.raw)) {
    console.log("  ↳ Skipped (minimal content)");
    stats.skipped++;
    return;
  }

  const html = rewriteImageUrls(buildPageHtml(entry.raw), entry.assetMap);

  // ZeroHeight exposes parallel/duplicate navigations, so skip pages whose
  // rendered content we've already imported (keeps the first occurrence).
  const contentKey = crypto.createHash("sha1").update(html).digest("hex");
  if (seenContent.has(contentKey)) {
    console.log("  ↳ Skipped (duplicate content)");
    stats.skipped++;
    return;
  }
  seenContent.add(contentKey);

  // Unique, filesystem-safe slug (directory name only; not user-visible).
  let slug = sanitizeSegment(page.name) || "page";
  if (usedSlugs.has(slug)) slug = `${slug}-${page.id}`;
  usedSlugs.add(slug);

  const title = uniqueTitle(
    mdxTitle(pagePaths.get(page.id) ?? [], page.name, canonicalSegments),
    usedIds
  );

  // Track the assets this (kept) page actually references so unused files
  // (e.g. left over from excluded navigations) can be pruned afterwards.
  for (const file of Object.values(entry.assetMap)) usedAssets.add(file);

  await writePage(slug, title, html);
  generatedTitles.push(title);
  stats.created++;
  console.log(`  ✓ ${title}`);
}

/** Delete asset files that no imported page references. */
function pruneUnusedAssets(usedAssets: Set<string>): number {
  let removed = 0;
  for (const file of fs.readdirSync(ASSETS_DIR)) {
    if (!usedAssets.has(file)) {
      fs.rmSync(path.join(ASSETS_DIR, file), { force: true });
      removed++;
    }
  }
  return removed;
}

async function run(): Promise<void> {
  console.log("Importing ZeroHeight docs into Storybook...\n");

  const cache = loadCache();

  // Reset the regenerated output but keep the persistent assets dir so that
  // images fetched from now-expired ZeroHeight URLs are not lost.
  fs.rmSync(PAGES_DIR, { recursive: true, force: true });
  fs.mkdirSync(PAGES_DIR, { recursive: true });
  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  console.log("Fetching styleguide tree...");
  const tree = await fetchTree();
  const pagePaths = tree ? buildPagePaths(tree) : new Map<number, string[]>();
  console.log(
    tree
      ? `✓ Built hierarchy for ${pagePaths.size} pages under [${[...INCLUDED_NAVIGATIONS].join(", ")}]`
      : "⚠️  No tree available; importing all pages with a flat structure"
  );

  console.log("\nFetching pages list...");
  const pages = await fetchPages();
  console.log(`Found ${pages.length} pages\n`);

  const canonicalSegments = new Map<string, string>();
  const usedSlugs = new Set<string>();
  const usedIds = new Set<string>();
  const seenContent = new Set<string>();
  const usedAssets = new Set<string>();
  const generatedTitles: string[] = [];
  const stats: ImportStats = {
    created: 0,
    skipped: 0,
    cacheHits: 0,
    apiCalls: 0,
  };

  for (const page of pages) {
    if (page.hidden) {
      console.log(`Skipping hidden page: ${page.name}`);
      continue;
    }
    // When the tree is available, only import pages that live under an
    // allowlisted navigation (e.g. SDS); everything else is excluded.
    if (tree && !pagePaths.has(page.id)) {
      stats.skipped++;
      continue;
    }
    try {
      await processPage(page, {
        cache,
        pagePaths,
        canonicalSegments,
        usedSlugs,
        usedIds,
        seenContent,
        usedAssets,
        generatedTitles,
        stats,
      });
    } catch (error) {
      console.error(
        `  ✗ Failed: ${page.name}:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  writeLandingPage(generatedTitles);
  const prunedAssets = pruneUnusedAssets(usedAssets);
  saveCache(cache);

  console.log("\n" + "=".repeat(50));
  console.log("Import Summary:");
  console.log(`📄 Pages created: ${stats.created}`);
  console.log(`⏭️  Skipped (minimal content): ${stats.skipped}`);
  console.log(
    `⚡ Cache hits: ${stats.cacheHits}, API calls: ${stats.apiCalls}`
  );
  console.log(
    `🖼️  Assets kept: ${usedAssets.size}, pruned (unused): ${prunedAssets}`
  );
  console.log(`📁 Output: ${OUTPUT_DIR}`);
}

if (import.meta.url === `file://${filename}`) {
  run().catch((error) => {
    console.error("Import failed:", error);
    process.exit(1);
  });
}
