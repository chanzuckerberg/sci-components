import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";
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

// Rolldown transpiles TypeScript/JSX natively via Oxc.
const transform = { target: "es2015" };

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

// Shared rolldown-plugin-dts options:
// - `eager` loads every file from tsconfig so ambient/global declarations are in
//   scope while emitting per-file declarations (otherwise globals are reported as
//   private names, TS4033/TS4081).
// - `noEmitOnError: false` still emits declarations even when TypeScript reports
//   diagnostics, matching the previous rollup-plugin-ts behavior (type-checking
//   is enforced separately via `tsc` / CI).
const dtsOptions = { compilerOptions: { noEmitOnError: false }, eager: true };

/**
 * The package's public entry points: the barrel, plus one per component.
 *
 * Building each component as its own entry gives consumers a graph limited to
 * what that component reaches.
 */
const entryModules = {
  GenomeTrack: "src/entries/GenomeTrack.ts",
  HeatmapChart: "src/entries/HeatmapChart.ts",
  ProteinStructureViewer: "src/entries/ProteinStructureViewer.ts",
  StackedBarChart: "src/entries/StackedBarChart.ts",
  colorScales: "src/entries/colorScales.ts",
  index: "src/index.ts",
};

/** Entry map for one format, e.g. `{ "index.esm": ..., "GenomeTrack.esm": ... }`. */
const inputsFor = (format) =>
  Object.fromEntries(
    Object.entries(entryModules).map(([name, module]) => [
      `${name}.${format}`,
      module,
    ])
  );

export default defineConfig([
  // ESM build: emits <entry>.esm.js (+ "use client") and <entry>.esm.d.ts.
  {
    external,
    input: inputsFor("esm"),
    onwarn,
    output: {
      banner: useClientBanner,
      chunkFileNames: "shared/[name].esm.js",
      dir: "dist",
      entryFileNames: "[name].js",
      format: "esm",
    },
    plugins: [
      // Clean up the `dist` folder and any other specified paths before building.
      del({
        targets: ["dist/*", "playground/src/data-viz"],
      }),
      // Transform imported SVGs into React components.
      svgr(),
      // Allow imports for assets like images, fonts, etc.
      url(),
      dts(dtsOptions),
    ],
    transform,
  },
  // CJS build: emits <entry>.cjs.js (+ "use client"). Declarations are emitted
  // in a separate pass because rolldown-plugin-dts cannot run during a
  // cjs-format build.
  {
    external,
    input: inputsFor("cjs"),
    onwarn,
    output: {
      banner: '"use client";',
      chunkFileNames: "shared/[name].cjs.js",
      dir: "dist",
      entryFileNames: "[name].js",
      exports: "named",
      format: "cjs",
    },
    plugins: [svgr(), url()],
    transform,
  },
  // CJS declarations: emit <entry>.cjs.d.ts via an esm-format, dts-only pass.
  {
    external,
    input: inputsFor("cjs"),
    onwarn,
    output: {
      chunkFileNames: "shared/[name].cjs.js",
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
