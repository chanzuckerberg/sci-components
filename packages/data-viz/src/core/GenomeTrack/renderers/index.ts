import {
  AnnotationBlock,
  BinAxis,
  FeatureTrace,
  SegmentBlock,
} from "../GenomeTrack.types";
import {
  fitLabel,
  formatRange,
  formatTick,
  tickInterval,
  ticksFor,
} from "../utils/format";
import {
  MINIMAP_BAR_HEIGHT,
  MINIMAP_LABEL_HEIGHT,
  MINIMAP_RANGE_HEIGHT,
  TrackRow,
} from "../utils/layout";
import { TrackPalette } from "../utils/palette";
import {
  GenomeScale,
  binIndexToBp,
  blockRect,
  bpToBinIndex,
  bpToPx,
  createScale,
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

/** Space left between adjacent bars in the features row, in px. */
const BAR_GAP = 1;

/**
 * Narrowest the minimap's window box may be drawn, in px.
 *
 * A 24 bp view of a 40 kb window is six hundredths of a pixel wide. Without a
 * floor the indicator disappears exactly when a user is most lost.
 */
const MIN_WINDOW_WIDTH = 3;

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

/**
 * Minimap row: where the viewport sits inside the payload's whole window.
 *
 * This is the only pass that does not draw on the shared viewport scale. Every
 * other row maps the visible range across the plot; this one maps the *payload's
 * window* across the plot and then draws the visible range as a box inside it.
 * So it builds a second scale of its own rather than using `draw.scale`, and
 * uses that one for everything including its ticks — the coordinates under a
 * minimap describe the extent, not the window, or the box would have nothing to
 * be positioned against.
 *
 * It shows position only. The chromosome-scale activation summary that
 * `MinimapOverview` describes is a different thing and is not drawn here.
 */
export function drawMinimap(
  draw: DrawContext,
  bounds: { end: number; start: number }
): void {
  const { ctx, density, palette, row, scale } = draw;
  const rangeHeight = MINIMAP_RANGE_HEIGHT[density];
  const barHeight = MINIMAP_BAR_HEIGHT[density];
  const barTop = row.y + rangeHeight;
  const extent = createScale(bounds, scale.width);

  ctx.fillStyle = palette.minimapTrack;
  ctx.fillRect(0, barTop, scale.width, barHeight);

  const rect = blockRect(extent, scale.start, scale.end, MIN_WINDOW_WIDTH);

  // Hold the band inside the track at both ends. `blockRect` widens a
  // sub-pixel range to keep it visible, which at the far right would otherwise
  // push it off the edge — and a position indicator that leaves the bar is
  // worse than one that is merely narrow.
  const bandX = rect
    ? Math.min(rect.x, Math.max(scale.width - rect.width, 0))
    : null;

  if (rect && bandX !== null) {
    ctx.fillStyle = palette.minimapWindow;
    ctx.fillRect(bandX, barTop, rect.width, barHeight);
  }

  ctx.font = `10px ${FONT_STACK}`;

  // The band's range, captioned above it and centred on it, so the number
  // travels with the thing it describes rather than living only in the header.
  if (rect && bandX !== null && rangeHeight > 0) {
    const label = formatRange(scale.start, scale.end);
    const width = ctx.measureText(label).width;
    const center = bandX + rect.width / 2;

    ctx.fillStyle = palette.minimapText;
    ctx.textBaseline = "top";
    ctx.textAlign = "center";

    // Clamped rather than centred blindly: a band against either edge would
    // otherwise caption itself off the side of the plot.
    ctx.fillText(
      label,
      Math.min(Math.max(center, width / 2), scale.width - width / 2),
      row.y
    );
  }

  if (MINIMAP_LABEL_HEIGHT[density] === 0) return;

  const interval = tickInterval(bounds.end - bounds.start + 1, 6);

  ctx.fillStyle = palette.axisText;
  ctx.textBaseline = "top";

  ticksFor(bounds.start, bounds.end, interval).forEach((bp) => {
    const x = bpToPx(extent, bp);
    const label = formatTick(bp, interval);
    const width = ctx.measureText(label).width;

    // Nudge the end labels inward so neither is clipped by the plot's edge.
    ctx.textAlign = "center";

    if (x - width / 2 < 0) ctx.textAlign = "left";
    else if (x + width / 2 > scale.width) ctx.textAlign = "right";

    ctx.fillText(label, x, barTop + barHeight + 3);
  });
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
 * One row of the features stack: a feature's activation as a bar per bin.
 *
 * Bars rather than the activation row's filled area, per the design, and the
 * difference is not only cosmetic. A filled area implies a continuous signal
 * you can read between the points; a bar chart says each bin is a discrete
 * measurement, which is what a pooled maximum actually is. At `stride: 1` the
 * bars are one base wide and the distinction stops mattering; at `stride: 21`
 * it is the honest picture.
 *
 * **Normalized to the trace's own peak, not to a peak shared across the
 * stack.** This is the row's one real compromise. Per-trace scaling means every
 * row uses its full height, so the shape of a weak feature is legible — but it
 * also means bar heights cannot be compared between rows, and nothing on screen
 * says so. A shared scale would make the rows comparable and flatten every
 * feature below the strongest into a line, which for a rank-ordered list is
 * most of them. The design shows rows of comparable height, so it assumes
 * per-trace; the tooltip carries the absolute value for anyone who needs to
 * compare two rows for real.
 *
 * Normalizing to `trace.peak` — the whole window's maximum — rather than to the
 * visible slice is what keeps bar heights from rescaling as the user pans.
 */
export function drawFeatureBars(
  draw: DrawContext,
  trace: FeatureTrace,
  bins: BinAxis
): void {
  const { ctx, palette, row, scale } = draw;
  const inset = row.labelInset ?? 0;
  const height = row.height - inset;
  const bottom = row.y + row.height;

  const first = bpToBinIndex(bins, Math.max(scale.start, bins.start));
  const last = bpToBinIndex(bins, Math.min(scale.end, bins.end));

  if (first === null || last === null || height <= 0) return;

  // Baseline before the bars, so a feature that is silent across the whole
  // window still reads as a row rather than as a gap where a draw failed.
  ctx.strokeStyle = palette.axis;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, bottom - 0.5);
  ctx.lineTo(scale.width, bottom - 0.5);
  ctx.stroke();

  const peak = Math.max(trace.peak, 1e-9);

  ctx.fillStyle = palette.featureBar;

  for (let index = first; index <= last; index += 1) {
    const value = trace.values[index] ?? 0;

    // A zero bin gets no bar. Drawing a 1 px stub for it would make silence
    // look like a faint signal, which across a mostly-quiet trace reads as
    // noise the feature does not have.
    if (value <= 0) continue;

    const x = bpToPx(scale, binIndexToBp(bins, index));
    const span = bpToPx(scale, binIndexToBp(bins, index + 1)) - x;

    // The gap comes out of the bar only while there is a bar to spare. Below
    // about two pixels a bin would vanish into its own gap, so it keeps a solid
    // column instead — the same reason `blockRect` has a minimum width.
    const width = span > BAR_GAP * 2 ? span - BAR_GAP : Math.max(span, 1);
    const barHeight = Math.max((value / peak) * height, 1);

    ctx.fillRect(x, bottom - barHeight, width, barHeight);
  }
}
