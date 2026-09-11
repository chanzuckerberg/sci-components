import { SDSPalette } from "@czi-sds/components";

/**
 * Canvas needs concrete color strings, not CSS variables.
 *
 * Every other SDS component can hand a token to `styled` and let the cascade
 * resolve it. A canvas cannot: `fillStyle` takes a color, and a `var(--x)`
 * string silently paints nothing at all. So the palette is resolved once per
 * render from the theme's semantic colors, and every drawn color comes from
 * here rather than from a literal in a renderer.
 *
 * The fallbacks exist for one case only — a track mounted outside an SDS theme
 * provider, which happens in bare unit tests. They are not a second theme and
 * should not be tuned to look good; inside a provider the tokens always win.
 */

export interface TrackPalette {
  /** Reference annotation blocks. Gray, per the design. */
  annotation: string;
  /** Text drawn on top of an annotation block. */
  annotationText: string;
  /** Ruler baseline, tick marks, row separators. */
  axis: string;
  /** Ruler tick labels and row labels. */
  axisText: string;
  /**
   * Bars in the features row. Indigo, per the design.
   *
   * Resolves to the same token as `segment` today. Kept separate rather than
   * reusing it because the two say different things — a segment is an interval
   * the pipeline cut, a bar is how hard one feature fired — and a later design
   * that wants them distinguished should not have to untangle one token into
   * two.
   */
  featureBar: string;
  /** The minimap's full-extent bar, under the window band. */
  minimapTrack: string;
  /**
   * The minimap's window band.
   *
   * Grey rather than the accent, so it cannot be mistaken for a segment or a
   * feature — the band marks where you are looking, not something you picked.
   *
   * **It must be a different grey from `minimapTrack`.** The first version of
   * this row drew the band in `neutral.fillSecondary` and the track in
   * `base.fillSecondary`, which both resolve to grey 200: the band was there,
   * positioned correctly, and completely invisible. Hence the two entries and
   * hence this note.
   */
  minimapWindow: string;
  /** The visible range, captioned above the minimap's bar. */
  minimapText: string;
  /** Outline on the hovered block. */
  hover: string;
  /** Banding behind a row, for the sequence ruler. */
  rowBackground: string;
  /** Predicted segment blocks. Indigo, per the design. */
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
  axis: "#c3c3c3",
  axisText: "#767676",
  featureBar: "#5a5aeb",
  hover: "#1b1b1b",
  minimapText: "#767676",
  minimapTrack: "#dfdfdf",
  minimapWindow: "#767676",
  rowBackground: "#f8f8f8",
  segment: "#5a5aeb",
  segmentText: "#ffffff",
  selected: "#0b0b0b",
  sequenceText: "#767676",
};

/**
 * Converts a `#RGB` or `#RRGGBB` color into an `rgba()` string at `alpha`.
 *
 * Only handles the hex forms the design tokens actually use; any other input is
 * returned unchanged, which degrades to a solid fill rather than to an invalid
 * color that paints nothing.
 */
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

/** Resolves the drawing palette from the SDS semantic colors. */
export function resolvePalette(
  semanticColors: SDSPalette | null | undefined
): TrackPalette {
  const base = semanticColors?.base;

  if (!base) return FALLBACK;

  return {
    annotation: semanticColors?.neutral?.fillPrimary ?? FALLBACK.annotation,
    annotationText: base.textOnFill ?? FALLBACK.annotationText,
    axis: base.divider ?? FALLBACK.axis,
    axisText: base.textTertiary ?? FALLBACK.axisText,
    featureBar: semanticColors?.accent?.fillPrimary ?? FALLBACK.featureBar,
    hover: base.borderPrimary ?? FALLBACK.hover,
    minimapText: base.textSecondary ?? FALLBACK.minimapText,
    minimapTrack: base.fillSecondary ?? FALLBACK.minimapTrack,
    // Grey 600 against the track's grey 200. Inverts to a light band on a
    // darker track in dark mode, which keeps the contrast either way.
    minimapWindow:
      semanticColors?.neutral?.fillPrimary ?? FALLBACK.minimapWindow,
    rowBackground: base.surfaceSecondary ?? FALLBACK.rowBackground,
    segment: semanticColors?.accent?.fillPrimary ?? FALLBACK.segment,
    segmentText: base.textOnFill ?? FALLBACK.segmentText,
    selected: base.textPrimary ?? FALLBACK.selected,
    sequenceText: base.textSecondary ?? FALLBACK.sequenceText,
  };
}
