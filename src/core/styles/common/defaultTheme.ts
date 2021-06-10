import { colors } from "@material-ui/core";
import { createMuiTheme, ThemeOptions } from "@material-ui/core/styles";
import { TypographyStyle } from "@material-ui/core/styles/createTypography";

const { common } = colors;

enum FontWeight {
  bold = 700,
  light = 300,
  medium = 800,
  regular = 400,
  semibold = 600,
}

export const defaultAppTheme: AppTheme = {
  colors: {
    beta: {
      "100": "#F4F0F9",
      "200": "#F0EBF6",
      "400": "#7A41CE",
      "600": "#693BAC",
    },
    error: {
      "100": "#FEF2F2",
      "200": "#FBE8E8",
      "400": "#DC132C",
      "600": "#B70016",
    },
    gray: {
      "100": "#F8F8F8",
      "200": "#EAEAEA",
      "300": "#CCCCCC",
      "400": "#999999",
      "500": "#767676",
      "600": "#545454",
    },
    info: {
      "100": "#EFF2FC",
      "200": "#EBEFFC",
      "400": "#3867FA",
      "600": "#223F9C",
    },
    primary: {
      "100": "#F8F9FE",
      "200": "#EFF2FC",
      "300": "#A9BDFC",
      "400": "#3867FA",
      "500": "#2B52CD",
      "600": "#223F9C",
    },
    secondary: {
      "400": "#9BC74E",
    },
    success: {
      "100": "#ECF5F0",
      "200": "#E6F7ED",
      "400": "#3CB371",
      "600": "#1C7F48",
    },
    warning: {
      "100": "#FCF6EC",
      "200": "#FFF3E1",
      "400": "#F5A623",
      "600": "#946314",
    },
  },
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
  shadows: {
    l: "0 2px 12px 0 rgba(0,0,0, 0.3)",
    m: "0 2px 4px 0 rgba(0,0,0, 0.15), 0 2px 10px 0 rgba(0,0,0, 0.15)",
    none: "none",
    s: "0 2px 4px 0 rgba(0,0,0, 0.25)",
  },
  spacing: {
    default: 10,
    l: 14,
    m: 10,
    s: 8,
    xl: 22,
    xs: 6,
    xxl: 38,
    xxs: 4,
    xxxs: 2,
  },
  typography: {
    fontFamily: "Open Sans",
    styles: {
      body: {
        button: {
          fontSize: 13,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.3px",
          lineHeight: "20px",
          textTransform: "none",
        },
        l: {
          fontSize: 18,
          fontWeight: FontWeight.regular,
          letterSpacing: "0.3px",
          lineHeight: "28px",
        },
        m: {
          fontSize: 16,
          fontWeight: FontWeight.regular,
          letterSpacing: "0.3px",
          lineHeight: "26px",
        },
        s: {
          fontSize: 14,
          fontWeight: FontWeight.regular,
          letterSpacing: "0.3px",
          lineHeight: "24px",
        },
        xs: {
          fontSize: 13,
          fontWeight: FontWeight.regular,
          letterSpacing: "0.3px",
          lineHeight: "20px",
        },
        xxs: {
          fontSize: 12,
          fontWeight: FontWeight.regular,
          letterSpacing: "0.3px",
          lineHeight: "18px",
        },
        xxxs: {
          fontSize: 11,
          fontWeight: FontWeight.regular,
          letterSpacing: "0.3px",
          lineHeight: "16px",
        },
      },
      caps: {
        xxs: {
          fontSize: 12,
          fontWeight: FontWeight.semibold,
          letterSpacing: "1.0px",
          lineHeight: "18px",
          textTransform: "uppercase",
        },
        xxxs: {
          fontSize: 11,
          fontWeight: FontWeight.semibold,
          letterSpacing: "1.0px",
          lineHeight: "16px",
          textTransform: "uppercase",
        },
        xxxxs: {
          fontSize: 10,
          fontWeight: FontWeight.semibold,
          letterSpacing: "1.0px",
          lineHeight: "14px",
          textTransform: "uppercase",
        },
      },
      header: {
        l: {
          fontSize: 18,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.3px",
          lineHeight: "24px",
        },
        m: {
          fontSize: 16,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.3px",
          lineHeight: "22px",
        },
        s: {
          fontSize: 14,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.3px",
          lineHeight: "20px",
        },
        xl: {
          fontSize: 22,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.3px",
          lineHeight: "30px",
        },
        xs: {
          fontSize: 13,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.3px",
          lineHeight: "18px",
        },
        xxl: {
          fontSize: 26,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.3px",
          lineHeight: "34px",
        },
        xxs: {
          fontSize: 12,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.3px",
          lineHeight: "18px",
        },
        xxxs: {
          fontSize: 11,
          fontWeight: FontWeight.semibold,
          letterSpacing: "0.3px",
          lineHeight: "16px",
        },
      },
    },
  },
};

