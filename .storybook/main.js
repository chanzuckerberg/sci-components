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
