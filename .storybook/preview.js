import { defaultTheme } from "../src/core/styles";
import { ThemeProvider } from "@mui/material/styles";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={defaultTheme}>
      <Story />
    </ThemeProvider>
  ),
];
