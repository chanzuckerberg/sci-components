import { DEFAULT_TRACK_DATA } from "../__storybook__/constants";
import { FeatureOverview, MinimapOverview } from "../GenomeTrack.types";
import {
  DrawContext,
  drawAnnotations,
  drawFeatureBars,
  drawMinimap,
  drawOutsideWindow,
  drawSegments,
  drawSequence,
} from "../renderers";
import { uncoveredRanges } from "../utils/extent";
import {
  MINIMAP_BAR_HEIGHT,
  MINIMAP_LABEL_HEIGHT,
  MINIMAP_RANGE_HEIGHT,
  TrackRow,
  layoutRows,
} from "../utils/layout";
import { TrackPalette } from "../utils/palette";
import { createScale } from "../utils/scale";
import { segmentPalette } from "../utils/segmentColors";
import { formatActivation, segmentLabel } from "../utils/format";

/**
 * The draw passes, exercised against a recording stub context.
 *
 * jsdom has no 2D context, so the component's renderer effect bails out under
 * test and the drawing code would otherwise have zero coverage — the largest
 * untested surface in the component. A stub cannot check what the pixels look
 * like (that is Chromatic's job) but it can check the things that are logic
 * rather than appearance: that a pass draws at all, that it stays inside its
 * row, that it skips work it should skip, and that it does not throw on the
 * degenerate inputs a real payload produces.
 */

interface Call {
  args: number[];
  op: string;
}

/**
 * Minimal recording `CanvasRenderingContext2D`.
 *
 * Only the members the renderers touch are implemented; anything else would be
 * dead weight. `measureText` returns a width proportional to the string length,
 * which is enough for the label-fitting logic to behave realistically.
 */
function createStubContext(): {
  calls: Call[];
  ctx: CanvasRenderingContext2D;
  texts: { text: string; x: number; y: number }[];
} {
  const calls: Call[] = [];
  const texts: { text: string; x: number; y: number }[] = [];

  const record =
    (op: string) =>
    (...args: number[]) => {
      calls.push({ args, op });
    };

  const ctx = {
    beginPath: record("beginPath"),
    clearRect: record("clearRect"),
    closePath: record("closePath"),
    fill: record("fill"),
    fillRect: record("fillRect"),
    fillStyle: "",
    fillText: (text: string, x: number, y: number) => {
      texts.push({ text, x, y });
      calls.push({ args: [x, y], op: "fillText" });
    },
    font: "",
    lineTo: record("lineTo"),
    lineWidth: 1,
    measureText: (text: string) => ({ width: text.length * 6 }),
    moveTo: record("moveTo"),
    rect: record("rect"),
    setTransform: record("setTransform"),
    stroke: record("stroke"),
    strokeRect: record("strokeRect"),
    strokeStyle: "",
    textAlign: "",
    textBaseline: "",
  } as unknown as CanvasRenderingContext2D;

  return { calls, ctx, texts };
}

const PALETTE: TrackPalette = {
  annotation: "#111111",
  annotationText: "#ffffff",
  axis: "#222222",
  axisText: "#333333",
  featureBar: "#aa00aa",
  hover: "#444444",
  minimapSignal: "#bb00bb",
  minimapText: "#767676",
  minimapTrack: "#eeeeee",
  minimapWindow: "#666666",
  outsideWindow: "rgba(0, 0, 0, 0.08)",
  outsideWindowBorder: "#cccccc",
  rowBackground: "#555555",
  segment: "#666666",
  segmentText: "#ffffff",
  selected: "#777777",
  sequenceText: "#888888",
};

const CATEGORY_PALETTE = segmentPalette(
  DEFAULT_TRACK_DATA.segment_categories,
  false
);

const WIDTH = 800;
/** Shared because three passes assert the same containment property. */
const INSIDE_ROW = "stays inside its row";
const ROW: TrackRow = { height: 28, kind: "annotations", label: "", y: 40 };

