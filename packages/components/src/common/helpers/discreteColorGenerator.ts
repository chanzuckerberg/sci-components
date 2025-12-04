import chroma from "chroma-js";

export interface DiscreteColorGeneratorOptions {
  /**
   * Whether dark mode is enabled (reverses color order for better contrast)
   * @default false
   */
  isDarkMode?: boolean;
  /**
   * Starting hue in degrees (0-360)
   * @default 250
   */
  start?: number;
  /**
   * Number of rotations around the color wheel
   * @default 0.85
   */
  rotations?: number;
  /**
   * Gamma correction value (affects color distribution)
   * @default 0.7
   */
  gamma?: number;
  /**
   * Lightness range [min, max] (0-1)
   * @default [0.4, 0.7]
   */
  lightness?: [number, number];
  /**
   * Whether to apply lightness correction for perceptual uniformity
   * @default true
   */
  correctLightness?: boolean;
}

/**
 * Generate colors using the cubehelix color scale
 * @param count - Number of colors to generate
 * @param options - Configuration options for color generation
 * @returns Array of color strings in hex format
 */
export const generateDiscreteColors = (
  count: number,
  options: DiscreteColorGeneratorOptions = {}
): string[] => {
  if (count === 0) return [];

  const {
    isDarkMode = false,
    start = 240,
    rotations = 0.85,
    gamma = 0.7,
    lightness = [0.4, 0.7],
    correctLightness = true,
  } = options;

  let scale = chroma
    .cubehelix()
    .start(start)
    .rotations(rotations)
    .gamma(gamma)
    .lightness(lightness)
    .scale();

  if (correctLightness) {
    scale = scale.correctLightness();
  }

  const colors = scale.colors(count);

  // Reverse colors in dark mode for better contrast
  return isDarkMode ? colors.reverse() : colors;
};
