import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import del from "rollup-plugin-delete";
import ts from "rollup-plugin-ts";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json" assert { type: "json" };

const config = [
  {
    // External dependencies that should not be bundled into the output to reduce bundle size.
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      "react/jsx-runtime"
    ],

    // Entry point for the library
    input: "src/index.ts",

    // Output configuration for the CommonJS (CJS) and ESModule (ESM) formats.
    output: [
      {
        // Ensures "use client" is added at the top of each output file.
        banner: "\"use client\";",
        file: pkg.main,
        format: "cjs",
        interop: "auto"
      },
      {
        // Ensures "use client" is added at the top of each output file.
        banner: "\"use client\";",
        file: pkg.module,
        format: "esm",
        interop: "auto"
      },
    ],
    plugins: [
      // Handles resolving external dependencies from `node_modules`.
      resolve(),

      // Convert CommonJS modules (especially from `node_modules`) to ES6.
      commonjs(),

      // Clean up the `dist` folder and any other specified paths before building.
      del({
        targets: ["dist/*", "playground/src/data-viz"],
      }),

      // Allow imports for assets like images, fonts, etc., and handle them properly.
      url(),

      // Transform imported SVGs into React components.
      svgr(),

      // Handle TypeScript compilation with custom configurations.
      ts({
        tsconfig: (resolvedConfig) => ({
          ...resolvedConfig,
          // Exclude SCSS and CSS files from TypeScript's scope.
          exclude: ["**/*.scss", "**/*.css"]
        })
      }),
    ],
  },
];

export default config;