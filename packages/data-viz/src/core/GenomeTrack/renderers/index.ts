import {
  AnnotationBlock,
  BinAxis,
  FeatureOverview,
  FeatureTrace,
  SegmentBlock,
} from "../GenomeTrack.types";
import {
  fitLabel,
  formatActivation,
  formatRange,
  formatSpan,
  formatTick,
  segmentLabel,
  tickInterval,
  ticksFor,
} from "../utils/format";
import {
  MINIMAP_AXIS_GAP,
  MINIMAP_BAR_HEIGHT,
  MINIMAP_LABEL_HEIGHT,
  MINIMAP_RANGE_HEIGHT,
  TrackRow,
} from "../utils/layout";
import chroma from "chroma-js";
import { TrackPalette, withAlpha } from "../utils/palette";
import { SegmentPalette } from "../utils/segmentColors";
import {
  GenomeScale,
  binIndexToBp,
  blockRect,
  bpToBinIndex,
  bpToPx,
  createScale,
  maxOf,
  minimapBand,
} from "../utils/scale";

/** Canvas draw passes, one per row kind. Each is a pure function. */

/** Mirrors the SDS body font. */
const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

/** System fonts only, so no webfont is fetched. */
const MONO_STACK = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/** Height of a tick notch under the minimap's bar, in px. */
const AXIS_NOTCH_HEIGHT = 3;

/** Below this width a block gets no label, only its rectangle. */
const MIN_LABEL_WIDTH = 24;

/** Arrowhead width for a stranded block, in px. */
const ARROW_WIDTH = 6;

/** Space left between adjacent bars in the features row, in px. */
const BAR_GAP = 1;

/** Gap between the y axis label's baseline and the top of the bars, in px. */
const AXIS_LABEL_GAP = 1;

export interface DrawContext {
  ctx: CanvasRenderingContext2D;
  palette: TrackPalette;
  row: TrackRow;
  scale: GenomeScale;
  hoveredId: string | null;
  selectedId: string | null;
  density: "comfortable" | "compact";
}

/**
 * Block outline: `+` points right, `-` points left. Blocks too narrow for an
 * arrowhead are drawn as plain rectangles.
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

/** Diagonal-stripe tile size and line weight, in px. */
const STRIPE_TILE = 6;
const STRIPE_WIDTH = 2;

/** Stripe patterns keyed by fill colour; one entry per segment category. */
const stripePatterns = new Map<string, CanvasPattern | null>();

/**
 * `color` with 45° stripes over it, for the negative strand. Returns null when
 * a pattern cannot be made, so the caller falls back to the solid fill.
 */
function stripedFill(
  ctx: CanvasRenderingContext2D,
  color: string
): CanvasPattern | null {
  const cached = stripePatterns.get(color);

  if (cached !== undefined) return cached;

  const tile =
    typeof document === "undefined" ? null : document.createElement("canvas");
  const tileCtx = tile?.getContext("2d") ?? null;

  // jsdom returns a non-null context with almost no methods on it.
  const usable =
    tile &&
    tileCtx &&
    typeof tileCtx.fillRect === "function" &&
    typeof ctx.createPattern === "function";

  if (!usable) {
    stripePatterns.set(color, null);
    return null;
  }

  tile.width = STRIPE_TILE;
  tile.height = STRIPE_TILE;

  tileCtx.fillStyle = color;
  tileCtx.fillRect(0, 0, STRIPE_TILE, STRIPE_TILE);

  tileCtx.strokeStyle = withAlpha(
    chroma.contrast(color, "#ffffff") >= 2.5 ? "#ffffff" : "#000000",
    0.55
  );
  tileCtx.lineWidth = STRIPE_WIDTH;

  // Two strokes so the diagonal wraps continuously across tile edges.
  tileCtx.beginPath();
  tileCtx.moveTo(-STRIPE_TILE, STRIPE_TILE);
  tileCtx.lineTo(STRIPE_TILE, -STRIPE_TILE);
  tileCtx.moveTo(0, STRIPE_TILE * 2);
  tileCtx.lineTo(STRIPE_TILE * 2, 0);
  tileCtx.stroke();

  const pattern = ctx.createPattern(tile, "repeat");

  stripePatterns.set(color, pattern);

  return pattern;
}

