import {
  AnnotationBlock,
  BinAxis,
  FeatureTrace,
  GenomeTrackData,
  SegmentBlock,
} from "../GenomeTrack.types";
import { TrackRow, featureTraces, rowIndexAt } from "./layout";
import { GenomeScale, binIndexToRange, bpToBinIndex, pxToBp } from "./scale";

/**
 * Pointer hit-testing.
 *
 * Never per-pixel readback: reading the canvas back to find what is under the
 * pointer forces a GPU sync on every mouse move and breaks entirely once the
 * canvas is tainted. Instead the pointer is converted to a base coordinate and
 * matched against the same intervals the renderer drew.
 *
 * Blocks arrive sorted by start (the server emits them that way and the
 * component does not reorder), so the search is a binary search for the first
 * candidate plus a short forward scan. That matters at 200 kb windows with
 * thousands of annotations, where a linear scan per mouse move is visible.
 */

/**
 * Which row a hit came from, as an index into the array that was hit-tested.
 *
 * An index rather than a `TrackKind`: the features stack is many rows of one
 * kind, so a kind no longer identifies a row, and a tooltip placed by kind
 * would appear over the first feature however far down the stack the pointer
 * was.
 */
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
 * First block containing `bp`, or null.
 *
 * `slack` widens the test by a few bases so a 1 px block is clickable — without
 * it, a feature narrower than the pointer is visible but unreachable, which
 * reads as the component ignoring clicks.
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
  const support = `${Math.round(segment.predicted_support * 100)}% support`;

  return {
    detail: segment.predicted_label
      ? `${segment.predicted_label} · ${support}`
      : segment.category,
    end: segment.end,
    id: segment.id,
    kind: "segment",
    label: segment.id.split(":").pop() ?? segment.id,
    rowIndex,
    start: segment.start,
    strand: segment.strand,
  };
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
    id: `feature-${trace.feature_id}`,
    kind: "trace",
    label: `Feature ${trace.feature_id}`,
    rowIndex,
    start: range.start,
    value: trace.values[index] ?? 0,
  };
}

/** The description a trace's tooltip carries, empty when there is none. */
function traceDetail(data: GenomeTrackData, trace: FeatureTrace): string {
  const note = data.feature_notes[String(trace.feature_id)];

  return note?.label || note?.description || "";
}

/**
 * What is under a pointer position within the plot area.
 *
 * Returns null in a gap between rows, which the caller reads as "clear the
 * tooltip" rather than "keep the last hit" — a tooltip that persists over empty
 * space misattributes data to whatever the pointer is now over.
 */
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
      // The row says which trace it drew, so the pointer never has to work it
      // out from a y offset a second time.
      const trace = featureTraces(data)[row.traceIndex ?? 0];

      if (!trace) return null;

      return traceHit(trace, data.bins, bp, traceDetail(data, trace), rowIndex);
    }
    case "annotations": {
      const found = blockAt(data.annotations ?? [], bp, slack);

      return found ? annotationHit(found, rowIndex) : null;
    }
    case "segments": {
      const found = blockAt(data.segments, bp, slack);

      return found ? segmentHit(found, rowIndex) : null;
    }
    default:
      return null;
  }
}
