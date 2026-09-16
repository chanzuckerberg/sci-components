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
  /**
   * The minimap's full-extent bar, under the signal and the window band.
   *
   * `base.surfaceSecondary`, which is gray 300 at 20% — a *translucent* token,
   * unlike every other colour here. It is used as a fill straight from the
   * theme and never passed through `withAlpha`, which parses 6-digit hex only
   * and would silently drop the embedded alpha.
   */
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
   * hence this note. The pairing now is grey 600 over grey 300 at 20%, which
   * separates in both themes.
   */
  minimapWindow: string;
  /** The visible range, captioned above the minimap's bar. */
  minimapText: string;
  /**
   * The chromosome-wide activation summary drawn inside the minimap's bar.
   *
   * The accent, because it is the same quantity the features rows draw — "where
   * on this chromosome is anything firing" — just pooled to a thousand bins
   * instead of two thousand. Using a neutral here would break that reading.
   */
  minimapSignal: string;
  /**
   * Tint over the part of the viewport the payload does not cover.
   *
   * Empty space would read as "no genes and no signal here", which is a claim
   * about the genome. This says "no data loaded here", which is a claim about
   * the fetch — the distinction the payload-honesty rule exists to protect.
   */
  outsideWindow: string;
  /** Boundary between loaded and unloaded coordinates. */
  outsideWindowBorder: string;
  /** Outline on the hovered block. */
  hover: string;
  /**
   * Banding behind a row, for the sequence ruler.
   *
   * The same token as `minimapTrack` — `base.surfaceSecondary`, gray 300 at
   * 20% — so the sequence band and the minimap's bar are one grey. Kept as a
   * separate entry rather than reusing `minimapTrack`, on the same reasoning as
   * `featureBar` beside `segment`: they are different surfaces that happen to
   * share a value, and a later design that wants them distinguished should not
   * have to untangle one token into two.
   *
   * Translucent, like `minimapTrack`, and for the same reason must never be
   * passed through `withAlpha`.
   */
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
  minimapSignal: "#5a5aeb",
  minimapText: "#767676",
  // Gray 300 at 20%, the literal form of `base.surfaceSecondary`.
  minimapTrack: "#c3c3c333",
  minimapWindow: "#767676",
  outsideWindow: "rgba(118, 118, 118, 0.08)",
  outsideWindowBorder: "#c3c3c3",
  // Matches `minimapTrack`: both are `base.surfaceSecondary`, so the fallbacks
  // have to agree or a bare unthemed render draws the two greys differently.
  rowBackground: "#c3c3c333",
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

/**
 * Drops entries whose token did not resolve, so `FALLBACK` supplies them.
 *
 * Spreading over the fallbacks rather than writing `?? FALLBACK.x` on every
 * line: with twenty tokens the per-key form is twenty branches, which reads as
 * complex without being so. The behaviour is the same — each token falls back
 * on its own, not the whole palette at once.
 */
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
  // Grey 600 against the track's grey 200. Inverts to a light band on a darker
  // track in dark mode, which keeps the contrast either way.
  const neutral = semanticColors?.neutral?.fillPrimary;
  const tertiary = base.textTertiary ?? FALLBACK.axisText;

  return {
    ...FALLBACK,
    ...resolved({
      annotation: neutral,
      annotationText: base.textOnFill,
      axis: base.divider,
      axisText: base.textTertiary,
      featureBar: accent,
      hover: base.borderPrimary,
      minimapSignal: accent,
      minimapText: base.textSecondary,
      minimapTrack: base.surfaceSecondary,
      minimapWindow: neutral,
      // Derived rather than tokenised: this is a wash over whatever the row
      // behind it drew, so it has to be translucent, and no semantic token is.
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
