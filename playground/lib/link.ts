import { compressCode, decompressCode } from "./compress";

/**
 * The playground is a Storybook story rather than a page of its own, and these
 * two ids are how the rest of the docs address it. The story file pins its meta
 * `id` to the first, which is what keeps the second from drifting when the
 * title or the export is renamed.
 */
export const PLAYGROUND_META_ID = "playground";
export const PLAYGROUND_STORY_ID = `${PLAYGROUND_META_ID}--${PLAYGROUND_META_ID}`;

/** Fragment key the source rides in, both here and on the Astryx playground. */
const CODE_KEY = "code";

/**
 * Query key for the inset the example is given, which is the docs pages'
 * `data-example-padding` under another name.
 *
 * It travels in the query string rather than the fragment because the fragment
 * is rewritten on every edit, and because it is a setting rather than content:
 * the same place Storybook's own `viewMode` and `globals` are read from.
 */
const PADDING_KEY = "padding";

/**
 * How much room the playground leaves around an example. Page-width components
 * such as a navigation header are documented without any, and a link built from
 * one of those examples opens the playground the same way.
 */
export type PlaygroundPadding = "default" | "none";

export interface PlaygroundLinkOptions {
  padding?: PlaygroundPadding;
  /**
   * The mode the reader is in, passed on as Storybook's own globals parameter
   * rather than one of ours, so that the playground opens in it without either
   * side needing to know about the other.
   */
  theme?: string;
}

/**
 * The preview document, resolved from wherever the caller happens to be.
 *
 * Docs pages and the playground are both served from Storybook's `iframe.html`,
 * so this holds whether the link is built from a docs page (already at that
 * path), from the manager (a directory URL beside it), or from a site served
 * under a subpath, as the GitHub Pages deploy is.
 */
function previewUrl(): URL {
  return new URL("iframe.html", window.location.href);
}

/**
 * The page the documentation opens on. Storybook derives the id from the title
 * of `design-docs/pages/Overview/index.mdx`, which a test in
 * `__tests__/link.test.ts` holds this to.
 */
export const STORYBOOK_HOME_ID = "overview--docs";

/**
 * The way out of the playground and back into the docs.
 *
 * Storybook is the directory `iframe.html` is served out of, resolved the same
 * way and for the same reasons as the preview above. The page is named rather
 * than left to Storybook, so that the way back does not follow the sidebar's
 * first entry wherever it happens to move to.
 */
export function storybookHref(): string {
  const url = new URL("./", window.location.href);
  url.searchParams.set("path", `/docs/${STORYBOOK_HOME_ID}`);

  return url.toString();
}

/**
 * A link that opens the playground with `source` loaded into the editor, shown
 * the way the page it came from shows it.
 *
 * The code goes in the fragment, which browsers never send upstream and
 * Storybook's router leaves alone — it reads only the query string.
 */
export function buildPlaygroundHref(
  source: string,
  { padding = "default", theme }: PlaygroundLinkOptions = {}
): string {
  const url = previewUrl();
  url.searchParams.set("id", PLAYGROUND_STORY_ID);
  url.searchParams.set("viewMode", "story");
  if (theme === "dark") url.searchParams.set("globals", "theme:dark");
  if (padding !== "default") url.searchParams.set(PADDING_KEY, padding);
  url.hash = `${CODE_KEY}=${compressCode(source)}`;

  return url.toString();
}

/** The inset a playground link asks for, or the default for a bare visit. */
export function readPaddingFromSearch(search: string): PlaygroundPadding {
  return new URLSearchParams(search).get(PADDING_KEY) === "none"
    ? "none"
    : "default";
}

/** The source a playground link carries, or `null` for a bare visit. */
export function readCodeFromHash(hash: string): string | null {
  const match = new RegExp(`(?:^|[#&])${CODE_KEY}=([^&]+)`).exec(hash);
  return match ? decompressCode(match[1]) : null;
}

/**
 * Point the address bar at the code now in the editor, so that copying the URL
 * shares what is on screen. Replaces rather than pushes: every keystroke would
 * otherwise become a history entry the back button has to walk out of.
 */
export function writeCodeToHash(code: string): void {
  const hash = `#${CODE_KEY}=${compressCode(code)}`;
  if (hash === window.location.hash) return;

  window.history.replaceState(null, "", `${window.location.search}${hash}`);
}
