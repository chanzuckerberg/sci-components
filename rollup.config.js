import svgr from "@svgr/rollup";
import ts from "@wessberg/rollup-plugin-ts";
import del from "rollup-plugin-delete";
import pkg from "./package.json";
import url from "@rollup/plugin-url";

const config = [
  {
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      "@material-ui/core/styles",
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
    ],
  },
];

export default config;
