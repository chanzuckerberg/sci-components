import {
  DEFAULT_TRACK_DATA,
  NO_OVERVIEW_TRACK_DATA,
} from "../__storybook__/constants";
import { MinimapOverview, TrackKind } from "../GenomeTrack.types";
import {
  haloAround,
  overlaps,
  trackExtents,
  uncoveredRanges,
} from "../utils/extent";
import { TrackRow, layoutRows, viewportBands } from "../utils/layout";

/**
 * The extent model, which is what makes re-fetching on zoom possible.
 *
 * Before it there was one range: the payload's window was both the limit of
 * navigation and what the minimap spanned. Re-fetching a narrower window at a
 * finer stride makes that window a function of the viewport, so the two have to
 * come apart — and the failure if they do not is silent and severe, so it is
 * pinned here rather than left to the component tests.
 */

const OPTIONS = {
  blockRowHeight: 28,
  density: "comfortable" as const,
  featureRowHeight: 24,
  maxAnnotationLanes: 4,
  maxFeatureRows: 8,
  showRowLabels: true,
};

describe("trackExtents", () => {
  it("spans the chromosome when the overview says how long it is", () => {
    const { extent, isChromosome, window } = trackExtents(
      DEFAULT_TRACK_DATA,
      DEFAULT_TRACK_DATA.overview
    );

    expect(isChromosome).toBe(true);
    expect(extent).toEqual({
      end: DEFAULT_TRACK_DATA.overview?.chrom_length,
      start: 1,
    });

    // The window is still the payload's, and is far narrower. That gap is the
    // room the user has to zoom out into.
    expect(window).toEqual({
      end: DEFAULT_TRACK_DATA.locus.end,
      start: DEFAULT_TRACK_DATA.locus.start,
    });
    expect(window.end - window.start).toBeLessThan(extent.end - extent.start);
  });

  it("collapses to the payload window when there is no overview", () => {
    const { extent, isChromosome, window } = trackExtents(
      NO_OVERVIEW_TRACK_DATA,
      null
    );

    // Honest rather than convenient: nothing in the payload says what is
    // outside the window, so the track claims nothing and behaves exactly as
    // it did before extents were separated.
    expect(isChromosome).toBe(false);
    expect(extent).toEqual(window);
  });

  it("ignores Locus.genome_length, which is the genome and not the chromosome", () => {
    // The obvious second source for a chromosome length, and wrong for any
    // organism with more than one chromosome: it would set the extent to the
    // whole genome, drawing the window as a sliver in the wrong place and
    // letting the user pan into coordinates the chromosome does not have.
    expect(NO_OVERVIEW_TRACK_DATA.locus.genome_length).toBeGreaterThan(0);

    expect(trackExtents(NO_OVERVIEW_TRACK_DATA, null).extent.end).toBe(
      NO_OVERVIEW_TRACK_DATA.locus.end
    );
  });

  it("falls back when the overview contradicts the window", () => {
    // A chromosome shorter than the window it supposedly contains is a payload
    // disagreeing with itself. Clamping navigation to it would put the viewport
    // outside the data; falling back keeps every range describable.
    const truncated: MinimapOverview = {
      ...(DEFAULT_TRACK_DATA.overview as MinimapOverview),
      chrom_length: DEFAULT_TRACK_DATA.locus.start,
    };

    const { extent, isChromosome } = trackExtents(
      DEFAULT_TRACK_DATA,
      truncated
    );

    expect(isChromosome).toBe(false);
    expect(extent.end).toBe(DEFAULT_TRACK_DATA.locus.end);
  });
});

/**
 * The bound on how far the viewport may outrun its data.
 *
 * Without it the component is worse than it was before extents were separated:
 * zooming out works, but the loaded slice compresses into a few pixels of an
 * otherwise empty plot. A 20 kb view of a 289 bp payload puts every row in a
 * 25 px column, which is the screenshot this bound exists to prevent.
 */
