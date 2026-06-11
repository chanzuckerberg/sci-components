import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import { defineConfig } from "rolldown";
import { dts } from "rolldown-plugin-dts";
import del from "rollup-plugin-delete";
import pkg from "./package.json" with { type: "json" };

// External dependencies that should not be bundled into the output to reduce bundle size.
const external = (id) => {
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

export default defineConfig([
  // ESM build: emits index.esm.js (+ "use client") and index.esm.d.ts.
  {
    external,
    input: { "index.esm": "src/index.ts" },
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
  // CJS build: emits index.cjs.js (+ "use client"). Declarations are emitted in
  // a separate pass because rolldown-plugin-dts cannot run during a cjs-format
  // build.
  {
    external,
    input: { "index.cjs": "src/index.ts" },
    onwarn,
    output: {
      banner: '"use client";',
      dir: "dist",
      entryFileNames: "[name].js",
      exports: "named",
      format: "cjs",
    },
    plugins: [svgr(), url()],
    transform,
  },
  // CJS declarations: emit index.cjs.d.ts via an esm-format, dts-only pass.
  {
    external,
    input: { "index.cjs": "src/index.ts" },
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
