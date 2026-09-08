import CssBaseline from "@mui/material/CssBaseline";
import { Theme } from "../packages/components/src/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import { create } from "storybook/theming";
import { FONT_BASE } from "./sds-theme";

/**
 * Documentation pages render in the preview iframe, which never sees the theme
 * the manager is configured with, so Storybook dresses their prose in its own
 * Nunito Sans. It sets the typeface on the elements themselves — `p`, `li`, a
 * table cell — which no amount of inheriting from a page's own container can
 * outrank, so it is answered here, where the pages take their theme from.
 *
 * Only the typeface is ours. Everything else the docs blocks are dressed in —
 * link colour, the frame around a code block — is Storybook's default light
 * theme, and is left alone.
 */
const docsTheme = create({ base: "light", fontBase: FONT_BASE });

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

    docs: { theme: docsTheme },

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
          "Overview",
          "Playground",
          "Bases",
          "Components",
          ["Overview", "*"],
          "Data Viz",
          ["Overview", "*"],
          "Icons",
          ["Overview", "Custom Icons", "Migrating from Icon", "*"],
          "MCP Server",
          [
            "Overview",
            "Installation",
            "Tools and Resources",
            "Testing with the Inspector",
            "*",
          ],
          "Design Documentation",
          [
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
          "Deprecated",
          ["Overview", "*"],
        ],
      },
    },

    a11y: {
      /**
       * Rules that ask a component to be a whole page. A story renders one
       * component into an empty frame, so there is no landmark to skip to, no
       * main region and no first heading, and a complaint about any of them
       * says nothing about the component. These are the three the accessibility
       * suite that came before this one turned off, kept for the same reason;
       * `region`, the fourth, the addon already disables for us.
       *
       * None of the three reports anything today — the addon scopes each run to
       * the story rather than the document, which rules `bypass` out entirely —
       * so this is here to keep a story that grows a page-like shape from being
       * failed for it, rather than to silence anything now.
       *
       * They belong under `options` rather than `config`, and the distinction
       * matters: Storybook merges parameters object by object but replaces
       * arrays wholesale, so a story naming its own `config.rules` would drop
       * these on the floor. `options.rules` is an object, so it survives.
       */
      options: {
        rules: {
          bypass: { enabled: false },
          "landmark-one-main": { enabled: false },
          "page-has-heading-one": { enabled: false },
        },
      },
      // 'error' - fail CI on a11y violations
      // 'todo' - show a11y violations in the test UI only
      // 'off' - skip a11y checks entirely
      test: "error",
    },
  },

  tags: ["!autodocs"],
};
export default preview;
