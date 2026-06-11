import babel from "@rolldown/plugin-babel";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import pkg from "./package.json" with { type: "json" };

// External dependencies that should not be bundled into the output to reduce bundle size.
const external = (id) => {
  // Externalize the entire MUI scope. Peer deps only list the top-level MUI
  // packages, but their types transitively reference siblings like
  // `@mui/system` and `@mui/utils`. From v6 onward those packages' `.d.ts`
  // files use `export { default } from "..."` re-exports that the declaration
  // bundler cannot inline, so they must stay external (consumers receive them
  // transitively via `@mui/material`).
  if (id === "@mui" || id.startsWith("@mui/")) return true;
  // Externalize peer dependencies
  const peerDeps = Object.keys(pkg.peerDependencies || {});
  return peerDeps.some((dep) => id === dep || id.startsWith(dep + "/"));
};

// Rolldown transpiles TypeScript/JSX natively via Oxc. Target ES2015+ to
// preserve native template literals and avoid the __makeTemplateObject helper
// which causes illegal escape sequence errors.
const transform = { target: "es2015" };

// CSS/SCSS are side-effect imports in src/index.ts that ship as standalone
// files (variables.css / variables.scss). Rolldown dropped CSS bundling
// support, so we treat these extensions as empty modules and copy the generated
// style-dictionary output into dist below (mirroring the previous
// rollup-plugin-css-only / rollup-plugin-bundle-scss behavior).
const moduleTypes = { ".css": "empty", ".scss": "empty" };

// Suppress "use client" directive warnings from MUI.
const onwarn = (warning, warn) => {
  if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
    return;
  }
  warn(warning);
};

// Ensure "use client" is added at the top of each JS output file, but never to
// the generated .d.ts files.
const useClientBanner = (chunk) =>
  chunk.fileName.endsWith(".js") ? '"use client";' : "";

// Run @emotion/babel-plugin BEFORE Rolldown's native transform so it sees the
// original styled() calls and can add component selector targets. Mirrors the
// Storybook/Vitest pipeline (.storybook/main.ts, vitest.shared.ts).
const emotionBabel = () =>
  babel({
    plugins: [
      ["@emotion/babel-plugin", { autoLabel: "never", sourceMap: false }],
    ],
  });

// Shared rolldown-plugin-dts options:
// - `eager` loads every file from tsconfig so ambient/global declarations (e.g.
//   the `*.svg` module and `CustomSVGProps` in src/common/types/svg.d.ts) are in
//   scope while emitting per-file declarations. Without it those globals are seen
//   as private names (TS4033/TS4081).
// - `noEmitOnError: false` still emits declarations even when TypeScript reports
//   diagnostics, matching the previous rollup-plugin-ts `transpileOnly` behavior
//   (type-checking is enforced separately via `tsc` / CI).
const dtsOptions = { compilerOptions: { noEmitOnError: false }, eager: true };

export default defineConfig([
  // ESM build: emits index.esm.js (+ "use client") and index.esm.d.ts, plus the
  // shipped style assets (variables.css, variables.scss, tailwind.json).
  {
    external,
    input: { "index.esm": "src/index.ts" },
    moduleTypes,
    onwarn,
    output: {
      banner: useClientBanner,
      dir: "dist",
      entryFileNames: "[name].js",
      format: "esm",
    },
    plugins: [
      // Clean up the `dist` folder and any other specified paths before building.
      del({
        targets: ["dist/*", "playground/src/components"],
      }),
      emotionBabel(),
      // Transform imported SVGs into React components.
      svgr(),
      // Allow imports for assets like images, fonts, etc.
      url(),
      // Copy generated style assets into the `dist` folder.
      copy({
        targets: [
          {
            dest: "./dist",
            src: "./src/common/styles-dictionary/json/tailwind.json",
          },
          {
            dest: "./dist",
            src: "./src/common/styles-dictionary/css/variables.css",
          },
          {
            dest: "./dist",
            rename: "variables.scss",
            src: "./src/common/styles-dictionary/scss/_variables.scss",
          },
        ],
      }),
      dts(dtsOptions),
    ],
    transform,
  },
  // CJS build: emits index.cjs.js (+ "use client"). Declarations are emitted in
  // a separate pass because rolldown-plugin-dts cannot run during a cjs-format
  // build.
  {
    external,
    input: { "index.cjs": "src/index.ts" },
    moduleTypes,
    onwarn,
    output: {
      banner: '"use client";',
      dir: "dist",
      entryFileNames: "[name].js",
      exports: "named",
      format: "cjs",
    },
    plugins: [emotionBabel(), svgr(), url()],
    transform,
  },
  // CJS declarations: emit index.cjs.d.ts via an esm-format, dts-only pass.
  {
    external,
    input: { "index.cjs": "src/index.ts" },
    moduleTypes,
    onwarn,
    output: {
      dir: "dist",
      entryFileNames: "[name].js",
      format: "esm",
    },
    plugins: [
      svgr(),
      url(),
      dts({ ...dtsOptions, emitDtsOnly: true }),
    ],
    transform,
  },
]);
