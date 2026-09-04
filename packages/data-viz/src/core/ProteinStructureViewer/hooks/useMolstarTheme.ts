import { useState } from "react";
import { ThemeMode, ThemeModeSubject, themeForMode } from "../utils/theme";
import { useSubscribe } from "./useSubscribe";

export interface MolstarTheme {
  mode: ThemeMode;
  theme: ReturnType<typeof themeForMode>;
}

/**
 * The active theme for a component Mol* renders in its own React root.
 *
 * Those components sit outside the consumer's provider tree, so they cannot
 * read the theme from context. The mode is pushed to them through `themeMode`
 * instead, and watched rather than read once so a theme change after the plugin
 * was created still lands. Callers re-supply the theme to their subtree via a
 * local `ThemeProvider` so Emotion styles resolve SDS tokens correctly.
 */
export function useMolstarTheme(themeMode: ThemeModeSubject): MolstarTheme {
  const [mode, setMode] = useState(themeMode.value);

  // A BehaviorSubject replays its current value on subscribe, so the mode is
  // still correct if it changed between the first render and this effect.
  // React's own equality bailout absorbs the replay when it did not.
  useSubscribe(themeMode, setMode);

  return { mode, theme: themeForMode(mode) };
}
