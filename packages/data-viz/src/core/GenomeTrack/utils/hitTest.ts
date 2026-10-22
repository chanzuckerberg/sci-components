import {
  AnnotationBlock,
  BinAxis,
  FeatureTrace,
  GenomeSelection,
  GenomeTrackData,
  SegmentBlock,
} from "../GenomeTrack.types";
import { TrackRow, featureNote, featureTraces, rowIndexAt } from "./layout";
import { GenomeScale, binIndexToRange, bpToBinIndex, pxToBp } from "./scale";
import { shortSegmentId } from "./format";

/**
 * Pointer hit-testing by base coordinate, not pixel readback. The binary
 * search needs each row's blocks sorted by `end` with no nesting, which the
 * layout pass guarantees.
 */

/** Index of the hit row; feature rows share a kind, so kind is not enough. */
interface FromRow {
  rowIndex: number;
}

export interface BlockHit extends FromRow {
  kind: "annotation" | "segment";
  id: string;
  label: string;
  detail: string;
  start: number;
  end: number;
  strand: "+" | "-" | ".";
}

export interface TraceHit extends FromRow {
  kind: "trace";
  id: string;
  label: string;
  detail: string;
  start: number;
  end: number;
  value: number;
}

export type TrackHit = BlockHit | TraceHit;

/** Whether two hits are the same, to skip redundant state updates. */
export function sameHit(a: TrackHit | null, b: TrackHit | null): boolean {
  if (a === null || b === null) return a === b;

  return (
    a.kind === b.kind &&
    a.id === b.id &&
    a.rowIndex === b.rowIndex &&
    a.start === b.start &&
    a.end === b.end &&
    (a.kind !== "trace" || b.kind !== "trace" || a.value === b.value)
  );
}

/** Index of the first block that could still contain `bp`. */
function firstCandidate(
  blocks: { end: number; start: number }[],
  bp: number
): number {
  let lo = 0;
  let hi = blocks.length;

  while (lo < hi) {
    const mid = (lo + hi) >> 1;

    if (blocks[mid].end < bp) lo = mid + 1;
    else hi = mid;
  }

  return lo;
}

/**
 * First block containing `bp`, or null. `slack` widens the test so very narrow
 * blocks stay clickable.
 */
function blockAt<T extends { end: number; start: number }>(
  blocks: T[],
  bp: number,
  slack: number
): T | null {
  for (let i = firstCandidate(blocks, bp - slack); i < blocks.length; i += 1) {
    const block = blocks[i];

    if (block.start > bp + slack) break;
    if (bp >= block.start - slack && bp <= block.end + slack) return block;
  }

  return null;
}

function annotationHit(
  annotation: AnnotationBlock,
  rowIndex: number
): BlockHit {
  return {
    detail: annotation.product ?? annotation.kind,
    end: annotation.end,
    id: annotation.id,
    kind: "annotation",
    label: annotation.name,
    rowIndex,
    start: annotation.start,
    strand: annotation.strand,
  };
}

function segmentHit(segment: SegmentBlock, rowIndex: number): BlockHit {
  const support =
    segment.predicted_support === null
      ? null
      : `${Math.round(segment.predicted_support * 100)}% support`;

  return {
    detail: segment.predicted_label
      ? support
        ? `${segment.predicted_label} · ${support}`
        : segment.predicted_label
      : segment.category,
    end: segment.end,
    id: segment.id,
    kind: "segment",
    label: shortSegmentId(segment.id),
    rowIndex,
    start: segment.start,
    strand: segment.strand,
  };
}

/**
 * The selection a click on `hit` produces, or null to clear. A feature row
 * yields a `"series"` selection.
 */
export function selectionForHit(
  hit: TrackHit | null,
  selectedId: string | null
): GenomeSelection | null {
  // Empty space or a second click on the selection clears it.
  if (!hit || hit.id === selectedId) return null;

  return { id: hit.id, kind: hit.kind === "trace" ? "series" : "block" };
}

/** Selection id for a feature trace. */
export function seriesId(featureId: number): string {
  return `feature-${featureId}`;
}

/** The feature id in a `seriesId` string, or null if it is not one. */
export function featureIdFromSeries(id: string): number | null {
  const match = /^feature-(\d+)$/.exec(id);

  return match ? Number(match[1]) : null;
}

function traceHit(
  trace: FeatureTrace,
  bins: BinAxis,
  bp: number,
  label: string,
  rowIndex: number
): TraceHit | null {
  const index = bpToBinIndex(bins, bp);

  if (index === null) return null;

  const range = binIndexToRange(bins, index);

  return {
    detail: label,
    end: range.end,
    id: seriesId(trace.feature_id),
    kind: "trace",
    label: `Feature ${trace.feature_id}`,
    rowIndex,
    start: range.start,
    value: trace.values[index] ?? 0,
  };
}

function traceDetail(data: GenomeTrackData, trace: FeatureTrace): string {
  return featureNote(data, trace) ?? "";
}

/** What is under a pointer position in the plot area, or null. */
export function hitTest(
  data: GenomeTrackData,
  rows: TrackRow[],
  scale: GenomeScale,
  x: number,
  y: number
): TrackHit | null {
  const rowIndex = rowIndexAt(rows, y);
  const row = rows[rowIndex];

  if (!row || x < 0 || x > scale.width) return null;

  const bp = pxToBp(scale, x);
  // Three pixels of tolerance, expressed in bases at the current zoom.
  const slack = Math.max(Math.ceil(scale.bpPerPx * 3), 0);

  switch (row.kind) {
    case "features": {
      const trace = featureTraces(data)[row.traceIndex ?? 0];

      if (!trace) return null;

      return traceHit(trace, data.bins, bp, traceDetail(data, trace), rowIndex);
    }
    case "annotations": {
      // Use the packed lane: lanes cannot nest, the full list can.
      const found = blockAt(row.laneBlocks ?? [], bp, slack);

      return found ? annotationHit(found, rowIndex) : null;
    }
    case "segments": {
      const found = blockAt(row.segmentBlocks ?? [], bp, slack);

      return found ? segmentHit(found, rowIndex) : null;
    }
    default:
      return null;
  }
}
