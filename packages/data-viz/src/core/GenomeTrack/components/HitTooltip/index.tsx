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

/** Keeps the tooltip this far from either edge so it is never clipped. */
const EDGE_MARGIN = 40;

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
 */
export const HitTooltip = ({
  hit,
  row,
  scale,
  width,
}: HitTooltipProps): JSX.Element => {
  const center = bpToPx(scale, (hit.start + hit.end) / 2);
  const left = Math.min(
    Math.max(center, EDGE_MARGIN),
    Math.max(width - EDGE_MARGIN, EDGE_MARGIN)
  );

  return (
    <TrackTooltip aria-hidden style={{ left, top: row.y }}>
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
