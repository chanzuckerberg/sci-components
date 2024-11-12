// eslint-disable-next-line import/no-unresolved
import StyleDictionary from "style-dictionary";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { cssFormatter } from "./custom-formatters/cssFormatter.mjs";
import { scssFormatter } from "./custom-formatters/scssFormatter.mjs";
import { tailwindFormatter } from "./custom-formatters/tailwindFormatter.mjs";

const DIRNAME = dirname(fileURLToPath(import.meta.url));

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
