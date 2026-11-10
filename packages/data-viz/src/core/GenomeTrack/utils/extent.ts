import {
  GenomeTrackData,
  GenomeViewport,
  MinimapOverview,
} from "../GenomeTrack.types";

/**
 * The nested ranges the track works in: `extent` contains `navigable`, which
 * contains `window`. The viewport may extend past `window`.
 */
export interface TrackExtents {
  /** Everything the minimap spans: the chromosome, when one is known. */
  extent: GenomeViewport;
  /** What pan and zoom clamp to: the loaded window plus a margin, inside `extent`. */
  navigable: GenomeViewport;
  /** What the payload covers. Outside this there is no data to draw. */
  window: GenomeViewport;
}

/**
 * Derives the extents from a payload and the minimap overview.
 *
 * The chromosome length comes only from `overview.chrom_length`;
 * `Locus.genome_length` is the whole genome, not the chromosome. With no
 * overview, every extent is the payload window.
 */
export function trackExtents(
  data: GenomeTrackData,
  overview: MinimapOverview | null,
  margin = 1
): TrackExtents {
  const window = { end: data.locus.end, start: data.locus.start };

  // A chromosome shorter than its own window is an inconsistent payload.
  if (!overview || overview.chrom_length < window.end) {
    return { extent: window, navigable: window, window };
  }

  const extent = { end: overview.chrom_length, start: 1 };

  return {
    extent,
    navigable: haloAround(window, extent, margin),
    window,
  };
}

/** The window grown by `margin` times its span on each side, clipped to `extent`. */
export function haloAround(
  window: GenomeViewport,
  extent: GenomeViewport,
  margin: number
): GenomeViewport {
  const pad = Math.max(margin, 0) * (window.end - window.start + 1);

  return {
    end: Math.min(Math.round(window.end + pad), extent.end),
    start: Math.max(Math.round(window.start - pad), extent.start),
  };
}

/**
 * The range drag, wheel and arrow keys may move the viewport within.
 *
 * Normally `navigable`; when the viewport has left the window, a halo around
 * the viewport instead, so gestures before a re-fetch don't snap back.
 */
export function gestureBounds(
  extents: TrackExtents,
  viewport: GenomeViewport,
  margin: number
): GenomeViewport {
  return overlaps(viewport, extents.window)
    ? extents.navigable
    : haloAround(viewport, extents.extent, margin);
}

/** Whether two ranges share at least one base. */
export function overlaps(a: GenomeViewport, b: GenomeViewport): boolean {
  return a.start <= b.end && b.start <= a.end;
}

/** The parts of `viewport` that `window` does not cover, in bp. */
export function uncoveredRanges(
  viewport: GenomeViewport,
  window: GenomeViewport
): GenomeViewport[] {
  const gaps: GenomeViewport[] = [];

  if (viewport.start < window.start) {
    gaps.push({
      end: Math.min(window.start - 1, viewport.end),
      start: viewport.start,
    });
  }

  if (viewport.end > window.end) {
    gaps.push({
      end: viewport.end,
      start: Math.max(window.end + 1, viewport.start),
    });
  }

  return gaps.filter((gap) => gap.end >= gap.start);
}
