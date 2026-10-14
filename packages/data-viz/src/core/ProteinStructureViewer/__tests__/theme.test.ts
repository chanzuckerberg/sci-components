import { getSemanticColors } from "@czi-sds/components";
import { residueColorsForMode, themeForMode } from "../utils/theme";

describe("themeForMode", () => {
  it("builds a theme for the requested mode", () => {
    expect(themeForMode("light").palette.mode).toBe("light");
    expect(themeForMode("dark").palette.mode).toBe("dark");
  });

  it("reuses the theme for a mode rather than rebuilding it", () => {
    // Mol*'s view components rebuild their ThemeProvider on every render.
    expect(themeForMode("dark")).toBe(themeForMode("dark"));
  });
});

describe("residueColorsForMode", () => {
  it("returns a color for every residue state", () => {
    const colors = residueColorsForMode("light");

    expect(colors.activeText).toBeTruthy();
    expect(colors.activeBackground).toBeTruthy();
    expect(colors.defaultText).toBeTruthy();
    expect(colors.inactiveText).toBeTruthy();
  });

  it("resolves the colors from the theme, not from CSS custom properties", () => {
    // The --sds-color-semantic-* properties are published under
    // `@media (prefers-color-scheme)`, so reading them would track the
    // operating system rather than the theme the consumer supplied. These have
    // to come from the theme object itself.
    for (const mode of ["light", "dark"] as const) {
      const base = getSemanticColors({ theme: themeForMode(mode) })?.base;
      const colors = residueColorsForMode(mode);

      expect(colors.activeText).toBe(base?.textPrimary);
      expect(colors.activeBackground).toBe(base?.fillSecondaryInteraction);
      expect(colors.defaultText).toBe(base?.textSecondary);
      expect(colors.inactiveText).toBe(base?.textTertiary);
    }
  });

  it("gives light and dark genuinely different colors", () => {
    const light = residueColorsForMode("light");
    const dark = residueColorsForMode("dark");

    expect(light.activeText).not.toBe(dark.activeText);
    expect(light.defaultText).not.toBe(dark.defaultText);
  });

  it("does not contain unresolved var() references", () => {
    for (const mode of ["light", "dark"] as const) {
      for (const color of Object.values(residueColorsForMode(mode))) {
        expect(color).not.toContain("var(");
      }
    }
  });
});
