import { Theme, type SDSTheme } from "@components/src/core/styles";
import type { ThemeMode } from "./useThemeMode";

/**
 * The SDS theme, with the previews' one departure from how a component behaves
 * in an app: Popper portals its overlay into the surface the example runs on,
 * rather than to the end of `<body>`.
 *
 * A menu at the end of the document is positioned over the whole page and
 * belongs to no preview in particular, so it cannot be framed with the example
 * that opened it and lands on the prose below instead. Sending it to the
 * surface puts it inside the frame, where it is bounded and can be measured.
 * Components read this from the theme, so the examples stay as they would be
 * written in an app.
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
 * against the same box as before. What it is kept inside of is now the frame
 * rather than whatever the example happened to nest it in, which is the closer
 * of the two to an app, where it is the window.
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
