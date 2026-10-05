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
    const { extent, window } = trackExtents(
      DEFAULT_TRACK_DATA,
      DEFAULT_TRACK_DATA.overview
    );

    // The chromosome is wider than the window, which is the observable form of
    // "this extent came from the overview" now that no row reads a flag for it.
    expect(extent.start).toBeLessThanOrEqual(window.start);
    expect(extent.end).toBeGreaterThan(window.end);
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
    const { extent, window } = trackExtents(NO_OVERVIEW_TRACK_DATA, null);
    expect(extent).toEqual(window);
  });

  it("ignores Locus.genome_length, which is the genome and not the chromosome", () => {
    expect(NO_OVERVIEW_TRACK_DATA.locus.genome_length).toBeGreaterThan(0);

    expect(trackExtents(NO_OVERVIEW_TRACK_DATA, null).extent.end).toBe(
      NO_OVERVIEW_TRACK_DATA.locus.end
    );
  });

  it("falls back when the overview contradicts the window", () => {
    const truncated: MinimapOverview = {
      ...(DEFAULT_TRACK_DATA.overview as MinimapOverview),
      chrom_length: DEFAULT_TRACK_DATA.locus.start,
    };

    const { extent } = trackExtents(DEFAULT_TRACK_DATA, truncated);

    expect(extent.end).toBe(DEFAULT_TRACK_DATA.locus.end);
  });
});

/**
 * The bound on how far the viewport may outrun its data.
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

    expect(windowSpan / widest).toBeGreaterThanOrEqual(1 / 3);
  });

  it("scales the bound with the window, so it holds at every zoom", () => {
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

    expect(bands).toHaveLength(1);
    expect(bands[0].top).toBe(rows[0].y);
    expect(bands[0].bottom).toBe(last.y + last.height);
  });

  it("breaks the band at each section name, so the label is not washed", () => {
    const tracks: TrackKind[] = ["annotations", "segments", "features"];
    const { rows } = layoutRows(DEFAULT_TRACK_DATA, { ...OPTIONS, tracks });
    const bands = viewportBands(rows);

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
