import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { AppTheme, SDSThemeOptions } from "./defaultThemeTypes";

const createThemeAdaptor = createTheme;

const { common } = colors;

const fontFamilyCode = '"IBM Plex Mono", monospace';
const tabularNums = "tabular-nums";

enum FontWeight {
  bold = 700,
  light = 300,
  medium = 500,
  regular = 400,
  semibold = 600,
}

const defaultThemeColors = {
  blue: {
    "100": "#F5F9FF",
    "200": "#E9F1FF",
    "300": "#A6C9FF",
    "400": "#0B68F8",
    "500": "#0142A4",
    "600": "#002660",
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
    "400": "#3CB371",
    "500": "#349A61",
    "600": "#1C7F48",
  },
  purple: {
    "100": "#F4F0F9",
    "200": "#F0EBF6",
    "400": "#7A41CE",
    "500": "#703CBE",
    "600": "#693BAC",
  },
  red: {
    "100": "#FEF2F2",
    "200": "#FBE8E8",
    "400": "#DC132C",
    "500": "#C61128",
    "600": "#B70016",
  },
  yellow: {
    "100": "#FCF6EC",
    "200": "#FFF3E1",
    "400": "#F5A623",
    "500": "#D8921F",
    "600": "#946314",
  },
};

export const defaultAppTheme: AppTheme = {
  colors: defaultThemeColors,
  corners: {
    l: 20,
    m: 4,
    none: 0,
    s: 2,
  },
  fontWeights: {
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
    styles: {
      body: {
        button: {
          fontFamily: "Inter",
          fontSize: 13,
          fontWeight: FontWeight.regular,
          letterSpacing: "0.08px",
          lineHeight: "20px",
          textTransform: "none",
        },
        l: {
          fontFamily: "Inter",
          fontSize: 18,
          fontWeight: FontWeight.regular,
          letterSpacing: "0px",
          lineHeight: "28px",
        },
        m: {
          fontFamily: "Inter",
          fontSize: 16,
          fontWeight: FontWeight.regular,
          letterSpacing: "0px",
          lineHeight: "26px",
        },
        s: {
          fontFamily: "Inter",
          fontSize: 14,
          fontWeight: FontWeight.regular,
          letterSpacing: "0.08px",
          lineHeight: "24px",
        },
        xs: {
          fontFamily: "Inter",
          fontSize: 13,
          fontWeight: FontWeight.regular,
          letterSpacing: "0.08px",
          lineHeight: "20px",
        },
        xxs: {
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: FontWeight.regular,
          letterSpacing: "0.1px",
          lineHeight: "18px",
        },
        xxxs: {
          fontFamily: "Inter",
          fontSize: 11,
          fontWeight: FontWeight.regular,
          letterSpacing: "0.1px",
          lineHeight: "16px",
        },
      },
      body2: {
        button: {
          fontFamily: "Inter",
          fontSize: 13,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.08px",
          lineHeight: "20px",
          textTransform: "none",
        },
        l: {
          fontFamily: "Inter",
          fontSize: 18,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0px",
          lineHeight: "28px",
        },
        m: {
          fontFamily: "Inter",
          fontSize: 16,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0px",
          lineHeight: "26px",
        },
        s: {
          fontFamily: "Inter",
          fontSize: 14,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.08px",
          lineHeight: "24px",
        },
        xs: {
          fontFamily: "Inter",
          fontSize: 13,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.08px",
          lineHeight: "20px",
        },
        xxs: {
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.1px",
          lineHeight: "18px",
        },
        xxxs: {
          fontFamily: "Inter",
          fontSize: 11,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.1px",
          lineHeight: "16px",
        },
      },
      caps: {
        xxs: {
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.5px",
          lineHeight: "18px",
          textTransform: "uppercase",
        },
        xxxs: {
          fontFamily: "Inter",
          fontSize: 11,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.5px",
          lineHeight: "16px",
          textTransform: "uppercase",
        },
        xxxxs: {
          fontFamily: "Inter",
          fontSize: 10,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.5px",
          lineHeight: "14px",
          textTransform: "uppercase",
        },
      },
      code: {
        s: {
          fontFamily: fontFamilyCode,
          fontSize: 14,
          fontWeight: FontWeight.regular,
          letterSpacing: "0px",
          lineHeight: "24px",
        },
        xs: {
          fontFamily: fontFamilyCode,
          fontSize: 13,
          fontWeight: FontWeight.regular,
          letterSpacing: "0px",
          lineHeight: "20px",
        },
      },
      code2: {
        s: {
          fontFamily: fontFamilyCode,
          fontSize: 14,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0px",
          lineHeight: "24px",
        },
        xs: {
          fontFamily: fontFamilyCode,
          fontSize: 13,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0px",
          lineHeight: "20px",
        },
      },
      header: {
        l: {
          fontFamily: "Inter",
          fontSize: 18,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0px",
          lineHeight: "24px",
        },
        m: {
          fontFamily: "Inter",
          fontSize: 16,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0px",
          lineHeight: "22px",
        },
        s: {
          fontFamily: "Inter",
          fontSize: 14,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.08px",
          lineHeight: "20px",
        },
        xl: {
          fontFamily: "Inter",
          fontSize: 22,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0px",
          lineHeight: "30px",
        },
        xs: {
          fontFamily: "Inter",
          fontSize: 13,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.08px",
          lineHeight: "18px",
        },
        xxl: {
          fontFamily: "Inter",
          fontSize: 26,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0px",
          lineHeight: "34px",
        },
        xxs: {
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.1px",
          lineHeight: "18px",
        },
        xxxs: {
          fontFamily: "Inter",
          fontSize: 11,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.1px",
          lineHeight: "16px",
        },
      },
      tabular: {
        s: {
          fontFamily: "Inter",
          fontSize: 14,
          fontVariantNumeric: tabularNums,
          fontWeight: FontWeight.regular,
          letterSpacing: "0px",
          lineHeight: "24px",
        },
        xs: {
          fontFamily: "Inter",
          fontSize: 13,
          fontVariantNumeric: tabularNums,
          fontWeight: FontWeight.regular,
          letterSpacing: "0px",
          lineHeight: "20px",
        },
      },
      tabular2: {
        s: {
          fontFamily: "Inter",
          fontSize: 14,
          fontVariantNumeric: tabularNums,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0px",
          lineHeight: "24px",
        },
        xs: {
          fontFamily: "Inter",
          fontSize: 13,
          fontVariantNumeric: tabularNums,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0px",
          lineHeight: "20px",
        },
      },
    },
  },
};

