const path = require("path");
const toPath = (filePath) => path.join(process.cwd(), filePath);
module.exports = {
  // Storybook version 7 needs babel config
  babel: (config) => {
    return {
      ...config,
      presets: [
        "@babel/preset-env",
        "@babel/preset-typescript",
        [
          "@babel/preset-react",
          {
            runtime: "automatic",
          },
        ],
      ],
      plugins: [],
    };
  },
  features: {
    buildStoriesJson: true,
    // (thuang): https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#emotion11-quasi-compatibility
    emotionAlias: false,
  },
  stories: [
    "../packages/components/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/data-viz/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/react",
    "storybook-addon-pseudo-states",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
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
  // (masoudmanson): The latest update of Storybook version 7 now features
  // a new Docs tab, in addition to the Default, Live Preview, and Test Stories.
  // In order to align with our project requirements, we have set the auto Docs
  // tab to a value of "false" as we do not currently require its functionality.
  docs: {
    autodocs: false,
  },
};
