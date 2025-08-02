import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import {
  SDSLightThemeColors,
  SDSDarkThemeColors,
} from "../../../core/styles/common/SDSAppTheme";
import {
  SDSPaletteLight,
  SDSPaletteDark,
} from "../../../core/styles/common/makeThemeOptions";
import {
  Colors,
  SDSPalette,
  AppTheme,
} from "../../../core/styles/common/types";

// @ts-expect-error: Build script uses ESM import.meta with tsx
const DIRNAME = dirname(fileURLToPath(import.meta.url));

// Overlay colors that need to be included in primitive tokens
const OVERLAY_COLORS = {
  "100": {
    darkValue: "rgba(0, 0, 0, 0.08)",
    value: "rgba(0, 0, 0, 0.08)",
  },
  "200": {
    darkValue: "rgba(0, 0, 0, 0.03)",
    value: "rgba(0, 0, 0, 0.03)",
  },
};

// Generate primitive color tokens from theme colors
const generatePrimitiveColors = (lightColors: Colors, darkColors: Colors) => {
  const primitiveColors: Record<
    string,
    Record<string, { darkValue: string; value: string }>
  > = {};

  // Process each color family (blue, gray, green, etc.)
  Object.keys(lightColors).forEach((colorFamily) => {
    primitiveColors[colorFamily] = {};

    const lightFamily = lightColors[colorFamily as keyof Colors];
    const darkFamily = darkColors[colorFamily as keyof Colors];

    // Process each shade (100, 200, 300, etc.)
    Object.keys(lightFamily).forEach((shade) => {
      const lightValue =
        lightFamily[shade as unknown as keyof typeof lightFamily];
      const darkValue = darkFamily[shade as unknown as keyof typeof darkFamily];

      primitiveColors[colorFamily][shade] = {
        darkValue: darkValue || "",
        value: lightValue || "",
      };
    });
  });

  // Add overlay colors
  primitiveColors.overlay = OVERLAY_COLORS;

  return primitiveColors;
};

// Create a mapping from color values to primitive token references
const createColorToReferenceMap = (
  primitiveColors: Record<
    string,
    Record<string, { darkValue: string; value: string }>
  >
) => {
  const lightColorMap = new Map<string, string>();
  const darkColorMap = new Map<string, string>();

  Object.keys(primitiveColors).forEach((colorFamily) => {
    if (colorFamily === "overlay") return; // Skip overlay colors for mapping

    Object.keys(primitiveColors[colorFamily]).forEach((shade) => {
      const { value, darkValue } = primitiveColors[colorFamily][shade];

      // Map light colors to their .value references
      lightColorMap.set(
        value,
        `{sds.color.primitive.${colorFamily}.${shade}.value}`
      );

      // Map dark colors to their .darkValue references
      darkColorMap.set(
        darkValue,
        `{sds.color.primitive.${colorFamily}.${shade}.darkValue}`
      );
    });
  });

  return { darkColorMap, lightColorMap };
};

// Convert a color value to a primitive token reference
const convertColorToReference = (
  colorValue: string,
  colorMaps: {
    lightColorMap: Map<string, string>;
    darkColorMap: Map<string, string>;
  },
  isDark: boolean = false
): string => {
  const targetMap = isDark ? colorMaps.darkColorMap : colorMaps.lightColorMap;

  // Handle opacity modifiers (e.g., "#c3c3c3" + "47")
  if (colorValue.includes("47")) {
    const baseColor = colorValue.replace("47", "");
    const baseReference = targetMap.get(baseColor);
    if (baseReference) {
      return baseReference.replace(
        isDark ? ".darkValue}" : ".value}",
        isDark ? ".darkValue}47" : ".value}47"
      );
    }
  }

  // Direct color lookup
  const reference = targetMap.get(colorValue);
  if (reference) {
    return reference;
  }

  // If no reference found, return the original value (shouldn't happen if data is consistent)
  console.warn(`Warning: No reference found for color: ${colorValue}`);
  return colorValue;
};

// Convert semantic palette to design tokens format
const convertSemanticPalette = (
  lightPalette: SDSPalette,
  darkPalette: SDSPalette,
  colorMaps: {
    lightColorMap: Map<string, string>;
    darkColorMap: Map<string, string>;
  }
) => {
  const semantic: Record<
    string,
    Record<string, { darkValue: string; value: string }>
  > = {};

  // Convert each semantic color category
  Object.keys(lightPalette).forEach((category) => {
    semantic[category] = {};
    const lightCategoryColors = lightPalette[category as keyof SDSPalette];
    const darkCategoryColors = darkPalette[category as keyof SDSPalette];

    Object.keys(lightCategoryColors).forEach((property) => {
      const lightColorValue =
        lightCategoryColors[property as keyof typeof lightCategoryColors];
      const darkColorValue =
        darkCategoryColors[property as keyof typeof darkCategoryColors];

      // Convert camelCase to kebab-case for design tokens
      const tokenProperty = property.replace(/([A-Z])/g, "-$1").toLowerCase();

      semantic[category][tokenProperty] = {
        darkValue: convertColorToReference(darkColorValue, colorMaps, true),
        value: convertColorToReference(lightColorValue, colorMaps, false),
      };
    });
  });

  return semantic;
};

// Generate the complete color tokens structure
const generateColorTokens = () => {
  // Create mock app themes to get palette instances
  const mockLightTheme = { colors: SDSLightThemeColors } as { colors: Colors };
  const mockDarkTheme = { colors: SDSDarkThemeColors } as { colors: Colors };

  // Generate primitive colors
  const primitiveColors = generatePrimitiveColors(
    SDSLightThemeColors,
    SDSDarkThemeColors
  );

  // Create color mapping
  const colorMaps = createColorToReferenceMap(primitiveColors);

  // Generate semantic colors
  const lightPalette = SDSPaletteLight(mockLightTheme as unknown as AppTheme);
  const darkPalette = SDSPaletteDark(mockDarkTheme as unknown as AppTheme);

  const semanticColors = convertSemanticPalette(
    lightPalette,
    darkPalette,
    colorMaps
  );

  return {
    sds: {
      color: {
        primitive: primitiveColors,
        semantic: semanticColors,
      },
    },
  };
};

// Main execution
const generateTokensFile = (): void => {
  try {
    const tokens = generateColorTokens();
    const outputPath = join(DIRNAME, "../design-tokens/colors.json");

    writeFileSync(outputPath, JSON.stringify(tokens, null, 2) + "\n");

    console.log("colors.json successfully generated!");
  } catch (error) {
    console.error("Error generating color tokens:", error);
    process.exit(1);
  }
};

// Run the generator
generateTokensFile();
