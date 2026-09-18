import {
  GenomeTrackData,
  GenomeViewport,
  MinimapOverview,
} from "../GenomeTrack.types";

/**
 * The three nested ranges the track works in.
 *
 * Until the track re-fetched on zoom there was effectively one: the payload's
 * window was both the limit of navigation and the extent the minimap drew, and
 * the viewport was always inside it. Fetching a narrower window at a finer
 * stride breaks that, because the payload window becomes a function of the
 * viewport — so each of the three has to be named separately:
 *
 * - **extent** — everywhere the user may navigate. The whole chromosome when
 *   the payload can say how long it is. This is what pan and zoom clamp to, so
 *   it is what decides whether zooming out is possible at all.
 * - **window** — what the payload actually covers. Data exists here and nowhere
 *   else, and it moves as the shell re-fetches.
 * - **viewport** — what is on screen. It may now extend past `window`, which is
 *   the case the rest of the component has to be honest about rather than
 *   drawing empty space that reads as "nothing here".
 *
 * Conflating extent with window is the bug this exists to prevent. With them
 * merged, a re-fetch of the zoomed range shrinks the limit of navigation to the
 * range the user just zoomed into, and they can never zoom back out — each zoom
 * ratchets the reachable genome narrower.
 */
export interface TrackExtents {
  /** Everything the minimap spans: the chromosome, when one is known. */
  extent: GenomeViewport;
  /**
   * What pan and zoom actually clamp to: the loaded window plus a margin,
   * held inside `extent`.
   *
   * Not the same as `extent`, and the difference is what keeps the plot
   * legible. Letting navigation reach the whole chromosome sounds generous and
   * is unusable without a shell to refill the window behind it: the viewport
   * outruns the data, and the loaded slice compresses into a few pixels
   * surrounded by emptiness. At a 20 kb view of a 289 bp payload every row is a
   * sliver.
   *
   * A margin means zooming out always works — without one, a shell that
   * re-fetched the zoomed range would trap the user inside it, each zoom-in
   * permanently narrowing the reachable genome — but only ever by a bounded
   * factor before the shell has to supply more data. Each re-fetch widens the
   * window, which widens this, so the user walks out in steps that are each
   * backed by real data rather than in one leap into nothing.
   */
  navigable: GenomeViewport;
  /** What the payload covers. Outside this there is no data to draw. */
  window: GenomeViewport;
}

/**
 * Derives the extents from a payload and the overview the shell is holding.
 *
 * The chromosome length comes from `overview.chrom_length` and from nowhere
 * else. `Locus.genome_length` is the obvious second source and is deliberately
 * not used: for a bacterium the genome *is* the chromosome and the two agree,
 * but for a eukaryote `genome_length` is the whole genome, so trusting it would
 * set the extent to 3 Gb on an 80 Mb chromosome. The minimap would then draw
 * the window as an invisible sliver in the wrong place, and the user could pan
 * into billions of bases of nothing.
 *
 * So with no overview the extent collapses back to the payload window, which is
 * both honest — nothing in the payload says what is out there — and exactly the
 * behaviour a deployment with `overview_available: false` has today.
 */
export function trackExtents(
  data: GenomeTrackData,
  overview: MinimapOverview | null,
  margin = 1
): TrackExtents {
  const window = { end: data.locus.end, start: data.locus.start };

  // A chromosome shorter than the window it supposedly contains is a payload
  // contradicting itself. Falling back keeps pan and zoom inside something the
  // data can describe rather than propagating the inconsistency into the ruler.
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

/**
 * The loaded window grown by `margin` times its span on each side, clipped to
 * `extent`.
 *
 * A multiple of the window rather than a fixed number of bases, so the rule
 * holds at every zoom: the loaded data always occupies at least
 * `1 / (1 + 2 × margin)` of the plot however wide the window is. At the default
 * margin of 1 that is a third, which is the point where the rows still read as
 * rows.
 *
 * Clipping to `extent` is what stops the halo hanging off the end of a
 * chromosome for a window near either telomere.
 */
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

/** Whether two ranges share at least one base. */
export function overlaps(a: GenomeViewport, b: GenomeViewport): boolean {
  return a.start <= b.end && b.start <= a.end;
}

/**
 * The parts of `viewport` that `window` does not cover, in bp.
 *
 * Returns the gaps rather than a boolean so the renderer can tint exactly the
 * dead region. Either side may be absent; both are when the viewport sits
 * entirely inside the payload, which is the common case and costs nothing.
 */
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
