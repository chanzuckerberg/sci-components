import { PaletteMode } from "@mui/material";
import { AppTheme, Colors } from "./types";

const fontFamily = '"Inter", sans-serif';
const fontFamilyCode = '"IBM Plex Mono", monospace';
const tabularNums = "tabular-nums";

enum FontWeight {
  bold = 700,
  light = 300,
  medium = 500,
  regular = 400,
  semibold = 600,
}

const SDSLightThemeColors: Colors = {
  blue: {
    "100": "#e2eeff",
    "200": "#cce1ff",
    "300": "#9dc6ff",
    "400": "#6ca6ff",
    "500": "#1a6cef",
    "600": "#0041b9",
    "700": "#002d90",
    "800": "#00114a",
  },
  gray: {
    "100": "#f3f3f3",
    "200": "#dfdfdf",
    "300": "#c3c3c3",
    "400": "#a5a5a5",
    "50": "#ffffff",
    "500": "#969696",
    "600": "#6c6c6c",
    "700": "#3b3b3b",
    "75": "#fafafa",
    "800": "#1b1b1b",
    "900": "#000000",
  },
  green: {
    "100": "#daf4de",
    "200": "#b9ecc3",
    "300": "#7fd693",
    "400": "#50b96d",
    "500": "#238444",
    "600": "#105b2b",
    "700": "#07431d",
    "800": "#001f00",
  },
  purple: {
    "100": "#efeafe",
    "200": "#e4dbfc",
    "300": "#cbbaF8",
    "400": "#b296f2",
    "500": "#8b54e2",
    "600": "#6526b5",
    "700": "#490092",
    "800": "#26004c",
  },
  red: {
    "100": "#ffe8e6",
    "200": "#ffd6d2",
    "300": "#ffafa8",
    "400": "#ff7e78",
    "500": "#db2131",
    "600": "#980017",
    "700": "#6f0008",
    "800": "#340000",
  },
  yellow: {
    "100": "#fff3db",
    "200": "#ffdb97",
    "300": "#ffca5c",
    "400": "#fab700",
    "500": "#da9900",
    "600": "#b07300",
    "700": "#7c3e00",
    "800": "#541700",
  },
};

const SDSDarkThemeColors: Colors = {
  blue: {
    "100": "#0f1d4a",
    "200": "#0a216e",
    "300": "#0647b8",
    "400": "#2573f4",
    "500": "#5b9aff",
    "600": "#a2c9ff",
    "700": "#cde3ff",
    "800": "#e2eeff",
  },
  gray: {
    "100": "#333333",
    "200": "#494949",
    "300": "#696969",
    "400": "#9b9b9b",
    "50": "#000000",
    "500": "#aaaaaa",
    "600": "#cdcdcd",
    "700": "#ededed",
    "75": "#101010",
    "800": "#fafafa",
    "900": "#ffffff",
  },
  green: {
    "100": "#082608",
    "200": "#063617",
    "300": "#10632e",
    "400": "#278b48",
    "500": "#4bae68",
    "600": "#85d898",
    "700": "#bcecc5",
    "800": "#daf4de",
  },
  purple: {
    "100": "#331252",
    "200": "#410f70",
    "300": "#6429b2",
    "400": "#905de6",
    "500": "#aa89ef",
    "600": "#cebef8",
    "700": "#e4dcfc",
    "800": "#f0ebfe",
  },
  red: {
    "100": "#330603",
    "200": "#660a12",
    "300": "#9e1c1c",
    "400": "#c73028",
    "500": "#e05043",
    "600": "#ff988a",
    "700": "#ffbdb3",
    "800": "#ffd8d1",
  },
  yellow: {
    "100": "#361b07",
    "200": "#52270a",
    "300": "#965a0b",
    "400": "#bd8804",
    "500": "#d9a943",
    "600": "#e5bc63",
    "700": "#f5d789",
    "800": "#ffe6a8",
  },
};

/**
 * Base app theme for properties shared between light and dark mode. Generally, if a theme
 * property doesn't deal with colors it belongs here, otherwise it'll have its specific
 * theme variant defined in `lightAppTheme` or `darkAppTheme`.
 *
 * `colors` and `mode` are omitted because they must be defined by the `lightAppTheme` and
 * `darkAppTheme` objects before use in the `makeThemeOptions` function.
 */
