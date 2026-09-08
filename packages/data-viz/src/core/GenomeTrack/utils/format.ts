/** Coordinate and label formatting shared by the canvas and the DOM overlay. */

/** Thousands separators, e.g. 45462 becomes "45,462". */
export function formatBp(bp: number): string {
  return Math.round(bp).toLocaleString("en-US");
}

/**
 * A 1-based inclusive range as the designs write it: "45,462–45,750 (+)".
 *
 * En dash rather than hyphen, matching the design and reading correctly when a
 * coordinate is negative-adjacent in copy.
 */
export function formatRange(
  start: number,
  end: number,
  strand?: "+" | "-" | "."
): string {
  const range = `${formatBp(start)}–${formatBp(end)}`;

  return strand && strand !== "." ? `${range} (${strand})` : range;
}

/**
 * Compact span for the ruler's scale readout: "288 bp", "4.6 kb", "1.2 Mb".
 *
 * The ruler labels absolute positions; this labels the *width* of the window,
 * which is the number a user needs to know how zoomed in they are.
 */
export function formatSpan(span: number): string {
  if (span < 1_000) return `${Math.round(span)} bp`;
  if (span < 1_000_000)
    return `${(span / 1_000).toFixed(span < 10_000 ? 1 : 0)} kb`;

  return `${(span / 1_000_000).toFixed(span < 10_000_000 ? 1 : 0)} Mb`;
}

/**
 * Tick label for a ruler position, abbreviated to fit.
 *
 * Full coordinates are 7-9 digits for a eukaryotic genome and would collide at
 * any useful tick density, so ticks abbreviate and the header carries the exact
 * range.
 *
 * **Precision comes from the tick interval, not from the coordinate.** Choosing
 * it from the magnitude of `bp` is the obvious implementation and it is wrong:
 * at a 289 bp window the ticks are 50 bp apart, and one decimal of kb rounds
 * 45,500 and 45,550 both to "45.5k". A ruler whose adjacent labels are equal is
 * worse than one with no labels, because it reads as precise while being
 * unreadable. So the number of significant digits is derived from `interval`,
 * which guarantees consecutive ticks differ.
 */
export function formatTick(bp: number, interval: number): string {
  // Below 1 kb between ticks, spell the coordinate out. This guard has to come
  // first and apply at every magnitude: abbreviating cannot separate ticks this
  // close even with three decimals, so a deep zoom into a human chromosome
  // needs the exact base, which is what a user wants at that zoom anyway.
  if (interval < 1_000) return formatBp(bp);

  // Unit follows the coordinate, precision follows the interval. Picking the
  // unit from the interval instead would label a 2 Mb position as "2050k".
  if (bp >= 1_000_000) {
    return `${(bp / 1_000_000).toFixed(decimalsFor(interval, 1_000_000))}M`;
  }

  return `${(bp / 1_000).toFixed(decimalsFor(interval, 1_000))}k`;
}

/**
 * Decimal places needed for `interval` to be visible at `unit` scale.
 *
 * A 50 kb interval shown in Mb needs two decimals (0.05); a 500 kb interval
 * needs one. Capped at three, past which the label is longer than the number is
 * useful.
 */
function decimalsFor(interval: number, unit: number): number {
  const scaled = interval / unit;

  if (scaled >= 1) return 0;

  return Math.min(Math.ceil(-Math.log10(scaled)), 3);
}

/**
 * Chooses a round tick interval giving roughly `target` ticks across `span`.
 *
 * Snaps to a 1/2/5 x 10^n ladder so tick labels are numbers a reader can hold —
 * 5 kb apart rather than 4.7 kb apart.
 */
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
 * Truncates a label to fit `maxWidth`, measured in the canvas' current font.
 *
 * Returns null when even an ellipsis will not fit, which callers read as "draw
 * no label" rather than drawing a lone "…" that labels nothing.
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
