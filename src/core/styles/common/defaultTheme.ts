import { common } from "@material-ui/core/colors";
import createMuiTheme, {
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme";

const appTheme: AppTheme = {
  colors: {
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
  font: "Open Sans",
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

enum Shadows {
  A = "0 2px 4px 0 rgba(0,0,0, 0.25)",
  B = "0 2px 4px 0 rgba(0,0,0, 0.15), 0 2px 10px 0 rgba(0,0,0, 0.15)",
  C = "0 2px 12px 0 rgba(0,0,0, 0.3)",
}

export const defaultThemeOptions: AppThemeOptions = {
  app: appTheme,
  palette: {
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
    Shadows.A,
    Shadows.A,
    Shadows.A,
    Shadows.A,
    Shadows.A,
    Shadows.A,
    Shadows.A,
    Shadows.A,
    Shadows.B,
    Shadows.B,
    Shadows.B,
    Shadows.B,
    Shadows.B,
    Shadows.B,
    Shadows.B,
    Shadows.B,
    Shadows.C,
    Shadows.C,
    Shadows.C,
    Shadows.C,
    Shadows.C,
    Shadows.C,
    Shadows.C,
    Shadows.C,
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
    fontFamily: `${appTheme.font}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif`,
  },
};

interface AppThemeOptions extends ThemeOptions {
  app: AppTheme;
}

interface AppTheme {
  colors: Colors;
  corners: Corners;
  spacing: Spacing;
  font: string;
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
  primary: Color;
  secondary: Color;
  gray: Color;
  info: Color;
  success: Color;
  warning: Color;
  error: Color;
}

export const defaultTheme = createMuiTheme(defaultThemeOptions);
