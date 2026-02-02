import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import bundleScss from "rollup-plugin-bundle-scss";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import del from "rollup-plugin-delete";
import ts from "rollup-plugin-ts";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json" with { type: "json" };

const config = [
  {
    // External dependencies that should not be bundled into the output to reduce bundle size.
    external: (id) => {
      // Externalize peer dependencies
      const peerDeps = Object.keys(pkg.peerDependencies || {});
      if (peerDeps.some(dep => id === dep || id.startsWith(dep + '/'))) {
        return true;
      }
      // Externalize react/jsx-runtime
      if (id === 'react/jsx-runtime') {
        return true;
      }
      // Externalize packages that cause .d.mts resolution issues
      if (id === 'clsx' || id.startsWith('@emotion/') || id.startsWith('@mui/')) {
        return true;
      }
      return false;
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
        targets: ["dist/*", "playground/src/components"],
      }),

      // Allow imports for assets like images, fonts, etc., and handle them properly.
      url(),

      // Transform imported SVGs into React components.
      svgr(),

      // Extract CSS into a single file (variables.css).
      css({ output: "variables.css" }),

      // Bundle SCSS into a single output file (variables.scss).
      bundleScss({ output: "variables.scss" }),

      // Copy tailwind variables into the `dist` folder.
      copy({
        targets: [
          {
            dest: "./dist",
            src: "./src/common/styles-dictionary/json/tailwind.json",
          },
        ],
      }),

      // Handle TypeScript compilation with custom configurations.
      ts({
        tsconfig: (resolvedConfig) => ({
          ...resolvedConfig,
          // Exclude SCSS and CSS files from TypeScript's scope.
          exclude: ["**/*.scss", "**/*.css"],
          // Use ES2015+ target to preserve native template literals and avoid
          // __makeTemplateObject helper which causes illegal escape sequence errors
          target: "ES2015",
        })
      }),
    ],
  },
];

export default config;