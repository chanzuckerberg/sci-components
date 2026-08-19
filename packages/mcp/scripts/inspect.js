#!/usr/bin/env node

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = dirname(FILENAME);

const serverPath = join(DIRNAME, "..", "dist", "stdio.js");

// The version is pinned so `npx` re-resolves it instead of reusing a cached v1,
// which is deprecated and only receives security fixes.
const inspector = spawn(
  "npx",
  ["-y", "@modelcontextprotocol/inspector@latest", "node", serverPath],
  {
    stdio: "inherit",
    shell: true,
  }
);

inspector.on("error", (error) => {
  console.error("Failed to start MCP inspector:", error);
  process.exit(1);
});

inspector.on("exit", (code) => {
  process.exit(code || 0);
});
