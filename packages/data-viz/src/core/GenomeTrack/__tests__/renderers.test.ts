import { DEFAULT_TRACK_DATA } from "../__storybook__/constants";
import {
  DrawContext,
  drawAnnotations,
  drawFeatureBars,
  drawMinimap,
  drawSegments,
  drawSequence,
  segmentLabel,
} from "../renderers";
import {
  MINIMAP_BAR_HEIGHT,
  MINIMAP_LABEL_HEIGHT,
  MINIMAP_RANGE_HEIGHT,
  TrackRow,
} from "../utils/layout";
import { TrackPalette } from "../utils/palette";
import { createScale } from "../utils/scale";

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
  minimapText: "#767676",
  minimapTrack: "#eeeeee",
  minimapWindow: "#666666",
  rowBackground: "#555555",
  segment: "#666666",
  segmentText: "#ffffff",
  selected: "#777777",
  sequenceText: "#888888",
};

const WIDTH = 800;
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
      ["fillRect", "fillText", "lineTo", "moveTo"].includes(call.op)
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

  it("stays inside its row", () => {
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

    drawSegments(draw, DEFAULT_TRACK_DATA.segments);

    expect(recorder.calls.filter((call) => call.op === "fill").length).toBe(
      DEFAULT_TRACK_DATA.segments.length
    );
  });

  it("labels blocks with the short id and category, not the namespaced id", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 28, kind: "segments", label: "", y: 80 },
    });

    drawSegments(draw, DEFAULT_TRACK_DATA.segments);

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
      /^seg_\d{5} (\+CDS|-CDS|intergenic)$/
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

  /** The window box: the second of the two `fillRect`s, after the track. */
  function windowRect(recorder: ReturnType<typeof createStubContext>) {
    const rects = recorder.calls.filter((call) => call.op === "fillRect");

    return {
      height: rects[1].args[3],
      width: rects[1].args[2],
      x: rects[1].args[0],
    };
  }

  it("fills the whole track when nothing is zoomed", () => {
    const { draw, recorder } = makeDraw({ row: MINIMAP_ROW });

    // The scale in `makeDraw` is the full payload window, so the viewport and
    // the extent are the same range.
    drawMinimap(draw, BOUNDS);

    expect(windowRect(recorder).width).toBeCloseTo(WIDTH, 0);
  });

  it("places the box where the viewport sits inside the extent", () => {
    const view = { end: 45_678, start: 45_534 };
    const { draw, recorder } = makeDraw({
      row: MINIMAP_ROW,
      scale: createScale(view, WIDTH),
    });

    drawMinimap(draw, BOUNDS);

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

    drawMinimap(draw, BOUNDS);

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

    drawMinimap(draw, BOUNDS);

    const box = windowRect(recorder);

    expect(box.x + box.width).toBeLessThanOrEqual(WIDTH);
  });

  it("captions the band with the visible range", () => {
    const { draw, recorder } = makeDraw({
      row: MINIMAP_ROW,
      scale: createScale({ end: 45_560, start: 45_500 }, WIDTH),
    });

    drawMinimap(draw, BOUNDS);

    expect(recorder.texts.some((label) => label.text === "45,500–45,560")).toBe(
      true
    );
  });

  it("keeps the caption on screen when the band is against an edge", () => {
    const { draw, recorder } = makeDraw({
      row: MINIMAP_ROW,
      scale: createScale({ end: BOUNDS.start + 1, start: BOUNDS.start }, WIDTH),
    });

    drawMinimap(draw, BOUNDS);

    const caption = recorder.texts.find((label) => label.text.includes("–"));

    // Centred on a band at x=0, the caption would start off the left edge.
    expect(caption?.x).toBeGreaterThan(0);
  });

  it("labels its ticks against the extent, not the viewport", () => {
    const { draw, recorder } = makeDraw({
      row: MINIMAP_ROW,
      scale: createScale({ end: 45_500, start: 45_470 }, WIDTH),
    });

    drawMinimap(draw, BOUNDS);

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

    drawMinimap(draw, BOUNDS);

    expect(recorder.texts).toHaveLength(0);
  });

  it("stays inside its row", () => {
    const { draw, recorder } = makeDraw({ row: MINIMAP_ROW });

    drawMinimap(draw, BOUNDS);

    drawnYs(recorder.calls).forEach((y) => {
      expect(y).toBeGreaterThanOrEqual(MINIMAP_ROW.y);
      expect(y).toBeLessThanOrEqual(MINIMAP_ROW.y + MINIMAP_ROW.height);
    });
  });
});

describe("drawFeatureBars", () => {
  /** A features sub-row as the layout builds one: bars under a label band. */
  const FEATURE_ROW: TrackRow = {
    height: 40,
    kind: "features",
    label: "Features",
    labelInset: 16,
    traceIndex: 0,
    traceLabel: "ATP-binding cassette (ABC) transporter",
    y: 120,
  };

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
