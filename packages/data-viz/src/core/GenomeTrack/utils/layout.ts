import {
  AnnotationBlock,
  FeatureTrace,
  GenomeTrackData,
  SegmentBlock,
  TrackKind,
} from "../GenomeTrack.types";

/**
 * Row layout for the track: turns the `tracks` prop into y offsets and
 * heights, skipping rows the payload cannot fill. The renderer, hit-testing
 * and the accessible table all read this one layout.
 */

export interface TrackRow {
  kind: TrackKind;
  /** Top edge in CSS px, relative to the plot area. */
  y: number;
  height: number;
  /** Section name, drawn above the row. Empty for the rows that share one. */
  label: string;
  /**
   * Space above `row.y` for `label` and its separator. Set only on the first
   * row of each section.
   */
  headerHeight?: number;
  /** Which trace a `"features"` sub-row draws, as an index into `featureTraces(data)`. */
  traceIndex?: number;
  /**
   * The `feature_id` a `"features"` sub-row draws. Use this, not `traceIndex`,
   * as a stable identity: a re-fetch can put a different feature at the same
   * index.
   */
  traceId?: number;
  /** The trace's display name, drawn as DOM text inside the row. */
  traceLabel?: string;
  /** Space reserved at the top of the row for `traceLabel`, in px. */
  labelInset?: number;
  /** Space between `traceLabel` and the bars, holding the y axis maximum. */
  axisInset?: number;
  /** Which lane of the annotations stack this row is, from the top. */
  laneIndex?: number;
  /**
   * The annotations packed into this lane, sorted by start and not
   * overlapping, which `hitTest`'s binary search on `end` relies on.
   */
  laneBlocks?: AnnotationBlock[];
  /**
   * The segments this row draws, sorted by `end` for `hitTest`'s binary
   * search. This assumes segments never nest.
   */
  segmentBlocks?: SegmentBlock[];
}

export interface RowLayoutOptions {
  blockRowHeight: number;
  density: "comfortable" | "compact";
  featureRowHeight: number;
  maxAnnotationLanes: number;
  maxFeatureRows: number;
  /** Whether to reserve a line above each section for its name. */
  showRowLabels: boolean;
  tracks: TrackKind[];
}

/** Vertical gap between rows, per density. */
const ROW_GAP = { comfortable: 10, compact: 4 };

/** Vertical gap between the sub-rows of the features stack, per density. */
const FEATURE_GAP = { comfortable: 8, compact: 3 };

/** Vertical gap between the lanes of the annotations stack, per density. */
const LANE_GAP = { comfortable: 2, compact: 1 };

/** Height reserved above a feature's bars for its name, per density. */
export const FEATURE_LABEL_HEIGHT = { comfortable: 16, compact: 0 };

/**
 * Space between a trace's name and its bars, for the y axis maximum. Bars are
 * normalized to the trace's peak, so the tallest always reaches the top.
 */
export const ACTIVATION_AXIS_HEIGHT = { comfortable: 12, compact: 0 };

/**
 * Space above a section for its name and separator, per density.
 *
 * Reserved above `row.y`, not added to `row.height`. Must be at least as tall
 * as the copy `Button` centred in it (28 px `medium`, 24 px `small`).
 */
export const ROW_LABEL_HEIGHT = { comfortable: 34, compact: 30 };

/** Height of the line above a section, or zero when it has no name. */
export function rowLabelHeight(
  kind: TrackKind,
  density: "comfortable" | "compact",
  showRowLabels: boolean
): number {
  return showRowLabels && ROW_LABELS[kind] ? ROW_LABEL_HEIGHT[density] : 0;
}

/** Height of the minimap's bar, per density. */
export const MINIMAP_BAR_HEIGHT = { comfortable: 24, compact: 12 };

/** Space above the minimap's bar for the visible range caption, per density. */
export const MINIMAP_RANGE_HEIGHT = { comfortable: 14, compact: 0 };

/** Gap between the minimap's bar and the tick axis under it, in px. */
export const MINIMAP_AXIS_GAP = 8;

/**
 * Space under the minimap's bar for its tick axis and labels, per density.
 * Covers `MINIMAP_AXIS_GAP` (8), the notch (3), a 2 px gap and a 10 px label.
 */
export const MINIMAP_LABEL_HEIGHT = { comfortable: 24, compact: 0 };

