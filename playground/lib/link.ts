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
 * A link that opens the playground with `source` loaded into the editor.
 *
 * The code goes in the fragment, which browsers never send upstream and
 * Storybook's router leaves alone — it reads only the query string.
 *
 * A dark `theme` is passed on as Storybook's own globals parameter rather than
 * one of ours, so that the playground opens in the mode the reader was already
 * in without either side needing to know about the other.
 */
export function buildPlaygroundHref(source: string, theme?: string): string {
  const url = previewUrl();
  url.searchParams.set("id", PLAYGROUND_STORY_ID);
  url.searchParams.set("viewMode", "story");
  if (theme === "dark") url.searchParams.set("globals", "theme:dark");
  url.hash = `${CODE_KEY}=${compressCode(source)}`;

  return url.toString();
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
