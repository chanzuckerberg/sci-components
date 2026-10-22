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
 * The tooltip's left edge in px: centred on the hit, then shifted to stay
 * inside the plot.
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
 * Tooltip for the hovered block or bin. For a trace it shows the bin's whole
 * range. Hidden from screen readers, which get the accessible table instead.
 */
export const HitTooltip = ({
  hit,
  row,
  scale,
  width,
}: HitTooltipProps): JSX.Element => {
  const box = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState(0);

  // Measure before paint so the tooltip never shows at an unclamped position.
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
