import { Theme, getSemanticColors } from "@czi-sds/components";
import { BehaviorSubject } from "rxjs";

export type ThemeMode = "light" | "dark";

/**
 * Carries the active theme mode into the components Mol* renders in its own
 * React root. They sit outside the consumer's provider tree, so they cannot
 * read the theme from context and instead watch this for changes.
 */
export type ThemeModeSubject = BehaviorSubject<ThemeMode>;

type SdsTheme = ReturnType<typeof Theme>;

const themeCache = new Map<ThemeMode, SdsTheme>();

/**
 * The MUI theme for a mode, built at most once. Mol*'s view components rebuild
 * their `ThemeProvider` on every render, and `Theme()` is not cheap.
 */
export function themeForMode(mode: ThemeMode): SdsTheme {
  const cached = themeCache.get(mode);
  if (cached) return cached;

  const theme = Theme(mode);
  themeCache.set(mode, theme);

  return theme;
}

/**
 * Colors applied directly to residue spans in the sequence panel.
 *
 * These cannot go through Emotion: `updateMarker` writes them straight to the
 * DOM on every hover to avoid re-rendering a grid that can hold thousands of
 * nodes. They are resolved from the theme rather than from the
 * `--sds-color-semantic-*` custom properties, because those are published under
 * `@media (prefers-color-scheme)` and so track the operating system rather than
 * the theme the consumer supplied.
 */
export interface ResidueColors {
  /** Hovered, selected, or focused residue. */
  activeText: string;
  activeBackground: string;
  /** Residue with nothing selected anywhere. */
  defaultText: string;
  /** Non-active residue while some other residue is selected. */
  inactiveText: string;
}

const residueColorCache = new Map<ThemeMode, ResidueColors>();

export function residueColorsForMode(mode: ThemeMode): ResidueColors {
  const cached = residueColorCache.get(mode);
  if (cached) return cached;

  const base = getSemanticColors({ theme: themeForMode(mode) })?.base;
  const colors: ResidueColors = {
    activeBackground: base?.fillSecondaryInteraction ?? "transparent",
    activeText: base?.textPrimary ?? "inherit",
    defaultText: base?.textSecondary ?? "inherit",
    inactiveText: base?.textTertiary ?? "inherit",
  };
  residueColorCache.set(mode, colors);

  return colors;
}
