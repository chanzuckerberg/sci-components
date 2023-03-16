// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
module.exports = require("babel-jest").createTransformer({
  plugins: ["@emotion"],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    "@babel/react",
  ],
});
