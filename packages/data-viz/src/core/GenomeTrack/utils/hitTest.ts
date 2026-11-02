import {
  AnnotationBlock,
  BinAxis,
  FeatureTrace,
  GenomeSelection,
  GenomeTrackData,
  GenomeViewport,
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

/** First block within `slack` bases of `bp`, or null. */
function blockWithin<T extends { end: number; start: number }>(
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

/**
 * The block containing `bp`, or failing that the nearest within `slack` bases,
 * so very narrow blocks stay clickable without stealing from a neighbour.
 */
export function blockAt<T extends { end: number; start: number }>(
  blocks: T[],
  bp: number,
  slack: number
): T | null {
  return blockWithin(blocks, bp, 0) ?? blockWithin(blocks, bp, slack);
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

/** The bp of a trace's highest bin inside the viewport, or null if none overlaps it. */
function peakBp(
  trace: FeatureTrace,
  bins: BinAxis,
  viewport: GenomeViewport
): number | null {
  let peak: number | null = null;
  let best = -Infinity;

  trace.values.forEach((value, index) => {
    const range = binIndexToRange(bins, index);

    if (range.end < viewport.start || range.start > viewport.end) return;
    if (value > best) {
      best = value;
      peak = Math.max(range.start, viewport.start);
    }
  });

  return peak;
}

/** A feature row's keyboard item: its trace at the highest bin in view. */
function featureItem(
  data: GenomeTrackData,
  trace: FeatureTrace | undefined,
  viewport: GenomeViewport,
  rowIndex: number
): TraceHit | null {
  const bp = trace ? peakBp(trace, data.bins, viewport) : null;

  if (!trace || bp === null) return null;

  return traceHit(trace, data.bins, bp, traceDetail(data, trace), rowIndex);
}

/**
 * What keyboard focus steps through, top to bottom: each block row's blocks in
 * the viewport, left to right, and each feature row at its highest bin.
 */
export function keyboardItems(
  data: GenomeTrackData,
  rows: TrackRow[],
  viewport: GenomeViewport
): TrackHit[] {
  const traces = featureTraces(data);
  const items: TrackHit[] = [];
  const visible = (block: { end: number; start: number }) =>
    block.end >= viewport.start && block.start <= viewport.end;

  rows.forEach((row, rowIndex) => {
    switch (row.kind) {
      case "annotations":
        (row.laneBlocks ?? []).forEach((block) => {
          if (visible(block)) items.push(annotationHit(block, rowIndex));
        });
        break;
      case "segments":
        (row.segmentBlocks ?? []).forEach((block) => {
          if (visible(block)) items.push(segmentHit(block, rowIndex));
        });
        break;
      case "features": {
        const hit = featureItem(
          data,
          traces[row.traceIndex ?? 0],
          viewport,
          rowIndex
        );

        if (hit) items.push(hit);
        break;
      }
      default:
        break;
    }
  });

  return items;
}

/** The item `step` places after `current`, wrapping; the first or last if `current` is not one. */
export function stepItem(
  items: TrackHit[],
  current: TrackHit | null,
  step: 1 | -1
): TrackHit | null {
  if (items.length === 0) return null;

  const index = current
    ? items.findIndex(
        (item) =>
          item.kind === current.kind &&
          item.id === current.id &&
          item.rowIndex === current.rowIndex
      )
    : -1;

  if (index === -1) return step === 1 ? items[0] : items[items.length - 1];

  return items[(index + step + items.length) % items.length];
}
