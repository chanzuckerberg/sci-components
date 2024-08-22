import CssBaseline from "@mui/material/CssBaseline";
import { Theme } from "../packages/components/src/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import { BADGE } from "../packages/components/src/common/storybook/storybookBadges";

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
    badgesConfig: {
      [BADGE.BETA]: {
        styles: {
          backgroundColor: "#F4F0F9",
          borderColor: "#7A41CE",
          borderRadius: 2,
          color: "#703CBE",
        },
        title: "Beta",
      },
      [BADGE.DEPRECATED]: {
        styles: {
          backgroundColor: "#FEF2F2",
          borderColor: "#DC132C",
          borderRadius: 2,
          color: "#C61128",
        },
        title: "Deprecated",
      },
      [BADGE.NEEDS_REVISION]: {
        styles: {
          backgroundColor: "#F8F8F8",
          borderColor: "#999999",
          borderRadius: 2,
          color: "#767676",
        },
        title: "Needs Revision",
      },
      [BADGE.STABLE]: {
        styles: {
          backgroundColor: "#ECF5F0",
          borderColor: "#3CB371",
          borderRadius: 2,
          color: "#349A61",
        },
        title: "Stable",
      },
      [BADGE.WIP]: {
        styles: {
          backgroundColor: "#FCF6EC",
          borderColor: "#F5A623",
          borderRadius: 2,
          color: "#D8921F",
        },
        title: "Work in progress",
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Bases", "Components", "Data Viz", "Deprecated"],
      },
    },
  },
};
export default preview;
