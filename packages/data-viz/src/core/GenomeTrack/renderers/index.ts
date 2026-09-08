import {
  AnnotationBlock,
  BinAxis,
  FeatureTrace,
  SegmentBlock,
} from "../GenomeTrack.types";
import { fitLabel, formatTick, tickInterval, ticksFor } from "../utils/format";
import { TrackRow } from "../utils/layout";
import { TrackPalette } from "../utils/palette";
import {
  GenomeScale,
  binIndexToBp,
  blockRect,
  bpToBinIndex,
  bpToPx,
} from "../utils/scale";

/**
 * Canvas draw passes, one per row kind.
 *
 * Each is a pure function of (context, scale, row, data, palette): none of them
 * read component state or the DOM, which is what makes them testable against a
 * stub context and what keeps redraw cheap enough to run inside a
 * `requestAnimationFrame` on every pan frame.
 */

/** Typeface stack for canvas text. Mirrors the SDS body font. */
const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

/** Monospace stack for the sequence ruler. No webfont: the app fetches nothing. */
const MONO_STACK = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/** Below this width a block gets no label, only its rectangle. */
const MIN_LABEL_WIDTH = 24;

/** Arrowhead width for a stranded block, in px. */
const ARROW_WIDTH = 6;

export interface DrawContext {
  ctx: CanvasRenderingContext2D;
  palette: TrackPalette;
  row: TrackRow;
  scale: GenomeScale;
  /** Id of the block under the pointer, when any. */
  hoveredId: string | null;
  /** Id of the selected block, when any. */
  selectedId: string | null;
  density: "comfortable" | "compact";
}

/**
 * Strand-aware block path.
 *
 * A `+` block points right and a `-` block points left, which is the redundant
 * non-color cue the accessibility rules require for strand — color alone would
 * leave strand unreadable to a colorblind reader, and strand is not decoration.
 * Blocks too narrow for an arrowhead degrade to a plain rectangle rather than
 * to a triangle that misreports the block's extent.
 */
function blockPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  strand: "+" | "-" | "."
): void {
  const arrow = Math.min(ARROW_WIDTH, width / 2);

  ctx.beginPath();

  if (strand === "+" && width > arrow * 2) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + width - arrow, y);
    ctx.lineTo(x + width, y + height / 2);
    ctx.lineTo(x + width - arrow, y + height);
    ctx.lineTo(x, y + height);
  } else if (strand === "-" && width > arrow * 2) {
    ctx.moveTo(x + width, y);
    ctx.lineTo(x + arrow, y);
    ctx.lineTo(x, y + height / 2);
    ctx.lineTo(x + arrow, y + height);
    ctx.lineTo(x + width, y + height);
  } else {
    ctx.rect(x, y, width, height);
  }

  ctx.closePath();
}

/** Draws one labelled block, with hover and selection outlines. */
function drawBlock(
  draw: DrawContext,
  block: { end: number; id: string; start: number; strand: "+" | "-" | "." },
  label: string,
  fill: string,
  textColor: string
): void {
  const { ctx, density, hoveredId, palette, row, scale, selectedId } = draw;
  const rect = blockRect(scale, block.start, block.end, 2);

  if (!rect) return;

  const height = row.height;

  ctx.fillStyle = fill;
  blockPath(ctx, rect.x, row.y, rect.width, height, block.strand);
  ctx.fill();

  const isSelected = selectedId === block.id;
  const isHovered = hoveredId === block.id;

  if (isSelected || isHovered) {
    ctx.strokeStyle = isSelected ? palette.selected : palette.hover;
    ctx.lineWidth = isSelected ? 2 : 1;
    blockPath(ctx, rect.x, row.y, rect.width, height, block.strand);
    ctx.stroke();
  }

  if (!label || rect.width < MIN_LABEL_WIDTH) return;

  ctx.font = `${density === "compact" ? 10 : 11}px ${FONT_STACK}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Leave room for the arrowhead so a label never overlaps the strand cue.
  const fitted = fitLabel(ctx, label, rect.width - ARROW_WIDTH * 2 - 4);

  if (!fitted) return;

  ctx.fillStyle = textColor;
  ctx.fillText(fitted, rect.x + rect.width / 2, row.y + height / 2);
}

/**
 * Ruler: baseline, ticks, and abbreviated position labels.
 *
 * Compact density draws ticks without labels — a comparison card states its
 * range in the header, so repeating coordinates inside the plot spends vertical
 * space on information already on screen.
 */
export function drawRuler(draw: DrawContext): void {
  const { ctx, density, palette, row, scale } = draw;
  const interval = tickInterval(
    scale.end - scale.start + 1,
    density === "compact" ? 3 : 6
  );
  const ticks = ticksFor(scale.start, scale.end, interval);
  const baseline = row.y + row.height - 0.5;
  const tickHeight = density === "compact" ? 4 : 6;

  ctx.strokeStyle = palette.axis;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, baseline);
  ctx.lineTo(scale.width, baseline);
  ctx.stroke();

  ctx.fillStyle = palette.axisText;
  ctx.font = `10px ${FONT_STACK}`;
  ctx.textBaseline = "bottom";

  ticks.forEach((bp) => {
    const x = Math.round(bpToPx(scale, bp)) + 0.5;

    ctx.beginPath();
    ctx.moveTo(x, baseline - tickHeight);
    ctx.lineTo(x, baseline);
    ctx.stroke();

    if (density === "compact") return;

    // Nudge the first and last labels inward so neither is clipped by the edge.
    const label = formatTick(bp, interval);
    const width = ctx.measureText(label).width;

    ctx.textAlign = "center";

    if (x - width / 2 < 0) ctx.textAlign = "left";
    else if (x + width / 2 > scale.width) ctx.textAlign = "right";

    ctx.fillText(label, x, baseline - tickHeight - 2);
  });
}

/**
 * Sequence ruler: one letter per base, drawn only when bases are wide enough.
 *
 * Below ~7 px per base the letters would overlap into an unreadable smear, so
 * the row falls back to a solid band. That is honest — it says "there is
 * sequence here, zoom in to read it" — where crushed glyphs would suggest the
 * component is broken.
 */
export function drawSequence(
  draw: DrawContext,
  sequence: string,
  windowStart: number
): void {
  const { ctx, palette, row, scale } = draw;
  const pxPerBase = scale.width / (scale.end - scale.start + 1);

  ctx.fillStyle = palette.rowBackground;
  ctx.fillRect(0, row.y, scale.width, row.height);

  if (pxPerBase < 7) return;

  ctx.fillStyle = palette.sequenceText;
  ctx.font = `${Math.min(row.height - 4, 12)}px ${MONO_STACK}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let bp = scale.start; bp <= scale.end; bp += 1) {
    const index = bp - windowStart;

    if (index < 0 || index >= sequence.length) continue;

    ctx.fillText(
      sequence[index],
      bpToPx(scale, bp) + pxPerBase / 2,
      row.y + row.height / 2
    );
  }
}

