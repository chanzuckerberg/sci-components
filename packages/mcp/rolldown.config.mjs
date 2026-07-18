import { defineConfig } from "rolldown";
import pkg from "./package.json" with { type: "json" };

// Externalize runtime dependencies (installed alongside the published package)
// and Node.js builtins. Everything else is bundled.
const external = (id) => {
  const deps = Object.keys(pkg.dependencies || {});
  return deps.some((dep) => id === dep || id.startsWith(dep + "/"));
};

// Source uses NodeNext-style `.js` import specifiers that point at `.ts` files,
// so map `.js` back to `.ts` (then `.js`) during resolution.
const resolve = { extensionAlias: { ".js": [".ts", ".js"] } };

export default defineConfig([
  // STDIO server -> dist/stdio.js (the published bin; shebang is preserved).
  {
    external,
    input: { stdio: "src/stdio.ts" },
    platform: "node",
    resolve,
    output: {
      codeSplitting: false,
      dir: "dist",
      entryFileNames: "[name].js",
      format: "esm",
    },
  },
  // HTTP server -> api/index.js.
  {
    external,
    input: { index: "src/http.ts" },
    platform: "node",
    resolve,
    output: {
      codeSplitting: false,
      dir: "api",
      entryFileNames: "[name].js",
      format: "esm",
    },
  },
]);
