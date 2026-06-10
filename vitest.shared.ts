import babel from "@rolldown/plugin-babel";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

const currentDir = dirname(fileURLToPath(import.meta.url));

const COMPONENTS_SRC = resolve(currentDir, "packages/components/src");
const DATA_VIZ_SRC = resolve(currentDir, "packages/data-viz/src");
const SETUP_FILE = resolve(currentDir, "vitest.setup.ts");

/**
 * (migration): Mirrors the `sdsSrcResolver` plugin in `.storybook/main.ts`.
 *
 * Replicates the previous webpack `resolve.alias.src` (and Jest
 * `moduleDirectories: ["node_modules", "<rootDir>"]`) behavior: a `src/...`
 * import resolves against the package that owns the importing file first, then
 * the remaining roots.
 */
function sdsSrcResolver(): Plugin {
  const roots = [COMPONENTS_SRC, DATA_VIZ_SRC];

  return {
    name: "sds-src-alias",
    enforce: "pre",
    async resolveId(source, importer) {
      if (source !== "src" && !source.startsWith("src/")) return null;

      const sub = source === "src" ? "" : source.slice("src/".length);

      const ordered = importer
        ? [...roots].sort((a, b) => {
            const aOwns = importer.startsWith(a) ? 0 : 1;
            const bOwns = importer.startsWith(b) ? 0 : 1;
            return aOwns - bOwns;
          })
        : roots;

      for (const root of ordered) {
        const candidate = sub ? join(root, sub) : root;
        const resolved = await this.resolve(candidate, importer, {
          skipSelf: true,
        });
        if (resolved) return resolved;
      }

      return null;
    },
  };
}

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
      sdsSrcResolver(),
    ],
    resolve: {
      alias: {
        "@czi-sds/components": COMPONENTS_SRC,
        "@czi-sds/data-viz": DATA_VIZ_SRC,
      },
    },
    test: {
      root: packageRoot,
      environment: "jsdom",
      globals: true,
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
