import { GenomeTrackData, TrackKind } from "../GenomeTrack.types";

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
}

export interface RowLayoutOptions {
  activationRowHeight: number;
  blockRowHeight: number;
  density: "comfortable" | "compact";
  rulerHeight: number;
  tracks: TrackKind[];
}

/** Vertical gap between rows, per density. */
const ROW_GAP = { comfortable: 10, compact: 4 };

/** Height of the sequence ruler row, per density. */
export const SEQUENCE_HEIGHT = { comfortable: 18, compact: 12 };

/** Ruler is always drawn; these are its heights per density. */
export const RULER_HEIGHT = { comfortable: 24, compact: 16 };

const ROW_LABELS: Record<TrackKind, string> = {
  activation: "Activation",
  annotations: "Annotations",
  features: "Features",
  minimap: "Minimap",
  segments: "Predicted",
  sequence: "",
};

/**
 * Whether the payload can fill a row.
 *
 * A row the data cannot support is dropped rather than drawn empty: an empty
 * annotation row reads as "no genes here", which is a claim the payload does
 * not make when `annotations` is null ("nobody looked").
 */
function hasDataFor(kind: TrackKind, data: GenomeTrackData): boolean {
  switch (kind) {
    case "activation":
      return data.features.length > 0 || data.pinned.length > 0;
    case "annotations":
      return data.annotations !== null;
    case "features":
      // Not yet implemented; accepted on the prop so callers written against
      // the final API keep working, but it occupies no space until it lands.
      return false;
    case "minimap":
      return false;
    case "segments":
      return data.segments.length > 0;
    case "sequence":
      return data.sequence !== null;
    default:
      return false;
  }
}

/** Height of one row, before it is placed. */
function heightOf(kind: TrackKind, options: RowLayoutOptions): number {
  switch (kind) {
    case "activation":
      return options.activationRowHeight;
    case "sequence":
      return SEQUENCE_HEIGHT[options.density];
    default:
      return options.blockRowHeight;
  }
}

/**
 * Places the requested rows top to bottom, after the ruler.
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

  let y = options.rulerHeight + gap;

  options.tracks.forEach((kind) => {
    if (!hasDataFor(kind, data)) return;

    const height = heightOf(kind, options);

    rows.push({ height, kind, label: ROW_LABELS[kind], y });
    y += height + gap;
  });

  // Trailing gap is trimmed: it would read as unexplained padding at the bottom
  // of a card whose height is otherwise determined by its content.
  return { height: Math.max(y - gap, options.rulerHeight), rows };
}

/** Finds the row under a y offset, or null in a gap or below the last row. */
export function rowAt(rows: TrackRow[], y: number): TrackRow | null {
  return rows.find((row) => y >= row.y && y < row.y + row.height) ?? null;
}
