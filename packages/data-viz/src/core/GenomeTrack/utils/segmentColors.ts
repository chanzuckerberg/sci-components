import { generateDiscreteColors } from "@czi-sds/components";
import chroma from "chroma-js";

/**
 * Colors for the predicted-segment categories.
 *
 * Hue encodes the category and a stripe marks the negative strand, so `+CDS`
 * and `-CDS` share a color. Hues come from the full category enum, so a
 * category keeps its color across windows.
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

/** A category with its strand prefix removed: `+CDS`, `-CDS` and `CDS` all become `CDS`. */
export function baseCategory(category: string | undefined): string {
  return (category ?? "").replace(/^[+-]/, "");
}

export function isNegativeStrand(category: string | undefined): boolean {
  return category?.startsWith("-") ?? false;
}

/** Black or white, whichever reads on `background`. */
function readableText(background: string): string {
  return chroma.contrast(background, "#ffffff") >= 4.5 ? "#ffffff" : "#000000";
}

/**
 * Builds the palette for an ordered category enum, one hue per base category.
 * With no enum, every `fill` lookup returns null.
 */
export function segmentPalette(
  categories: string[] | undefined,
  isDarkMode: boolean
): SegmentPalette {
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

/** The categories a window actually contains, in enum order. */
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
