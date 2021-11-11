import svgr from "@svgr/rollup";
import ts from "@wessberg/rollup-plugin-ts";
import del from "rollup-plugin-delete";
import pkg from "./package.json";
import url from "@rollup/plugin-url";
import css from "rollup-plugin-css-only";
import bundleScss from "rollup-plugin-bundle-scss";

const config = [
  {
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      "@material-ui/core/styles",
      "@material-ui/core/Popper",
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
    ],
  },
];

export default config;
