import { muiTheme } from "storybook-addon-material-ui";
import { defaultTheme } from "../src/core/styles";
import { ThemeProvider } from "@emotion/react";
import { StylesProvider } from "@material-ui/core/styles";

export const decorators = [
  muiTheme([defaultTheme]),
  (Story) => (
    <StylesProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <Story />
      </ThemeProvider>
    </StylesProvider>
  ),
];