/**
 * Space under the segments section for its category key, per density. One
 * line; a key that wraps overruns into the row below.
 */
export const SEGMENT_LEGEND_HEIGHT = { comfortable: 24, compact: 0 };

/** Height of the sequence row, per density. */
export const SEQUENCE_HEIGHT = { comfortable: 18, compact: 12 };

/** Section names. An empty string means the section carries no name. */
const ROW_LABELS: Record<TrackKind, string> = {
  annotations: "Annotations",
  features: "Features",
  minimap: "",
  segments: "Predicted",
  sequence: "Sequence",
};

/** The traces the features row can draw, in order: pinned first, then the payload's ranking. */
export function featureTraces(data: GenomeTrackData): FeatureTrace[] {
  return [...data.pinned, ...data.features];
}

/**
 * Packs annotations into lanes so that no two blocks in a lane overlap.
 *
 * First-fit by start: each block goes in the topmost lane whose last block
 * has ended. Lanes do not encode strand. Blocks past `maxLanes` are counted
 * in `overflow` rather than drawn.
 */
export function packAnnotationLanes(
  annotations: AnnotationBlock[],
  maxLanes: number
): { lanes: AnnotationBlock[][]; overflow: number } {
  const limit = Math.max(Math.floor(maxLanes), 1);
  const sorted = [...annotations].sort((a, b) => a.start - b.start);
  const lanes: AnnotationBlock[][] = [];

  let overflow = 0;

  sorted.forEach((annotation) => {
    const lane = lanes.find(
      (candidate) => candidate[candidate.length - 1].end < annotation.start
    );

    if (lane) lane.push(annotation);
    else if (lanes.length < limit) lanes.push([annotation]);
    else overflow += 1;
  });

  return { lanes, overflow };
}

/** A feature's label, else its description, or null when it has neither. */
export function featureNote(
  data: GenomeTrackData,
  trace: FeatureTrace
): string | null {
  const note = data.feature_notes[String(trace.feature_id)];

  return note?.label || note?.description || null;
}

/** A trace's display name, falling back to the feature id. */
export function featureLabel(
  data: GenomeTrackData,
  trace: FeatureTrace
): string {
  return featureNote(data, trace) ?? `Feature ${trace.feature_id}`;
}

/**
 * Whether the payload can fill a row. A null field means "not looked up", so
 * its row is dropped rather than drawn empty.
 */
function hasDataFor(kind: TrackKind, data: GenomeTrackData): boolean {
  switch (kind) {
    case "features":
      return data.features.length > 0 || data.pinned.length > 0;
    case "annotations":
      return data.annotations !== null;
    case "minimap":
      // Drawn from `locus`, which every payload has.
      return true;
    case "segments":
      return data.segments.length > 0;
    case "sequence":
      return data.sequence !== null;
    default:
      return false;
  }
}

/** Height of one single-band row. The features row is sized by `layoutRows`. */
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
 * The annotation lanes, as rows stacked from `y`. Always at least one row, so
 * an empty list draws as an empty labelled row.
 */
function annotationLaneRows(
  data: GenomeTrackData,
  options: RowLayoutOptions,
  y: number,
  headerHeight: number
): { overflow: number; rows: TrackRow[] } {
  const height = options.blockRowHeight;
  const step = height + LANE_GAP[options.density];
  const { lanes, overflow } = packAnnotationLanes(
    data.annotations ?? [],
    options.maxAnnotationLanes
  );

  return {
    overflow,
    rows: Array.from(
      { length: Math.max(lanes.length, 1) },
      (_, laneIndex): TrackRow => ({
        headerHeight: laneIndex === 0 ? headerHeight : 0,
        height,
        kind: "annotations",
        label: laneIndex === 0 ? ROW_LABELS.annotations : "",
        laneBlocks: lanes[laneIndex] ?? [],
        laneIndex,
        y: y + laneIndex * step,
      })
    ),
  };
}

