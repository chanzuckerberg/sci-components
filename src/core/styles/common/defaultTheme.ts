import {
  default as createMuiTheme,
  default as Shadows,
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme";

export const defaultThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      dark: "#2b52cd",
      light: "#a9bdfc",
      main: "#3867fa",
    },
    secondary: {
      main: "#9bc74e",
    },
    type: "light",
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  shape: {
    borderRadius: 20,
  },
  spacing: 8,
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
    fontFamily: "Open Sans,Helvetica Neue,Arial,Helvetica,sans-serif",
  },
  shadows: Shadows.none,
};

export const defaultTheme = createMuiTheme(defaultThemeOptions);
