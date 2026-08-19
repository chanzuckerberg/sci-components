import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

import { playwright } from "@vitest/browser-playwright";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [
      /**
       * The playground's pure helpers — URL encoding and the module runner —
       * which are the parts of it worth pinning without a browser. The story
       * itself is covered by the Storybook project below.
       */
      {
        extends: true,
        test: {
          name: "playground",
          environment: "jsdom",
          include: ["playground/**/*.test.ts"],
        },
      },
      /**
       * The documentation's own consistency checks: the parts of the docs that
       * describe the libraries rather than render them, and so can fall behind
       * a component being added or renamed. No browser, no components — these
       * read the repo off disk.
       */
      {
        extends: true,
        test: {
          name: "docs-kit",
          environment: "node",
          include: ["docs-kit/**/*.test.ts"],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
