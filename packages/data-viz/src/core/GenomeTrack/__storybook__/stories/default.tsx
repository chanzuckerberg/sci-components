import RawGenomeTrack, {
  featureIdFromSeries,
} from "@data-viz/src/core/GenomeTrack";
import {
  ActivationRanking,
  GenomeSelection,
  GenomeViewport,
} from "@data-viz/src/core/GenomeTrack/GenomeTrack.types";
import { Args } from "@storybook/react-vite";
import { useEffect, useMemo, useState } from "react";
import { STORY_WIDTH } from "../constants";
import { makeFeatureOverview } from "../mockGenomeTrackData";

/**
 * Story wrapper that owns viewport and selection the way a shell would.
 *
 * The track is controlled for both, so something has to hold them. Doing it
 * here rather than letting the component run uncontrolled is the point: this is
 * the integration a consumer writes, and if it is awkward to write in a story
 * it will be awkward in an app.
 */
export const GenomeTrack = (props: Args): JSX.Element => {
  const { data, ...rest } = props;

  const [viewport, setViewport] = useState<GenomeViewport | undefined>(
    undefined
  );
  const [selection, setSelection] = useState<GenomeSelection | null>(null);
  /**
   * The feature ranking, held here because it is a fetch parameter.
   *
   * A real shell would pass this as `rank_by` and re-fetch, so the rows would
   * come back reordered. The fixture is static, so here the label changes and
   * the rows do not — which is the one way this story is not the real thing.
   */
  const [ranking, setRanking] = useState<ActivationRanking>("zscore");

  // Storybook swaps `data` between stories and on control changes; a viewport
  // from the previous payload may describe coordinates the new one does not
  // contain, so it resets with the locus rather than being clamped into a
  // window the user never chose.
  //
  // Depending on the locus fields rather than on `data` is deliberate: `data`
  // is a fresh object on every control change, and depending on it would throw
  // away the user's zoom every time they nudged a row height.
  useEffect(() => {
    setViewport(
      data ? { end: data.locus.end, start: data.locus.start } : undefined
    );
    setSelection(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.locus.start, data?.locus.end, data?.locus.accession]);

  /**
   * The selected feature's chromosome-wide trace, built on selection.
   *
   * This is the shell's job, not the component's: a `"series"` selection names
   * a feature, and the shell fetches that feature's whole-chromosome
   * activation and hands it back as `feature_overview`. Here the fixture stands
   * in for the endpoint, but the shape of the integration is the real one —
   * including that the trace arrives *after* the selection rather than with the
   * payload, which is why the component matches `feature_id` before drawing it.
   */
  const withFeatureOverview = useMemo(() => {
    if (!data) return data;

    const featureId =
      selection?.kind === "series" ? featureIdFromSeries(selection.id) : null;

    return {
      ...data,
      feature_overview:
        featureId === null
          ? null
          : makeFeatureOverview(featureId, data.overview?.chrom_length),
    };
  }, [data, selection]);

  return (
    <div style={{ maxWidth: "100%", width: STORY_WIDTH }}>
      <RawGenomeTrack
        data={withFeatureOverview}
        onRankingChange={setRanking}
        onSelectionChange={setSelection}
        onViewportChange={setViewport}
        ranking={ranking}
        selection={selection}
        viewport={viewport}
        {...rest}
      />
    </div>
  );
};
