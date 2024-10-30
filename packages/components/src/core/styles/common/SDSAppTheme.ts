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
    "300": "#cbbaf8",
    "400": "#b296f2",
    "500": "#8b54e2",
    "600": "#6526b5",
    "700": "#490092",
    "800": "#1a004c",
  },
  red: {
    "100": "#ffe8e6",
    "200": "#ffd6d2",
    "300": "#ffafa8",
    "400": "#ff7e78",
    "500": "#db2131",
    "600": "#980013",
    "700": "#6f0008",
    "800": "#340000",
  },
  yellow: {
    "100": "#ffefcf",
    "200": "#ffdb97",
    "300": "#ffca5c",
    "400": "#fab700",
    "500": "#da9900",
    "600": "#b77800",
    "700": "#7c3e00",
    "800": "#541700",
  },
};

const SDSDarkThemeColors: Colors = {
  blue: {
    "100": "#002573",
    "200": "#0048c5",
    "300": "#2573f4",
    "400": "#5b9aff",
    "500": "#a2c9ff",
    "600": "#cde3ff",
    "700": "#e2eeff",
    "800": "#f7faff",
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
    "100": "#053918",
    "200": "#12612e",
    "300": "#288b49",
    "400": "#43ae63",
    "500": "#85d898",
    "600": "#bcecc5",
    "700": "#daf4de",
    "800": "#f7fbf6",
  },
  purple: {
    "100": "#4b0190",
    "200": "#6b2ebc",
    "300": "#905de6",
    "400": "#aa89ef",
    "500": "#cebef8",
    "600": "#e4dcfc",
    "700": "#f0ebfe",
    "800": "#fbf9ff",
  },
  red: {
    "100": "#630008",
    "200": "#A30000",
    "300": "#E52722",
    "400": "#FF695B",
    "500": "#FF9385",
    "600": "#FFBDB3",
    "700": "#FFD8D1",
    "800": "#FFF1EE",
  },
  yellow: {
    "100": "#552300",
    "200": "#834500",
    "300": "#985a00",
    "400": "#ac6c00",
    "500": "#cf8e00",
    "600": "#efad00",
    "700": "#ffdc9a",
    "800": "#fcf2e3",
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
    styles: {
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
    mobileStyles: {
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
  },
};

/**
 * Create a SDS App Theme with custom colors that follows the SDS color model.
 */
export const makeSdsSemanticAppTheme = (colors: Colors): AppTheme => ({
  ...sharedAppTheme,
  // (mlila) whenever our theme uses colors, we need to make sure we allow consuming
  // applications to override those colors using their own custom theme.
  // By defining borders using SDSAppTheme.colors instead of defaultThemeColors,
  // we allow other apps to specify their colors once, and have them apply
  // throughout the application, such as in borders, etc without having to manually
  // override every theme property that makes use of colors.
  borders: {
    accent: {
      default: `1px solid ${colors.blue[500]}`,
      focused: `1px solid ${colors.blue[500]}`,
      hover: `1px solid ${colors.blue[600]}`,
      open: `1px solid ${colors.blue[500]}`,
      pressed: `1px solid ${colors.blue[700]}`,
      selected: `1px solid ${colors.blue[500]}`,
    },
    base: {
      default: `1px solid ${colors.gray[500]}`,
      disabled: `1px solid ${colors.gray[300]}`,
      divider: `1px solid ${colors.gray[200]}`,
      hover: `1px solid ${colors.gray[900]}`,
      pressed: `1px solid ${colors.gray[900]}`,
      table: `1px solid ${colors.gray[300]}`,
    },
    beta: {
      default: `1px solid ${colors.purple[600]}`,
      extraThick: `4px solid ${colors.purple[600]}`,
      thick: `2px solid ${colors.purple[600]}`,
    },
    info: {
      default: `1px solid ${colors.blue[600]}`,
      extraThick: `4px solid ${colors.blue[600]}`,
      thick: `2px solid ${colors.blue[600]}`,
    },
    link: {
      dashed: `1px dashed`,
      solid: `1px solid`,
    },
    negative: {
      default: `1px solid ${colors.red[600]}`,
      extraThick: `4px solid ${colors.red[600]}`,
      thick: `2px solid ${colors.red[600]}`,
    },
    neutral: {
      default: `1px solid ${colors.gray[500]}`,
      extraThick: `4px solid ${colors.gray[500]}`,
      thick: `2px solid ${colors.gray[500]}`,
    },
    none: "none",
    notice: {
      default: `1px solid ${colors.yellow[600]}`,
      extraThick: `4px solid ${colors.yellow[600]}`,
      thick: `2px solid ${colors.yellow[600]}`,
    },
    positive: {
      default: `1px solid ${colors.green[600]}`,
      extraThick: `4px solid ${colors.green[600]}`,
      thick: `2px solid ${colors.green[600]}`,
    },
  },
  colors,
});

export const SDSLightAppTheme: AppTheme =
  makeSdsSemanticAppTheme(SDSLightThemeColors);
export const SDSDarkAppTheme: AppTheme =
  makeSdsSemanticAppTheme(SDSDarkThemeColors);

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
