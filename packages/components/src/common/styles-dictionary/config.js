require("./tailwindFormat");

module.exports = {
  platforms: {
    css: {
      buildPath: "src/common/styles-dictionary/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
      options: {
        showFileHeader: false,
      },
      transformGroup: "css",
    },
    js: {
      buildPath: "src/common/styles-dictionary/json/",
      files: [
        {
          destination: "tailwind.json",
          format: "tailwind",
          options: {
            prefix: "sds",
            remapNames: {
              cornerL: "L",
              cornerM: "M",
              cornerNone: "none",
              cornerS: "S",
              shadowL: "L",
              shadowM: "M",
              shadowS: "S",
            },
          },
        },
      ],
      options: {
        showFileHeader: false,
      },
      transformGroup: "js",
    },
    scss: {
      buildPath: "src/common/styles-dictionary/scss/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
        },
      ],
      options: {
        showFileHeader: false,
      },
      transformGroup: "scss",
    },
  },
  source: ["src/common/styles-dictionary/design-tokens/*.json"],
};
