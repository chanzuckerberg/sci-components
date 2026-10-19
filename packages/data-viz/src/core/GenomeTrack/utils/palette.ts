import { SDSPalette } from "@czi-sds/components";

/**
 * Canvas needs concrete color strings, not CSS variables, so the palette is
 * resolved from the theme here. The fallbacks apply only outside an SDS theme
 * provider, e.g. in unit tests.
 */

export interface TrackPalette {
  /** Reference annotation blocks. */
  annotation: string;
  /** Text drawn on top of an annotation block. */
  annotationText: string;
  /** Ruler baseline, ticks, and row separators. Has alpha; skip `withAlpha`. */
  axis: string;
  /** Ruler tick labels and row labels. */
  axisText: string;
  /** Bars in the features row. */
  featureBar: string;
  /** The minimap's full-extent bar. Has alpha; skip `withAlpha`. */
  minimapTrack: string;
  /** The minimap's window band. Must contrast with `minimapTrack`. */
  minimapWindow: string;
  /** The visible range, captioned above the minimap's bar. */
  minimapText: string;
  /** The chromosome-wide activation summary inside the minimap's bar. */
  minimapSignal: string;
  /** Tint over the part of the viewport with no loaded data. */
  outsideWindow: string;
  /** Boundary between loaded and unloaded coordinates. */
  outsideWindowBorder: string;
  /** Outline on the hovered block. */
  hover: string;
  /** Band behind the sequence ruler. Has alpha; skip `withAlpha`. */
  rowBackground: string;
  /** Predicted segment blocks. */
  segment: string;
  /** Text drawn on top of a segment block. */
  segmentText: string;
  /** Outline on the selected block. */
  selected: string;
  /** Sequence ruler letters. */
  sequenceText: string;
}

const FALLBACK: TrackPalette = {
  annotation: "#6c6c6c",
  annotationText: "#ffffff",
  axis: "#c3c3c3b3",
  axisText: "#767676",
  featureBar: "#5a5aeb",
  hover: "#1b1b1b",
  minimapSignal: "#5a5aeb",
  minimapText: "#767676",
  minimapTrack: "#c3c3c333",
  minimapWindow: "#767676",
  outsideWindow: "rgba(118, 118, 118, 0.08)",
  outsideWindowBorder: "#c3c3c3",
  rowBackground: "#c3c3c333",
  segment: "#5a5aeb",
  segmentText: "#ffffff",
  selected: "#0b0b0b",
  sequenceText: "#767676",
};

/** Converts `#RGB` or `#RRGGBB` to `rgba()`; returns other input unchanged. */
export function withAlpha(color: string, alpha: number): string {
  const hex = color.trim();

  if (!hex.startsWith("#")) return hex;

  const digits =
    hex.length === 4
      ? hex
          .slice(1)
          .split("")
          .map((digit) => digit + digit)
          .join("")
      : hex.slice(1, 7);

  if (digits.length !== 6 || !/^[0-9a-f]{6}$/i.test(digits)) return hex;

  const value = Number.parseInt(digits, 16);

  /* eslint-disable no-bitwise */
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  /* eslint-enable no-bitwise */

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Drops unresolved tokens so `FALLBACK` supplies them. */
function resolved(
  entries: Partial<Record<keyof TrackPalette, string | undefined>>
): Partial<TrackPalette> {
  return Object.fromEntries(
    Object.entries(entries).filter(([, value]) => Boolean(value))
  ) as Partial<TrackPalette>;
}

/** Resolves the drawing palette from the SDS semantic colors. */
export function resolvePalette(
  semanticColors: SDSPalette | null | undefined
): TrackPalette {
  const base = semanticColors?.base;

  if (!base) return FALLBACK;

  const accent = semanticColors?.accent?.fillPrimary;
  const neutral = semanticColors?.neutral?.fillPrimary;
  const tertiary = base.textTertiary ?? FALLBACK.axisText;

  return {
    ...FALLBACK,
    ...resolved({
      annotation: neutral,
      annotationText: base.textOnFill,
      axis: base.borderSecondary,
      axisText: base.textTertiary,
      featureBar: accent,
      hover: base.borderPrimary,
      minimapSignal: accent,
      minimapText: base.textSecondary,
      minimapTrack: base.surfaceSecondary,
      minimapWindow: neutral,
      // No semantic token is translucent, so derive one.
      outsideWindow: withAlpha(tertiary, 0.08),
      outsideWindowBorder: base.divider,
      rowBackground: base.surfaceSecondary,
      segment: accent,
      segmentText: base.textOnFill,
      selected: base.textPrimary,
      sequenceText: base.textSecondary,
    }),
  };
}