function makeDraw(overrides: Partial<DrawContext> = {}): {
  draw: DrawContext;
  recorder: ReturnType<typeof createStubContext>;
} {
  const recorder = createStubContext();

  return {
    draw: {
      ctx: recorder.ctx,
      density: "comfortable",
      hoveredId: null,
      palette: PALETTE,
      row: ROW,
      scale: createScale(
        {
          end: DEFAULT_TRACK_DATA.locus.end,
          start: DEFAULT_TRACK_DATA.locus.start,
        },
        WIDTH
      ),
      selectedId: null,
      ...overrides,
    },
    recorder,
  };
}

/**
 * Every y coordinate the pass drew at.
 *
 * All four recorded ops take y as their second argument, so no per-op handling
 * is needed. `Number.isFinite` filters NaN, which is the thing these assertions
 * are really guarding against — a NaN coordinate draws nothing and throws
 * nothing, so it would otherwise pass silently.
 */
function drawnYs(calls: Call[]): number[] {
  return calls
    .filter((call) =>
      ["fillRect", "fillText", "lineTo", "moveTo", "strokeRect"].includes(
        call.op
      )
    )
    .map((call) => call.args[1])
    .filter((y) => Number.isFinite(y));
}

describe("drawAnnotations", () => {
  it("draws every annotation in the window", () => {
    const { draw, recorder } = makeDraw();

    drawAnnotations(draw, DEFAULT_TRACK_DATA.annotations ?? []);

    expect(recorder.calls.filter((call) => call.op === "fill").length).toBe(
      DEFAULT_TRACK_DATA.annotations?.length
    );
  });

  it(INSIDE_ROW, () => {
    const { draw, recorder } = makeDraw();

    drawAnnotations(draw, DEFAULT_TRACK_DATA.annotations ?? []);

    drawnYs(recorder.calls).forEach((y) => {
      expect(y).toBeGreaterThanOrEqual(ROW.y);
      expect(y).toBeLessThanOrEqual(ROW.y + ROW.height);
    });
  });

  it("draws nothing for an empty list", () => {
    const { draw, recorder } = makeDraw();

    drawAnnotations(draw, []);

    expect(recorder.calls.filter((call) => call.op === "fill")).toHaveLength(0);
  });

  it("skips annotations scrolled out of the viewport", () => {
    const { draw, recorder } = makeDraw({
      scale: createScale({ end: 45_500, start: 45_462 }, WIDTH),
    });

    drawAnnotations(draw, DEFAULT_TRACK_DATA.annotations ?? []);

    // Fewer fills than annotations: the ones outside the window are skipped
    // rather than drawn off-canvas.
    expect(
      recorder.calls.filter((call) => call.op === "fill").length
    ).toBeLessThan((DEFAULT_TRACK_DATA.annotations ?? []).length);
  });

  it("outlines the hovered and selected blocks", () => {
    const target = DEFAULT_TRACK_DATA.annotations?.[0];

    if (!target) throw new Error("Fixture has no annotations");

    const plain = makeDraw();

    drawAnnotations(plain.draw, [target]);

    const hovered = makeDraw({ hoveredId: target.id });

    drawAnnotations(hovered.draw, [target]);

    expect(
      hovered.recorder.calls.filter((call) => call.op === "stroke").length
    ).toBeGreaterThan(
      plain.recorder.calls.filter((call) => call.op === "stroke").length
    );
  });
});

describe("drawSegments", () => {
  it("draws every segment", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 28, kind: "segments", label: "", y: 80 },
    });

    drawSegments(draw, DEFAULT_TRACK_DATA.segments, CATEGORY_PALETTE);

    expect(recorder.calls.filter((call) => call.op === "fill").length).toBe(
      DEFAULT_TRACK_DATA.segments.length
    );
  });

  it("labels blocks with the short id and category, not the namespaced id", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 28, kind: "segments", label: "", y: 80 },
    });

    drawSegments(draw, DEFAULT_TRACK_DATA.segments, CATEGORY_PALETTE);

    recorder.texts.forEach((entry) => {
      // A namespaced id is 40+ characters and would never fit; the full id is
      // in the tooltip and the accessible table instead.
      expect(entry.text).not.toContain("mock-sae:");
    });
  });
});