export function makeThemeOptions(appTheme: AppTheme): AppThemeOptions {
  return {
    app: appTheme,
    palette: {
      divider: appTheme.colors.gray[200],
      error: {
        dark: appTheme.colors.error[600],
        light: appTheme.colors.error[200],
        main: appTheme.colors.error[400],
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
        dark: appTheme.colors.info[600],
        light: appTheme.colors.info[200],
        main: appTheme.colors.info[400],
      },
      primary: {
        dark: appTheme.colors.primary[600],
        light: appTheme.colors.primary[300],
        main: appTheme.colors.primary[400],
      },
      secondary: {
        main: appTheme.colors.secondary[400],
      },
      success: {
        dark: appTheme.colors.success[600],
        light: appTheme.colors.success[200],
        main: appTheme.colors.success[400],
      },
      text: {
        disabled: appTheme.colors.gray[300],
        primary: common.black,
        secondary: appTheme.colors.gray[500],
      },
      type: "light",
      warning: {
        dark: appTheme.colors.warning[600],
        light: appTheme.colors.warning[200],
        main: appTheme.colors.warning[400],
      },
    },
    props: {
      MuiButtonBase: {
        disableRipple: true,
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
      fontFamily: `${appTheme.typography.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif`,
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

const defaultThemeOptions: AppThemeOptions = makeThemeOptions(defaultAppTheme);

export interface AppThemeOptions extends ThemeOptions {
  app?: AppTheme;
}

interface AppTheme {
  colors: Colors;
  corners: Corners;
  fontWeights: FontWeights;
  shadows: Shadows;
  spacing: Spacings;
  typography: Typography;
}

export interface Shadows {
  none: "none";
  s: string;
  m: string;
  l: string;
}

export interface Typography {
  fontFamily: React.CSSProperties["fontFamily"];
  styles: {
    header: {
      xxl: TypographyStyle;
      xl: TypographyStyle;
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
    };
    body: {
      button: TypographyStyle;
      l: TypographyStyle;
      m: TypographyStyle;
      s: TypographyStyle;
      xs: TypographyStyle;
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
    };
    caps: {
      xxs: TypographyStyle;
      xxxs: TypographyStyle;
      xxxxs: TypographyStyle;
    };
  };
}

export interface FontWeights {
  bold: number;
  light: number;
  medium: number;
  regular: number;
  semibold: number;
}
export interface Corners {
  none: number;
  s: number;
  m: number;
  l: number;
}

export interface Spacings {
  default: number;
  xxxs: number;
  xxs: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
}

export interface Color {
  600?: string;
  500?: string;
  400: string;
  300?: string;
  200?: string;
  100?: string;
}

export interface Colors {
  beta: Color;
  primary: Color;
  secondary: Color;
  gray: Color;
  info: Color;
  success: Color;
  warning: Color;
  error: Color;
}

export const defaultTheme = createMuiTheme(defaultThemeOptions);
