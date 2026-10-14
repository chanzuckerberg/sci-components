import { Theme, type SDSTheme } from "@components/src/core/styles";
import type { ThemeMode } from "./useThemeMode";

/**
 * The SDS theme, with the previews' one departure from how a component behaves
 * in an app: Popper portals its overlay into the surface the example runs on,
 * rather than to the end of `<body>`.
 *
 * A menu at the end of the document belongs to no preview in particular: there
 * is nothing to say which frame it came out of, and nothing that reaches it.
 * Sending it to the surface makes it the preview's — measurable along with the
 * example, inside the stylesheet scoped to it, and on the same themed
 * background. Components read this from the theme, so the examples stay as they
 * would be written in an app.
 *
 * Whether a menu may then stand outside the frame is the frame's own business,
 * and the two callers answer differently: a documentation preview lets it, so
 * that a menu covers the page under it as it would anywhere else, and a
 * playground device holds it to the screen it is pretending to be.
 *
 * `container` and not `disablePortal`: MUI renders an overlay it does not
 * portal as a sibling of whatever opened it, which is fine in a `<div>` and
 * invalid anywhere a parent accepts only particular children. A tooltip on a
 * table header cell left a `<div>` in the `<tr>`, where the browser gave it a
 * cell of its own: the table took on another column gap in width, and the
 * header row grew, for as long as the tooltip was up. Portaling reaches the
 * same surface without disturbing the example's own markup.
 *
 * The surface is the containing block either way, so an overlay is placed
 * against the same box as before.
 *
 * Without a surface to portal into there is nothing to hold an overlay but the
 * document, so it stays where it is written.
 *
 * Shared by the docs previews and the playground, which have the same problem
 * for the same reason: both frame a running example inside a page of their own.
 */
export function previewTheme(
  mode: ThemeMode,
  overlayContainer?: HTMLElement | null
): SDSTheme {
  const base = Theme(mode);

  return {
    ...base,
    components: {
      ...base.components,
      MuiPopper: {
        ...base.components?.MuiPopper,
        defaultProps: {
          ...base.components?.MuiPopper?.defaultProps,
          ...(overlayContainer
            ? { container: overlayContainer }
            : { disablePortal: true }),
        },
      },
    },
  };
}
