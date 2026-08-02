import { Theme, type SDSTheme } from "@components/src/core/styles";
import type { ThemeMode } from "./useThemeMode";

/**
 * The SDS theme, with the previews' one departure from how a component behaves
 * in an app: Popper keeps its overlay in place instead of sending it through a
 * portal to the end of `<body>`.
 *
 * A portalled menu is positioned over the whole page and belongs to no preview
 * in particular, so it cannot be framed with the example that opened it and
 * lands on the prose below instead. Keeping it in place puts it inside the
 * surface, where it is bounded and can be measured. Components read this from
 * the theme, so the examples stay as they would be written in an app.
 *
 * Shared by the docs previews and the playground, which have the same problem
 * for the same reason: both frame a running example inside a page of their own.
 */
export function previewTheme(mode: ThemeMode): SDSTheme {
  const base = Theme(mode);

  return {
    ...base,
    components: {
      ...base.components,
      MuiPopper: {
        ...base.components?.MuiPopper,
        defaultProps: {
          ...base.components?.MuiPopper?.defaultProps,
          disablePortal: true,
        },
      },
    },
  };
}
