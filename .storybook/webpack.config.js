const path = require("path");

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    src: [
      path.resolve(__dirname, "../packages/components/src"),
      path.resolve(__dirname, "../packages/data-viz/src"),
    ],
  };

  // Redirect module requests when normal resolving fails.
  config.resolve.fallback = {
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

  // use style-loader and css-loader for style-dictionary css/scss files
  config.module.rules.push({
    test: /\.(css|scss)$/,
    use: ["style-loader", "css-loader"],
  });

  return config;
};
