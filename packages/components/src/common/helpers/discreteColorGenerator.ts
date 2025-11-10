import chroma from "chroma-js";

/**
 * Generate colors using the cubehelix color scale
 * @param count - Number of colors to generate
 * @param isDarkMode - Whether dark mode is enabled (reverses color order for better contrast)
 * @returns Array of color strings in hex format
 */
export const generateDiscreteColors = (
  count: number,
  isDarkMode: boolean = false
): string[] => {
  if (count === 0) return [];

  const colors = chroma
    .cubehelix()
    .start(249)
    .rotations(1)
    .gamma(0.7)
    .lightness([0.3, 0.7])
    .scale()
    .correctLightness()
    .colors(count);

  // Reverse colors in dark mode for better contrast
  return isDarkMode ? colors.reverse() : colors;
};