// (mlila) whenever our theme uses colors, we need to make sure we allow consuming
// applications to override those colors using their own custom theme.
// By defining borders using defaultAppTheme.colors instead of defaultThemeColors,
// we allow other apps to specify their colors once, and have them apply
// throughout the application, such as in borders, etc without having to manually
// override every theme property that makes use of colors.
defaultAppTheme.borders = {
  error: {
    "400": `1px solid ${defaultAppTheme.colors.red[400]}`,
  },
  gray: {
    "100": `1px solid ${defaultAppTheme.colors.gray[100]}`,
    "200": `1px solid ${defaultAppTheme.colors.gray[200]}`,
    "300": `1px solid ${defaultAppTheme.colors.gray[300]}`,
    "400": `1px solid ${defaultAppTheme.colors.gray[400]}`,
    "500": `1px solid ${defaultAppTheme.colors.gray[500]}`,
    dashed: `2px dashed ${defaultAppTheme.colors.gray[400]}`,
  },
  link: {
    dashed: `1px dashed`,
    solid: `1px solid`,
  },
  primary: {
    "300": `1px solid ${defaultAppTheme.colors.blue[300]}`,
    "400": `1px solid ${defaultAppTheme.colors.blue[400]}`,
    "500": `1px solid ${defaultAppTheme.colors.blue[500]}`,
    "600": `1px solid${defaultAppTheme.colors.blue[600]}`,
    dashed: `2px dashed ${defaultAppTheme.colors.blue[400]}`,
  },
  success: {
    "400": `1px solid ${defaultAppTheme.colors.green[400]}`,
  },
  warning: {
    "400": `1px solid ${defaultAppTheme.colors.yellow[400]}`,
  },
};

