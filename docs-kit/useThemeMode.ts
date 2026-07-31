import { useSyncExternalStore } from "react";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { addons } from "storybook/preview-api";

export type ThemeMode = "light" | "dark";

/**
 * Storybook rewrites the preview's own URL when the toolbar first leaves the
 * default theme, but never clears the parameter on the way back, so
 * `?globals=theme:dark` outlives the switch to light. It is only trustworthy on
 * a fresh load of the preview, which is the one moment nothing else can be
 * asked.
 */
function modeFromUrl(): ThemeMode {
  const globals = new URLSearchParams(window.location.search).get("globals");
  return /(?:^|;)theme:dark(?:;|$)/.test(globals ?? "") ? "dark" : "light";
}

/**
 * The toolbar's theme, held for the whole preview rather than per component.
 *
 * Storybook re-renders a docs page from scratch on every globals change, so a
 * mode kept in component state is thrown away by the very update that set it
 * and re-seeded from the stale URL above. Keeping it here outlives those
 * remounts: the subscription below is made once and never torn down, so the
 * value a page reads on mount is the one the toolbar last sent.
 */
let mode: ThemeMode = modeFromUrl();
const listeners = new Set<() => void>();
let listening = false;

function subscribe(onStoreChange: () => void): () => void {
  if (!listening) {
    listening = true;
    addons
      .getChannel()
      .on(GLOBALS_UPDATED, ({ globals }: { globals?: { theme?: string } }) => {
        if (!globals?.theme) return;

        const next: ThemeMode = globals.theme === "dark" ? "dark" : "light";
        if (next === mode) return;

        mode = next;
        listeners.forEach((listener) => listener());
      });
  }

  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

/**
 * Storybook's toolbar theme, as seen from a docs page. Decorators (and their
 * globals) only wrap stories, so the SDS theme provider from
 * `.storybook/preview.jsx` never reaches MDX docs content; we read the global
 * ourselves and provide the theme around the SDS components we render there.
 */
export function useThemeMode(): ThemeMode {
  return useSyncExternalStore(
    subscribe,
    () => mode,
    () => mode
  );
}
