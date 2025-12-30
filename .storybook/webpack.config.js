const path = require("path");

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    src: [
      path.resolve(__dirname, "../packages/components/src"),
      path.resolve(__dirname, "../packages/data-viz/src"),
    ],

    /**
     * (masoudmanson): Due to a Storybook build issue in production mode, where importing
     * cross-referenced workspace packages fails, this workaround involves falling back
     * to the source code of the affected packages. This is a temporary solution until the
     * underlying issue is resolved in Storybook.
     * Resolving monorepo packages in this manner necessitates a custom SCSS loader for
     * .sss files, as the src/index.ts file of each package includes an import link to the
     * style-dictionary variable files.
     */
    "@czi-sds/components": path.resolve(
      __dirname,
      "../packages/components/src"
    ),
    "@czi-sds/data-viz": path.resolve(__dirname, "../packages/data-viz/src"),
  };

  // remove svg from existing rule
  config.module.rules = config.module.rules.map((rule) => {
    if (
      String(rule.test) ===
      String(
        /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/
      )
    ) {
      return {
        ...rule,
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
      };
    }

    return rule;
  });

  // use svgr for svg files
  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack", "url-loader"],
    type: "javascript/auto",
    issuer: {
      and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
    },
  });

  /**
   * (masoudmanson): Add a custom SCSS loader for .sss files, as the src/index.ts file of
   * each package includes an import link to the style-dictionary variable files.
   */
  config.module.rules.push({
    test: /\.scss$/,
    use: ["sass-loader"],
  });

  return config;
};