/** Annotation row: reference genes and other GFF features. */
export function drawAnnotations(
  draw: DrawContext,
  annotations: AnnotationBlock[]
): void {
  annotations.forEach((annotation) => {
    drawBlock(
      draw,
      annotation,
      annotation.name,
      draw.palette.annotation,
      draw.palette.annotationText
    );
  });
}

/**
 * Segment row: the intervals the segmentation pipeline cut, labelled with the
 * category it voted for.
 *
 * The label is `id`-derived rather than the raw namespaced `segment_id`, which
 * is 40+ characters and would never fit. The full id is in the tooltip and the
 * accessible table.
 */
export function drawSegments(
  draw: DrawContext,
  segments: SegmentBlock[]
): void {
  segments.forEach((segment) => {
    drawBlock(
      draw,
      segment,
      segmentLabel(segment),
      draw.palette.segment,
      draw.palette.segmentText
    );
  });
}

/**
 * Short display label for a segment: the trailing id part plus its category.
 *
 * "esmgsedd-mvp:e_coli_k12:NC_000913.3:seg_00076" reads as "seg_00076 +CDS",
 * which is what the design shows on the block.
 */
export function segmentLabel(segment: SegmentBlock): string {
  const short = segment.id.split(":").pop() ?? segment.id;

  return `${short} ${segment.category}`;
}

/**
 * Activation row: the pooled trace, drawn as a filled area with a stroked top.
 *
 * Only the highest-ranked trace is drawn here. The design's multi-feature view
 * is a separate row kind ("features"), because overlaying eight traces in one
 * band produces a shape nobody can read a value off.
 */
export function drawActivation(
  draw: DrawContext,
  trace: FeatureTrace,
  bins: BinAxis
): void {
  const { ctx, palette, row, scale } = draw;
  const first = bpToBinIndex(bins, Math.max(scale.start, bins.start));
  const last = bpToBinIndex(bins, Math.min(scale.end, bins.end));

  if (first === null || last === null) return;

  // Normalize to the trace's own peak rather than to a global maximum: the row
  // answers "where in this window does this feature fire", and a shared scale
  // would flatten every trace but the strongest into a straight line.
  const peak = Math.max(
    trace.peak,
    ...trace.values.slice(first, last + 1),
    1e-9
  );
  const bottom = row.y + row.height;

  const pointAt = (index: number): { x: number; y: number } => ({
    x: bpToPx(scale, binIndexToBp(bins, index)),
    y: bottom - (trace.values[index] / peak) * row.height,
  });

  ctx.beginPath();
  ctx.moveTo(pointAt(first).x, bottom);

  for (let index = first; index <= last; index += 1) {
    const point = pointAt(index);

    // Step rather than line: a pooled bin covers `stride` bases and is flat
    // across them. Interpolating between bin centres would draw a smooth curve
    // through data that has no values between the points.
    ctx.lineTo(point.x, point.y);
    ctx.lineTo(bpToPx(scale, binIndexToBp(bins, index + 1)), point.y);
  }

  ctx.lineTo(bpToPx(scale, binIndexToBp(bins, last + 1)), bottom);
  ctx.closePath();

  ctx.fillStyle = palette.traceFill;
  ctx.fill();

  ctx.strokeStyle = palette.trace;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Baseline, so an all-zero window still reads as a row rather than as blank
  // space where a track failed to render.
  ctx.strokeStyle = palette.axis;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, bottom - 0.5);
  ctx.lineTo(scale.width, bottom - 0.5);
  ctx.stroke();
}
