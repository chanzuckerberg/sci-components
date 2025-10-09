/**
 * Converts a percentage opacity value to its hexadecimal representation
 * that can be appended to hex color codes.
 *
 * @param percentOpacity - Opacity as a percentage (0-100)
 * @returns Hex string representation of the opacity (e.g., "33" for 20%)
 *
 * @example
 * ```ts
 * percentToHex(20) // "33" (20% opacity)
 * percentToHex(58) // "94" (58% opacity)
 * percentToHex(50) // "80" (50% opacity)
 * percentToHex(100) // "FF" (100% opacity)
 * percentToHex(0) // "00" (0% opacity)
 * ```
 */
export const percentToHex = (percentOpacity: number): string => {
  // Clamp the value between 0 and 100
  const clampedPercent = Math.max(0, Math.min(100, percentOpacity));

  // Convert percentage to 0-255 range
  const alphaValue = Math.round((clampedPercent / 100) * 255);

  // Convert to hex and pad with leading zero if needed
  return alphaValue.toString(16).padStart(2, "0").toUpperCase();
};

/**
 * Adds opacity to a hex color by appending the hex opacity value.
 *
 * @param hexColor - Base hex color (with or without #)
 * @param percentOpacity - Opacity as a percentage (0-100)
 * @returns Hex color with opacity appended
 *
 * @example
 * ```ts
 * addOpacityToHex("#FF0000", 20) // "#FF000033"
 * addOpacityToHex("FF0000", 58) // "FF000094"
 * ```
 */
export const addOpacityToHex = (
  hexColor: string,
  percentOpacity: number
): string => {
  const opacityHex = percentToHex(percentOpacity);
  return `${hexColor}${opacityHex}`;
};
