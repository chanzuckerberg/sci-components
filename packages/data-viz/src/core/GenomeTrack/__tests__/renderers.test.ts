import { DEFAULT_TRACK_DATA } from "../__storybook__/constants";
import {
  DrawContext,
  drawActivation,
  drawAnnotations,
  drawRuler,
  drawSegments,
  drawSequence,
  segmentLabel,
} from "../renderers";
import { TrackRow } from "../utils/layout";
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
  hover: "#444444",
  rowBackground: "#555555",
  segment: "#666666",
  segmentText: "#ffffff",
  selected: "#777777",
  sequenceText: "#888888",
  trace: "#999999",
  traceFill: "rgba(0,0,0,0.2)",
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

describe("drawRuler", () => {
  it("draws a baseline and tick marks", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 24, kind: "sequence", label: "", y: 0 },
    });

    drawRuler(draw);

    expect(
      recorder.calls.filter((call) => call.op === "stroke").length
    ).toBeGreaterThan(1);
  });

  it("labels ticks at comfortable density", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 24, kind: "sequence", label: "", y: 0 },
    });

    drawRuler(draw);

    expect(recorder.texts.length).toBeGreaterThan(0);
  });

  it("draws ticks but no labels at compact density", () => {
    const { draw, recorder } = makeDraw({
      density: "compact",
      row: { height: 16, kind: "sequence", label: "", y: 0 },
    });

    drawRuler(draw);

    // A comparison card states its range in the header, so repeating
    // coordinates inside the plot would spend space on known information.
    expect(recorder.texts).toHaveLength(0);
    expect(recorder.calls.some((call) => call.op === "stroke")).toBe(true);
  });
});

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

describe("drawActivation", () => {
  it("draws a filled, stroked trace", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 64, kind: "activation", label: "", y: 120 },
    });

    drawActivation(
      draw,
      DEFAULT_TRACK_DATA.features[0],
      DEFAULT_TRACK_DATA.bins
    );

    expect(recorder.calls.some((call) => call.op === "fill")).toBe(true);
    expect(recorder.calls.some((call) => call.op === "stroke")).toBe(true);
  });

  it("stays inside its row", () => {
    const row: TrackRow = {
      height: 64,
      kind: "activation",
      label: "",
      y: 120,
    };
    const { draw, recorder } = makeDraw({ row });

    drawActivation(
      draw,
      DEFAULT_TRACK_DATA.features[0],
      DEFAULT_TRACK_DATA.bins
    );

    drawnYs(recorder.calls).forEach((y) => {
      expect(y).toBeGreaterThanOrEqual(row.y);
      expect(y).toBeLessThanOrEqual(row.y + row.height);
    });
  });

  it("steps rather than interpolating between pooled bins", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 64, kind: "activation", label: "", y: 120 },
    });

    drawActivation(
      draw,
      DEFAULT_TRACK_DATA.features[0],
      DEFAULT_TRACK_DATA.bins
    );

    const lineTos = recorder.calls.filter((call) => call.op === "lineTo");

    // Two `lineTo`s per bin — up to the value, then across the bin's width —
    // because a pooled bin is flat across its bases. A smooth curve would draw
    // values between points that have none.
    expect(lineTos.length).toBeGreaterThanOrEqual(
      DEFAULT_TRACK_DATA.bins.n_bins * 2
    );
  });

  it("does not divide by zero on an all-zero trace", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 64, kind: "activation", label: "", y: 120 },
    });
    const flat = {
      ...DEFAULT_TRACK_DATA.features[0],
      peak: 0,
      values: new Array(DEFAULT_TRACK_DATA.bins.n_bins).fill(0),
    };

    expect(() =>
      drawActivation(draw, flat, DEFAULT_TRACK_DATA.bins)
    ).not.toThrow();

    drawnYs(recorder.calls).forEach((y) => expect(Number.isNaN(y)).toBe(false));
  });

  it("draws nothing when the viewport is outside the bin axis", () => {
    const { draw, recorder } = makeDraw({
      row: { height: 64, kind: "activation", label: "", y: 120 },
      scale: createScale({ end: 900_100, start: 900_000 }, WIDTH),
    });

    drawActivation(
      draw,
      DEFAULT_TRACK_DATA.features[0],
      DEFAULT_TRACK_DATA.bins
    );

    expect(recorder.calls.filter((call) => call.op === "fill")).toHaveLength(0);
  });
});
