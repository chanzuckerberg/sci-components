import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { Corners } from "src/core/styles/common/constants/corners";

// @ts-expect-error: Build script uses ESM import.meta with tsx
const DIRNAME = dirname(fileURLToPath(import.meta.url));

// Generate corner tokens from constants
const generateCornerTokens = () => {
  const cornerTokens: Record<string, { value: string }> = {};

  Object.entries(Corners).forEach(([key, value]) => {
    cornerTokens[key] = {
      value: `${value}px`,
    };
  });

  return {
    sds: {
      corner: cornerTokens,
    },
  };
};

// Main execution
const generateTokensFile = (): void => {
  try {
    const tokens = generateCornerTokens();
    const outputPath = join(DIRNAME, "../design-tokens/corners.json");

    writeFileSync(outputPath, JSON.stringify(tokens, null, 2) + "\n");

    console.log("corners.json successfully generated!");
  } catch (error) {
    console.error("Error generating corner tokens:", error);
    process.exit(1);
  }
};

// Run the generator
generateTokensFile();
