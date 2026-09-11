import { FeatureTrace, GenomeTrackData, TrackKind } from "../GenomeTrack.types";

/**
 * Row layout for the track.
 *
 * The `tracks` prop is an ordered list of row kinds; this turns it into
 * concrete y offsets and heights, skipping rows the payload cannot fill. Doing
 * it as a separate pass rather than inline in the renderer means hit-testing
 * and the accessible table read the same layout the canvas drew, so a click
 * cannot land on a row the user is not looking at.
 */

export interface TrackRow {
  kind: TrackKind;
  /** Top edge in CSS px, relative to the plot area. */
  y: number;
  height: number;
  /** Label shown in the gutter. Empty for rows the design leaves unlabelled. */
  label: string;
  /**
   * Which trace a `"features"` sub-row draws, as an index into
   * `featureTraces(data)`.
   *
   * The features row is the one kind that expands: one sub-row per trace,
   * rather than one row per kind. Carrying the index on the row is what lets
   * hit-testing and the renderer address a single trace without recomputing
   * which one a y offset belongs to.
   */
  traceIndex?: number;
  /**
   * The trace's display name, drawn as DOM text inside the row.
   *
   * Feature names run to forty characters and the gutter is ninety-six pixels
   * wide, so they cannot go where every other row's label goes. They are DOM
   * rather than canvas text for the reason all the component's text is: canvas
   * text is invisible to find-in-page and ignores a reader's font settings.
   */
  traceLabel?: string;
  /** Space reserved at the top of the row for `traceLabel`, in px. */
  labelInset?: number;
}

export interface RowLayoutOptions {
  blockRowHeight: number;
  density: "comfortable" | "compact";
  featureRowHeight: number;
  maxFeatureRows: number;
  tracks: TrackKind[];
}

/** Vertical gap between rows, per density. */
const ROW_GAP = { comfortable: 10, compact: 4 };

/** Vertical gap between the sub-rows of the features stack, per density. */
const FEATURE_GAP = { comfortable: 6, compact: 3 };

/**
 * Height reserved above a feature's bars for its name, per density.
 *
 * Zero in compact: a comparison card has no room for forty characters per row,
 * and the names are the first thing to go when the card is the size of a
 * thumbnail.
 */
export const FEATURE_LABEL_HEIGHT = { comfortable: 16, compact: 0 };

/** Height of the minimap's bar, per density. */
export const MINIMAP_BAR_HEIGHT = { comfortable: 20, compact: 12 };

/**
 * Space above the minimap's bar for the visible range, per density.
 *
 * The range is captioned above the bar rather than written inside the band, for
 * two reasons. The band shrinks as the user zooms in — at a deep zoom it is
 * three pixels wide and could not hold text at all — and a caption on the row's
 * own background can use a colour that contrasts in both themes. Text on the
 * band cannot: the band is a neutral fill, which is dark in light mode and
 * light in dark mode, and no `textOnFill` token flips with it.
 */
export const MINIMAP_RANGE_HEIGHT = { comfortable: 14, compact: 0 };

/**
 * Space under the minimap's bar for its own tick labels, per density.
 *
 * These are the only coordinates drawn inside the plot. They belong to the
 * extent rather than the visible range, which is the pairing that makes the
 * band readable: the header states where you are, and the bar states what you
 * are inside of. Zero in compact, where a card has no room for either.
 */
export const MINIMAP_LABEL_HEIGHT = { comfortable: 16, compact: 0 };

/** Height of the sequence row, per density. */
export const SEQUENCE_HEIGHT = { comfortable: 18, compact: 12 };

const ROW_LABELS: Record<TrackKind, string> = {
  annotations: "Annotations",
  features: "Features",
  minimap: "Minimap",
  segments: "Predicted",
  sequence: "Sequence",
};

/**
 * The traces the features row can draw, in the order it draws them.
 *
 * Pinned first, then ranked: a user who pinned a feature asked for that one
 * specifically, and the payload lists the rest highest-scoring first. The order
 * is the payload's and is never re-sorted here — the server ranks, and the
 * segment-features endpoint returns an explicit `rank`, so re-deriving an order
 * from `score` would be a second opinion nobody asked for.
 *
 * Returns the whole list rather than a capped one so that a `traceIndex` means
 * the same thing to every caller. The layout slices a prefix of it for the rows
 * it draws, which leaves the indices of everything it kept unchanged.
 */