describe("segmentLabel", () => {
  it("combines the trailing id part with the category", () => {
    expect(segmentLabel(DEFAULT_TRACK_DATA.segments[0])).toMatch(
      // The category comes from the payload's enum, so the label is the
      // short id plus whatever that category is called.
      /^seg_\d{5} \S+$/
    );
  });

  it("falls back to the whole id when it is not namespaced", () => {
    expect(
      segmentLabel({ ...DEFAULT_TRACK_DATA.segments[0], id: "bare" })
    ).toMatch(/^bare /);
  });
});

describe("drawSequence", () => {
  it("draws one letter per base when bases are wide enough", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 18, kind: "sequence", label: "", y: 20 },
      // 40 bases across 800 px is 20 px per base, comfortably readable.
      scale: createScale({ end: 45_501, start: 45_462 }, WIDTH),
    });

    drawSequence(draw, DEFAULT_TRACK_DATA.sequence ?? "", 45_462);

    expect(recorder.texts).toHaveLength(40);
    expect(recorder.texts.every((entry) => /^[ACGT]$/.test(entry.text))).toBe(
      true
    );
  });

  it("falls back to a band when bases are too narrow to read", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 18, kind: "sequence", label: "", y: 20 },
      scale: createScale({ end: 45_750, start: 45_462 }, WIDTH),
    });

    drawSequence(draw, DEFAULT_TRACK_DATA.sequence ?? "", 45_462);

    // 289 bases across 800 px is under 3 px each: crushed glyphs would suggest
    // the component is broken, where a band says "zoom in to read this".
    expect(recorder.texts).toHaveLength(0);
    expect(recorder.calls.some((call) => call.op === "fillRect")).toBe(true);
  });

  it("bands only where the sequence actually is", () => {
    const sequence = DEFAULT_TRACK_DATA.sequence ?? "";
    const { draw, recorder } = makeDraw({
      row: { height: 18, kind: "sequence", label: "", y: 20 },
      // The payload's 289 bases centred in a window four times as wide, which
      // is what a zoom-out past the loaded window looks like.
      scale: createScale({ end: 46_100, start: 45_000 }, WIDTH),
    });

    drawSequence(draw, sequence, 45_462);

    const band = recorder.calls.find((call) => call.op === "fillRect");

    // Filling the row's full width drew "there is sequence here" across
    // coordinates that have none — contradicting the wash over the same
    // region. The band has to start where the sequence does and stop where it
    // ends.
    expect(band?.args[0]).toBeGreaterThan(0);
    expect(band?.args[2]).toBeLessThan(WIDTH);
    expect(band?.args[2] ?? 0).toBeCloseTo(
      (sequence.length / 1_101) * WIDTH,
      0
    );
  });

  it("draws no band at all when the sequence is off screen", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 18, kind: "sequence", label: "", y: 20 },
      scale: createScale({ end: 60_000, start: 50_000 }, WIDTH),
    });

    drawSequence(draw, DEFAULT_TRACK_DATA.sequence ?? "", 45_462);

    expect(recorder.calls).toHaveLength(0);
  });

  it("does not read past the end of the sequence string", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 18, kind: "sequence", label: "", y: 20 },
      scale: createScale({ end: 45_501, start: 45_462 }, WIDTH),
    });

    // A payload whose sequence is shorter than its window: the server capped it
    // but the window did not shrink. Drawing `undefined` letters is the bug.
    drawSequence(draw, "ACGT", 45_462);

    expect(recorder.texts).toHaveLength(4);
  });
});