/** The features stack, as rows from `y`: one per trace, up to the cap. */
function featureStackRows(
  data: GenomeTrackData,
  options: RowLayoutOptions,
  y: number,
  headerHeight: number
): TrackRow[] {
  const labelInset = FEATURE_LABEL_HEIGHT[options.density];
  const axisInset = ACTIVATION_AXIS_HEIGHT[options.density];
  const height = options.featureRowHeight + labelInset + axisInset;
  const step = height + FEATURE_GAP[options.density];

  return featureTraces(data)
    .slice(0, Math.max(options.maxFeatureRows, 0))
    .map((trace, traceIndex) => ({
      axisInset,
      headerHeight: traceIndex === 0 ? headerHeight : 0,
      height,
      kind: "features",
      label: traceIndex === 0 ? ROW_LABELS.features : "",
      labelInset,
      traceId: trace.feature_id,
      traceIndex,
      traceLabel: labelInset > 0 ? featureLabel(data, trace) : undefined,
      y: y + traceIndex * step,
    }));
}

/** A row for any kind other than the annotations and features stacks. */
function singleRow(
  kind: TrackKind,
  data: GenomeTrackData,
  band: { headerHeight: number; height: number; y: number }
): TrackRow {
  const row: TrackRow = {
    headerHeight: band.headerHeight,
    height: band.height,
    kind,
    label: ROW_LABELS[kind],
    y: band.y,
  };

  if (kind === "segments") {
    row.segmentBlocks = [...data.segments].sort((a, b) => a.end - b.end);
  }

  return row;
}

/** Places the requested rows top to bottom and returns them with the total height. */
export function layoutRows(
  data: GenomeTrackData,
  options: RowLayoutOptions
): {
  annotationOverflow: number;
  height: number;
  rows: TrackRow[];
  /** Top of the segment category key, or null when there is none to draw. */
  segmentLegendY: number | null;
} {
  const gap = ROW_GAP[options.density];
  const rows: TrackRow[] = [];

  // Drawn only when there are both segments and an enum to explain them.
  const legendHeight =
    data.segments.length > 0 && (data.segment_categories?.length ?? 0) > 0
      ? SEGMENT_LEGEND_HEIGHT[options.density]
      : 0;

  let annotationOverflow = 0;
  let segmentLegendY: number | null = null;
  let y = 0;

  /** Places a stack and leaves `y` under it, plus the row gap. */
  const place = (stack: TrackRow[]): void => {
    if (stack.length === 0) return;

    const last = stack[stack.length - 1];

    rows.push(...stack);
    y = last.y + last.height + gap;
  };

  options.tracks.forEach((kind) => {
    if (!hasDataFor(kind, data)) return;

    const headerHeight = rowLabelHeight(
      kind,
      options.density,
      options.showRowLabels
    );
    const top = y + headerHeight;

    if (kind === "annotations") {
      const packed = annotationLaneRows(data, options, top, headerHeight);

      annotationOverflow = packed.overflow;
      place(packed.rows);

      return;
    }

    if (kind === "features") {
      place(featureStackRows(data, options, top, headerHeight));

      return;
    }

    const height = heightOf(kind, options);

    rows.push(singleRow(kind, data, { headerHeight, height, y: top }));
    y = top + height + gap;

    // The key sits directly under the segments row.
    if (kind === "segments" && legendHeight > 0) {
      segmentLegendY = top + height;
      y += legendHeight;
    }
  });

  // Trim the trailing gap.
  return {
    annotationOverflow,
    height: Math.max(y - gap, 0),
    rows,
    segmentLegendY,
  };
}

/**
 * Contiguous y bands covering every row on the viewport scale, i.e. all but
 * the minimap. Gaps between rows are included; minimaps and section headers
 * split bands.
 */
export function viewportBands(
  rows: TrackRow[]
): { bottom: number; top: number }[] {
  const bands: { bottom: number; top: number }[] = [];

  let open: { bottom: number; top: number } | null = null;

  rows.forEach((row) => {
    if (row.kind === "minimap") {
      open = null;
      return;
    }

    if (open && !row.headerHeight) {
      open.bottom = row.y + row.height;
      return;
    }

    open = { bottom: row.y + row.height, top: row.y };
    bands.push(open);
  });

  return bands;
}

/** Index of the row under a y offset, or -1 in a gap or below the last row. */
export function rowIndexAt(rows: TrackRow[], y: number): number {
  return rows.findIndex((row) => y >= row.y && y < row.y + row.height);
}

/** Finds the row under a y offset, or null in a gap or below the last row. */
export function rowAt(rows: TrackRow[], y: number): TrackRow | null {
  return rows[rowIndexAt(rows, y)] ?? null;
}
