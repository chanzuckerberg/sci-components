import {
  ColorScale,
  ContinuousColorStop,
  SteppedColorStop,
} from "../StructureViewer.types";

/** RGB triplet with each channel in the range 0-255. */
export type Rgb = [number, number, number];

/**
 * Perceptually uniform sequential scale (matplotlib's plasma), the default for
 * per-residue value overlays.
 */
export const PLASMA_COLOR_SCALE: ColorScale = {
  kind: "continuous",
  stops: [
    { color: "#0D0887", t: 0 },
    { color: "#7E03A8", t: 0.25 },
    { color: "#CC4778", t: 0.5 },
    { color: "#F89441", t: 0.75 },
    { color: "#F0F921", t: 1 },
  ],
};

/**
 * AlphaFold's pLDDT confidence bands. Thresholds are on the 0-1 scale that
 * `plddt` values use, ascending from lowest to highest confidence.
 */
export const PLDDT_COLOR_SCALE: ColorScale = {
  kind: "stepped",
  stops: [
    { color: "#FF7C45", label: "0.5", threshold: 0.5 },
    { color: "#FFDB11", label: "0.7", threshold: 0.7 },
    { color: "#64CBF3", label: "0.9", threshold: 0.9 },
    { color: "#0053D5", label: "1.0", threshold: 1 },
  ],
};

/** Parses `#RRGGBB` (or `RRGGBB`) into an RGB triplet. */
export function hexToRgb(hex: string): Rgb {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

/** Linearly interpolates a continuous scale at `t`, clamped to 0-1. */
export function sampleContinuousScale(
  stops: ContinuousColorStop[],
  t: number
): Rgb {
  if (stops.length === 0) return [0, 0, 0];

  const first = stops[0] as ContinuousColorStop;
  const last = stops[stops.length - 1] as ContinuousColorStop;
  const clamped = Math.min(1, Math.max(0, t));

  let lo = first;
  let hi = last;
  for (let i = 0; i < stops.length - 1; i++) {
    const current = stops[i] as ContinuousColorStop;
    const next = stops[i + 1] as ContinuousColorStop;
    if (clamped >= current.t && clamped <= next.t) {
      lo = current;
      hi = next;
      break;
    }
  }

  const loRgb = hexToRgb(lo.color);
  const hiRgb = hexToRgb(hi.color);
  const f = hi.t === lo.t ? 0 : (clamped - lo.t) / (hi.t - lo.t);

  return [
    Math.round(
      (loRgb[0] as number) + f * ((hiRgb[0] as number) - (loRgb[0] as number))
    ),
    Math.round(
      (loRgb[1] as number) + f * ((hiRgb[1] as number) - (loRgb[1] as number))
    ),
    Math.round(
      (loRgb[2] as number) + f * ((hiRgb[2] as number) - (loRgb[2] as number))
    ),
  ];
}

/**
 * Picks the band a normalized value falls into on a stepped scale.
 *
 * A value lands in the first band whose threshold it falls short of, which puts
 * each threshold at the bottom of the band above it: on the pLDDT scale a score
 * of exactly 0.7 reads as the 0.7-0.9 band, not the one below.
 */
export function sampleSteppedScale(stops: SteppedColorStop[], t: number): Rgb {
  for (const stop of stops) {
    if (t < stop.threshold) return hexToRgb(stop.color);
  }
  const last = stops[stops.length - 1];
  return last ? hexToRgb(last.color) : [0, 0, 0];
}

/**
 * Colors a raw value against a scale, normalizing it into `min`-`max` first.
 * Returns null when the value sits at or below `min`, or when the range is
 * degenerate, so callers can fall back to a neutral color.
 */
export function sampleColorScale(
  scale: ColorScale,
  value: number,
  max: number,
  min = 0
): Rgb | null {
  if (max <= min || value <= min) return null;
  const t = Math.min(1, (value - min) / (max - min));

  return scale.kind === "continuous"
    ? sampleContinuousScale(scale.stops, t)
    : sampleSteppedScale(scale.stops, t);
}

/** CSS `linear-gradient` spanning a continuous scale, for the legend bar. */
export function toCssGradient(stops: ContinuousColorStop[]): string {
  const parts = stops.map((stop) => `${stop.color} ${stop.t * 100}%`);
  return `linear-gradient(to right, ${parts.join(", ")})`;
}