describe("navigable bounds", () => {
  const { locus, overview } = DEFAULT_TRACK_DATA;
  const windowSpan = locus.end - locus.start + 1;

  it("grows the window by its own span on each side at the default margin", () => {
    const { navigable } = trackExtents(DEFAULT_TRACK_DATA, overview);

    expect(navigable).toEqual({
      end: locus.end + windowSpan,
      start: locus.start - windowSpan,
    });
  });

  it("keeps the loaded data over a third of the plot at the default margin", () => {
    const { navigable } = trackExtents(DEFAULT_TRACK_DATA, overview);
    const widest = navigable.end - navigable.start + 1;

    // The property that actually matters, stated as the fraction of the plot
    // the data occupies rather than as a bp count.
    expect(windowSpan / widest).toBeGreaterThanOrEqual(1 / 3);
  });

  it("scales the bound with the window, so it holds at every zoom", () => {
    // A margin in bases would be generous on a 289 bp window and useless on a
    // 40 kb one. A multiple keeps the ratio fixed.
    const wide = {
      ...DEFAULT_TRACK_DATA,
      locus: { ...locus, end: locus.start + 39_999 },
    };
    const { navigable, window } = trackExtents(wide, overview);

    expect(
      (window.end - window.start + 1) / (navigable.end - navigable.start + 1)
    ).toBeCloseTo(1 / 3, 2);
  });

  it("pins the viewport to the payload at margin zero", () => {
    const { navigable, window } = trackExtents(DEFAULT_TRACK_DATA, overview, 0);

    expect(navigable).toEqual(window);
  });

  it("still leaves room to zoom out of a re-fetched window", () => {
    // The ratchet this whole model exists to break: a window re-fetched narrow
    // must not be a window the user is stuck inside.
    const { navigable, window } = trackExtents(DEFAULT_TRACK_DATA, overview);

    expect(navigable.end - navigable.start).toBeGreaterThan(
      window.end - window.start
    );
  });

  it("clips the margin to the chromosome near either end", () => {
    const start = {
      ...DEFAULT_TRACK_DATA,
      locus: { ...locus, end: 200, start: 1 },
    };
    const chromEnd = overview?.chrom_length as number;
    const end = {
      ...DEFAULT_TRACK_DATA,
      locus: { ...locus, end: chromEnd, start: chromEnd - 199 },
    };

    // A halo hanging off the end of a chromosome would let pan and zoom reach
    // coordinates that do not exist.
    expect(trackExtents(start, overview).navigable.start).toBe(1);
    expect(trackExtents(end, overview).navigable.end).toBe(chromEnd);
  });

  it("is the window itself when there is no chromosome to navigate into", () => {
    const { extent, navigable, window } = trackExtents(
      NO_OVERVIEW_TRACK_DATA,
      null
    );

    expect(navigable).toEqual(window);
    expect(navigable).toEqual(extent);
  });

  it("leaves the minimap spanning the whole chromosome regardless", () => {
    const { extent, navigable } = trackExtents(DEFAULT_TRACK_DATA, overview);

    // Bounding navigation must not shrink what the minimap shows: seeing where
    // you are on the chromosome is the point of the row, and is independent of
    // how far you may travel without a fetch.
    expect(extent).toEqual({ end: overview?.chrom_length, start: 1 });
    expect(extent.end - extent.start).toBeGreaterThan(
      navigable.end - navigable.start
    );
  });
});

describe("haloAround", () => {
  const extent = { end: 10_000, start: 1 };

  it("pads by a multiple of the window's span", () => {
    expect(haloAround({ end: 1_100, start: 1_001 }, extent, 2)).toEqual({
      end: 1_300,
      start: 801,
    });
  });

  it("treats a negative margin as zero rather than inverting the range", () => {
    const window = { end: 1_100, start: 1_001 };

    expect(haloAround(window, extent, -5)).toEqual(window);
  });
});

