import {
  AnnotationBlock,
  BinAxis,
  FeatureTrace,
  GenomeTrackData,
  SegmentBlock,
} from "../GenomeTrack.types";
import { TrackRow, rowAt } from "./layout";
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

export interface BlockHit {
  kind: "annotation" | "segment";
  id: string;
  label: string;
  detail: string;
  start: number;
  end: number;
  strand: "+" | "-" | ".";
}

export interface TraceHit {
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

function annotationHit(annotation: AnnotationBlock): BlockHit {
  return {
    detail: annotation.product ?? annotation.kind,
    end: annotation.end,
    id: annotation.id,
    kind: "annotation",
    label: annotation.name,
    start: annotation.start,
    strand: annotation.strand,
  };
}

function segmentHit(segment: SegmentBlock): BlockHit {
  const support = `${Math.round(segment.predicted_support * 100)}% support`;

  return {
    detail: segment.predicted_label
      ? `${segment.predicted_label} · ${support}`
      : segment.category,
    end: segment.end,
    id: segment.id,
    kind: "segment",
    label: segment.id.split(":").pop() ?? segment.id,
    start: segment.start,
    strand: segment.strand,
  };
}

function traceHit(
  trace: FeatureTrace,
  bins: BinAxis,
  bp: number,
  label: string
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
    start: range.start,
    value: trace.values[index] ?? 0,
  };
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
  const row = rowAt(rows, y);

  if (!row || x < 0 || x > scale.width) return null;

  const bp = pxToBp(scale, x);
  // Three pixels of tolerance, expressed in bases at the current zoom.
  const slack = Math.max(Math.ceil(scale.bpPerPx * 3), 0);

  switch (row.kind) {
    case "activation": {
      const trace = data.pinned[0] ?? data.features[0];

      if (!trace) return null;

      const note = data.feature_notes[String(trace.feature_id)];

      return traceHit(
        trace,
        data.bins,
        bp,
        note?.label || note?.description || ""
      );
    }
    case "annotations": {
      const found = blockAt(data.annotations ?? [], bp, slack);

      return found ? annotationHit(found) : null;
    }
    case "segments": {
      const found = blockAt(data.segments, bp, slack);

      return found ? segmentHit(found) : null;
    }
    default:
      return null;
  }
}
