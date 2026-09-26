import { BinAxis, GenomeViewport } from "../GenomeTrack.types";

/**
 * Coordinate math for the track.
 *
 * Every function here is pure and exhaustively unit-tested, because this is
 * where a bug renders as plausible-looking science rather than as a crash: a
 * trace drawn one bin to the left still looks like a genome browser.
 *
 * Two conventions hold throughout, and mixing them is the failure mode these
 * helpers exist to prevent:
 *
 * - **Genomic coordinates are 1-based inclusive** (GFF), matching the wire
 *   format and the annotation parquet.
 * - **Pixel coordinates are 0-based** and measured from the plot area's left
 *   edge, not the component's.
 */

/** Smallest window the user can zoom to, in bases. Below this the ruler lies. */
export const MIN_SPAN = 20;

/** Maps a 1-based inclusive bp range onto a pixel width. */
export interface GenomeScale {
  /** First visible base, 1-based inclusive. */
  start: number;
  /** Last visible base, 1-based inclusive. */
  end: number;
  /** Width of the plot area in CSS px. */
  width: number;
  /** Bases per pixel. */
  bpPerPx: number;
}

export function createScale(
  viewport: GenomeViewport,
  width: number
): GenomeScale {
  const span = spanOf(viewport);

  return {
    bpPerPx: span / Math.max(width, 1),
    end: viewport.end,
    start: viewport.start,
    width,
  };
}

/** Number of bases in a 1-based inclusive range. */
export function spanOf(viewport: GenomeViewport): number {
  return viewport.end - viewport.start + 1;
}

/**
 * Left edge, in px, of the base at `bp`.
 *
 * A base occupies a pixel *interval*, not a point. `bp` maps to the interval's
 * left edge, so drawing a block from `bpToPx(start)` to `bpToPx(end + 1)`
 * covers the inclusive range — the `+ 1` is why `blockRect` exists rather than
 * callers doing this arithmetic themselves.
 */
export function bpToPx(scale: GenomeScale, bp: number): number {
  return ((bp - scale.start) / spanOf(scale)) * scale.width;
}

/**
 * The base under a pixel offset, 1-based.
 *
 * Inverse of `bpToPx` at the interval's left edge, so
 * `pxToBp(scale, bpToPx(scale, n)) === n` for any visible integer `n`.
 */
export function pxToBp(scale: GenomeScale, px: number): number {
  return Math.floor(
    scale.start + (px / Math.max(scale.width, 1)) * spanOf(scale)
  );
}

/**
 * Pixel rect for a 1-based inclusive bp range, clipped to the plot area.
 *
 * Returns null when the range is entirely outside the viewport, which lets
 * callers skip blocks without a second visibility test. Sub-pixel blocks are
 * widened to `minWidth` so a 3 bp feature in a 200 kb window stays visible
 * rather than vanishing — the alternative is a browser that silently omits
 * small annotations, which reads as "there is nothing here".
 */
export function blockRect(
  scale: GenomeScale,
  start: number,
  end: number,
  minWidth = 1
): { width: number; x: number } | null {
  if (end < scale.start || start > scale.end) return null;

  const left = bpToPx(scale, start);
  // `end + 1`: the range is inclusive, so it runs to the far edge of `end`.
  const right = bpToPx(scale, end + 1);

  const x = Math.max(left, 0);
  const width = Math.min(right, scale.width) - x;

  return { width: Math.max(width, minWidth), x };
}

/**
 * Index into a trace's `values` for a given base, or null when out of range.
 *
 * Pooling means one index covers `stride` bases, so this is a floor division
 * rather than a subtraction.
 */
export function bpToBinIndex(bins: BinAxis, bp: number): number | null {
  if (bp < bins.start || bp > bins.end) return null;

  const index = Math.floor((bp - bins.start) / bins.stride);

  // A window whose span is not a whole multiple of `stride` puts the last base
  // in a bin that the server may have dropped; clamp rather than index past it.
  return Math.min(index, bins.n_bins - 1);
}

/** First base covered by a bin index, 1-based inclusive. */
export function binIndexToBp(bins: BinAxis, index: number): number {
  return bins.start + index * bins.stride;
}

/**
 * Inclusive bp range covered by a bin index.
 *
 * The last bin is clipped to `bins.end`, so a partial final bin reports the
 * bases it actually covers rather than running past the window.
 */
export function binIndexToRange(
  bins: BinAxis,
  index: number
): { end: number; start: number } {
  const start = binIndexToBp(bins, index);

  return { end: Math.min(start + bins.stride - 1, bins.end), start };
}

/**
 * Clamps a viewport to the payload's window and to `MIN_SPAN`.
 *
 * Pan and zoom both route through this, so neither can produce a range the
 * payload cannot describe. Zooming past `MIN_SPAN` holds the span and re-centres
 * instead of refusing, which feels like a limit rather than a bug.
 */
export function clampViewport(
  viewport: GenomeViewport,
  bounds: GenomeViewport
): GenomeViewport {
  const boundsSpan = spanOf(bounds);
  const span = Math.round(
    Math.min(Math.max(spanOf(viewport), MIN_SPAN), boundsSpan)
  );

  let start = Math.round(viewport.start);

  if (start < bounds.start) start = bounds.start;
  if (start + span - 1 > bounds.end) start = bounds.end - span + 1;

  return { end: start + span - 1, start };
}

/**
 * Zooms by `factor` about a pixel position, keeping the base under the pointer
 * fixed.
 *
 * Anchoring on the pointer rather than the centre is what makes wheel-zoom feel
 * like a map: the thing you are pointing at is the thing you keep.
 */
export function zoomAt(
  scale: GenomeScale,
  bounds: GenomeViewport,
  px: number,
  factor: number
): GenomeViewport {
  const anchorBp =
    scale.start + (px / Math.max(scale.width, 1)) * spanOf(scale);
  const nextSpan = spanOf(scale) * factor;
  const anchorFraction = px / Math.max(scale.width, 1);

  return clampViewport(
    {
      end: anchorBp + nextSpan * (1 - anchorFraction) - 1,
      start: anchorBp - nextSpan * anchorFraction,
    },
    bounds
  );
}

/** Pans by a pixel delta, converting through the current scale. */
export function panBy(
  scale: GenomeScale,
  bounds: GenomeViewport,
  deltaPx: number
): GenomeViewport {
  const deltaBp = Math.round(deltaPx * scale.bpPerPx);

  return clampViewport(
    { end: scale.end + deltaBp, start: scale.start + deltaBp },
    bounds
  );
}

/**
 * The largest value in `values`, or 0 for an empty array.
 *
 * A loop rather than `Math.max(...values)`, which spreads every element onto
 * the argument stack: the arrays here are per-bin activation, up to
 * `max_points` long for a window and chromosome-wide for a minimap trace, so
 * the spread is both a real allocation on every call and a RangeError waiting
 * for a long enough payload.
 */
export function maxOf(values: number[]): number {
  let max = 0;

  for (let i = 0; i < values.length; i += 1) {
    if (values[i] > max) max = values[i];
  }

  return max;
}

/**
 * Index of the largest value in `values`, or -1 for an empty array.
 *
 * One pass, where `values.indexOf(Math.max(...values))` is two plus a spread.
 */
export function argMax(values: number[]): number {
  let best = -1;
  let max = -Infinity;

  for (let i = 0; i < values.length; i += 1) {
    if (values[i] > max) {
      max = values[i];
      best = i;
    }
  }

  return best;
}
