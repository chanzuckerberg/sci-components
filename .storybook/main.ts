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
const DOCS_KIT = resolve(currentDir, "../docs-kit");

const config: StorybookConfig = {
  stories: [
    /**
     * Per-component code documentation, attached to each component's stories.
     * It is listed first on purpose: `storySort` treats entries that share a
     * title as equal, so the sidebar falls back to indexing order within a
     * component, and this is what puts "Documentation" above the stories.
     */
    "../packages/components/src/**/__storybook__/docs/*.mdx",
    "../packages/components/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/data-viz/src/**/__storybook__/docs/*.mdx",
    "../packages/data-viz/src/**/*.stories.@(js|jsx|ts|tsx)",
    // Standalone design pages: the foundations, and the design half of each
    // component's documentation.
    "../design-docs/**/*.mdx",
    // Guide to the MCP server, kept in the package it documents.
    "../packages/mcp/docs/**/*.mdx",
    // The live code playground the docs' examples link out to.
    "../playground/*.stories.tsx",
    /**
     * A story per documentation page, written from the pages themselves by
     * `docs-kit/scripts/generate-doc-snapshots.mjs` before Storybook starts or
     * builds. Chromatic snapshots stories and not `docs` entries, so this is
     * what puts the documentation in front of a visual review. They are hidden
     * from the sidebar, the pages above being the ones to read.
     */
    "../docs-kit/generated/*.stories.tsx",
  ],

  staticDirs: [
    // The images the docs reference are committed alongside them.
    { from: "../design-docs/assets", to: "/design-assets" },
    /**
     * Type definitions for the playground's editor. Fetched rather than
     * bundled: they are generated from a package build, and a playground that
     * would not open without one would be broken more often than it was
     * useful. See `playground/scripts/generate-types.mjs`.
     */
    { from: "../playground/generated", to: "/playground-types" },
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
      { find: /^@sds-docs\//, replacement: `${DOCS_KIT}/` },
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
      `${COMPONENTS_SRC}/**/__storybook__/docs/*.mdx`,
      `${DATA_VIZ_SRC}/**/__storybook__/docs/*.mdx`,
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
      /**
       * The playground imports Phosphor only once an example asks for it, which
       * is late by definition — and fifteen hundred icon modules is the last
       * thing to be optimizing mid-session, with the reload that follows.
       */
      "@phosphor-icons/react",
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
