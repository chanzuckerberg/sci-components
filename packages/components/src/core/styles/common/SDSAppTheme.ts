import { PaletteMode } from "@mui/material";
import { AppTheme, Colors } from "./types";
import { generateTypographyTheme } from "./typography-generator";
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

// (mlila) whenever our theme uses colors, we need to make sure we allow consuming
// applications to override those colors using their own custom theme.
// By defining borders using SDSAppTheme.colors instead of defaultThemeColors,
// we allow other apps to specify their colors once, and have them apply
// throughout the application, such as in borders, etc without having to manually
// override every theme property that makes use of colors.
//
// (masoudmanson): We need to define borders separately for light and dark themes
// because the border colors are different for each theme.
const BorderThickness = {
  default: 1,
  extraThick: 4,
  thick: 2,
} as const;

export const createAppThemeBorders = (colors: Colors, isDarkMode: boolean) => {
  const createSolidBorder = (
    color: keyof Colors,
    level: keyof Colors[keyof Colors],
    thickness: keyof typeof BorderThickness
  ) => `${BorderThickness[thickness]}px solid ${colors[color][level]}`;

  const createDashedBorder = () => `1px dashed`;

  return {
    accent: {
      default: createSolidBorder("blue", isDarkMode ? 600 : 500, "default"),
      focused: createSolidBorder("blue", isDarkMode ? 600 : 500, "default"),
      hover: createSolidBorder("blue", isDarkMode ? 700 : 600, "default"),
      open: createSolidBorder("blue", isDarkMode ? 600 : 500, "default"),
      pressed: createSolidBorder("blue", isDarkMode ? 800 : 700, "default"),
      selected: createSolidBorder("blue", isDarkMode ? 600 : 500, "default"),
    },
    base: {
      default: createSolidBorder("gray", 500, "default"),
      disabled: createSolidBorder("gray", 300, "default"),
      divider: createSolidBorder("gray", 200, "default"),
      dividerInverse: createSolidBorder("gray", 600, "default"),
      hover: createSolidBorder("gray", 900, "default"),
      inverse: createSolidBorder("gray", 50, "default"),
      pressed: createSolidBorder("gray", 900, "default"),
      table: createSolidBorder("gray", 300, "default"),
    },
    beta: {
      default: createSolidBorder("purple", 600, "default"),
      extraThick: createSolidBorder("purple", 600, "extraThick"),
      thick: createSolidBorder("purple", 600, "thick"),
    },
    info: {
      default: createSolidBorder("blue", 600, "default"),
      extraThick: createSolidBorder("blue", 600, "extraThick"),
      thick: createSolidBorder("blue", 600, "thick"),
    },
    link: {
      dashed: createDashedBorder(),
      solid: createSolidBorder("blue", 500, "default"),
    },
    negative: {
      default: createSolidBorder("red", 600, "default"),
      extraThick: createSolidBorder("red", 600, "extraThick"),
      thick: createSolidBorder("red", 600, "thick"),
    },
    neutral: {
      default: createSolidBorder("gray", 500, "default"),
      extraThick: createSolidBorder("gray", 500, "extraThick"),
      thick: createSolidBorder("gray", 500, "thick"),
    },
    none: "none",
    notice: {
      default: createSolidBorder("yellow", 600, "default"),
      extraThick: createSolidBorder("yellow", 600, "extraThick"),
      thick: createSolidBorder("yellow", 600, "thick"),
    },
    positive: {
      default: createSolidBorder("green", 600, "default"),
      extraThick: createSolidBorder("green", 600, "extraThick"),
      thick: createSolidBorder("green", 600, "thick"),
    },
  };
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
