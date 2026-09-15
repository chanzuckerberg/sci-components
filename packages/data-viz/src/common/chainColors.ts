/**
 * Default colors for telling chains apart, in assignment order.
 *
 * The Okabe-Ito qualitative palette, which is built to stay distinguishable
 * under every common form of color blindness - the reason to prefer it over a
 * hand-picked set, since a complex is read by which chain is which and a
 * viewer that collapses two of them into one color stops answering that.
 *
 * Its black is left out: the canvas inverts with the theme, so a chain painted
 * black would vanish against the dark background. The rest carry enough
 * lightness to hold up against both.
 *
 * Chains past the end of the palette wrap around to the start.
 */
export const CHAIN_COLOR_PALETTE = [
  "#009E73",
  "#0072B2",
  "#E69F00",
  "#009E73",
  "#CC79A7",
  "#56B4E9",
  "#D55E00",
  "#F0E442",
] as const;

/**
 * Assigns each chain a color, in the order given, with `overrides` taking
 * precedence by `chainId`.
 *
 * Palette positions are spent on every chain whether or not it is overridden,
 * so overriding one chain does not shift the colors of the others.
 */
export function chainColorMap(
  chainIds: readonly string[],
  overrides?: Record<string, string>
): Map<string, string> {
  const colors = new Map<string, string>();

  chainIds.forEach((chainId, i) => {
    const fallback = CHAIN_COLOR_PALETTE[
      i % CHAIN_COLOR_PALETTE.length
    ] as string;

    colors.set(chainId, overrides?.[chainId] ?? fallback);
  });

  return colors;
}