/** Draws one labelled block, with hover and selection outlines. */
function drawBlock(
  draw: DrawContext,
  block: { end: number; id: string; start: number; strand: "+" | "-" | "." },
  label: string,
  fill: string | CanvasPattern,
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

/** Sequence ruler: one letter per base, when bases are wide enough. */
export function drawSequence(
  draw: DrawContext,
  sequence: string,
  windowStart: number
): void {
  const { ctx, palette, row, scale } = draw;
  const pxPerBase = scale.width / (scale.end - scale.start + 1);

  const band = blockRect(
    scale,
    windowStart,
    windowStart + sequence.length - 1,
    1
  );

  if (!band) return;

  ctx.fillStyle = palette.rowBackground;
  ctx.fillRect(band.x, row.y, band.width, row.height);

  // Below ~7 px per base the letters would overlap
  if (pxPerBase < 7) return;

  ctx.fillStyle = palette.sequenceText;
  ctx.font = `${Math.min(row.height - 4, 12)}px ${MONO_STACK}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const Y_OFFSET = 1.2;

  for (let bp = scale.start; bp <= scale.end; bp += 1) {
    const index = bp - windowStart;

    if (index < 0 || index >= sequence.length) continue;

    ctx.fillText(
      sequence[index],
      bpToPx(scale, bp) + pxPerBase / 2,
      row.y + row.height / 2 + Y_OFFSET
    );
  }
}

/** What the minimap draws, beyond the viewport it takes from `draw.scale`. */
export interface MinimapContent {
  /** The range the bar spans: the chromosome when one is known. */
  extent: { end: number; start: number };
  /** The selected feature's chromosome-wide trace; null draws no signal. */
  feature: FeatureOverview | null;
}

/**
 * One feature's activation across the chromosome, normalized to its own
 * maximum and drawn as 1 px columns.
 */
function drawFeatureSignal(
  draw: DrawContext,
  feature: FeatureOverview,
  extent: GenomeScale,
  barTop: number,
  barHeight: number
): void {
  const { ctx, palette } = draw;
  // Not `Math.max(...values)`: spreading a large array can throw a RangeError.
  const peak = maxOf(feature.values);

  if (peak <= 0) return;

  ctx.fillStyle = palette.minimapSignal;

  feature.values.forEach((value, index) => {
    if (value <= 0) return;

    const height = (value / peak) * barHeight;

    ctx.fillRect(
      bpToPx(extent, binIndexToBp(feature.bins, index)),
      barTop + barHeight - height,
      1,
      height
    );
  });
}

/**
 * Minimap row: the whole extent as a bar, with the viewport as a translucent
 * band inside it. Unlike other rows, it draws on its own scale over the extent.
 */
export function drawMinimap(draw: DrawContext, content: MinimapContent): void {
  const { ctx, density, palette, row, scale } = draw;
  const rangeHeight = MINIMAP_RANGE_HEIGHT[density];
  const barHeight = MINIMAP_BAR_HEIGHT[density];
  const barTop = row.y + rangeHeight;
  const extent = createScale(content.extent, scale.width);

  ctx.fillStyle = palette.minimapTrack;
  ctx.fillRect(0, barTop, scale.width, barHeight);

  if (content.feature) {
    drawFeatureSignal(draw, content.feature, extent, barTop, barHeight);
  }

  const band = minimapBand(extent, { end: scale.end, start: scale.start });

  if (band) {
    ctx.fillStyle = withAlpha(palette.minimapWindow, 0.45);
    ctx.fillRect(band.x, barTop, band.width, barHeight);
    ctx.strokeStyle = palette.minimapWindow;
    ctx.lineWidth = 1;
    // Inset so the 1 px stroke stays inside the fill and on the canvas.
    ctx.strokeRect(band.x + 0.5, barTop + 0.5, band.width - 1, barHeight - 1);
  }

  ctx.font = `10px ${FONT_STACK}`;

  // Caption the band's range above it.
  if (band && rangeHeight > 0) {
    const label = `${formatRange(scale.start, scale.end)} · ${formatSpan(
      scale.end - scale.start + 1
    )}`;
    const width = ctx.measureText(label).width;
    const center = band.x + band.width / 2;

    ctx.fillStyle = palette.minimapText;
    ctx.textBaseline = "top";
    ctx.textAlign = "center";

    // Clamp so a band near either edge keeps its caption on the plot.
    ctx.fillText(
      label,
      Math.min(Math.max(center, width / 2), scale.width - width / 2),
      row.y
    );
  }

  if (MINIMAP_LABEL_HEIGHT[density] === 0) return;

  const interval = tickInterval(
    content.extent.end - content.extent.start + 1,
    6
  );

  const ticks = ticksFor(content.extent.start, content.extent.end, interval);
  const axisY = barTop + barHeight + MINIMAP_AXIS_GAP;

  // A rule under the bar with a notch at each label
  ctx.strokeStyle = palette.axis;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, axisY + 0.5);
  ctx.lineTo(scale.width, axisY + 0.5);

  ticks.forEach((bp) => {
    const x = bpToPx(extent, bp);

    ctx.moveTo(x, axisY + 0.5);
    ctx.lineTo(x, axisY + AXIS_NOTCH_HEIGHT + 0.5);
  });

  ctx.stroke();

  ctx.fillStyle = palette.axisText;
  ctx.textBaseline = "top";

  ticks.forEach((bp) => {
    const x = bpToPx(extent, bp);
    const label = formatTick(bp, interval);
    const width = ctx.measureText(label).width;

    // Nudge the end labels inward so neither is clipped by the plot's edge.
    ctx.textAlign = "center";

    if (x - width / 2 < 0) ctx.textAlign = "left";
    else if (x + width / 2 > scale.width) ctx.textAlign = "right";

    ctx.fillText(label, x, axisY + AXIS_NOTCH_HEIGHT + 2);
  });
}

/**
 * Tints the part of the plot the payload does not cover, so unloaded regions
 * don't look like empty genome. `bands` exclude the minimap.
 */
export function drawOutsideWindow(
  ctx: CanvasRenderingContext2D,
  palette: TrackPalette,
  scale: GenomeScale,
  bands: { bottom: number; top: number }[],
  gaps: { end: number; start: number }[]
): void {
  if (bands.length === 0) return;

  gaps.forEach((gap) => {
    const rect = blockRect(scale, gap.start, gap.end, 1);

    if (!rect) return;

    // Draw the rule on the edge that faces the loaded data.
    const edge = gap.start <= scale.start ? rect.x + rect.width : rect.x;

    bands.forEach(({ bottom, top }) => {
      ctx.fillStyle = palette.outsideWindow;
      ctx.fillRect(rect.x, top, rect.width, bottom - top);

      ctx.strokeStyle = palette.outsideWindowBorder;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(edge + 0.5, top);
      ctx.lineTo(edge + 0.5, bottom);
      ctx.stroke();
    });
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

/** Segment row: blocks coloured by category, striped on the negative strand. */
export function drawSegments(
  draw: DrawContext,
  segments: SegmentBlock[],
  categories: SegmentPalette
): void {
  segments.forEach((segment) => {
    // Null for a category outside the payload's enum.
    const color = categories.fill(segment.category);

    const fill = !color
      ? draw.palette.segment
      : categories.isStriped(segment.category)
        ? (stripedFill(draw.ctx, color) ?? color)
        : color;

    drawBlock(
      draw,
      segment,
      segmentLabel(segment),
      fill,
      color ? categories.text(segment.category) : draw.palette.segmentText
    );
  });
}

/**
 * The features row's y axis: its maximum, drawn in the strip above the bars.
 * Zero is unlabelled because the baseline already marks it.
 */
function drawActivationAxis(
  draw: DrawContext,
  peak: number,
  /** Top of the bars: the label's baseline sits just above this. */
  top: number
): void {
  const { ctx, density, palette } = draw;
  const label = formatActivation(peak);

  // Compact density hides the axis along with the trace names.
  if (!label || density === "compact") return;

  ctx.fillStyle = palette.axisText;
  ctx.font = `10px ${FONT_STACK}`;
  ctx.textAlign = "left";
  // Digits sit on the alphabetic baseline; "bottom" leaves a descender gap.
  ctx.textBaseline = "alphabetic";
  ctx.fillText(label, 0, top - AXIS_LABEL_GAP);
}

/**
 * One row of the features stack: a bar per bin, scaled to the trace's own peak
 * over the whole window so heights don't change while panning. Heights are not
 * comparable between rows.
 */
export function drawFeatureBars(
  draw: DrawContext,
  trace: FeatureTrace,
  bins: BinAxis
): void {
  const { ctx, palette, row, scale } = draw;
  // Two strips sit above the bars: the trace's name, then the y axis maximum.
  const inset = (row.labelInset ?? 0) + (row.axisInset ?? 0);
  const height = row.height - inset;
  const bottom = row.y + row.height;

  const first = bpToBinIndex(bins, Math.max(scale.start, bins.start));
  const last = bpToBinIndex(bins, Math.min(scale.end, bins.end));

  if (first === null || last === null || height <= 0) return;

  // Baseline, so a silent feature still shows as a row.
  ctx.strokeStyle = palette.axis;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, bottom - 0.5);
  ctx.lineTo(scale.width, bottom - 0.5);
  ctx.stroke();

  const peak = Math.max(trace.peak, 1e-9);

  drawActivationAxis(draw, trace.peak, row.y + inset);

  ctx.fillStyle = palette.featureBar;

  for (let index = first; index <= last; index += 1) {
    const value = trace.values[index] ?? 0;

    if (value <= 0) continue;

    const x = bpToPx(scale, binIndexToBp(bins, index));
    const span = bpToPx(scale, binIndexToBp(bins, index + 1)) - x;

    // Narrow bins drop the gap so they don't vanish.
    const width = span > BAR_GAP * 2 ? span - BAR_GAP : Math.max(span, 1);
    const barHeight = Math.max((value / peak) * height, 1);

    ctx.fillRect(x, bottom - barHeight, width, barHeight);
  }
}
