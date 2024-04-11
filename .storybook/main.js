import { dirname, join } from "path";
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
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/react"),
    getAbsolutePath("storybook-addon-pseudo-states"),
    getAbsolutePath("@geometricpanda/storybook-addon-badges"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  // (masoudmanson): The latest update of Storybook version 7 now features
  // a new Docs tab, in addition to the Default, Live Preview, and Test Stories.
  // In order to align with our project requirements, we have set the auto Docs
  // tab to a value of "false" as we do not currently require its functionality.
  docs: {
    autodocs: false,
  },
};
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
