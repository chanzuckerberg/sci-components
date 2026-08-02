#!/usr/bin/env node

/**
 * Builds the type definitions the playground editor checks against, into
 * `playground/generated/types.json`.
 *
 * The bundle is a flat map of virtual file path to contents, which is exactly
 * what `monaco.typescript.typescriptDefaults.addExtraLib` takes — all the
 * shaping happens here so the runtime side stays a loop.
 *
 * Run: node playground/scripts/generate-types.mjs
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = resolve(ROOT, "playground/generated/types.json");

/**
 * Real declarations, copied in whole. React earns its place because every
 * example uses hooks and JSX; the two SDS packages because looking up a
 * component's props is most of what the playground is for.
 */
const DECLARATIONS = [
  ...[
    "index.d.ts",
    "global.d.ts",
    "jsx-runtime.d.ts",
    "jsx-dev-runtime.d.ts",
    "canary.d.ts",
    "experimental.d.ts",
  ].map((file) => ({
    from: `node_modules/@types/react/${file}`,
    to: `file:///node_modules/@types/react/${file}`,
  })),
  // Pulled in by @types/react, which imports them by name.
  {
    from: "node_modules/csstype/index.d.ts",
    to: "file:///node_modules/csstype/index.d.ts",
  },
  {
    from: "node_modules/@types/prop-types/index.d.ts",
    to: "file:///node_modules/@types/prop-types/index.d.ts",
  },
  {
    from: "packages/components/dist/index.esm.d.ts",
    to: "file:///node_modules/@czi-sds/components/index.d.ts",
    buildWith: "@czi-sds/components",
  },
  {
    from: "packages/data-viz/dist/index.esm.d.ts",
    to: "file:///node_modules/@czi-sds/data-viz/index.d.ts",
    buildWith: "@czi-sds/data-viz",
  },
];

/**
 * Packages the playground can import but does not carry types for, declared as
 * shorthand ambient modules so their exports come through as `any`.
 *
 * MUI alone is thirteen megabytes of declarations, which is not a reasonable
 * thing to download to look up a prop. What is lost is narrower than it sounds:
 * the SDS props are declared in the SDS bundle above and keep their real types.
 * The wildcards cover the deep imports these packages also publish.
 */
const AMBIENT_MODULES = [
  "@emotion/react",
  "@emotion/styled",
  "@emotion/styled/*",
  "@mui/material",
  "@mui/material/*",
  "@mui/icons-material",
  "@mui/icons-material/*",
  "@tanstack/react-table",
  "@tanstack/react-query",
  "@tanstack/react-virtual",
  "echarts",
  "echarts/*",
  "@faker-js/faker",
];

/**
 * Build a workspace package so its declarations exist. `dist` is not committed,
 * so on a fresh checkout this is the difference between the playground having
 * SDS autocomplete and not.
 */
function build(scope) {
  process.stdout.write(`  building ${scope} for its declarations...\n`);

  execFileSync("yarn", ["lerna", "run", "build", `--scope=${scope}`], {
    cwd: ROOT,
    stdio: "inherit",
  });
}

function collect() {
  const files = {};
  const missing = [];

  for (const { buildWith, from, to } of DECLARATIONS) {
    const path = resolve(ROOT, from);

    if (!existsSync(path) && buildWith) {
      try {
        build(buildWith);
      } catch {
        // Reported below, alongside anything else that could not be found.
      }
    }

    if (!existsSync(path)) {
      missing.push(from);
      continue;
    }

    files[to] = readFileSync(path, "utf-8");
  }

  const declared = AMBIENT_MODULES.map(
    (name) => `declare module "${name}";`
  ).join("\n");

  files["file:///playground-ambient.d.ts"] = `${declared}\n`;

  return { files, missing };
}

const { files, missing } = collect();

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(files));

const kilobytes = Math.round(JSON.stringify(files).length / 1024);
process.stdout.write(
  `Wrote ${Object.keys(files).length} type files (${kilobytes} KB) to playground/generated/types.json\n`
);

if (missing.length > 0) {
  process.stdout.write(
    `Warning: no declarations found for ${missing.join(", ")}. ` +
      "The playground will still run; its autocomplete will be poorer.\n"
  );
}
