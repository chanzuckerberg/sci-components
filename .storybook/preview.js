import { defaultTheme } from "../packages/sci-components/src/core/styles";
import { ThemeProvider } from "@mui/material/styles";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={defaultTheme}>
      <Story />
    </ThemeProvider>
  ),
];
