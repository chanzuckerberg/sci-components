import {
  MolstarViewSettingsSubject,
  ThemeMode,
  themeForMode,
} from "../utils/theme";
import { useViewSetting } from "./useViewSetting";

export interface MolstarTheme {
  mode: ThemeMode;
  theme: ReturnType<typeof themeForMode>;
}

/**
 * The active theme for a component Mol* renders in its own React root.
 *
 * Those components sit outside the consumer's provider tree, so they cannot
 * read the theme from context; the mode reaches them through the settings
 * subject instead. Callers re-supply the theme to their subtree via a local
 * `ThemeProvider` so Emotion styles resolve SDS tokens correctly.
 */
export function useMolstarTheme(
  settings: MolstarViewSettingsSubject
): MolstarTheme {
  const mode = useViewSetting(settings, (s) => s.mode);

  return { mode, theme: themeForMode(mode) };
}
