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
 * 2. **Colour means category, pattern means strand.** `+CDS` and `-CDS` are the
 *    same kind of thing on opposite strands, so they share a hue and the
 *    negative strand is striped instead. Giving them two hues would spend the
 *    ramp twice over on one distinction and imply they are unrelated; the
 *    stripe is also a non-colour cue, which is what the accessibility rules
 *    want for something as load-bearing as strand.
 * 3. **A category keeps its colour everywhere.** `+CDS` has to be the same hue
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
  /** Distinct base categories in enum order, each with its colour. */
  bases: { color: string; name: string }[];
}

/**
 * A category with its strand prefix removed.
 *
 * The pipeline's names are `+CDS`, `-CDS` and `CDS` — stranded, anti-stranded
 * and unstranded forms of one category. Only the last part carries the hue.
 */
export function baseCategory(category: string): string {
  return category.replace(/^[+-]/, "");
}

/**
 * Whether a category is on the negative strand.
 *
 * Note an unstranded `CDS` and a positive `+CDS` both come out solid, so a
 * payload carrying both would draw them identically. The schemes in the
 * pipeline's palette are either stranded or not, so that does not arise in
 * practice — but it is a collision rather than a distinction, and worth
 * knowing before a mixed scheme appears.
 */
export function isNegativeStrand(category: string): boolean {
  return category.startsWith("-");
}

/**
 * Black or white, whichever reads on `background`.
 *
 * The block labels used `base.textOnFill` — white — which was safe while every
 * segment was one indigo. Across a generated ramp it is not: the light end of a
 * cubehelix scale takes white text to about 2:1, well under the 4.5:1 the
 * accessibility rules require. Chroma's WCAG contrast is the same measure those
 * rules use, so the choice is made per colour rather than per theme.
 */
function readableText(background: string): string {
  return chroma.contrast(background, "#ffffff") >= 4.5 ? "#ffffff" : "#000000";
}

/**
 * Builds the palette for an ordered category enum.
 *
 * `categories` is the full enum the payload carries, in the order the server
 * chose — most to least common. Hues are assigned to *base* categories in order
 * of first appearance, so `["+CDS", "-CDS", "intergenic"]` spends two colours
 * rather than three and the commonest base takes the start of the ramp, where
 * the hues are furthest apart.
 *
 * An empty or absent enum yields a palette that knows nothing and every lookup
 * returns null; the caller then falls back to the single accent fill the row
 * used before it had categories.
 */
export function segmentPalette(
  categories: string[] | undefined,
  isDarkMode: boolean
): SegmentPalette {
  // Distinct bases, first appearance wins, so the enum's frequency order
  // carries through to the ramp.
  const baseNames = [...new Set((categories ?? []).map(baseCategory))];
  const colors = generateDiscreteColors(baseNames.length, { isDarkMode });

  // Built once per palette rather than scanned per block: a 200 kb window can
  // hold thousands of segments, and this is called inside the draw loop.
  const byBase = new Map(baseNames.map((name, index) => [name, colors[index]]));
  const textByBase = new Map(
    baseNames.map((name, index) => [name, readableText(colors[index])])
  );

  return {
    bases: baseNames.map((name, index) => ({ color: colors[index], name })),
    fill: (category) => byBase.get(baseCategory(category)) ?? null,
    isStriped: isNegativeStrand,
    text: (category) => textByBase.get(baseCategory(category)) ?? "#ffffff",
  };
}

/** One legend entry: a category, its colour, and whether it is striped. */
export interface CategoryKey {
  color: string;
  name: string;
  striped: boolean;
}

/**
 * The categories a window actually contains, in enum order.
 *
 * Only what is on screen, because a key to colours nothing is drawing is noise
 * — a payload's enum runs to dozens of categories where a window holds a
 * handful. Ordered by the *enum* rather than by first appearance in the
 * segments, so the entries do not reshuffle as the user pans: the same three
 * categories always list in the same order.
 *
 * Both strands appear as separate entries, with the same colour and different
 * patterns, because that is the pairing the reader has to learn. Collapsing
 * them would leave the stripes unexplained.
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
