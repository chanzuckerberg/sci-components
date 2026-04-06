import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import del from "rollup-plugin-delete";
import ts from "rollup-plugin-ts";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import pkg from "./package.json" with { type: "json" };

const peerDeps = Object.keys(pkg.peerDependencies || {});

const config = [
  {
    // External dependencies that should not be bundled into the output to reduce bundle size.
    external: (id) => {
      return peerDeps.some(dep => id === dep || id.startsWith(dep + '/'));
    },

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
    // Suppress "use client" directive warnings from MUI
    onwarn(warning, warn) {
      if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
        return;
      }
      warn(warning);
    },
    plugins: [
      // Handles resolving external dependencies from `node_modules`.
      resolve({
        // Only resolve JavaScript/TypeScript files, not .d.ts/.d.mts declaration files
        extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx'],
        // Exclude 'types' condition to prevent resolving .d.mts files
        exportConditions: ['import', 'module', 'default']
      }),

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

      // Add `target` to styled components so component selectors work
      // in non-webpack bundlers (Vite/esbuild) without requiring consumers
      // to run the Emotion plugin themselves.
      babel({
        babelHelpers: "bundled",
        babelrc: false,
        configFile: false,
        plugins: [["@emotion/babel-plugin", { sourceMap: false, autoLabel: "never" }]],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
    ],
  },
];

export default config;