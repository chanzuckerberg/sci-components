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
 * Pointer hit-testing.
 *
 * Never per-pixel readback: reading the canvas back to find what is under the
 * pointer forces a GPU sync on every mouse move and breaks entirely once the
 * canvas is tainted. Instead the pointer is converted to a base coordinate and
 * matched against the same intervals the renderer drew.
 *
 * The search is a binary search for the first candidate plus a short forward
 * scan, which matters at 200 kb windows with thousands of blocks where a linear
 * scan per mouse move is visible.
 *
 * That search needs the blocks it is given to be sorted by `end`, which is a
 * stronger requirement than it looks. Start order alone does not give it:
 * nested intervals — a tRNA inside a CDS — are in start order with `end` going
 * backwards, and the search then steps over the enclosing gene and reports
 * nothing. So each row hands over a list that cannot nest, and the layout pass is
 * what makes that true: `packAnnotationLanes` builds annotation lanes one at a
 * time, and the segments row is sorted by `end` when it is placed. Neither
 * relies on the payload arriving in a helpful order.
 */

/**
 * Which row a hit came from, as an index into the array that was hit-tested.
 *
 * An index rather than a `TrackKind`: the features stack is many rows of one
 * kind, so a kind does not identify a row, and a tooltip placed by kind would
 * appear over the first feature however far down the stack the pointer was.
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

/**
 * Whether two hits describe the same thing, for bailing out of a state update.
 *
 * `hitTest` builds a fresh object per call, so storing its result on every
 * pointer move re-renders the whole track — labels, legend, tooltip, accessible
 * table — even while the pointer stays inside one gene. Comparing structurally
 * collapses a drag across one block from a render per pointer event to one.
 *
 * `value` is compared for traces because it is the reading the tooltip shows:
 * moving along a trace row changes the bin under the pointer without changing
 * the row or its id, and that is a genuinely different hit.
 */
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
    label: shortSegmentId(segment.id),
    rowIndex,
    start: segment.start,
    strand: segment.strand,
  };
}

/**
 * The selection a click on `hit` should produce, or null to clear.
 *
 * Pure, and separate from the pointer handler that calls it, because this is
 * the whole of the decision and none of it needs an event: what kind of thing
 * was clicked, and whether clicking it again should toggle it off. Inside the
 * handler it was only reachable through a simulated pointer sequence, which
 * jsdom cannot deliver against a zero-width canvas.
 *
 * A features row yields a `"series"` selection rather than clearing, which is
 * how the minimap learns whose activation to draw across the chromosome.
 */
export function selectionForHit(
  hit: TrackHit | null,
  selectedId: string | null
): GenomeSelection | null {
  // Empty space clears, and so does a second click on what is already
  // selected. Emitting null rather than nothing is what lets a shell close a
  // detail surface from here.
  if (!hit || hit.id === selectedId) return null;

  return { id: hit.id, kind: hit.kind === "trace" ? "series" : "block" };
}

/**
 * Selection id for a feature trace.
 *
 * One function rather than a template literal at each site, because the id is
 * now built in one place and compared in another — the hit-test emits it into
 * a `"series"` selection, and the minimap tests the selected id against a
 * feature it has chromosome-wide data for. Two literals that drifted would
 * make the minimap silently draw nothing.
 */
export function seriesId(featureId: number): string {
  return `feature-${featureId}`;
}

/**
 * The feature id inside a `"series"` selection, or null if the id is not one.
 *
 * The inverse of `seriesId`, and public for the same reason the component
 * emits ids at all: a shell that receives `{ kind: "series", id }` has to know
 * which feature to fetch a chromosome-wide trace for. Without this it would
 * reimplement the format by hand, which is how the two ends drift.
 */
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

/** The description a trace's tooltip carries, empty when there is none. */
function traceDetail(data: GenomeTrackData, trace: FeatureTrace): string {
  return featureNote(data, trace) ?? "";
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
      // The row's own lane, which is what makes the search above correct: the
      // whole annotation list can nest, and `firstCandidate` would walk past a
      // gene that encloses another. A packed lane cannot nest.
      const found = blockAt(row.laneBlocks ?? [], bp, slack);

      return found ? annotationHit(found, rowIndex) : null;
    }
    case "segments": {
      // The row's own blocks, sorted by `end` in the layout pass, for the same
      // reason the annotations case reads its lane: `firstCandidate` walks past
      // a block that encloses another, and nothing else guarantees the order.
      const found = blockAt(row.segmentBlocks ?? [], bp, slack);

      return found ? segmentHit(found, rowIndex) : null;
    }
    default:
      return null;
  }
}