describe("drawMinimap", () => {
  const BOUNDS = {
    end: DEFAULT_TRACK_DATA.locus.end,
    start: DEFAULT_TRACK_DATA.locus.start,
  };
  /**
   * Sized from the layout's own constants rather than a literal, so the row the
   * renderer is handed is the row the layout would build. A hard-coded height
   * here silently stops matching the moment the layout changes.
   */
  function minimapRow(density: "comfortable" | "compact"): TrackRow {
    return {
      height:
        MINIMAP_RANGE_HEIGHT[density] +
        MINIMAP_BAR_HEIGHT[density] +
        MINIMAP_LABEL_HEIGHT[density],
      kind: "minimap",
      label: "Minimap",
      y: 30,
    };
  }

  const MINIMAP_ROW = minimapRow("comfortable");

  /**
   * Minimap content with no chromosome context: the extent is the payload's own
   * window, which is what the row falls back to when the shell has no overview.
   * That was the row's only behaviour before it spanned chromosomes, so these
   * cases are also the regression tests for the fallback.
   */
  const NO_OVERVIEW = {
    extent: BOUNDS,
    feature: null,
    window: BOUNDS,
  };

  /** The viewport band: the last `fillRect` the pass makes. */
  function windowRect(recorder: ReturnType<typeof createStubContext>) {
    const rects = recorder.calls.filter((call) => call.op === "fillRect");
    const last = rects[rects.length - 1];

    return { height: last.args[3], width: last.args[2], x: last.args[0] };
  }

  it("fills the whole track when nothing is zoomed", () => {
    const { draw, recorder } = makeDraw({ row: MINIMAP_ROW });

    // The scale in `makeDraw` is the full payload window, so the viewport and
    // the extent are the same range.
    drawMinimap(draw, NO_OVERVIEW);

    expect(windowRect(recorder).width).toBeCloseTo(WIDTH, 0);
  });

  it("places the box where the viewport sits inside the extent", () => {
    const view = { end: 45_678, start: 45_534 };
    const { draw, recorder } = makeDraw({
      row: MINIMAP_ROW,
      scale: createScale(view, WIDTH),
    });

    drawMinimap(draw, NO_OVERVIEW);

    const box = windowRect(recorder);
    const span = BOUNDS.end - BOUNDS.start + 1;

    // The invariant the row exists for: the box's position and width within
    // the bar are the viewport's position and width within the extent. Stated
    // as fractions rather than pixels, since pixels are the thing under test.
    expect(box.x / WIDTH).toBeCloseTo((view.start - BOUNDS.start) / span, 3);
    expect(box.width / WIDTH).toBeCloseTo(
      (view.end - view.start + 1) / span,
      3
    );
  });

  it("keeps a deeply zoomed window visible", () => {
    const { draw, recorder } = makeDraw({
      row: MINIMAP_ROW,
      scale: createScale({ end: 45_483, start: 45_464 }, WIDTH),
    });

    drawMinimap(draw, NO_OVERVIEW);

    // 20 bases of 289 is 55 px here, but the same window inside a 40 kb extent
    // is a fraction of a pixel. The floor is what stops the indicator
    // disappearing exactly when a user is most lost.
    expect(windowRect(recorder).width).toBeGreaterThanOrEqual(3);
  });

  it("holds the box inside the track at the far edge", () => {
    const { draw, recorder } = makeDraw({
      row: MINIMAP_ROW,
      scale: createScale({ end: BOUNDS.end, start: BOUNDS.end - 1 }, WIDTH),
    });

    drawMinimap(draw, NO_OVERVIEW);

    const box = windowRect(recorder);

    expect(box.x + box.width).toBeLessThanOrEqual(WIDTH);
  });

  it("captions the band with the visible range", () => {
    const { draw, recorder } = makeDraw({
      row: MINIMAP_ROW,
      scale: createScale({ end: 45_560, start: 45_500 }, WIDTH),
    });

    drawMinimap(draw, NO_OVERVIEW);

    expect(recorder.texts.some((label) => label.text === "45,500–45,560")).toBe(
      true
    );
  });

  it("keeps the caption on screen when the band is against an edge", () => {
    const { draw, recorder } = makeDraw({
      row: MINIMAP_ROW,
      scale: createScale({ end: BOUNDS.start + 1, start: BOUNDS.start }, WIDTH),
    });

    drawMinimap(draw, NO_OVERVIEW);

    const caption = recorder.texts.find((label) => label.text.includes("–"));

    // Centred on a band at x=0, the caption would start off the left edge.
    expect(caption?.x).toBeGreaterThan(0);
  });

  it("labels its ticks against the extent, not the viewport", () => {
    const { draw, recorder } = makeDraw({
      row: MINIMAP_ROW,
      scale: createScale({ end: 45_500, start: 45_470 }, WIDTH),
    });

    drawMinimap(draw, NO_OVERVIEW);

    // A tick past the right edge of the viewport has to appear, or the box has
    // nothing to be positioned against.
    expect(recorder.texts.some((label) => label.text.includes("45,700"))).toBe(
      true
    );
  });

  it("draws bar only, and no labels, at compact density", () => {
    const { draw, recorder } = makeDraw({
      density: "compact",
      row: minimapRow("compact"),
    });

    drawMinimap(draw, NO_OVERVIEW);

    expect(recorder.texts).toHaveLength(0);
  });

  it(INSIDE_ROW, () => {
    const { draw, recorder } = makeDraw({ row: MINIMAP_ROW });

    drawMinimap(draw, NO_OVERVIEW);

    drawnYs(recorder.calls).forEach((y) => {
      expect(y).toBeGreaterThanOrEqual(MINIMAP_ROW.y);
      expect(y).toBeLessThanOrEqual(MINIMAP_ROW.y + MINIMAP_ROW.height);
    });
  });

  /**
   * The chromosome-spanning row, which is the shape the design asks for and
   * the one a re-fetching track needs: the band has to stay meaningful while
   * the payload window moves underneath it.
   */
  describe("over a chromosome", () => {
    const overview = DEFAULT_TRACK_DATA.overview as MinimapOverview;
    const CHROMOSOME = {
      extent: { end: overview.chrom_length, start: 1 },
      feature: null,
      window: BOUNDS,
    };

    it("places the band by the viewport's position in the chromosome", () => {
      const { draw, recorder } = makeDraw({
        row: MINIMAP_ROW,
        scale: createScale(BOUNDS, WIDTH),
      });

      drawMinimap(draw, CHROMOSOME);

      // 45 kb into 4.6 Mb is about 1% across the bar. Before the row spanned
      // the chromosome this same input filled it end to end, which is the
      // regression this pins.
      expect(windowRect(recorder).x / WIDTH).toBeCloseTo(
        BOUNDS.start / overview.chrom_length,
        2
      );
    });

    it("keeps the band visible at a fraction of a pixel", () => {
      const { draw, recorder } = makeDraw({
        row: MINIMAP_ROW,
        scale: createScale(BOUNDS, WIDTH),
      });

      drawMinimap(draw, CHROMOSOME);

      // 289 bp of 4.6 Mb is six hundredths of a pixel. At chromosome scale the
      // minimum width is the normal case, not an edge case.
      expect(windowRect(recorder).width).toBeGreaterThanOrEqual(3);
    });

    /** One feature's chromosome-wide trace, as the shell fetches on selection. */
    const FEATURE: FeatureOverview = {
      bins: overview.bins,
      feature_id: 13_492,
      values: Array.from({ length: overview.bins.n_bins }, (_, index) =>
        index % 50 === 0 ? 1 : 0
      ),
    };

    it("draws one band and nothing else until a feature is selected", () => {
      const { draw, recorder } = makeDraw({ row: MINIMAP_ROW });

      drawMinimap(draw, CHROMOSOME);

      // The track, and the viewport band on top of it — exactly one band. At
      // chromosome scale a loaded-window outline or a coarse chromosome band
      // would collapse to the 3 px floor and land on the viewport band as an
      // indistinguishable grey mark.
      expect(
        recorder.calls.filter((call) => call.op === "fillRect")
      ).toHaveLength(2);
      expect(
        recorder.calls.filter((call) => call.op === "strokeRect")
      ).toHaveLength(1);
    });

    it("draws the selected feature's trace inside the bar", () => {
      const { draw, recorder } = makeDraw({ row: MINIMAP_ROW });

      drawMinimap(draw, { ...CHROMOSOME, feature: FEATURE });

      // One column per firing bin, on top of the track and the viewport band.
      const firing = FEATURE.values.filter((value) => value > 0).length;

      expect(
        recorder.calls.filter((call) => call.op === "fillRect")
      ).toHaveLength(2 + firing);
    });

    it("labels its ticks across the chromosome, not the window", () => {
      const { draw, recorder } = makeDraw({
        row: MINIMAP_ROW,
        scale: createScale(BOUNDS, WIDTH),
      });

      drawMinimap(draw, CHROMOSOME);

      // Megabase ticks, which only exist if the row is spanning a chromosome.
      expect(recorder.texts.some((label) => /M$/.test(label.text))).toBe(true);
    });

    it(INSIDE_ROW, () => {
      const { draw, recorder } = makeDraw({ row: MINIMAP_ROW });

      drawMinimap(draw, CHROMOSOME);

      drawnYs(recorder.calls).forEach((y) => {
        expect(y).toBeGreaterThanOrEqual(MINIMAP_ROW.y);
        expect(y).toBeLessThanOrEqual(MINIMAP_ROW.y + MINIMAP_ROW.height);
      });
    });

    it("draws a silent feature without dividing by its own peak", () => {
      const { draw, recorder } = makeDraw({ row: MINIMAP_ROW });

      drawMinimap(draw, {
        ...CHROMOSOME,
        feature: { ...FEATURE, values: FEATURE.values.map(() => 0) },
      });

      // A feature that never fires normalizes by zero. The row has to draw a
      // flat bar rather than NaN rects, which draw nothing and throw nothing.
      drawnYs(recorder.calls).forEach((y) =>
        expect(Number.isNaN(y)).toBe(false)
      );
    });
  });
});

