import { useLayoutEffect, useRef, useState } from "react";
import {
  TrackTooltip,
  TrackTooltipDetail,
  TrackTooltipRange,
  TrackTooltipTitle,
} from "../../style";
import { formatRange } from "../../utils/format";
import { TrackHit } from "../../utils/hitTest";
import { TrackRow } from "../../utils/layout";
import { GenomeScale, bpToPx } from "../../utils/scale";

/**
 * Where the tooltip's left edge goes, in px from the plot's left edge.
 *
 * Centred over the hovered block wherever it fits, and slid inward just far
 * enough to stay inside the plot where it does not — near either end of the
 * axis a centred box would hang off the side and be clipped. A box wider than
 * the plot is pinned to its left edge, where `max-width` has already made it no
 * wider than the plot.
 */
export function tooltipLeft(
  center: number,
  boxWidth: number,
  width: number
): number {
  return Math.min(
    Math.max(center - boxWidth / 2, 0),
    Math.max(width - boxWidth, 0)
  );
}

interface HitTooltipProps {
  hit: TrackHit;
  /** The row the hit came from, so the tooltip sits above it. */
  row: TrackRow;
  scale: GenomeScale;
  width: number;
}

/**
 * Tooltip for the hovered block or bin.
 *
 * Positioned by hand rather than by a popper: the anchor is a point inside a
 * canvas, not an element, so there is nothing for a popper to attach to. It is
 * `aria-hidden` because the accessible table already carries every value it
 * shows — announcing it again would read the same data twice, once without
 * structure.
 *
 * The range it prints is the *bin's* range for a trace hit, not a single base.
 * A pooled bin covers `stride` bases and reporting one of them would claim
 * precision the payload does not have.
 *
 * Its width is measured once it has rendered, because where it can go depends
 * on how wide its text made it. A layout effect runs before the browser paints,
 * so the first, unmeasured position is never seen.
 */
export const HitTooltip = ({
  hit,
  row,
  scale,
  width,
}: HitTooltipProps): JSX.Element => {
  const box = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState(0);

  useLayoutEffect(() => {
    setBoxWidth(box.current?.offsetWidth ?? 0);
  }, [hit, width]);

  const center = bpToPx(scale, (hit.start + hit.end) / 2);
  const left = tooltipLeft(center, boxWidth, width);

  return (
    <TrackTooltip aria-hidden ref={box} style={{ left, top: row.y }}>
      <TrackTooltipTitle>
        {hit.kind === "trace"
          ? `${hit.label}: ${hit.value.toFixed(3)}`
          : hit.label}
      </TrackTooltipTitle>
      {hit.detail && <TrackTooltipDetail>{hit.detail}</TrackTooltipDetail>}
      <TrackTooltipRange>
        {formatRange(
          hit.start,
          hit.end,
          hit.kind === "trace" ? undefined : hit.strand
        )}
      </TrackTooltipRange>
    </TrackTooltip>
  );
};

export default HitTooltip;
