import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { Spaces } from "../../../core/styles/common/constants/spaces";

// @ts-expect-error: Build script uses ESM import.meta with tsx
const DIRNAME = dirname(fileURLToPath(import.meta.url));

// Generate space tokens from constants
const generateSpaceTokens = () => {
  const spaceTokens: Record<string, { value: string }> = {};

  Object.entries(Spaces).forEach(([key, value]) => {
    spaceTokens[key] = {
      value: `${value}px`,
    };
  });

  return {
    sds: {
      space: spaceTokens,
    },
  };
};

// Main execution
const generateTokensFile = (): void => {
  try {
    const tokens = generateSpaceTokens();
    const outputPath = join(DIRNAME, "../design-tokens/spaces.json");

    writeFileSync(outputPath, JSON.stringify(tokens, null, 2) + "\n");

    console.log("spaces.json successfully generated!");
  } catch (error) {
    console.error("Error generating space tokens:", error);
    process.exit(1);
  }
};

// Run the generator
generateTokensFile();
