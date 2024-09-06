const { plugins } = require("axe-core");

module.exports = {
  stories: [
    "../packages/components/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/data-viz/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  core: {
    disableWhatsNewNotifications: true,
  },

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/react",
    "storybook-addon-pseudo-states",
    "@geometricpanda/storybook-addon-badges",
    "@storybook/addon-webpack5-compiler-swc",
    "@chromatic-com/storybook",
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },

  swc: () => ({
    jsc: {
      /**
       * (masoudmanson): This is needed to enable emotion plugin for swc
       * for use cases like component selectors in styled components
       *
       * for example:
       *
       * const StyledChild = styled.div` color: red; `;
       *
       * const StyledParent = styled.div` ${StyledChild} { color: green; } `;
       */
      experimental: {
        plugins: [["@swc/plugin-emotion", {}]],
      },
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),

  typescript: {
    reactDocgen: "react-docgen",
  },
};
