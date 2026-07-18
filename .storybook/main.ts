// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from "@storybook/react-vite";
import babel from "@rolldown/plugin-babel";
import { createRequire } from "module";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import type { Plugin } from "vite";

const require = createRequire(import.meta.url);
const currentDir = dirname(fileURLToPath(import.meta.url));

const COMPONENTS_SRC = resolve(currentDir, "../packages/components/src");
const DATA_VIZ_SRC = resolve(currentDir, "../packages/data-viz/src");

const config: StorybookConfig = {
  stories: [
    "../packages/components/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/data-viz/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  core: {
    disableWhatsNewNotifications: true,
  },

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("storybook-addon-pseudo-states"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("storybook-addon-tag-badges"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite") as "@storybook/react-vite",
    options: {},
  },

  typescript: {
    reactDocgen: false,
  },

  docs: {},

  viteFinal: async (viteConfig) => {
    /**
     * Remove the React plugin that `@storybook/react-vite` adds automatically so
     * we control the plugin ordering ourselves (the Emotion transform must run
     * before the React/oxc transform).
     */
    viteConfig.plugins = (viteConfig.plugins ?? []).flat().filter((plugin) => {
      const name =
        plugin && typeof plugin === "object" && "name" in plugin
          ? (plugin as Plugin).name
          : undefined;
      return !(typeof name === "string" && name.startsWith("vite:react"));
    });

    viteConfig.plugins.push(
      /**
       * Apply Emotion's compile-time transform so styled-component selectors
       * (e.g. `${StyledChild} { ... }`), labels, and source maps work. This
       * replaces the previous SWC `@swc/plugin-emotion` setup. `@vitejs/plugin-react`
       * v6 dropped Babel support (Vite 8 uses oxc), so we run `@emotion/babel-plugin`
       * via `@rolldown/plugin-babel`, which must run before the React plugin.
       * The plugin auto-configures Babel's parser for `.ts`/`.tsx` files.
       */
      babel({
        plugins: ["@emotion/babel-plugin"],
      }),
      react(),
      svgr({
        include: "**/*.svg",
        svgrOptions: {
          exportType: "named",
          ref: true,
          titleProp: true,
        },
      })
    );

    /**
     * Resolve cross-referenced workspace packages and the per-package
     * `@components/src` / `@data-viz/src` path aliases to their source so
     * Storybook does not depend on prebuilt `dist` output (mirrors the tsconfig
     * `paths` mappings). The `@czi-sds/*` aliases map the published package names
     * to source for dev/test only; they are distinct from the internal aliases
     * (e.g. cross-package imports are externalized in the production build).
     */
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = [
      ...normalizeAlias(viteConfig.resolve.alias),
      { find: /^@components\/src\//, replacement: `${COMPONENTS_SRC}/` },
      { find: /^@data-viz\/src\//, replacement: `${DATA_VIZ_SRC}/` },
      { find: "@czi-sds/components", replacement: COMPONENTS_SRC },
      { find: "@czi-sds/data-viz", replacement: DATA_VIZ_SRC },
    ];

    /**
     * (migration): Force Vite's dependency pre-bundling to crawl every story up
     * front. Under the `@storybook/addon-vitest` browser runner, stories are
     * imported dynamically per-test, so the initial dep scan misses deps that
     * only certain heavy stories pull in (e.g. ECharts, react-table, deep MUI
     * submodules). Those deps are then optimized mid-run, which makes Vite reload
     * and breaks in-flight dynamic imports with "Failed to fetch dynamically
     * imported module" (most visible on a cold cache, e.g. CI). Seeding
     * `optimizeDeps.entries` with the stories glob pre-bundles everything in the
     * first pass. See storybookjs/storybook#34042 and vitest-dev/vitest#8471.
     */
    viteConfig.optimizeDeps = viteConfig.optimizeDeps ?? {};
    const existingEntries = viteConfig.optimizeDeps.entries;
    const normalizedEntries =
      existingEntries === undefined
        ? []
        : Array.isArray(existingEntries)
          ? existingEntries
          : [existingEntries];
    viteConfig.optimizeDeps.entries = [
      ...normalizedEntries,
      `${COMPONENTS_SRC}/**/*.stories.@(js|jsx|ts|tsx)`,
      `${DATA_VIZ_SRC}/**/*.stories.@(js|jsx|ts|tsx)`,
    ];
    /**
     * Pre-bundle bare-import subpaths that Vite's scanner cannot reach by
     * crawling source/stories alone, so they aren't optimized mid-run. Notably
     * `@emotion/styled` resolves to its `/base` entry at runtime, which would
     * otherwise be discovered late and trigger a reload.
     */
    viteConfig.optimizeDeps.include = [
      ...(viteConfig.optimizeDeps.include ?? []),
      "@emotion/styled/base",
    ];

    return viteConfig;
  },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

type AliasEntry = { find: string | RegExp; replacement: string };

/**
 * Vite's `resolve.alias` may be an object map or an array of `{ find, replacement }`
 * entries. Normalize whatever Storybook provides into the array form so we can
 * safely append regex-based aliases (object maps don't support RegExp keys).
 */
function normalizeAlias(alias: unknown): AliasEntry[] {
  if (!alias) return [];
  if (Array.isArray(alias)) return alias as AliasEntry[];
  return Object.entries(alias as Record<string, string>).map(
    ([find, replacement]) => ({ find, replacement })
  );
}
