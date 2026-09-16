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

/** Gap between the y axis label's baseline and the top of the bars, in px. */
const AXIS_LABEL_GAP = 1;

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

/**
 * Diagonal-stripe tile size and line weight, in px.
 *
 * Sized against `blockRowHeight`, which defaults to 16: at a 6 px tile the
 * stripes read as a texture across a block that height, where a coarser tile
 * would show only one or two lines and look like a glitch.
 */
const STRIPE_TILE = 6;
const STRIPE_WIDTH = 2;

/**
 * Cache of stripe patterns, keyed by fill colour.
 *
 * Module-level and unbounded in principle, bounded in practice by the number of
 * categories in the ramp — a handful. Rebuilding a pattern per block per frame
 * would allocate an offscreen canvas thousands of times during a pan.
 */
const stripePatterns = new Map<string, CanvasPattern | null>();

/**
 * A 45° striped version of `color`, for the negative strand.
 *
 * Colour carries the category and pattern carries the strand, so the stripes
 * are drawn *over* the category's own fill rather than replacing it — the block
 * has to stay recognisably the same hue as its positive-strand counterpart. The
 * stripe itself is translucent black or white, whichever contrasts with the
 * fill, so the texture is visible on both ends of the ramp.
 *
 * Returns null when a pattern cannot be made — no `document`, or a context the
 * browser refuses — and the caller falls back to the solid fill. A solid block
 * misreports strand, which the arrowhead still carries, where a failed draw
 * would lose the block entirely.
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

  // A capability check rather than a null check, because jsdom hands back a
  // context object that is not null and has almost none of the methods on it.
  // Checking for the one we call first is what keeps this from throwing under
  // test, the same way the renderer effect bails on a context it cannot use.
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

  // Banded only where there are letters to band. Filling the row's full width
  // would draw "there is sequence here" across coordinates the payload has no
  // sequence for — which is exactly the claim the wash over the uncovered
  // region exists to deny, so the two would contradict each other.
  const band = blockRect(
    scale,
    windowStart,
    windowStart + sequence.length - 1,
    1
  );

  if (!band) return;

  ctx.fillStyle = palette.rowBackground;
  ctx.fillRect(band.x, row.y, band.width, row.height);

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

/** What the minimap draws, beyond the viewport it takes from `draw.scale`. */
export interface MinimapContent {
  /** The range the bar spans: the chromosome when one is known. */
  extent: { end: number; start: number };
  /**
   * The slice of it the payload holds.
   *
   * Not drawn on this row — the header names the loaded range and the plot
   * washes the coordinates outside it. Kept because the caption still reports
   * it and because a future brush needs to know it.
   */
  window: { end: number; start: number };
  /**
   * The selected feature's chromosome-wide trace, already matched against the
   * selection by the caller. Null draws the bar with no signal in it, which is
   * the row's resting state.
   */
  feature: FeatureOverview | null;
}

/**
 * Holds a band inside the bar at both ends.
 *
 * `blockRect` widens a sub-pixel range so it stays visible, which at the far
 * right would push it off the edge — and a position indicator that leaves the
 * bar is worse than one that is merely narrow. At chromosome scale this is the
 * normal case, not an edge case: a 289 bp window in a 4.6 Mb chromosome is six
 * hundredths of a pixel.
 */
function bandX(
  rect: { width: number; x: number } | null,
  width: number
): number | null {
  if (!rect) return null;

  return Math.min(rect.x, Math.max(width - rect.width, 0));
}

/**
 * One feature's activation across the chromosome, inside the bar.
 *
 * The signal here is a feature the *user picked* by clicking its row, not a
 * maximum pooled across a set they did not choose. A pooled trace answers
 * "where on this chromosome is anything happening", which sounds useful and in
 * practice lights up most of a bacterial chromosome — every bin is the max over
 * eight features, so almost none of them are quiet, and the row reads as noise.
 * One feature's trace answers a question someone actually asked.
 *
 * Normalized to its own maximum, because the quantity is only meaningful
 * relative to the rest of the chromosome.
 *
 * Drawn as 1 px columns rather than a path: at a thousand bins across eight
 * hundred pixels the bins are sub-pixel, so a polyline would spend its time
 * anti-aliasing between points that are already closer together than the
 * display can resolve.
 */
