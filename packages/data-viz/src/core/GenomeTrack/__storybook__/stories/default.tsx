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
 */
export const GenomeTrack = (props: Args): JSX.Element => {
  const { data, ...rest } = props;

  const [viewport, setViewport] = useState<GenomeViewport | undefined>(
    undefined
  );
  const [selection, setSelection] = useState<GenomeSelection | null>(null);
  const [ranking, setRanking] = useState<ActivationRanking>("zscore");

  useEffect(() => {
    setViewport(
      data ? { end: data.locus.end, start: data.locus.start } : undefined
    );
    setSelection(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.locus.start, data?.locus.end, data?.locus.accession]);

  const withFeatureOverview = useMemo(() => {
    if (!data) return data;

    const featureId =
      selection?.kind === "series" ? featureIdFromSeries(selection.id) : null;

    return {
      ...data,
      feature_overview:
        featureId === null || !data.overview
          ? null
          : makeFeatureOverview(featureId, data.overview.chrom_length),
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
