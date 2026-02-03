import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { IconSizes } from "src/core/styles/common/constants/iconSizes";

const DIRNAME = dirname(fileURLToPath(import.meta.url));

// Generate icon size tokens from constants
const generateIconSizeTokens = () => {
  const iconSizeTokens: Record<string, Record<string, { value: string }>> = {};

  Object.entries(IconSizes).forEach(([key, dimensions]) => {
    iconSizeTokens[key] = {
      height: {
        value: `${dimensions.height}px`,
      },
      width: {
        value: `${dimensions.width}px`,
      },
    };
  });

  return {
    sds: {
      iconSize: iconSizeTokens,
    },
  };
};

// Main execution
const generateTokensFile = (): void => {
  try {
    const tokens = generateIconSizeTokens();
    const outputPath = join(DIRNAME, "../design-tokens/icon-sizes.json");

    writeFileSync(outputPath, JSON.stringify(tokens, null, 2) + "\n");

    console.log("icon-sizes.json successfully generated!");
  } catch (error) {
    console.error("Error generating icon size tokens:", error);
    process.exit(1);
  }
};

// Run the generator
generateTokensFile();
