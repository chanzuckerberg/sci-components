import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

const config = [
  {
    external: Object.keys(pkg.peerDependencies || {}),
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
        targets: ["playground/src/components"],
      }),
      typescript(),
    ],
  },
];

export default config;
