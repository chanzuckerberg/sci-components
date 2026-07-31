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
    backgrounds: { disabled: true },

    options: {
      /**
       * Sidebar ordering. `order` is a nested list: after any name you may add
       * an array describing the order of its children, and `"*"` means "all
       * other (unlisted) items, alphabetically, go here". Items are matched by
       * their title segment (e.g. "Documentation" -> "Bases" -> "Colors").
       *
       * To reorder the Documentation pages, just move the lines below. Anything
       * you don't list still shows up (at the `"*"` position), so you only need
       * to list what you care about.
       */
      storySort: {
        method: "alphabetical",
        order: [
          "Design Documentation",
          [
            "Overview",
            "SDS Overview",
            [
              "Introduction",
              "Getting Started",
              "Contributing to SDS",
              "Element Status Tracker",
              "*",
            ],
            "Bases",
            [
              "Introduction to Bases",
              "Colors",
              "Typography",
              "Spacing",
              "Corners",
              "Borders",
              "Drop Shadows",
              "Icons",
              "Theming",
              "Responsive Design",
              "*",
            ],
            "Genes",
            [
              "Introduction to Genes",
              "Buttons",
              "Link",
              "Tags",
              "Tabs",
              "Tooltips",
              "Banner",
              "Intent",
              "Lists",
              "Field Inputs",
              "Control Inputs",
              "Dropdown Input",
              "Segmented Control",
              "Loading Indicators",
              "*",
            ],
            "DNA",
            [
              "Introduction to DNA",
              "Accordion",
              "Callout",
              "Content Card",
              "Dialog",
              "Dropdown Menu",
              "Filters",
              "Hero",
              "Navigation",
              "Notification",
              "Panel",
              "Table",
              "*",
            ],
            "Cells",
            ["Introduction to Cells", "Downloads", "Search", "*"],
            "*",
          ],
          "Bases",
          "Components",
          "Data Viz",
          "Deprecated",
        ],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },

  tags: ["!autodocs"],
};
export default preview;
