import svgr from "@svgr/rollup";
import ts from "rollup-plugin-ts";
import del from "rollup-plugin-delete";
import pkg from "./package.json";
import url from "@rollup/plugin-url";
import css from "rollup-plugin-css-only";
import bundleScss from "rollup-plugin-bundle-scss";
import copy from "rollup-plugin-copy";

const config = [
  {
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      "@mui/material/Popper",
      "@mui/material/ToggleButton",
      "@mui/material/styles",
      "@mui/material/Autocomplete",
      "@mui/material/ToggleButtonGroup",
    ],
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "esm",
      },
    ],
    plugins: [
      del({
        targets: ["dist/*", "playground/src/components"],
      }),
      url(),
      svgr(),
      ts(),
      css({ output: "variables.css" }),
      bundleScss({ output: "variables.scss" }),
      copy({
        targets: [
          {
            src: "./src/common/styles-dictionary/json/tailwind.json",
            dest: "./dist",
          },
        ],
      }),
    ],
  },
];

export default config;
