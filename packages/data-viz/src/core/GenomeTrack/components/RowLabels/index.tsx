import { TrackRow, rowKey } from "../../utils/layout";
import { TrackRowLabel } from "./style";

/** Section names, each on the line reserved above its rows. */
export function RowLabels({ rows }: { rows: TrackRow[] }): JSX.Element {
  return (
    <>
      {rows.map((row, index) =>
        row.label && row.headerHeight ? (
          <TrackRowLabel
            aria-hidden
            key={rowKey(row)}
            style={{
              height: row.headerHeight,
              top: row.y - (row.headerHeight ?? 0),
            }}
            withSeparator={index > 0}
          >
            {row.label}
          </TrackRowLabel>
        ) : null
      )}
    </>
  );
}
