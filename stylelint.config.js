module.exports = {
  extends: "stylelint-config-recommended",
  ignoreFiles: [
    // (thuang): Ignore `venv` folder
    "packages/**/venv/**/*",
    "packages/**/dist/**/*",
  ],
};
