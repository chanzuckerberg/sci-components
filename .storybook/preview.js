import { theme } from "../packages/components/src/core/styles";
import { ThemeProvider } from "@mui/material/styles";

export const decorators = [
  (Story, context) => {
    const { theme: storybookTheme } = context.globals;

    // TODO: Make the background work with light/dark theme
    return (
      <ThemeProvider theme={theme(storybookTheme)}>
        <Story />
      </ThemeProvider>
    );
  },
];

/**
 * (thuang): This is a temporary fix for the Storybook addon to work with
 * `storybook-addon-pseudo-states` plugin
 * https://github.com/chromaui/storybook-addon-pseudo-states/issues/59#issuecomment-1498182067
 */
const preview = {
  globalTypes: {
    pseudo: {},
    theme: {
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            title: 'Theme',
            icon: 'circlehollow',
            dynamicTitle: true,
            items: [
                { value: 'light', left: '☀️', title: 'Light mode' },
                { value: 'dark', left: '🌙', title: 'Dark mode' },
            ],
        },
    },
  },
};

export default preview;
