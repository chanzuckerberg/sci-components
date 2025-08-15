import { PaletteMode } from "@mui/material";
import { AppTheme, Colors } from "./types";
import { generateTypographyTheme } from "./generators/typography-generator";
import { createAppThemeBorders } from "./generators/borders-generator";
import { Corners } from "./constants/corners";
import { FontWeight } from "./constants/typography";
import { IconSizes } from "./constants/iconSizes";
import { Shadows } from "./constants/shadows";
import { Spaces } from "./constants/spaces";
import { SDSDarkThemeColors, SDSLightThemeColors } from "./constants/colors";

const fontFamily = '"Inter", sans-serif';
const fontFamilyCode = '"IBM Plex Mono", monospace';
const tabularNums = "tabular-nums";

export { SDSDarkThemeColors, SDSLightThemeColors };

/**
 * Base app theme for properties shared between light and dark mode. Generally, if a theme
 * property doesn't deal with colors it belongs here, otherwise it'll have its specific
 * theme variant defined in `lightAppTheme` or `darkAppTheme`.
 *
 * `colors` and `mode` are omitted because they must be defined by the `lightAppTheme` and
 * `darkAppTheme` objects before use in the `makeThemeOptions` function.
 */
const sharedAppTheme: Omit<AppTheme, "colors" | "mode"> = {
  corners: Corners,
  fontWeights: FontWeight,
  iconSizes: IconSizes,
  shadows: Shadows,
  spacing: Spaces,
  typography: generateTypographyTheme(fontFamily, fontFamilyCode, tabularNums),
};

/**
 * Create a SDS App Theme with custom colors that follows the SDS color model.
 */
export const makeSdsSemanticAppTheme = (
  colors: Colors,
  isDarkTheme = false
): AppTheme => ({
  ...sharedAppTheme,
  borders: createAppThemeBorders(colors, isDarkTheme),
  colors,
});

export const SDSLightAppTheme: AppTheme =
  makeSdsSemanticAppTheme(SDSLightThemeColors);

export const SDSDarkAppTheme: AppTheme = makeSdsSemanticAppTheme(
  SDSDarkThemeColors,
  true
);

/**
 * Helper function to select the appropriate theme settings.
 *
 * @param theme The theme to choose from. Currently supports a light and dark variant.
 * @returns The appropriate app theme for the variant.
 */
export const SDSChooseTheme = (theme: PaletteMode): AppTheme => {
  if (theme === "dark") {
    return SDSDarkAppTheme;
  }
  return SDSLightAppTheme;
};

/**
 * (masoudmanson): This is to make sure that the old defaultAppTheme
 * export is still available for backward compatibility.
 *
 * @deprecated
 * Please use `SDSAppTheme` instead. This export will be removed in the future.
 */
export const defaultAppTheme = SDSLightAppTheme;