function drawFeatureSignal(
  draw: DrawContext,
  feature: FeatureOverview,
  extent: GenomeScale,
  barTop: number,
  barHeight: number
): void {
  const { ctx, palette } = draw;
  const peak = Math.max(...feature.values, 0);

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
 * Minimap row: where the viewport sits inside the chromosome.
 *
 * This is the only pass that does not draw on the shared viewport scale. Every
 * other row maps the visible range across the plot; this one maps the *extent*
 * across the plot and draws the visible range as a band inside it. So it builds
 * a second scale of its own and uses that for everything including its ticks —
 * the coordinates under a minimap describe the extent, not the viewport, or the
 * band would have nothing to be positioned against.
 *
 * It draws two ranges, and only two:
 *
 * 1. The **extent** — the bar itself, carrying the selected feature's
 *    activation across the chromosome when there is a selection and the shell
 *    has fetched that feature's trace. No selection means no signal: the row's
 *    resting state is a bar and one band.
 * 2. The **viewport** — the filled band, the one thing on this row that says
 *    where you are. Translucent, so a signal underneath still reads through
 *    it; at chromosome scale the band covers a fraction of a pixel and an
 *    opaque one would delete the only informative pixel in it.
 *
 * It used to draw two more, and both were removed for the same reason: at
 * chromosome scale everything collapses to the 3 px floor, so a viewport band,
 * a loaded-window outline, and a coarse chromosome band all landed on top of
 * each other as indistinguishable grey marks. `overview.bands` said nothing a
 * reader could act on, and the loaded window is stated in the header and shown
 * by the wash over the plot — neither needed a third grey tick to explain it.
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

  const rect = blockRect(extent, scale.start, scale.end, MIN_WINDOW_WIDTH);
  const viewportX = bandX(rect, scale.width);

  if (rect && viewportX !== null) {
    ctx.fillStyle = withAlpha(palette.minimapWindow, 0.45);
    ctx.fillRect(viewportX, barTop, rect.width, barHeight);
    ctx.strokeStyle = palette.minimapWindow;
    ctx.lineWidth = 1;
    ctx.strokeRect(viewportX + 0.5, barTop + 0.5, rect.width, barHeight - 1);
  }

  ctx.font = `10px ${FONT_STACK}`;

  // The band's range, captioned above it and centred on it, so the number
  // travels with the thing it describes rather than living only in the header.
  if (rect && viewportX !== null && rangeHeight > 0) {
    const label = formatRange(scale.start, scale.end);
    const width = ctx.measureText(label).width;
    const center = viewportX + rect.width / 2;

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

  const interval = tickInterval(
    content.extent.end - content.extent.start + 1,
    6
  );

  ctx.fillStyle = palette.axisText;
  ctx.textBaseline = "top";

  ticksFor(content.extent.start, content.extent.end, interval).forEach((bp) => {
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

/**
 * Tints the part of the plot the payload does not cover.
 *
 * Once the viewport can extend past the loaded window, the rows outside it draw
 * nothing — and nothing is indistinguishable from a genuinely empty stretch of
 * genome. That is the one failure a payload-honesty rule cannot allow: "no genes
 * and no signal here" is a claim about the chromosome, where the truth is only
 * "not fetched yet". So the dead region is washed out and bounded by a rule at
 * the coordinate where the data stops.
 *
 * Drawn over y *bands* rather than over the whole canvas, because the minimap
 * has to be excluded: it draws on the extent rather than on the viewport, so
 * "outside the loaded window" is a position inside its bar, not a region of the
 * plot. Washing it would tint an unrelated slice of the chromosome. The minimap
 * states the same fact in its own coordinates by outlining the loaded window.
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

    // The rule goes on the edge that faces the data, which is the one that
    // marks where it stops.
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

/**
 * Segment row: the intervals the segmentation pipeline cut, labelled with the
 * category it voted for and coloured by it.
 *
 * The colour comes from the category's position in the payload's full enum, so
 * it is the same in every window — see `segmentPalette`. The label's colour
 * comes with it, since a generated ramp runs light enough that white text on
 * its pale end fails contrast.
 *
 * The label is `id`-derived rather than the raw namespaced `segment_id`, which
 * is 40+ characters and would never fit. The full id is in the tooltip and the
 * accessible table.
 */
export function drawSegments(
  draw: DrawContext,
  segments: SegmentBlock[],
  categories: SegmentPalette
): void {
  segments.forEach((segment) => {
    // A category outside the enum falls back to the single accent fill the row
    // used before it had categories. That happens whenever the segmentation
    // gains a category the payload's enum has not caught up with, and a grey
    // or invisible block would be a worse answer than an uncoloured one.
    const color = categories.fill(segment.category);

    if (!color) {
      // A category outside the enum falls back to the single accent fill the
      // row used before it had categories. That happens whenever the
      // segmentation gains a category the payload's enum has not caught up
      // with, and an invisible block is a worse answer than an uncoloured one.
      drawBlock(
        draw,
        segment,
        segmentLabel(segment),
        draw.palette.segment,
        draw.palette.segmentText
      );

      return;
    }

    // Colour is the category; stripes are the negative strand.
    const fill = categories.isStriped(segment.category)
      ? (stripedFill(draw.ctx, color) ?? color)
      : color;

    drawBlock(
      draw,
      segment,
      segmentLabel(segment),
      fill,
      categories.text(segment.category)
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
 * The features row's y axis: its maximum, at the top of the bars.
 *
 * One number, because that is the whole axis. Zero is left unlabelled — the
 * bars sit on a drawn baseline, so the bottom of the row is already obviously
 * zero, and a second label would spend a third of a short row restating it.
 *
 * It sits *above* the bars, in the strip `ACTIVATION_AXIS_HEIGHT` reserves,
 * with its baseline 1 px clear of the tallest bar. Drawn over the bars instead
 * it collided every time rather than occasionally: the bars are normalized to
 * the trace's own peak, so the tallest one reaches the top of the band by
 * definition and occupies exactly the pixels the number needs.
 *
 * Still at x = 0 rather than inset beside the bars. Every row of the track
 * shares one bp axis measured from the plot's left edge — an annotation block
 * and a feature bar at the same base sit at the same x — and insetting the
 * features rows alone would break that for those rows only, which is the class
 * of error that renders as plausible-looking science.
 *
 * Canvas rather than DOM, unlike the row and trace names: this is a data
 * annotation on the same footing as the minimap's tick labels, and the
 * accessible table already reports every trace's peak in text.
 */
function drawActivationAxis(
  draw: DrawContext,
  peak: number,
  /** Top of the bars: the label's baseline sits just above this. */
  top: number
): void {
  const { ctx, density, palette } = draw;
  const label = formatActivation(peak);

  // Compact drops the trace names, and the axis goes with them rather than
  // being the one piece of text left in a thumbnail-sized card — where a 10 px
  // label would also be a third of the row's height.
  if (!label || density === "compact") return;

  ctx.fillStyle = palette.axisText;
  ctx.font = `10px ${FONT_STACK}`;
  ctx.textAlign = "left";
  // Alphabetic rather than bottom: digits sit on the alphabetic baseline, so
  // this puts the glyphs' underside 1 px above the bars. A bottom baseline
  // would reserve descender space no digit uses and open a visible gap.
  ctx.textBaseline = "alphabetic";
  ctx.fillText(label, 0, top - AXIS_LABEL_GAP);
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
  // Two strips sit above the bars: the trace's name, then the y axis maximum.
  const inset = (row.labelInset ?? 0) + (row.axisInset ?? 0);
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

  drawActivationAxis(draw, trace.peak, row.y + inset);

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
