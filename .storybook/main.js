const path = require("path");
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
  features: {
    // (thuang): https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#emotion11-quasi-compatibility
    emotionAlias: false,
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-emotion-theme",
  ],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          // (thuang): Temp fix for Github issue:
          // https://github.com/storybookjs/storybook/issues/10231#issuecomment-728038867
          ...config.resolve.alias,
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
        },
      },
    };
  },
};