const sharedAppTheme: Omit<AppTheme, "colors" | "mode"> = {
  corners: {
    l: 20,
    m: 4,
    none: 0,
    s: 2,
  },
  fontWeights: {
    bold: 700,
    light: 300,
    medium: 800,
    regular: 400,
    semibold: 600,
  },
  iconSizes: {
    // for use with input icons only (radio and checkbox)
    input: { height: 16, width: 16 },
    l: { height: 24, width: 24 },
    s: { height: 16, width: 16 },
    xl: { height: 32, width: 32 },
    xs: { height: 12, width: 12 },
  },
  shadows: {
    l: "0 2px 12px 0 rgba(0,0,0, 0.3)",
    m: "0 2px 4px 0 rgba(0,0,0, 0.15), 0 2px 10px 0 rgba(0,0,0, 0.15)",
    none: "none",
    s: "0 2px 4px 0 rgba(0,0,0, 0.25)",
  },
  spacing: {
    default: 12,
    l: 16,
    m: 12,
    s: 8,
    xl: 24,
    xs: 6,
    xxl: 40,
    xxs: 4,
    xxxs: 2,
  },
  typography: {
    fontFamily: {
      body: fontFamily,
      caps: fontFamily,
      code: fontFamilyCode,
      header: fontFamily,
      tabular: fontFamily,
    },
    narrowStyles: {
      body: {
        regular: {
          button: {
            fontSize: 13,
            fontWeight: FontWeight.regular,
            letterSpacing: "0.08px",
            lineHeight: "20px",
            textTransform: "none",
          },
          l: {
            fontSize: 16,
            fontWeight: FontWeight.regular,
            letterSpacing: "0px",
            lineHeight: "26px",
            textTransform: "none",
          },
          m: {
            fontSize: 14,
            fontWeight: FontWeight.regular,
            letterSpacing: "0px",
            lineHeight: "24px",
            textTransform: "none",
          },
          s: {
            fontSize: 14,
            fontWeight: FontWeight.regular,
            letterSpacing: "0.08px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontWeight: FontWeight.regular,
            letterSpacing: "0.08px",
            lineHeight: "20px",
            textTransform: "none",
          },
          xxs: {
            fontSize: 12,
            fontWeight: FontWeight.regular,
            letterSpacing: "0.1px",
            lineHeight: "18px",
            textTransform: "none",
          },
          xxxs: {
            fontSize: 12,
            fontWeight: FontWeight.regular,
            letterSpacing: "0.1px",
            lineHeight: "18px",
            textTransform: "none",
          },
        },
        semibold: {
          button: {
            fontSize: 13,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.08px",
            lineHeight: "20px",
            textTransform: "none",
          },
          l: {
            fontSize: 16,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "26px",
            textTransform: "none",
          },
          m: {
            fontSize: 14,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "24px",
            textTransform: "none",
          },
          s: {
            fontSize: 14,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.08px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.08px",
            lineHeight: "20px",
            textTransform: "none",
          },
          xxs: {
            fontSize: 12,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.1px",
            lineHeight: "18px",
            textTransform: "none",
          },
          xxxs: {
            fontSize: 12,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.1px",
            lineHeight: "18px",
            textTransform: "none",
          },
        },
      },
      caps: {
        semibold: {
          xxs: {
            fontSize: 12,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.5px",
            lineHeight: "18px",
            textTransform: "uppercase",
          },
          xxxs: {
            fontSize: 11,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.5px",
            lineHeight: "16px",
            textTransform: "uppercase",
          },
          xxxxs: {
            fontSize: 11,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.5px",
            lineHeight: "16px",
            textTransform: "uppercase",
          },
        },
      },
      code: {
        regular: {
          s: {
            fontSize: 14,
            fontWeight: FontWeight.regular,
            letterSpacing: "0px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontWeight: FontWeight.regular,
            letterSpacing: "0px",
            lineHeight: "20px",
            textTransform: "none",
          },
        },
        semibold: {
          s: {
            fontSize: 14,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "20px",
            textTransform: "none",
          },
        },
      },
      header: {
        semibold: {
          l: {
            fontSize: 16,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "22px",
            textTransform: "none",
          },
          m: {
            fontSize: 14,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "20px",
            textTransform: "none",
          },
          s: {
            fontSize: 14,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.08px",
            lineHeight: "20px",
            textTransform: "none",
          },
          xl: {
            fontSize: 18,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.08px",
            lineHeight: "18px",
            textTransform: "none",
          },
          xxl: {
            fontSize: 22,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "30px",
            textTransform: "none",
          },
          xxs: {
            fontSize: 12,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.1px",
            lineHeight: "18px",
            textTransform: "none",
          },
          xxxs: {
            fontSize: 12,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.1px",
            lineHeight: "18px",
            textTransform: "none",
          },
        },
      },
      tabular: {
        regular: {
          s: {
            fontSize: 14,
            fontVariantNumeric: tabularNums,
            fontWeight: FontWeight.regular,
            letterSpacing: "0px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontVariantNumeric: tabularNums,
            fontWeight: FontWeight.regular,
            letterSpacing: "0px",
            lineHeight: "20px",
            textTransform: "none",
          },
        },
        semibold: {
          s: {
            fontSize: 14,
            fontVariantNumeric: tabularNums,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontVariantNumeric: tabularNums,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "20px",
            textTransform: "none",
          },
        },
      },
    },
    wideStyles: {
      body: {
        regular: {
          button: {
            fontSize: 13,
            fontWeight: FontWeight.regular,
            letterSpacing: "0.08px",
            lineHeight: "20px",
            textTransform: "none",
          },
          l: {
            fontSize: 18,
            fontWeight: FontWeight.regular,
            letterSpacing: "0px",
            lineHeight: "28px",
            textTransform: "none",
          },
          m: {
            fontSize: 16,
            fontWeight: FontWeight.regular,
            letterSpacing: "0px",
            lineHeight: "26px",
            textTransform: "none",
          },
          s: {
            fontSize: 14,
            fontWeight: FontWeight.regular,
            letterSpacing: "0.08px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontWeight: FontWeight.regular,
            letterSpacing: "0.08px",
            lineHeight: "20px",
            textTransform: "none",
          },
          xxs: {
            fontSize: 12,
            fontWeight: FontWeight.regular,
            letterSpacing: "0.1px",
            lineHeight: "18px",
            textTransform: "none",
          },
          xxxs: {
            fontSize: 11,
            fontWeight: FontWeight.regular,
            letterSpacing: "0.1px",
            lineHeight: "16px",
            textTransform: "none",
          },
        },
        semibold: {
          button: {
            fontSize: 13,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.08px",
            lineHeight: "20px",
            textTransform: "none",
          },
          l: {
            fontSize: 18,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "28px",
            textTransform: "none",
          },
          m: {
            fontSize: 16,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "26px",
            textTransform: "none",
          },
          s: {
            fontSize: 14,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.08px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.08px",
            lineHeight: "20px",
            textTransform: "none",
          },
          xxs: {
            fontSize: 12,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.1px",
            lineHeight: "18px",
            textTransform: "none",
          },
          xxxs: {
            fontSize: 11,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.1px",
            lineHeight: "16px",
            textTransform: "none",
          },
        },
      },
      caps: {
        semibold: {
          xxs: {
            fontSize: 12,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.5px",
            lineHeight: "18px",
            textTransform: "uppercase",
          },
          xxxs: {
            fontSize: 11,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.5px",
            lineHeight: "16px",
            textTransform: "uppercase",
          },
          xxxxs: {
            fontSize: 10,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.5px",
            lineHeight: "14px",
            textTransform: "uppercase",
          },
        },
      },
      code: {
        regular: {
          s: {
            fontSize: 14,
            fontWeight: FontWeight.regular,
            letterSpacing: "0px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontWeight: FontWeight.regular,
            letterSpacing: "0px",
            lineHeight: "20px",
            textTransform: "none",
          },
        },
        semibold: {
          s: {
            fontSize: 14,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "20px",
            textTransform: "none",
          },
        },
      },
      header: {
        semibold: {
          l: {
            fontSize: 18,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "24px",
            textTransform: "none",
          },
          m: {
            fontSize: 16,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "22px",
            textTransform: "none",
          },
          s: {
            fontSize: 14,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.08px",
            lineHeight: "20px",
            textTransform: "none",
          },
          xl: {
            fontSize: 22,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "30px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.08px",
            lineHeight: "18px",
            textTransform: "none",
          },
          xxl: {
            fontSize: 26,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "34px",
            textTransform: "none",
          },
          xxs: {
            fontSize: 12,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.1px",
            lineHeight: "18px",
            textTransform: "none",
          },
          xxxs: {
            fontSize: 11,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0.1px",
            lineHeight: "16px",
            textTransform: "none",
          },
        },
      },
      tabular: {
        regular: {
          s: {
            fontSize: 14,
            fontVariantNumeric: tabularNums,
            fontWeight: FontWeight.regular,
            letterSpacing: "0px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontVariantNumeric: tabularNums,
            fontWeight: FontWeight.regular,
            letterSpacing: "0px",
            lineHeight: "20px",
            textTransform: "none",
          },
        },
        semibold: {
          s: {
            fontSize: 14,
            fontVariantNumeric: tabularNums,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "24px",
            textTransform: "none",
          },
          xs: {
            fontSize: 13,
            fontVariantNumeric: tabularNums,
            fontWeight: FontWeight.semibold,
            letterSpacing: "0px",
            lineHeight: "20px",
            textTransform: "none",
          },
        },
      },
    },
  },
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
  thick: 2,
  extraThick: 4,
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
          default: createSolidBorder('blue', isDarkMode ? 600 : 500, 'default'),
          focused: createSolidBorder('blue', isDarkMode ? 600 : 500, 'default'),
          hover: createSolidBorder('blue', isDarkMode ? 700 : 600, 'default'),
          open: createSolidBorder('blue', isDarkMode ? 600 : 500, 'default'),
          pressed: createSolidBorder('blue', isDarkMode ? 800 : 700, 'default'),
          selected: createSolidBorder('blue', isDarkMode ? 600 : 500, 'default'),
      },
      base: {
          default: createSolidBorder('gray', 500, 'default'),
          disabled: createSolidBorder('gray', 300, 'default'),
          divider: createSolidBorder('gray', 200, 'default'),
          dividerInverse: createSolidBorder('gray', 600, 'default'),
          hover: createSolidBorder('gray', 900, 'default'),
          inverse: createSolidBorder('gray', 50, 'default'),
          pressed: createSolidBorder('gray', 900, 'default'),
          table: createSolidBorder('gray', 300, 'default'),
      },
      beta: {
          default: createSolidBorder('purple', 600, 'default'),
          extraThick: createSolidBorder('purple', 600, 'extraThick'),
          thick: createSolidBorder('purple', 600, 'thick'),
      },
      info: {
          default: createSolidBorder('blue', 600, 'default'),
          extraThick: createSolidBorder('blue', 600, 'extraThick'),
          thick: createSolidBorder('blue', 600, 'thick'),
      },
      link: {
          dashed: createDashedBorder(),
          solid: createSolidBorder('blue', 500, 'default'),
      },
      negative: {
          default: createSolidBorder('red', 600, 'default'),
          extraThick: createSolidBorder('red', 600, 'extraThick'),
          thick: createSolidBorder('red', 600, 'thick'),
      },
      neutral: {
          default: createSolidBorder('gray', 500, 'default'),
          extraThick: createSolidBorder('gray', 500, 'extraThick'),
          thick: createSolidBorder('gray', 500, 'thick'),
      },
      none: 'none',
      notice: {
          default: createSolidBorder('yellow', 600, 'default'),
          extraThick: createSolidBorder('yellow', 600, 'extraThick'),
          thick: createSolidBorder('yellow', 600, 'thick'),
      },
      positive: {
          default: createSolidBorder('green', 600, 'default'),
          extraThick: createSolidBorder('green', 600, 'extraThick'),
          thick: createSolidBorder('green', 600, 'thick'),
      },
  };
};


/**
 * Create a SDS App Theme with custom colors that follows the SDS color model.
 */
export const makeSdsSemanticAppTheme = (colors: Colors, isDarkTheme = false): AppTheme => ({
  ...sharedAppTheme,
  colors,
  borders: createAppThemeBorders(colors, isDarkTheme),
});

export const SDSLightAppTheme: AppTheme =
  makeSdsSemanticAppTheme(SDSLightThemeColors);

export const SDSDarkAppTheme: AppTheme =
  makeSdsSemanticAppTheme(SDSDarkThemeColors, true);

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
