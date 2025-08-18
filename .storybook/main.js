import { dirname, join } from "path";
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
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/react"),
    getAbsolutePath("storybook-addon-pseudo-states"),
    getAbsolutePath("@geometricpanda/storybook-addon-badges"),
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
    getAbsolutePath("@chromatic-com/storybook"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
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
      parser: {
        syntax: "typescript",
        tsx: true,
        jsx: true,
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

  docs: {},
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
