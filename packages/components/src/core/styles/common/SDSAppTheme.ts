"use client";

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

const SDSThemeColors: Colors = {
  blue: {
    "100": "#F5F9FF",
    "200": "#E9F1FF",
    "300": "#A6C9FF",
    "400": "#0B68F8",
    "500": "#0142A4",
    "600": "#002660",
  },
  common: {
    black: "#000000",
    white: "#FFFFFF",
  },
  gray: {
    "100": "#F8F8F8",
    "200": "#EAEAEA",
    "300": "#CCCCCC",
    "400": "#999999",
    "500": "#767676",
    "600": "#545454",
  },
  green: {
    "100": "#ECF5F0",
    "200": "#E6F7ED",
    "300": "transparent",
    "400": "#3CB371",
    "500": "#349A61",
    "600": "#1C7F48",
  },
  purple: {
    "100": "#F4F0F9",
    "200": "#F0EBF6",
    "300": "transparent",
    "400": "#7A41CE",
    "500": "#703CBE",
    "600": "#693BAC",
  },
  red: {
    "100": "#FEF2F2",
    "200": "#F8E8E8",
    "300": "transparent",
    "400": "#DC132C",
    "500": "#C61128",
    "600": "#B70016",
  },
  yellow: {
    "100": "#FCF6EC",
    "200": "#FFF3E1",
    "300": "transparent",
    "400": "#F5A623",
    "500": "#D8921F",
    "600": "#946314",
  },
};

export const SDSAppTheme: AppTheme = {
  colors: SDSThemeColors,
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
  },
};

/**
 * (masoudmanson): This is to make sure that the old defaultAppTheme
 * export is still available for backward compatibility.
 *
 * @deprecated
 * Please use `SDSAppTheme` instead. This export will be removed in the future.
 */
export const defaultAppTheme = SDSAppTheme;

// (mlila) whenever our theme uses colors, we need to make sure we allow consuming
// applications to override those colors using their own custom theme.
// By defining borders using SDSAppTheme.colors instead of defaultThemeColors,
// we allow other apps to specify their colors once, and have them apply
// throughout the application, such as in borders, etc without having to manually
// override every theme property that makes use of colors.
SDSAppTheme.borders = {
  accent: {
    dashed: `1px dashed ${SDSAppTheme.colors.blue[400]}`,
    default: `1px solid ${SDSAppTheme.colors.blue[400]}`,
    disabled: `1px solid ${SDSAppTheme.colors.blue[300]}`,
    hover: `1px solid ${SDSAppTheme.colors.blue[500]}`,
  },
  base: {
    black: `1px solid ${SDSAppTheme.colors.common.black}`,
    dashed: `1px dashed ${SDSAppTheme.colors.gray[400]}`,
    default: `1px solid ${SDSAppTheme.colors.gray[400]}`,
    disabled: `1px solid ${SDSAppTheme.colors.gray[300]}`,
    divider: `1px solid ${SDSAppTheme.colors.gray[200]}`,
    hover: `1px solid ${SDSAppTheme.colors.common.black}`,
    table: `1px solid ${SDSAppTheme.colors.gray[300]}`,
  },
  beta: {
    default: `1px solid ${SDSAppTheme.colors.purple[400]}`,
  },
  info: {
    default: `1px solid ${SDSAppTheme.colors.blue[400]}`,
  },
  link: {
    dashed: `1px dashed`,
    solid: `1px solid`,
  },
  negative: {
    default: `1px solid ${SDSAppTheme.colors.red[400]}`,
  },
  neutral: {
    default: `1px solid ${SDSAppTheme.colors.gray[400]}`,
  },
  none: "none",
  notice: {
    default: `1px solid ${SDSAppTheme.colors.yellow[400]}`,
  },
  positive: {
    default: `1px solid ${SDSAppTheme.colors.green[400]}`,
  },
};
