import { GenomeTrackData } from "../../GenomeTrack.types";
import { formatBp, formatRange } from "../../utils/format";
import { TrackRow } from "../../utils/layout";
import { segmentLabel } from "../../renderers";

interface AccessibleTableProps {
  data: GenomeTrackData;
  /** The rows the canvas actually drew, so the table cannot describe more. */
  rows: TrackRow[];
  /** Id used by the plot's `aria-describedby`. */
  id: string;
  /**
   * Annotations the lane cap left undrawn.
   *
   * The table lists them anyway — it describes the payload, and an annotation
   * that did not fit is still in the region. The count is stated so a reader is
   * not left thinking the plot and the table describe the same set.
   */
  annotationOverflow: number;
}

/**
 * The track's contents as a real table, for assistive technology.
 *
 * This is not a nicety bolted on afterwards: a canvas exposes nothing to a
 * screen reader, so without this the component is a blank region and the data
 * is simply unavailable. It renders inside a visually hidden container and
 * mirrors the rows the canvas drew — including which ones, so a reader is never
 * told about a row that is not on screen.
 *
 * It describes the whole payload window rather than the current viewport. That
 * is deliberate: panning is a visual affordance, and a reader stepping through
 * a table wants the region the tool returned, not whatever happens to be
 * scrolled into view.
 */
export const AccessibleTable = ({
  annotationOverflow,
  data,
  id,
  rows,
}: AccessibleTableProps): JSX.Element => {
  const kinds = new Set(rows.map((row) => row.kind));
  const { locus } = data;
  const organism = locus.organism_label ?? locus.organism;

  return (
    <div id={id}>
      <p>
        {`${organism}, ${locus.chrom} ${formatRange(locus.start, locus.end)}`}
        {locus.gene ? `, gene ${locus.gene}` : ""}
        {`. SAE ${data.sae.sae}.`}
      </p>

      {kinds.has("annotations") &&
        data.annotations &&
        annotationOverflow > 0 && (
          <p>
            {`${annotationOverflow} of these annotations overlap too deeply to be drawn, and are listed here only.`}
          </p>
        )}

      {kinds.has("annotations") && data.annotations && (
        <table>
          <caption>Reference annotations</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Position</th>
              <th scope="col">Product</th>
            </tr>
          </thead>
          <tbody>
            {data.annotations.map((annotation) => (
              <tr key={annotation.id}>
                <th scope="row">{annotation.name}</th>
                <td>{annotation.kind}</td>
                <td>
                  {formatRange(
                    annotation.start,
                    annotation.end,
                    annotation.strand
                  )}
                </td>
                <td>{annotation.product ?? "Not annotated"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {kinds.has("segments") && (
        <table>
          <caption>Predicted segments</caption>
          <thead>
            <tr>
              <th scope="col">Segment</th>
              <th scope="col">Category</th>
              <th scope="col">Position</th>
              <th scope="col">Predicted label</th>
              <th scope="col">Support</th>
            </tr>
          </thead>
          <tbody>
            {data.segments.map((segment) => (
              <tr key={segment.id}>
                <th scope="row">{segmentLabel(segment)}</th>
                <td>{segment.category}</td>
                <td>
                  {formatRange(segment.start, segment.end, segment.strand)}
                </td>
                <td>{segment.predicted_label ?? "Unlabelled"}</td>
                <td>{`${Math.round(segment.predicted_support * 100)}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/*
       * Lists every trace the payload carries, not only the ones drawn: a
       * reader stepping through a table wants what the tool returned, and
       * `maxFeatureRows` is a limit on vertical space rather than on what is
       * worth knowing. The truncation note below says when the server itself
       * held some back.
       */}
      {kinds.has("features") && (
        <table>
          <caption>Top features by activation</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              <th scope="col">Description</th>
              <th scope="col">Peak activation</th>
              <th scope="col">Peak position</th>
            </tr>
          </thead>
          <tbody>
            {[...data.pinned, ...data.features].map((trace) => {
              const note = data.feature_notes[String(trace.feature_id)];
              const peakIndex = trace.values.indexOf(Math.max(...trace.values));

              return (
                <tr key={trace.feature_id}>
                  <th scope="row">{`Feature ${trace.feature_id}`}</th>
                  <td>
                    {note?.label ||
                      note?.description ||
                      "No description available"}
                  </td>
                  <td>{trace.peak.toFixed(3)}</td>
                  <td>
                    {formatBp(data.bins.start + peakIndex * data.bins.stride)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {data.caps.features_truncated && (
        <p>
          {`Showing ${data.features.length} of ${data.caps.available_features} features firing in this window.`}
        </p>
      )}

      {data.annotations === null && (
        <p>This organism has no annotation coverage.</p>
      )}
    </div>
  );
};

export default AccessibleTable;
