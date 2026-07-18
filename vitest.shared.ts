import babel from "@rolldown/plugin-babel";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

const currentDir = dirname(fileURLToPath(import.meta.url));

const COMPONENTS_SRC = resolve(currentDir, "packages/components/src");
const DATA_VIZ_SRC = resolve(currentDir, "packages/data-viz/src");
const SETUP_FILE = resolve(currentDir, "vitest.setup.ts");

const ASSET_EXTENSION_RE =
  /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/;

/**
 * (migration): Test-only port of the Jest `fileTransformer.js`.
 *
 * SVGs are imported as `import { ReactComponent as IconFoo } from "...".svg`.
 * Tests assert on the `data-testid`/`data-file-name` attributes that the Jest
 * transform injected (e.g. `screen.getByTestId("IconGithubSmall")`), which
 * `vite-plugin-svgr` does NOT provide. This plugin reproduces that stub so the
 * test suite behaves identically under Vitest. Other static assets export their
 * basename string, matching the previous Jest behavior.
 */
function sdsTestAssetStub(): Plugin {
  return {
    name: "sds-test-asset-stub",
    enforce: "pre",
    load(id) {
      const cleanId = id.split("?")[0];
      if (!ASSET_EXTENSION_RE.test(cleanId)) return null;

      const base = cleanId.split("/").pop() ?? "";

      if (!cleanId.endsWith(".svg")) {
        return `export default ${JSON.stringify(base)};`;
      }

      const name = base
        .replace(/\.svg$/, "")
        .split(/\W+/)
        .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join("");

      return `
        import React from "react";
        export function ReactComponent(props) {
          return React.createElement(
            "svg",
            Object.assign({}, props, {
              "data-file-name": ${JSON.stringify(name)},
              "data-testid": ${JSON.stringify(name)},
            })
          );
        }
        export default ${JSON.stringify(base)};
      `;
    },
  };
}

/**
 * Shared Vitest config factory for the workspace packages.
 *
 * Reuses the Storybook/Vite pipeline (Emotion compile-time transform before the
 * React transform) so components render identically to Storybook.
 *
 * @param packageRoot Absolute path to the package whose tests are being run.
 */
export function createVitestConfig(packageRoot: string) {
  return defineConfig({
    plugins: [
      /**
       * Emotion's compile-time transform must run before the React transform so
       * styled-component selectors, labels, and source maps work. Matches
       * `.storybook/main.ts`.
       */
      babel({
        plugins: ["@emotion/babel-plugin"],
      }),
      react(),
      sdsTestAssetStub(),
    ],
    resolve: {
      /**
       * Array form (not an object map) so the per-package `@components/src` /
       * `@data-viz/src` path aliases can use RegExp prefixes, mirroring the
       * tsconfig `paths` mappings and the Storybook Vite aliases. The `@czi-sds/*`
       * aliases resolve the published package names to source for tests only.
       */
      alias: [
        { find: /^@components\/src\//, replacement: `${COMPONENTS_SRC}/` },
        { find: /^@data-viz\/src\//, replacement: `${DATA_VIZ_SRC}/` },
        { find: "@czi-sds/components", replacement: COMPONENTS_SRC },
        { find: "@czi-sds/data-viz", replacement: DATA_VIZ_SRC },
      ],
    },
    test: {
      root: packageRoot,
      environment: "jsdom",
      globals: true,
      /**
       * (v9): Process MUI and react-transition-group through Vite instead of
       * letting Node's native ESM loader resolve them. MUI v9's ESM build does a
       * directory import (`react-transition-group/TransitionGroupContext`) that
       * Node's ESM resolver rejects ("Directory import is not supported"); Vite's
       * resolver handles it. Inlining these deps fixes the test module loading.
       */
      server: {
        deps: {
          inline: [/@mui\//, /react-transition-group/],
        },
      },
      setupFiles: [SETUP_FILE],
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/*.namespace-test.*",
        "**/__storybook__/**",
      ],
    },
  });
}
