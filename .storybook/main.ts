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

/**
 * (migration): Replicates the previous webpack `resolve.alias.src` array behavior.
 *
 * In webpack, `src` resolved against multiple roots (components/src, data-viz/src).
 * Vite aliases cannot map a single key to multiple directories, so this plugin
 * mirrors the tsconfig `src/*` semantics: a `src/...` import is resolved against
 * the package that owns the importing file first, then the remaining roots.
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
      }),
      sdsSrcResolver()
    );

    /**
     * Resolve cross-referenced workspace packages to their source so Storybook
     * does not depend on prebuilt `dist` output (mirrors the previous webpack
     * alias workaround).
     */
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      "@czi-sds/components": COMPONENTS_SRC,
      "@czi-sds/data-viz": DATA_VIZ_SRC,
    };

    return viteConfig;
  },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}
