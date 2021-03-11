import { common } from "@material-ui/core/colors";
import createMuiTheme, {
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme";

const appTheme: AppTheme = {
  colors: {
    primary: {
      600: "#223F9C",
      500: "#2B52CD",
      400: "#3867FA",
      300: "#A9BDFC",
      200: "#EFF2FC",
      100: "#F8F9FE",
    },
    secondary: {
      400: "9BC74E",
    },
    gray: {
      600: "#545454",
      500: "#767676",
      400: "#999999",
      300: "#CCCCCC",
      200: "#EAEAEA",
      100: "#F8F8F8",
    },
    info: {
      600: "#223F9C",
      400: "#3867FA",
      200: "#EBEFFC",
      100: "#EFF2FC",
    },
    success: {
      600: "#1C7F48",
      400: "#3CB371",
      200: "#E6F7ED",
      100: "#ECF5F0",
    },
    warning: {
      600: "#946314",
      400: "#F5A623",
      200: "#FFF3E1",
      100: "#FCF6EC",
    },
    error: {
      600: "#B70016",
      400: "#DC132C",
      200: "#FBE8E8",
      100: "#FEF2F2",
    },
  },
  corners: {
    none: 0,
    s: 2,
    m: 4,
    l: 20,
  },
  spacing: {
    default: 10,
    xxxs: 2,
    xxs: 4,
    xs: 6,
    s: 8,
    m: 10,
    l: 14,
    xl: 22,
    xxl: 38,
  },
  font: "Open Sans",
};

export const defaultThemeOptions: AppThemeOptions = {
  app: appTheme,
  palette: {
    primary: {
      dark: appTheme.colors.primary[600],
      light: appTheme.colors.primary[300],
      main: appTheme.colors.primary[400],
    },
    grey: {
      100: appTheme.colors.gray[100],
      200: appTheme.colors.gray[200],
      300: appTheme.colors.gray[300],
      400: appTheme.colors.gray[400],
      500: appTheme.colors.gray[500],
      600: appTheme.colors.gray[600],
    },
    secondary: {
      main: appTheme.colors.secondary[400],
    },
    text: {
      primary: common.black,
      secondary: appTheme.colors.gray[500],
      disabled: appTheme.colors.gray[300],
    },
    type: "light",
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
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
