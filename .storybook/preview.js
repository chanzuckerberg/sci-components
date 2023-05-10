import { defaultTheme } from "../packages/components/src/core/styles";
import { ThemeProvider } from "@mui/material/styles";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={defaultTheme}>
      <Story />
    </ThemeProvider>
  ),
];

/**
 * (thuang): This is a temporary fix for the Storybook addon to work with
 * `storybook-addon-pseudo-states` plugin
 * https://github.com/chromaui/storybook-addon-pseudo-states/issues/59#issuecomment-1498182067
 */
const preview = {
  globalTypes: {
    pseudo: {},
  },
};
export default preview;