export function featureTraces(data: GenomeTrackData): FeatureTrace[] {
  return [...data.pinned, ...data.features];
}

/**
 * A trace's display name.
 *
 * Falls back to the bare feature id, which is the common case rather than the
 * exceptional one: the knowledge base describes a few percent of features
 * today, and for checkpoints its pipeline has not run against it describes
 * none. A layout that only looks right with prose labels is a layout that only
 * looks right on a fixture.
 */
export function featureLabel(
  data: GenomeTrackData,
  trace: FeatureTrace
): string {
  const note = data.feature_notes[String(trace.feature_id)];

  return note?.label || note?.description || `Feature ${trace.feature_id}`;
}

/**
 * Whether the payload can fill a row.
 *
 * A row the data cannot support is dropped rather than drawn empty: an empty
 * annotation row reads as "no genes here", which is a claim the payload does
 * not make when `annotations` is null ("nobody looked").
 */
function hasDataFor(kind: TrackKind, data: GenomeTrackData): boolean {
  switch (kind) {
    case "features":
      return data.features.length > 0 || data.pinned.length > 0;
    case "annotations":
      return data.annotations !== null;
    case "minimap":
      // Always drawable. The row places the viewport inside the payload's own
      // window, and a payload always has one — it reads `locus`, not the
      // chromosome-scale `overview`, so `caps.overview_available` has no
      // bearing on whether it can be drawn.
      return true;
    case "segments":
      return data.segments.length > 0;
    case "sequence":
      return data.sequence !== null;
    default:
      return false;
  }
}

/**
 * Height of one row, before it is placed.
 *
 * The features row is absent from this: it is the one kind whose height is a
 * function of how many traces it draws, so `layoutRows` sizes it itself.
 */
function heightOf(kind: TrackKind, options: RowLayoutOptions): number {
  switch (kind) {
    case "minimap":
      return (
        MINIMAP_RANGE_HEIGHT[options.density] +
        MINIMAP_BAR_HEIGHT[options.density] +
        MINIMAP_LABEL_HEIGHT[options.density]
      );
    case "sequence":
      return SEQUENCE_HEIGHT[options.density];
    default:
      return options.blockRowHeight;
  }
}

/**
 * Places the requested rows top to bottom, from the top of the plot.
 *
 * Returns the rows and the total height, so the container can size itself to
 * its content rather than the caller guessing a height that happens to fit.
 */
export function layoutRows(
  data: GenomeTrackData,
  options: RowLayoutOptions
): { height: number; rows: TrackRow[] } {
  const gap = ROW_GAP[options.density];
  const rows: TrackRow[] = [];

  let y = 0;

  options.tracks.forEach((kind) => {
    if (!hasDataFor(kind, data)) return;

    if (kind === "features") {
      const labelInset = FEATURE_LABEL_HEIGHT[options.density];
      const height = options.featureRowHeight + labelInset;
      const traces = featureTraces(data).slice(
        0,
        Math.max(options.maxFeatureRows, 0)
      );

      traces.forEach((trace, traceIndex) => {
        rows.push({
          height,
          kind,
          // Only the first sub-row carries the gutter label, so the stack reads
          // as one section rather than as N rows that happen to be adjacent.
          label: traceIndex === 0 ? ROW_LABELS[kind] : "",
          labelInset,
          traceIndex,
          traceLabel: labelInset > 0 ? featureLabel(data, trace) : undefined,
          y,
        });

        y += height + FEATURE_GAP[options.density];
      });

      // The stack closes with the gap that separates rows generally, not the
      // tighter one that separates features from each other.
      if (traces.length > 0) {
        y += gap - FEATURE_GAP[options.density];
      }

      return;
    }

    const height = heightOf(kind, options);

    rows.push({ height, kind, label: ROW_LABELS[kind], y });
    y += height + gap;
  });

  // Trailing gap is trimmed: it would read as unexplained padding at the bottom
  // of a card whose height is otherwise determined by its content.
  return { height: Math.max(y - gap, 0), rows };
}

/** Index of the row under a y offset, or -1 in a gap or below the last row. */
export function rowIndexAt(rows: TrackRow[], y: number): number {
  return rows.findIndex((row) => y >= row.y && y < row.y + row.height);
}

/** Finds the row under a y offset, or null in a gap or below the last row. */
export function rowAt(rows: TrackRow[], y: number): TrackRow | null {
  return rows[rowIndexAt(rows, y)] ?? null;
}
