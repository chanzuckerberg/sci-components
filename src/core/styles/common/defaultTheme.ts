import createMuiTheme, {
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme";

import { colors, spacing, corners, typography } from "../app/appTheme";

export const defaultThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      dark: colors.primary[500],
      light: colors.primary[300],
      main: colors.primary[400],
    },
    gray: {
      dark: colors.gray[500],
      light: colors.gray[400],
      main: colors.gray[300],
    },
    secondary: {
      main: colors.secondary[400],
    },
    type: "light",
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  shape: {
    borderRadius: [corners.none, corners.s, corners.m, corners.l],
  },
  spacing: [spacing.default, spacing.xxxs, spacing.xxs, spacing.xs, spacing.s, spacing.m, spacing.l, spacing.xl, spacing.xxl],
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
    fontFamily: `${typography.primaryAppFont}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif`
  }
};

export const defaultTheme = createMuiTheme(defaultThemeOptions);
