import { common } from "@material-ui/core/colors";
import createMuiTheme, {
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme";
import { TypographyStyle } from "@material-ui/core/styles/createTypography";

enum FontWeight {
  bold = 700,
  light = 300,
  medium = 800,
  regular = 400,
  semibold = 600,
}

const appTheme: AppTheme = {
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
  typography: {
    fontFamily: "Open Sans",
    styles: {
      header: {
        xxl: {
          fontWeight: FontWeight.semibold,
          fontSize: 26,
          lineHeight: "34px",
          letterSpacing: "0.3px",
        },
        xl: {
          fontWeight: FontWeight.semibold,
          fontSize: 22,
          lineHeight: "30px",
          letterSpacing: "0.3px",
        },
        l: {
          fontWeight: FontWeight.semibold,
          fontSize: 18,
          lineHeight: "24px",
          letterSpacing: "0.3px",
        },
        m: {
          fontWeight: FontWeight.semibold,
          fontSize: 16,
          lineHeight: "22px",
          letterSpacing: "0.3px",
        },
        s: {
          fontWeight: FontWeight.semibold,
          fontSize: 14,
          lineHeight: "20px",
          letterSpacing: "0.3px",
        },
        xs: {
          fontWeight: FontWeight.semibold,
          fontSize: 13,
          lineHeight: "18px",
          letterSpacing: "0.3px",
        },
        xxs: {
          fontWeight: FontWeight.semibold,
          fontSize: 12,
          lineHeight: "18px",
          letterSpacing: "0.3px",
        },
        xxxs: {
          fontWeight: FontWeight.semibold,
          fontSize: 11,
          lineHeight: "16px",
          letterSpacing: "0.3px",
        },
      },
      body: {
        button: {
          fontWeight: FontWeight.semibold,
          fontSize: 13,
          lineHeight: "20px",
          letterSpacing: "0.3px",
          textTransform: "none",
        },
        l: {
          fontWeight: FontWeight.regular,
          fontSize: 18,
          lineHeight: "28px",
          letterSpacing: "0.3px",
        },
        m: {
          fontWeight: FontWeight.regular,
          fontSize: 16,
          lineHeight: "26px",
          letterSpacing: "0.3px",
        },
        s: {
          fontWeight: FontWeight.regular,
          fontSize: 14,
          lineHeight: "24px",
          letterSpacing: "0.3px",
        },
        xs: {
          fontWeight: FontWeight.regular,
          fontSize: 13,
          lineHeight: "20px",
          letterSpacing: "0.3px",
        },
        xxs: {
          fontWeight: FontWeight.regular,
          fontSize: 12,
          lineHeight: "18px",
          letterSpacing: "0.3px",
        },
        xxxs: {
          fontWeight: FontWeight.regular,
          fontSize: 11,
          lineHeight: "16px",
          letterSpacing: "0.3px",
        },
      },
      caps: {
        xxs: {
          fontWeight: FontWeight.semibold,
          fontSize: 12,
          lineHeight: "18px",
          letterSpacing: "1.0px",
          textTransform: "uppercase",
        },
        xxxs: {
          fontWeight: FontWeight.semibold,
          fontSize: 11,
          lineHeight: "16px",
          letterSpacing: "1.0px",
          textTransform: "uppercase",
        },
        xxxxs: {
          fontWeight: FontWeight.semibold,
          fontSize: 10,
          lineHeight: "14px",
          letterSpacing: "1.0px",
          textTransform: "uppercase",
        },
      },
    },
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
};

export const defaultThemeOptions: AppThemeOptions = {
  app: appTheme,
  palette: {
    divider: appTheme.colors.gray[200],
    grey: {
      "100": appTheme.colors.gray[100],
      "200": appTheme.colors.gray[200],
      "300": appTheme.colors.gray[300],
      "400": appTheme.colors.gray[400],
      "500": appTheme.colors.gray[500],
      "600": appTheme.colors.gray[600],
    },
    primary: {
      dark: appTheme.colors.primary[600],
      light: appTheme.colors.primary[300],
      main: appTheme.colors.primary[400],
    },
    secondary: {
      main: appTheme.colors.secondary[400],
    },
    text: {
      disabled: appTheme.colors.gray[300],
      primary: common.black,
      secondary: appTheme.colors.gray[500],
    },
    type: "light",
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  shadows: [
    "none",
    "0 2px 4px 0 rbga (0,0,0, 0.25)",
    "0 2px 4px 0 rbga (0,0,0, 0.25)",
    "0 2px 4px 0 rbga (0,0,0, 0.25)",
    "0 2px 4px 0 rbga (0,0,0, 0.25)",
    "0 2px 4px 0 rbga (0,0,0, 0.25)",
    "0 2px 4px 0 rbga (0,0,0, 0.25)",
    "0 2px 4px 0 rbga (0,0,0, 0.25)",
    "0 2px 4px 0 rbga (0,0,0, 0.25)",
    "0 2px 4px 0 rbga (0,0,0, 0.15), 0 2px 10px 0 rbga (0,0,0, 0.15)",
    "0 2px 4px 0 rbga (0,0,0, 0.15), 0 2px 10px 0 rbga (0,0,0, 0.15)",
    "0 2px 4px 0 rbga (0,0,0, 0.15), 0 2px 10px 0 rbga (0,0,0, 0.15)",
    "0 2px 4px 0 rbga (0,0,0, 0.15), 0 2px 10px 0 rbga (0,0,0, 0.15)",
    "0 2px 4px 0 rbga (0,0,0, 0.15), 0 2px 10px 0 rbga (0,0,0, 0.15)",
    "0 2px 4px 0 rbga (0,0,0, 0.15), 0 2px 10px 0 rbga (0,0,0, 0.15)",
    "0 2px 4px 0 rbga (0,0,0, 0.15), 0 2px 10px 0 rbga (0,0,0, 0.15)",
    "0 2px 4px 0 rbga (0,0,0, 0.15), 0 2px 10px 0 rbga (0,0,0, 0.15)",
    "0 2px 12px 0 rbga (0,0,0, 0.3)",
    "0 2px 12px 0 rbga (0,0,0, 0.3)",
    "0 2px 12px 0 rbga (0,0,0, 0.3)",
    "0 2px 12px 0 rbga (0,0,0, 0.3)",
    "0 2px 12px 0 rbga (0,0,0, 0.3)",
    "0 2px 12px 0 rbga (0,0,0, 0.3)",
    "0 2px 12px 0 rbga (0,0,0, 0.3)",
    "0 2px 12px 0 rbga (0,0,0, 0.3)",
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
    fontFamily: `${appTheme.typography.fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif`,
    h1: appTheme.typography.styles.header.xxl,
    h2: appTheme.typography.styles.header.xl,
    h3: appTheme.typography.styles.header.l,
    h4: appTheme.typography.styles.header.m,
    h5: appTheme.typography.styles.header.s,
    h6: appTheme.typography.styles.header.xs,
    body1: appTheme.typography.styles.body.xs,
    body2: appTheme.typography.styles.body.xxs,
    subtitle1: appTheme.typography.styles.body.xs,
    subtitle2: appTheme.typography.styles.header.xxs,
    button: appTheme.typography.styles.body.button,
    caption: appTheme.typography.styles.body.xxxs,
    overline: appTheme.typography.styles.caps.xxxs,
  },
};

interface AppThemeOptions extends ThemeOptions {
  app: AppTheme;
}

interface AppTheme {
  colors: Colors;
  corners: Corners;
  spacing: Spacing;
  typography: Typography;
}

interface Typography {
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

interface Corners {
  none: number;
  s: number;
  m: number;
  l: number;
}

interface Spacing {
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

interface Color {
  600?: string;
  500?: string;
  400: string;
  300?: string;
  200?: string;
  100?: string;
}

interface Colors {
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