export function makeThemeOptions(appTheme: AppTheme): SDSThemeOptions {
  return {
    app: appTheme,
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
      MuiTab: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    palette: {
      action: {
        disabled: appTheme.colors.gray[400],
        disabledBackground: appTheme.colors.gray[300],
      },
      divider: appTheme.colors.gray[200],
      error: {
        dark: appTheme.colors.red[600],
        light: appTheme.colors.red[200],
        main: appTheme.colors.red[400],
      },
      grey: {
        "100": appTheme.colors.gray[100],
        "200": appTheme.colors.gray[200],
        "300": appTheme.colors.gray[300],
        "400": appTheme.colors.gray[400],
        "500": appTheme.colors.gray[500],
        "600": appTheme.colors.gray[600],
      },
      info: {
        dark: appTheme.colors.blue[600],
        light: appTheme.colors.blue[200],
        main: appTheme.colors.blue[400],
      },
      mode: "light",
      primary: {
        dark: appTheme.colors.blue[600],
        light: appTheme.colors.blue[300],
        main: appTheme.colors.blue[400],
      },
      secondary: {
        main: appTheme.colors.green[400],
      },
      success: {
        dark: appTheme.colors.green[600],
        light: appTheme.colors.green[200],
        main: appTheme.colors.green[400],
      },
      text: {
        disabled: appTheme.colors.gray[400],
        primary: common.black,
        secondary: appTheme.colors.gray[500],
      },
      warning: {
        dark: appTheme.colors.yellow[600],
        light: appTheme.colors.yellow[200],
        main: appTheme.colors.yellow[400],
      },
    },
    shadows: [
      appTheme.shadows.none,
      appTheme.shadows.s,
      appTheme.shadows.s,
      appTheme.shadows.s,
      appTheme.shadows.s,
      appTheme.shadows.s,
      appTheme.shadows.s,
      appTheme.shadows.s,
      appTheme.shadows.s,
      appTheme.shadows.m,
      appTheme.shadows.m,
      appTheme.shadows.m,
      appTheme.shadows.m,
      appTheme.shadows.m,
      appTheme.shadows.m,
      appTheme.shadows.m,
      appTheme.shadows.m,
      appTheme.shadows.l,
      appTheme.shadows.l,
      appTheme.shadows.l,
      appTheme.shadows.l,
      appTheme.shadows.l,
      appTheme.shadows.l,
      appTheme.shadows.l,
      appTheme.shadows.l,
    ],
    shape: {
      borderRadius: appTheme.corners.m,
    },
    spacing: [
      appTheme.spacing.default,
      appTheme.spacing.xxxs,
      appTheme.spacing.xxs,
      appTheme.spacing.xs,
      appTheme.spacing.s,
      appTheme.spacing.m,
      appTheme.spacing.l,
      appTheme.spacing.xl,
      appTheme.spacing.xxl,
    ],
    transitions: {
      duration: {
        complex: 200,
        enteringScreen: 20,
        leavingScreen: 10,
        short: 150,
        shorter: 100,
        shortest: 50,
        standard: 200,
      },
      easing: {
        easeIn: "cubic-bezier(0, 0, 0.2, 1)",
        easeInOut: "cubic-bezier(0, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        sharp: "cubic-bezier(0, 0.2, 0.6, 1)",
      },
    },
    typography: {
      body1: appTheme.typography.styles.body.xs,
      body2: appTheme.typography.styles.body.xxs,
      button: appTheme.typography.styles.body.button,
      caption: appTheme.typography.styles.body.xxxs,
      fontFamily: `${appTheme.typography.styles.body.s.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif`,
      h1: appTheme.typography.styles.header.xxl,
      h2: appTheme.typography.styles.header.xl,
      h3: appTheme.typography.styles.header.l,
      h4: appTheme.typography.styles.header.m,
      h5: appTheme.typography.styles.header.s,
      h6: appTheme.typography.styles.header.xs,
      overline: appTheme.typography.styles.caps.xxxs,
      subtitle1: appTheme.typography.styles.body.xs,
      subtitle2: appTheme.typography.styles.header.xxs,
    },
  };
}

const defaultThemeOptions: SDSThemeOptions = makeThemeOptions(defaultAppTheme);

export const defaultTheme = createThemeAdaptor(defaultThemeOptions);
