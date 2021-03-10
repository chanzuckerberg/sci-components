import createMuiTheme, {
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme";
import { Shadows } from "@material-ui/core/styles/shadows";

const SHADOWS = Array.from(Array(25)).map(() => "none");

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
  shadows: SHADOWS as Shadows,
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
};

export const defaultTheme = createMuiTheme(defaultThemeOptions);
