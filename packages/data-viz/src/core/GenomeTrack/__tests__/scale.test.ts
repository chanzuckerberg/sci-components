import { BinAxis } from "../GenomeTrack.types";
import {
  MIN_SPAN,
  binIndexToBp,
  binIndexToRange,
  blockRect,
  bpToBinIndex,
  bpToPx,
  clampViewport,
  createScale,
  panBy,
  pxToBp,
  spanOf,
  zoomAt,
} from "../utils/scale";

/**
 * Coordinate math is tested exhaustively because its bugs are silent.
 *
 * A trace drawn one bin to the left, or an inclusive range treated as
 * exclusive, still renders as a perfectly plausible genome browser. Nothing
 * about the picture says it is wrong, so the arithmetic gets asserted directly
 * rather than through the component.
 */

const WINDOW = { end: 45_750, start: 45_462 };
const WIDTH = 800;

describe("spanOf", () => {
  it("counts both endpoints, because ranges are inclusive", () => {
    expect(spanOf({ end: 45_750, start: 45_462 })).toBe(289);
    expect(spanOf({ end: 100, start: 100 })).toBe(1);
  });
});

describe("bpToPx / pxToBp", () => {
  const scale = createScale(WINDOW, WIDTH);

  it("puts the first visible base at the left edge", () => {
    expect(bpToPx(scale, WINDOW.start)).toBe(0);
  });

  it("puts one past the last base at the right edge", () => {
    expect(bpToPx(scale, WINDOW.end + 1)).toBeCloseTo(WIDTH, 6);
  });

  it("round-trips every visible base", () => {
    for (let bp = WINDOW.start; bp <= WINDOW.end; bp += 1) {
      expect(pxToBp(scale, bpToPx(scale, bp))).toBe(bp);
    }
  });

  it("reports bases per pixel", () => {
    expect(scale.bpPerPx).toBeCloseTo(289 / 800, 6);
  });
});

describe("blockRect", () => {
  const scale = createScale(WINDOW, WIDTH);

  it("covers the far edge of the last base in an inclusive range", () => {
    const rect = blockRect(scale, WINDOW.start, WINDOW.start);

    // One base wide, not zero: the classic inclusive-range off-by-one.
    expect(rect?.width).toBeCloseTo(WIDTH / 289, 6);
  });

  it("returns null for a block entirely outside the viewport", () => {
    expect(blockRect(scale, 1, 100)).toBeNull();
    expect(blockRect(scale, 90_000, 90_100)).toBeNull();
  });

  it("clips a block that straddles the left edge", () => {
    const rect = blockRect(scale, WINDOW.start - 100, WINDOW.start + 9);

    expect(rect?.x).toBe(0);
    expect(rect?.width).toBeCloseTo((10 * WIDTH) / 289, 6);
  });

  it("keeps a sub-pixel block visible rather than dropping it", () => {
    const wide = createScale({ end: 245_461, start: 45_462 }, WIDTH);
    const rect = blockRect(wide, 100_000, 100_002, 2);

    // 3 bp in a 200 kb window is far under a pixel. Widening it is what stops
    // small annotations from silently disappearing.
    expect(rect?.width).toBe(2);
  });
});

describe("bin indexing", () => {
  const bins: BinAxis = { end: 45_750, n_bins: 29, start: 45_462, stride: 10 };

  it("maps the first base of a bin to that bin", () => {
    expect(bpToBinIndex(bins, 45_462)).toBe(0);
    expect(bpToBinIndex(bins, 45_472)).toBe(1);
  });

  it("maps every base within a bin to the same index", () => {
    for (let offset = 0; offset < 10; offset += 1) {
      expect(bpToBinIndex(bins, 45_472 + offset)).toBe(1);
    }
  });

  it("returns null outside the axis rather than clamping silently", () => {
    expect(bpToBinIndex(bins, 45_461)).toBeNull();
    expect(bpToBinIndex(bins, 45_751)).toBeNull();
  });

  it("clamps the final partial bin into range", () => {
    // The window is 289 bases over a stride of 10, so the last bin is partial
    // and floor division would index past `n_bins`.
    expect(bpToBinIndex(bins, bins.end)).toBe(28);
  });

  it("round-trips index to coordinate", () => {
    expect(binIndexToBp(bins, 0)).toBe(45_462);
    expect(binIndexToBp(bins, 5)).toBe(45_512);
    expect(bpToBinIndex(bins, binIndexToBp(bins, 7))).toBe(7);
  });

  it("clips the last bin's range to the window", () => {
    expect(binIndexToRange(bins, 0)).toEqual({ end: 45_471, start: 45_462 });
    expect(binIndexToRange(bins, 28)).toEqual({ end: 45_750, start: 45_742 });
  });

  it("treats an unpooled axis as one base per bin", () => {
    const unpooled: BinAxis = { end: 110, n_bins: 11, start: 100, stride: 1 };

    expect(bpToBinIndex(unpooled, 105)).toBe(5);
    expect(binIndexToRange(unpooled, 5)).toEqual({ end: 105, start: 105 });
  });
});

describe("clampViewport", () => {
  it("keeps a viewport inside the payload window", () => {
    expect(clampViewport({ end: 46_000, start: 45_800 }, WINDOW)).toEqual({
      end: 45_750,
      start: 45_550,
    });
  });

  it("holds the span when pushed past the left edge", () => {
    const clamped = clampViewport({ end: 45_400, start: 45_300 }, WINDOW);

    expect(clamped.start).toBe(WINDOW.start);
    expect(spanOf(clamped)).toBe(101);
  });

  it("refuses to zoom below the minimum span", () => {
    const clamped = clampViewport({ end: 45_502, start: 45_500 }, WINDOW);

    expect(spanOf(clamped)).toBe(MIN_SPAN);
  });

  it("never exceeds the payload window", () => {
    const clamped = clampViewport({ end: 99_999, start: 1 }, WINDOW);

    expect(clamped).toEqual(WINDOW);
  });
});

describe("zoomAt", () => {
  const scale = createScale(WINDOW, WIDTH);

  it("keeps the base under the pointer fixed", () => {
    const anchorPx = 200;
    const before = pxToBp(scale, anchorPx);
    const zoomed = zoomAt(scale, WINDOW, anchorPx, 0.5);
    const after = pxToBp(createScale(zoomed, WIDTH), anchorPx);

    // Within a base: the viewport is rounded to integers, so exact equality is
    // not available and would not be meaningful.
    expect(Math.abs(after - before)).toBeLessThanOrEqual(1);
  });

  it("narrows the span when zooming in", () => {
    expect(spanOf(zoomAt(scale, WINDOW, 400, 0.5))).toBeLessThan(289);
  });

  it("cannot zoom out past the payload window", () => {
    expect(zoomAt(scale, WINDOW, 400, 10)).toEqual(WINDOW);
  });
});

describe("panBy", () => {
  const scale = createScale({ end: 45_561, start: 45_502 }, WIDTH);

  it("moves the window by the pixel delta converted to bases", () => {
    const panned = panBy(scale, WINDOW, 100);

    expect(panned.start).toBeGreaterThan(45_502);
    expect(spanOf(panned)).toBe(60);
  });

  it("preserves the span at the boundary instead of squashing it", () => {
    const panned = panBy(scale, WINDOW, -100_000);

    expect(panned.start).toBe(WINDOW.start);
    expect(spanOf(panned)).toBe(60);
  });
});
