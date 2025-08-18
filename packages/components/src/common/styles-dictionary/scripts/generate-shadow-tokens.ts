import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { Shadows } from "src/core/styles/common/constants/shadows";

// @ts-expect-error: Build script uses ESM import.meta with tsx
const DIRNAME = dirname(fileURLToPath(import.meta.url));

// Generate shadow tokens from constants
const generateShadowTokens = () => {
  const shadowTokens: Record<string, { value: string }> = {};

  Object.entries(Shadows).forEach(([key, value]) => {
    shadowTokens[key] = {
      value: value,
    };
  });

  return {
    sds: {
      "drop-shadow": shadowTokens,
    },
  };
};

// Main execution
const generateTokensFile = (): void => {
  try {
    const tokens = generateShadowTokens();
    const outputPath = join(DIRNAME, "../design-tokens/drop-shadows.json");

    writeFileSync(outputPath, JSON.stringify(tokens, null, 2) + "\n");

    console.log("drop-shadows.json successfully generated!");
  } catch (error) {
    console.error("Error generating shadow tokens:", error);
    process.exit(1);
  }
};

// Run the generator
generateTokensFile();
