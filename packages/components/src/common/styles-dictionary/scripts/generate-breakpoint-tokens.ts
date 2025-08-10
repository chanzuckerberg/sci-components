import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { Breakpoints } from "src/core/styles/common/constants/breakpoints";

// @ts-expect-error: Build script uses ESM import.meta with tsx
const DIRNAME = dirname(fileURLToPath(import.meta.url));

// Generate breakpoint tokens from constants
const generateBreakpointTokens = () => {
  const breakpointTokens: Record<string, { value: string }> = {};

  Object.entries(Breakpoints).forEach(([key, value]) => {
    breakpointTokens[key] = {
      value: `${value}px`,
    };
  });

  return {
    sds: {
      breakpoint: breakpointTokens,
    },
  };
};

// Main execution
const generateTokensFile = (): void => {
  try {
    const tokens = generateBreakpointTokens();
    const outputPath = join(DIRNAME, "../design-tokens/breakpoints.json");

    writeFileSync(outputPath, JSON.stringify(tokens, null, 2) + "\n");

    console.log("breakpoints.json successfully generated!");
  } catch (error) {
    console.error("Error generating breakpoint tokens:", error);
    process.exit(1);
  }
};

// Run the generator
generateTokensFile();
