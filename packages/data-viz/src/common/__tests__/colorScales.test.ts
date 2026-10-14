import {
  ColorScale,
  PLASMA_COLOR_SCALE,
  SteppedColorStop,
  hexToRgb,
  sampleColorScale,
  sampleContinuousScale,
  sampleSteppedScale,
  toCssGradient,
} from "../colorScales";

const PLASMA_STOPS =
  PLASMA_COLOR_SCALE.kind === "continuous" ? PLASMA_COLOR_SCALE.stops : [];

/** Four ascending bands, standing in for any stepped scale. */
const STEPPED_STOPS: SteppedColorStop[] = [
  { color: "#FF7C45", label: "0.5", threshold: 0.5 },
  { color: "#FFDB11", label: "0.7", threshold: 0.7 },
  { color: "#64CBF3", label: "0.9", threshold: 0.9 },
  { color: "#0053D5", label: "1.0", threshold: 1 },
];
const STEPPED_SCALE: ColorScale = { kind: "stepped", stops: STEPPED_STOPS };

describe("hexToRgb", () => {
  it("parses hex with and without the leading hash", () => {
    expect(hexToRgb("#0D0887")).toEqual([13, 8, 135]);
    expect(hexToRgb("0D0887")).toEqual([13, 8, 135]);
  });

  it("is case insensitive", () => {
    expect(hexToRgb("#f0f921")).toEqual(hexToRgb("#F0F921"));
  });
});

describe("sampleContinuousScale", () => {
  it("returns the endpoint colors at the ends of the range", () => {
    expect(sampleContinuousScale(PLASMA_STOPS, 0)).toEqual([13, 8, 135]);
    expect(sampleContinuousScale(PLASMA_STOPS, 1)).toEqual([240, 249, 33]);
  });

  it("returns a stop color exactly when t lands on it", () => {
    expect(sampleContinuousScale(PLASMA_STOPS, 0.5)).toEqual([204, 71, 120]);
  });

  it("interpolates between the surrounding stops", () => {
    // Halfway between the 0.0 and 0.25 stops.
    expect(sampleContinuousScale(PLASMA_STOPS, 0.125)).toEqual([70, 6, 152]);
  });

  it("clamps out-of-range values to the endpoints", () => {
    expect(sampleContinuousScale(PLASMA_STOPS, -5)).toEqual([13, 8, 135]);
    expect(sampleContinuousScale(PLASMA_STOPS, 5)).toEqual([240, 249, 33]);
  });

  it("returns black for an empty scale rather than throwing", () => {
    expect(sampleContinuousScale([], 0.5)).toEqual([0, 0, 0]);
  });
});

describe("sampleSteppedScale", () => {
  it("puts each threshold at the bottom of the band above it", () => {
    // 0.7 is the boundary between the 0.5-0.7 and 0.7-0.9 bands.
    expect(sampleSteppedScale(STEPPED_STOPS, 0.69)).toEqual(
      hexToRgb("#FFDB11")
    );
    expect(sampleSteppedScale(STEPPED_STOPS, 0.7)).toEqual(hexToRgb("#64CBF3"));
  });

  it("returns the lowest band below the first threshold", () => {
    expect(sampleSteppedScale(STEPPED_STOPS, 0)).toEqual(hexToRgb("#FF7C45"));
  });

  it("returns the highest band at the top of the range", () => {
    expect(sampleSteppedScale(STEPPED_STOPS, 1)).toEqual(hexToRgb("#0053D5"));
  });
});

describe("sampleColorScale", () => {
  it("normalizes a raw value into the min-max range", () => {
    // 1.2 of 2.4 is the midpoint, which is the 0.5 plasma stop.
    expect(sampleColorScale(PLASMA_COLOR_SCALE, 1.2, 2.4)).toEqual([
      204, 71, 120,
    ]);
  });

  it("returns null at or below min so callers can render a neutral color", () => {
    expect(sampleColorScale(PLASMA_COLOR_SCALE, 0, 2.4)).toBeNull();
    expect(sampleColorScale(PLASMA_COLOR_SCALE, -1, 2.4)).toBeNull();
    expect(sampleColorScale(PLASMA_COLOR_SCALE, 0.5, 2.4, 0.5)).toBeNull();
  });

  it("returns null for a degenerate range", () => {
    expect(sampleColorScale(PLASMA_COLOR_SCALE, 1, 0)).toBeNull();
    expect(sampleColorScale(PLASMA_COLOR_SCALE, 1, 1, 1)).toBeNull();
  });

  it("shifts the normalization when min is raised", () => {
    // With min 1, a value of 2 sits halfway to a max of 3.
    expect(sampleColorScale(PLASMA_COLOR_SCALE, 2, 3, 1)).toEqual([
      204, 71, 120,
    ]);
  });

  it("clamps values above max to the top of the scale", () => {
    expect(sampleColorScale(PLASMA_COLOR_SCALE, 99, 2.4)).toEqual([
      240, 249, 33,
    ]);
  });

  it("samples stepped scales through the same entry point", () => {
    expect(sampleColorScale(STEPPED_SCALE, 0.95, 1)).toEqual(
      hexToRgb("#0053D5")
    );
  });
});

describe("toCssGradient", () => {
  it("emits a left-to-right gradient with a percentage per stop", () => {
    expect(toCssGradient(PLASMA_STOPS)).toBe(
      "linear-gradient(to right, #0D0887 0%, #7E03A8 25%, #CC4778 50%, #F89441 75%, #F0F921 100%)"
    );
  });
});