describe("overlaps", () => {
  it("is true for ranges sharing a base, including at the edge", () => {
    expect(overlaps({ end: 100, start: 1 }, { end: 200, start: 100 })).toBe(
      true
    );
    expect(overlaps({ end: 100, start: 1 }, { end: 50, start: 20 })).toBe(true);
  });

  it("is false for adjacent and for distant ranges", () => {
    expect(overlaps({ end: 100, start: 1 }, { end: 200, start: 101 })).toBe(
      false
    );
    expect(overlaps({ end: 100, start: 1 }, { end: 9_000, start: 8_000 })).toBe(
      false
    );
  });
});

describe("uncoveredRanges", () => {
  const window = { end: 2_000, start: 1_000 };

  it("returns nothing when the viewport is inside the window", () => {
    expect(uncoveredRanges({ end: 1_500, start: 1_200 }, window)).toEqual([]);
    expect(uncoveredRanges(window, window)).toEqual([]);
  });

  it("reports the gap on either side, abutting the data exactly", () => {
    // Abutting matters: a gap that overlapped the window by a base would tint
    // a column of real data, and one that left a base would leave a hairline
    // of untinted emptiness at the boundary.
    expect(uncoveredRanges({ end: 1_500, start: 500 }, window)).toEqual([
      { end: 999, start: 500 },
    ]);
    expect(uncoveredRanges({ end: 2_500, start: 1_500 }, window)).toEqual([
      { end: 2_500, start: 2_001 },
    ]);
  });

  it("reports both gaps when the viewport contains the window", () => {
    expect(uncoveredRanges({ end: 3_000, start: 1 }, window)).toEqual([
      { end: 999, start: 1 },
      { end: 3_000, start: 2_001 },
    ]);
  });

  it("reports the whole viewport when it misses the window entirely", () => {
    const viewport = { end: 900, start: 100 };

    expect(uncoveredRanges(viewport, window)).toEqual([viewport]);
  });
});

describe("viewportBands", () => {
  it("excludes the minimap, which is not on the viewport scale", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...OPTIONS,
      tracks: ["minimap", "segments"],
    });
    const minimap = rows.find((row) => row.kind === "minimap") as TrackRow;
    const [band] = viewportBands(rows);

    expect(viewportBands(rows)).toHaveLength(1);

    // Tinting the minimap by viewport coordinates would mark an unrelated
    // slice of the chromosome, so the band has to start below it.
    expect(band.top).toBeGreaterThanOrEqual(minimap.y + minimap.height);
  });

  it("merges the rows of a section into one band, gaps included", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...OPTIONS,
      showRowLabels: false,
      tracks: ["annotations", "segments", "features"],
    });
    const bands = viewportBands(rows);
    const last = rows[rows.length - 1];

    // One band rather than one per row: a wash that stopped at every row
    // boundary would read as stripes rather than as a region.
    expect(bands).toHaveLength(1);
    expect(bands[0].top).toBe(rows[0].y);
    expect(bands[0].bottom).toBe(last.y + last.height);
  });

  it("breaks the band at each section name, so the label is not washed", () => {
    const tracks: TrackKind[] = ["annotations", "segments", "features"];
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, { ...OPTIONS, tracks });
    const bands = viewportBands(rows);

    // One band per section. The space above a labelled row holds that label's
    // text and rule, and tinting it would grey out the heading rather than the
    // plot.
    expect(bands).toHaveLength(tracks.length);

    bands.forEach((band) => {
      const header = rows.find((row) => row.y === band.top);

      expect(header?.headerHeight).toBeGreaterThan(0);
    });
  });

  it("splits into separate bands around a minimap in the middle", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...OPTIONS,
      tracks: ["segments", "minimap", "features"],
    });

    expect(viewportBands(rows)).toHaveLength(2);
  });

  it("returns nothing for a minimap-only track", () => {
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, {
      ...OPTIONS,
      tracks: ["minimap"],
    });

    expect(viewportBands(rows)).toEqual([]);
  });
});
