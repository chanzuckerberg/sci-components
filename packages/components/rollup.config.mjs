import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import bundleScss from "rollup-plugin-bundle-scss";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import del from "rollup-plugin-delete";
import ts from "rollup-plugin-ts";
import pkg from "./package.json" assert { type: "json" };

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
      /**
       * (thuang): https://github.com/wessberg/rollup-plugin-ts/issues/186
       * Please make sure complied d.ts file has default generic type as we have in the
       * source code.
       * e.g., the "button" should be in type ButtonProps<C extends React.ElementType = "button"> =
       * RawButtonProps<C, {component?: C;}> & SdsProps;
       * NOTE: `rollup-plugin-ts` + Typescript@4.7.x will drop default generic
       * type in the d.ts file, so let's use typescript@4.6 until the issue above is resolved
       */
      ts(),
      css({ output: "variables.css" }),
      bundleScss({ output: "variables.scss" }),
      copy({
        targets: [
          {
            dest: "./dist",
            src: "./src/common/styles-dictionary/json/tailwind.json",
          },
        ],
      }),
    ],
  },
];

export default config;