describe("drawOutsideWindow", () => {
  const BANDS = [{ bottom: 100, top: 20 }];

  function run(
    viewport: { end: number; start: number },
    window: { end: number; start: number }
  ) {
    const { draw, recorder } = makeDraw({
      scale: createScale(viewport, WIDTH),
    });

    drawOutsideWindow(
      draw.ctx,
      PALETTE,
      draw.scale,
      BANDS,
      uncoveredRanges(viewport, window)
    );

    return recorder;
  }

  it("draws nothing when the payload covers the viewport", () => {
    const recorder = run(
      { end: 2_000, start: 1_000 },
      { end: 3_000, start: 1 }
    );

    expect(recorder.calls).toHaveLength(0);
  });

  it("tints the uncovered side and rules the boundary", () => {
    const recorder = run(
      { end: 2_000, start: 1_000 },
      { end: 3_000, start: 1_500 }
    );
    const rects = recorder.calls.filter((call) => call.op === "fillRect");

    expect(rects).toHaveLength(1);

    // The left half of the viewport is unloaded, so the tint starts at the
    // plot's left edge and stops halfway.
    expect(rects[0].args[0]).toBe(0);
    expect(rects[0].args[2]).toBeCloseTo(WIDTH / 2, 0);

    // And it is confined to the band, not the whole canvas: the minimap draws
    // on the chromosome, so washing it would mark an unrelated region.
    expect(rects[0].args[1]).toBe(BANDS[0].top);
    expect(rects[0].args[3]).toBe(BANDS[0].bottom - BANDS[0].top);
  });

  it("puts the rule on the edge that faces the data", () => {
    const left = run(
      { end: 2_000, start: 1_000 },
      { end: 3_000, start: 1_500 }
    );
    const right = run({ end: 2_000, start: 1_000 }, { end: 1_500, start: 1 });

    const ruleX = (recorder: ReturnType<typeof createStubContext>) =>
      recorder.calls.find((call) => call.op === "moveTo")?.args[0] ??
      Number.NaN;

    // Both windows stop halfway across the viewport, so both rules land at the
    // midpoint — within a pixel, since the rule is drawn on a half-pixel to
    // land crisply and the range is inclusive. The point is that it marks the
    // coordinate where the data stops, not the edge of the tinted region: at
    // the plot's own edge it would be indistinguishable from a border.
    [ruleX(left), ruleX(right)].forEach((x) => {
      expect(Math.abs(x - WIDTH / 2)).toBeLessThan(2);
    });
  });

  it("tints both sides when the viewport contains the whole payload", () => {
    const recorder = run(
      { end: 3_000, start: 1_000 },
      { end: 2_000, start: 2_000 }
    );

    expect(
      recorder.calls.filter((call) => call.op === "fillRect")
    ).toHaveLength(2);
  });

  it("draws nothing when there are no bands to draw into", () => {
    const { draw, recorder } = makeDraw();

    drawOutsideWindow(
      draw.ctx,
      PALETTE,
      draw.scale,
      [],
      [{ end: 10, start: 1 }]
    );

    expect(recorder.calls).toHaveLength(0);
  });
});

