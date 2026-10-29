/** Coordinate and label formatting shared by the canvas and the DOM overlay. */

/** Thousands separators, e.g. 45462 becomes "45,462". */
export function formatBp(bp: number): string {
  return Math.round(bp).toLocaleString("en-US");
}

/** A 1-based inclusive range with optional strand: "45,462–45,750 (+)". */
export function formatRange(
  start: number,
  end: number,
  strand?: "+" | "-" | "."
): string {
  const range = `${formatBp(start)}–${formatBp(end)}`;

  return strand && strand !== "." ? `${range} (${strand})` : range;
}

/** Compact window width: "288 bp", "4.6 kb", "1.2 Mb". */
export function formatSpan(span: number): string {
  if (span < 1_000) return `${Math.round(span)} bp`;
  if (span < 1_000_000)
    return `${(span / 1_000).toFixed(span < 10_000 ? 1 : 0)} kb`;

  return `${(span / 1_000_000).toFixed(span < 10_000_000 ? 1 : 0)} Mb`;
}

/**
 * Bases per trace point, e.g. "200 kb/point". Null when each point is one
 * base.
 */
export function formatResolution(stride: number): string | null {
  return stride > 1 ? `${formatSpan(stride)}/point` : null;
}

/**
 * Abbreviated tick label for a ruler position. Decimals come from `interval`
 * so adjacent ticks never get the same label.
 */
export function formatTick(bp: number, interval: number): string {
  // Ticks this close cannot be told apart abbreviated, so spell them out.
  if (interval < 1_000) return formatBp(bp);

  // Unit follows the coordinate, precision follows the interval.
  if (bp >= 1_000_000) {
    return `${(bp / 1_000_000).toFixed(decimalsFor(interval, 1_000_000))}M`;
  }

  return `${(bp / 1_000).toFixed(decimalsFor(interval, 1_000))}k`;
}

/** Decimals needed for `interval` to show at `unit` scale, capped at 3. */
function decimalsFor(interval: number, unit: number): number {
  const scaled = interval / unit;

  if (scaled >= 1) return 0;

  return Math.min(Math.ceil(-Math.log10(scaled)), 3);
}

/** A round (1/2/5 x 10^n) tick interval giving about `target` ticks. */
export function tickInterval(span: number, target = 6): number {
  const rough = span / Math.max(target, 1);
  const magnitude = 10 ** Math.floor(Math.log10(Math.max(rough, 1)));
  const normalized = rough / magnitude;

  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 5) return 5 * magnitude;

  return 10 * magnitude;
}

/** Tick positions across a 1-based inclusive range, on round multiples. */
export function ticksFor(
  start: number,
  end: number,
  interval: number
): number[] {
  const ticks: number[] = [];
  const first = Math.ceil(start / interval) * interval;

  for (let bp = first; bp <= end; bp += interval) ticks.push(bp);

  return ticks;
}

/**
 * Truncates a label with an ellipsis to fit `maxWidth` in the current canvas
 * font. Null when even the ellipsis does not fit.
 */
export function fitLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string | null {
  if (maxWidth <= 0) return null;
  if (ctx.measureText(text).width <= maxWidth) return text;

  const ellipsis = "…";

  if (ctx.measureText(ellipsis).width > maxWidth) return null;

  let lo = 0;
  let hi = text.length;

  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    const candidate = text.slice(0, mid) + ellipsis;

    if (ctx.measureText(candidate).width <= maxWidth) lo = mid;
    else hi = mid - 1;
  }

  return lo > 0 ? text.slice(0, lo) + ellipsis : null;
}

/**
 * Activation label for the y axis: two significant figures below 10, whole
 * numbers above. Empty for zero or non-finite values.
 */
export function formatActivation(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "";
  if (value >= 10) return String(Math.round(value));

  return String(Number(value.toPrecision(2)));
}

/** The trailing part of a segment id, e.g. "seg_00076" or "s12". */
export function shortSegmentId(id: string): string {
  // Namespaced ids end after the last `:`; `seg.<accession>.s<n>` ids after
  // the last `.`.
  const local = id.split(":").pop() ?? id;

  return local.split(".").pop() || local;
}

/** Short segment label: the trailing id plus its category, unless `unknown`. */
export function segmentLabel(segment: {
  category: string;
  id: string;
}): string {
  const id = shortSegmentId(segment.id);

  return segment.category && segment.category !== "unknown"
    ? `${id} ${segment.category}`
    : id;
}
