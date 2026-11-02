import { CategoryKey } from "../../utils/segmentColors";
import { TrackLegend, TrackLegendItem, TrackLegendSwatch } from "./style";

export const LEGEND_TEST_ID = "genome-track-legend";

/** The category key for the segments row. */
export function SegmentLegend({
  items,
  top,
}: {
  items: CategoryKey[];
  top: number | null;
}): JSX.Element | null {
  if (top === null || items.length === 0) return null;

  return (
    <TrackLegend aria-hidden data-testid={LEGEND_TEST_ID} style={{ top }}>
      {items.map((item) => (
        <TrackLegendItem key={item.name}>
          <TrackLegendSwatch striped={item.striped} swatchColor={item.color} />
          {item.name}
        </TrackLegendItem>
      ))}
    </TrackLegend>
  );
}
