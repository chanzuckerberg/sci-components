// eslint-disable-next-line import/no-unresolved
import StyleDictionary from "style-dictionary";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { cssFormatter } from "./custom-formatters/cssFormatter.mjs";
import { scssFormatter } from "./custom-formatters/scssFormatter.mjs";
import { tailwindFormatter } from "./custom-formatters/tailwindFormatter.mjs";

const DIRNAME = dirname(fileURLToPath(import.meta.url));

console.log("Generating font tokens from typography theme...");

// Run TypeScript directly with tsx
const fontGenProcess = spawn(
  "tsx",
  [DIRNAME + "/scripts/generate-font-tokens.ts"],
  { stdio: "inherit" }
);

await new Promise((resolve, reject) => {
  fontGenProcess.on("close", (code) => {
    if (code !== 0) {
      reject(new Error(`Font token generation failed with code ${code}`));
    } else {
      resolve();
    }
  });
  fontGenProcess.on("error", reject);
});

// REGISTER THE CUSTOM FORMATTERS

StyleDictionary.registerFormat({
  format: cssFormatter,
  name: "sds/css",
});

StyleDictionary.registerFormat({
  format: scssFormatter,
  name: "sds/scss",
});

StyleDictionary.registerFormat({
  format: tailwindFormatter,
  name: "sds/tailwind",
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom formatters
// needs to be done _before_ applying the configuration
const sd = new StyleDictionary(DIRNAME + "/config.mjs");

// FINALLY, BUILD ALL THE PLATFORMS
await sd.buildAllPlatforms();
