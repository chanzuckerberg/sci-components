import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { createAppThemeBorders } from "src/core/styles/common/generators/borders-generator";
import {
  SDSDarkThemeColors,
  SDSLightThemeColors,
} from "src/core/styles/common/constants/colors";

const DIRNAME = dirname(fileURLToPath(import.meta.url));

// Create a mapping from color values to primitive token references
const createColorToReferenceMap = () => {
  const darkColorMap = new Map<string, string>();
  const lightColorMap = new Map<string, string>();

  // Map all color families and shades to their token references
  Object.keys(SDSLightThemeColors).forEach((colorFamily) => {
    const lightFamily =
      SDSLightThemeColors[colorFamily as keyof typeof SDSLightThemeColors];
    const darkFamily =
      SDSDarkThemeColors[colorFamily as keyof typeof SDSDarkThemeColors];

    Object.keys(lightFamily).forEach((shade) => {
      const lightValue =
        lightFamily[shade as unknown as keyof typeof lightFamily];
      const darkValue = darkFamily[shade as unknown as keyof typeof darkFamily];

      if (lightValue) {
        // Map light colors to their .value references
        lightColorMap.set(
          lightValue,
          `{sds.color.primitive.${colorFamily}.${shade}.value}`
        );
      }

      if (darkValue) {
        // Map dark colors to their .darkValue references
        darkColorMap.set(
          darkValue,
          `{sds.color.primitive.${colorFamily}.${shade}.darkValue}`
        );
      }
    });
  });

  return { darkColorMap, lightColorMap };
};

// Helper function to handle border colors with opacity
const handleBorderOpacityColor = (
  colorValue: string,
  targetMap: Map<string, string>,
  isDark: boolean
): string | null => {
  if (colorValue.length < 8) {
    return null;
  }

  const potentialOpacity = colorValue.slice(-2);
  // Check if the last 2 characters are valid hex
  if (!/^[0-9A-Fa-f]{2}$/.test(potentialOpacity)) {
    return null;
  }

  const baseColor = colorValue.slice(0, -2);
  const baseReference = targetMap.get(baseColor);
  if (!baseReference) {
    return null;
  }

  return baseReference.replace(
    isDark ? ".darkValue}" : ".value}",
    isDark ? `.darkValue}${potentialOpacity}` : `.value}${potentialOpacity}`
  );
};

// Helper function to extract and convert color from border string
const extractAndConvertBorderColor = (
  borderValue: string,
  targetMap: Map<string, string>,
  isDark: boolean
): string | null => {
  // Extract color from border string (e.g., "1px solid #1976d2" or "1px solid #1976d233")
  const colorMatch = borderValue.match(/(#[a-fA-F0-9]{6,8})/);
  if (!colorMatch) {
    return null;
  }

  const colorValue = colorMatch[1];

  // Try to handle colors with opacity first
  const opacityResult = handleBorderOpacityColor(colorValue, targetMap, isDark);
  if (opacityResult) {
    return borderValue.replace(colorValue, opacityResult);
  }

  // Handle regular colors (6 characters)
  const colorReference = targetMap.get(colorValue);
  if (colorReference) {
    return borderValue.replace(colorValue, colorReference);
  }

  return null;
};

// Convert a border value to use primitive token references
const convertBorderToReference = (
  borderValue: string,
  colorMaps: {
    darkColorMap: Map<string, string>;
    lightColorMap: Map<string, string>;
  },
  isDark: boolean = false
): string => {
  if (borderValue === "none" || borderValue === "1px dashed") {
    return borderValue;
  }

  const targetMap = isDark ? colorMaps.darkColorMap : colorMaps.lightColorMap;

  // Try to extract and convert the color
  const convertedBorder = extractAndConvertBorderColor(
    borderValue,
    targetMap,
    isDark
  );
  if (convertedBorder) {
    return convertedBorder;
  }

  // If no color reference found, return the original value
  console.warn(`Warning: No reference found for border: ${borderValue}`);
  return borderValue;
};

// Generate border tokens from theme borders
const generateBorderTokens = () => {
  const colorMaps = createColorToReferenceMap();
  const lightBorders = createAppThemeBorders(SDSLightThemeColors, false);
  const darkBorders = createAppThemeBorders(SDSDarkThemeColors, true);

  const borderTokens: Record<
    string,
    | { darkValue: string; value: string }
    | Record<string, { darkValue: string; value: string }>
  > = {};

  // Process each border category
  Object.keys(lightBorders).forEach((category) => {
    const lightCategory = lightBorders[category as keyof typeof lightBorders];
    const darkCategory = darkBorders[category as keyof typeof darkBorders];

    if (typeof lightCategory === "string") {
      // Handle simple string values like "none"
      borderTokens[category] = {
        darkValue: darkCategory as string,
        value: lightCategory,
      };
    } else if (typeof lightCategory === "object" && lightCategory !== null) {
      // Handle nested objects
      borderTokens[category] = {};

      Object.keys(lightCategory).forEach((property) => {
        const lightValue = lightCategory[
          property as keyof typeof lightCategory
        ] as string;
        const darkValue = darkCategory[
          property as keyof typeof darkCategory
        ] as string;

        (
          borderTokens[category] as Record<
            string,
            { darkValue: string; value: string }
          >
        )[property] = {
          darkValue: convertBorderToReference(darkValue, colorMaps, true),
          value: convertBorderToReference(lightValue, colorMaps, false),
        };
      });
    }
  });

  return {
    sds: {
      border: borderTokens,
    },
  };
};

// Main execution
const generateTokensFile = (): void => {
  try {
    const tokens = generateBorderTokens();
    const outputPath = join(DIRNAME, "../design-tokens/borders.json");

    writeFileSync(outputPath, JSON.stringify(tokens, null, 2) + "\n");

    console.log("borders.json successfully generated!");
  } catch (error) {
    console.error("Error generating border tokens:", error);
    process.exit(1);
  }
};

// Run the generator
generateTokensFile();
