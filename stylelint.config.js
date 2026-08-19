module.exports = {
  extends: ["stylelint-config-recommended"],
  ignoreFiles: [
    // (thuang): Ignore `venv` folder
    "packages/**/venv/**/*",
    "packages/**/dist/**/*",
  ],
  overrides: [
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      customSyntax: "postcss-styled-syntax",
      rules: {
        // Files without styled/css template literals are empty to this parser.
        "no-empty-source": null,
      },
    },
  ],
};