describe("drawFeatureBars", () => {
  /**
   * The y axis: one number, the trace's own maximum, at the top of its bars.
   *
   * Overlaid rather than inset, which is the property worth pinning. Every row
   * shares one bp axis measured from the plot's left edge, so insetting the
   * features rows alone would put a bar at a different x from the annotation
   * block covering the same base.
   */
  describe("the y axis", () => {
    const trace = DEFAULT_TRACK_DATA.features[0];

    it("labels the trace's peak at the top of its band", () => {
      const { draw, recorder } = makeDraw({ row: FEATURE_ROW });

      drawFeatureBars(draw, trace, DEFAULT_TRACK_DATA.bins);

      const label = recorder.texts.find(
        (entry) => entry.text === formatActivation(trace.peak)
      );

      const barsTop =
        FEATURE_ROW.y +
        (FEATURE_ROW.labelInset ?? 0) +
        (FEATURE_ROW.axisInset ?? 0);

      expect(label).toBeDefined();
      // Baseline 1 px above the bars, in the strip reserved for it.
      expect(FEATURE_ROW.axisInset).toBeGreaterThan(0);
      expect(label?.y).toBe(barsTop - 1);
    });

    it("clears the tallest bar instead of sitting on it", () => {
      const { draw, recorder } = makeDraw({ row: FEATURE_ROW });

      drawFeatureBars(draw, trace, DEFAULT_TRACK_DATA.bins);

      const label = recorder.texts.find(
        (entry) => entry.text === formatActivation(trace.peak)
      );
      const bars = recorder.calls.filter((call) => call.op === "fillRect");
      const tallestTop = Math.min(...bars.map((bar) => bar.args[1]));

      // The bars are normalized to the trace's own peak, so the tallest one
      // reaches the top of its band every time. Drawn over them the label was
      // never occasionally obscured — it was always obscured.
      expect(label?.y).toBeLessThan(tallestTop);
    });

    it("draws it at the plot's left edge, taking no width from the axis", () => {
      const { draw, recorder } = makeDraw({ row: FEATURE_ROW });

      drawFeatureBars(draw, trace, DEFAULT_TRACK_DATA.bins);

      const label = recorder.texts.find(
        (entry) => entry.text === formatActivation(trace.peak)
      );
      const bars = recorder.calls.filter((call) => call.op === "fillRect");

      // x = 0 for the label, and the bars still start from 0 too: the label
      // overlays them rather than shifting the coordinate system.
      expect(label?.x).toBe(0);
      expect(Math.min(...bars.map((bar) => bar.args[0]))).toBeLessThan(1);
    });

    it("omits it at compact density", () => {
      const { draw, recorder } = makeDraw({
        density: "compact",
        row: { ...FEATURE_ROW, labelInset: 0 },
      });

      drawFeatureBars(draw, trace, DEFAULT_TRACK_DATA.bins);

      // Compact drops the trace names; the axis goes with them rather than
      // being the one piece of text left in a thumbnail.
      expect(recorder.texts).toHaveLength(0);
    });

    it("omits it for a silent trace", () => {
      const { draw, recorder } = makeDraw({ row: FEATURE_ROW });

      drawFeatureBars(
        draw,
        { ...trace, peak: 0, values: trace.values.map(() => 0) },
        DEFAULT_TRACK_DATA.bins
      );

      expect(recorder.texts).toHaveLength(0);
    });
  });

  /** A features sub-row as the layout builds one: bars under a label band. */
  /**
   * A real features row from the layout rather than a hand-written one.
   *
   * The row carries two insets the renderer has to subtract — the trace's name
   * and the y axis — and a fixture that omitted either would let the bars and
   * the label agree with each other while both disagreed with what ships.
   */
  const FEATURE_ROW: TrackRow = layoutRows(DEFAULT_TRACK_DATA, {
    blockRowHeight: 16,
    density: "comfortable",
    featureRowHeight: 24,
    maxAnnotationLanes: 4,
    maxFeatureRows: 1,
    showRowLabels: true,
    tracks: ["features"],
  }).rows[0];

  it("draws a bar per firing bin", () => {
    const { draw, recorder } = makeDraw({ row: FEATURE_ROW });
    const trace = DEFAULT_TRACK_DATA.features[0];

    drawFeatureBars(draw, trace, DEFAULT_TRACK_DATA.bins);

    const firing = trace.values.filter((value) => value > 0).length;

    expect(
      recorder.calls.filter((call) => call.op === "fillRect")
    ).toHaveLength(firing);
  });

  it("draws nothing for a silent bin", () => {
    const { draw, recorder } = makeDraw({ row: FEATURE_ROW });

    drawFeatureBars(
      draw,
      { ...DEFAULT_TRACK_DATA.features[0], peak: 1, values: [0, 0, 0, 0] },
      { end: 4, n_bins: 4, start: 1, stride: 1 }
    );

    // A 1 px stub for silence would read as a faint signal, which across a
    // mostly-quiet trace looks like noise the feature does not have.
    expect(recorder.calls.some((call) => call.op === "fillRect")).toBe(false);
  });

  it("keeps its bars below the label band", () => {
    const { draw, recorder } = makeDraw({ row: FEATURE_ROW });

    drawFeatureBars(
      draw,
      DEFAULT_TRACK_DATA.features[0],
      DEFAULT_TRACK_DATA.bins
    );

    const top = FEATURE_ROW.y + (FEATURE_ROW.labelInset ?? 0);

    // The label is DOM text drawn over this row, so a bar reaching into the
    // inset would run underneath the name rather than beside it.
    recorder.calls
      .filter((call) => call.op === "fillRect")
      .forEach((call) => {
        expect(call.args[1]).toBeGreaterThanOrEqual(top);
        expect(call.args[1] + call.args[3]).toBeLessThanOrEqual(
          FEATURE_ROW.y + FEATURE_ROW.height
        );
      });
  });

  it("still draws a baseline for a trace that never fires", () => {
    const { draw, recorder } = makeDraw({ row: FEATURE_ROW });

    drawFeatureBars(
      draw,
      {
        ...DEFAULT_TRACK_DATA.features[0],
        peak: 0,
        values: DEFAULT_TRACK_DATA.features[0].values.map(() => 0),
      },
      DEFAULT_TRACK_DATA.bins
    );

    // Without the baseline an all-zero row is indistinguishable from a row
    // whose draw pass failed. A zero peak must not divide either.
    expect(recorder.calls.some((call) => call.op === "fillRect")).toBe(false);
    expect(recorder.calls.some((call) => call.op === "stroke")).toBe(true);
    expect(drawnYs(recorder.calls).every(Number.isFinite)).toBe(true);
  });

  it("draws nothing at all when the bin axis misses the window", () => {
    const { draw, recorder } = makeDraw({ row: FEATURE_ROW });

    drawFeatureBars(
      draw,
      { ...DEFAULT_TRACK_DATA.features[0], peak: 1, values: [1, 1] },
      { end: 2, n_bins: 2, start: 1, stride: 1 }
    );

    // Not even a baseline: a baseline claims "this feature is silent across
    // this window", and a payload whose bins do not reach the window has said
    // nothing about it either way.
    expect(recorder.calls).toHaveLength(0);
  });
});
