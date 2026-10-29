import { BinAxis, GenomeViewport } from "../GenomeTrack.types";

/**
 * Coordinate math for the track. Genomic coordinates are 1-based inclusive;
 * pixel coordinates are 0-based from the plot area's left edge.
 */

/** Smallest window the user can zoom to, in bases. */
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
 * Left edge, in px, of the base at `bp`. A base spans `bpToPx(bp)` to
 * `bpToPx(bp + 1)`.
 */
export function bpToPx(scale: GenomeScale, bp: number): number {
  return ((bp - scale.start) / spanOf(scale)) * scale.width;
}

/** The 1-based base under a pixel offset; the inverse of `bpToPx`. */
export function pxToBp(scale: GenomeScale, px: number): number {
  return Math.floor(
    scale.start + (px / Math.max(scale.width, 1)) * spanOf(scale)
  );
}

/**
 * Pixel rect for a 1-based inclusive bp range, clipped to the plot area and at
 * least `minWidth` wide. Null when the range is outside the viewport.
 */
export function blockRect(
  scale: GenomeScale,
  start: number,
  end: number,
  minWidth = 1
): { width: number; x: number } | null {
  if (end < scale.start || start > scale.end) return null;

  const left = bpToPx(scale, start);
  // Inclusive range, so run to the far edge of `end`.
  const right = bpToPx(scale, end + 1);

  const x = Math.max(left, 0);
  const width = Math.min(right, scale.width) - x;

  return { width: Math.max(width, minWidth), x };
}

/** Narrowest the minimap's viewport band is drawn, in px. */
export const MIN_BAND_WIDTH = 3;

/**
 * The minimap's viewport band in px, at least `MIN_BAND_WIDTH` wide and kept
 * inside the bar. Shared by drawing and hit-testing. Null when off the bar.
 */
export function minimapBand(
  extent: GenomeScale,
  viewport: GenomeViewport
): { width: number; x: number } | null {
  const rect = blockRect(extent, viewport.start, viewport.end, MIN_BAND_WIDTH);

  if (!rect) return null;

  return {
    width: rect.width,
    x: Math.min(rect.x, Math.max(extent.width - rect.width, 0)),
  };
}

/** Index into a trace's pooled `values` for a base, or null if out of range. */
export function bpToBinIndex(bins: BinAxis, bp: number): number | null {
  if (bp < bins.start || bp > bins.end) return null;

  const index = Math.floor((bp - bins.start) / bins.stride);

  // The last base can fall in a partial bin the server dropped.
  return Math.min(index, bins.n_bins - 1);
}

/** First base covered by a bin index, 1-based inclusive. */
export function binIndexToBp(bins: BinAxis, index: number): number {
  return bins.start + index * bins.stride;
}

/** Inclusive bp range covered by a bin index, clipped to `bins.end`. */
export function binIndexToRange(
  bins: BinAxis,
  index: number
): { end: number; start: number } {
  const start = binIndexToBp(bins, index);

  return { end: Math.min(start + bins.stride - 1, bins.end), start };
}

/** Clamps a viewport to `bounds` and to at least `MIN_SPAN` bases. */
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

/** Zooms by `factor`, keeping the base under the pointer fixed. */
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

/** Shifts a viewport by a distance in base pairs. */
export function panByBp(
  viewport: GenomeViewport,
  bounds: GenomeViewport,
  deltaBp: number
): GenomeViewport {
  const shift = Math.round(deltaBp);

  return clampViewport(
    { end: viewport.end + shift, start: viewport.start + shift },
    bounds
  );
}

/** Pans by a pixel delta. */
export function panBy(
  scale: GenomeScale,
  bounds: GenomeViewport,
  deltaPx: number
): GenomeViewport {
  return panByBp(scale, bounds, deltaPx * scale.bpPerPx);
}

/**
 * The largest value in `values`, or 0 for an empty array. Loops instead of
 * spreading, which can overflow the stack on long arrays.
 */
export function maxOf(values: number[]): number {
  let max = 0;

  for (let i = 0; i < values.length; i += 1) {
    if (values[i] > max) max = values[i];
  }

  return max;
}

/** Index of the largest value in `values`, or -1 for an empty array. */
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
