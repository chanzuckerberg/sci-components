import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "esm" },
    ],
    plugins: [
      del({ targets: ["dist/*", "playground/src/components"] }),
      typescript(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
