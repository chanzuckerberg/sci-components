import { TrackRow, rowKey } from "../../utils/layout";
import { TrackFeatureLabel } from "./style";

/** Feature names, drawn inside the plot above their own bars. */
export function FeatureLabels({
  rows,
  selectedTraceId,
}: {
  rows: TrackRow[];
  selectedTraceId: number | null;
}): JSX.Element {
  return (
    <>
      {rows.map((row) =>
        row.traceLabel ? (
          <TrackFeatureLabel
            aria-hidden
            key={rowKey(row)}
            selected={row.traceId === selectedTraceId}
            style={{ top: row.y }}
          >
            {row.traceLabel}
          </TrackFeatureLabel>
        ) : null
      )}
    </>
  );
}
