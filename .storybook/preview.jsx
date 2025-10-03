import CssBaseline from "@mui/material/CssBaseline";
import { Theme } from "../packages/components/src/core/styles";
import { ThemeProvider } from "@mui/material/styles";

export const decorators = [
  (Story, context) => {
    const { theme: storybookTheme } = context.globals;

    return (
      <ThemeProvider theme={Theme(storybookTheme)}>
        {/* CssBaseline provides light/dark background MUI theme for all stories */}
        <CssBaseline />
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
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        dynamicTitle: true,
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
      },
    },
  },

  parameters: {
    // Removes the change background button since it's controlled by the theme toggle
    backgrounds: { disable: true },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Bases", "Components", "Data Viz", "Deprecated"],
      },
    },
  },

  tags: ["!autodocs"],
};
export default preview;
