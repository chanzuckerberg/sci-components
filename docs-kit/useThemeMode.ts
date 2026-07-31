import { useEffect, useState } from "react";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { addons } from "storybook/preview-api";

export type ThemeMode = "light" | "dark";

/**
 * Storybook's toolbar theme, as seen from a docs page. Decorators (and their
 * globals) only wrap stories, so the SDS theme provider from
 * `.storybook/preview.jsx` never reaches MDX docs content; we read the global
 * ourselves and provide the theme around the SDS components we render there.
 */
export function useThemeMode(): ThemeMode {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const globals = new URLSearchParams(window.location.search).get("globals");
    return /(?:^|;)theme:dark(?:;|$)/.test(globals ?? "") ? "dark" : "light";
  });

  useEffect(() => {
    const channel = addons.getChannel();
    const onGlobalsUpdated = ({
      globals,
    }: {
      globals?: { theme?: string };
    }): void => {
      if (globals?.theme) setMode(globals.theme === "dark" ? "dark" : "light");
    };

    channel.on(GLOBALS_UPDATED, onGlobalsUpdated);
    return () => channel.off(GLOBALS_UPDATED, onGlobalsUpdated);
  }, []);

  return mode;
}
