import { generateDiscreteColors } from "@czi-sds/components";
import chroma from "chroma-js";

/**
 * Colors for the predicted-segment categories.
 *
 * Three properties matter, and each is the reason for one part of the shape
 * below:
 *
 * 1. **The ramp is SDS's.** `generateDiscreteColors` is the design system's own
 *    cubehelix generator, applied by index across the set — the same call the
 *    SDS `Legend` examples make. Colors are not chosen here.
 * 2. **Color means category, pattern means strand.** `+CDS` and `-CDS` are the
 *    same kind of thing on opposite strands, so they share a hue and the
 *    negative strand is striped instead. Giving them two hues would spend the
 *    ramp twice over on one distinction and imply they are unrelated; the
 *    stripe is also a non-color cue, which is what the accessibility rules
 *    want for something as load-bearing as strand.
 * 3. **A category keeps its color everywhere.** `+CDS` has to be the same hue
 *    in every window and every organism, or two pictures cannot be compared.
 *    So the assignment comes from the payload's full enum, in a fixed order —
 *    not from the categories present, which would repaint them on every pan as
 *    a narrower window drops categories and the indices shift underneath.
 */

/** A resolved category palette: the ramp, and how to look a category up. */
export interface SegmentPalette {
  /** Fill for a category, or null when its base is not in the enum. */
  fill: (category: string) => string | null;
  /** Legible text color to draw on that fill. */
  text: (category: string) => string;
  /** Whether the category sits on the negative strand, and so is striped. */
  isStriped: (category: string) => boolean;
}

/**
 * A category with its strand prefix removed.
 *
 * The pipeline's names are `+CDS`, `-CDS` and `CDS` — stranded, anti-stranded
 * and unstranded forms of one category. Only the last part carries the hue.
 *
 * Tolerates a missing category, which the type forbids and a real payload
 * supplies anyway.
 */
export function baseCategory(category: string | undefined): string {
  return (category ?? "").replace(/^[+-]/, "");
}

/**
 * Whether a category is on the negative strand.
 */
export function isNegativeStrand(category: string | undefined): boolean {
  return category?.startsWith("-") ?? false;
}

/**
 * Black or white, whichever reads on `background`.
 */
function readableText(background: string): string {
  return chroma.contrast(background, "#ffffff") >= 4.5 ? "#ffffff" : "#000000";
}

/**
 * Builds the palette for an ordered category enum.
 *
 * Hues are assigned to *base* categories in order of first appearance, so
 * `["+CDS", "-CDS", "intergenic"]` spends two colors rather than three.
 *
 * An empty or absent enum yields a palette that knows nothing and every lookup
 * returns null; the caller then falls back to the row's single accent fill.
 */
export function segmentPalette(
  categories: string[] | undefined,
  isDarkMode: boolean
): SegmentPalette {
  // Distinct bases, first appearance wins, so the enum's frequency order
  // carries through to the ramp.
  const baseNames = [...new Set((categories ?? []).map(baseCategory))];
  const colors = generateDiscreteColors(baseNames.length, { isDarkMode });

  const byBase = new Map(baseNames.map((name, index) => [name, colors[index]]));
  const textByBase = new Map(
    baseNames.map((name, index) => [name, readableText(colors[index])])
  );

  return {
    fill: (category) => byBase.get(baseCategory(category)) ?? null,
    isStriped: isNegativeStrand,
    text: (category) => textByBase.get(baseCategory(category)) ?? "#ffffff",
  };
}

export interface CategoryKey {
  color: string;
  name: string;
  striped: boolean;
}

/**
 * The categories a window actually contains, in enum order.
 */
export function presentCategories(
  segments: { category: string }[],
  categories: string[] | undefined,
  palette: SegmentPalette
): CategoryKey[] {
  const present = new Set(segments.map((segment) => segment.category));

  return (categories ?? [])
    .filter((category) => present.has(category))
    .map((name) => ({
      color: palette.fill(name) ?? "",
      name,
      striped: palette.isStriped(name),
    }))
    .filter((entry) => entry.color !== "");
}
