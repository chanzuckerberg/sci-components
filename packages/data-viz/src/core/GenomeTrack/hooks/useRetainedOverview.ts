import { useEffect, useState } from "react";
import { GenomeTrackData, MinimapOverview } from "../GenomeTrack.types";

/**
 * Keeps the chromosome overview across re-fetches that omit it, for the same
 * accession and chromosome only.
 */
export function useRetainedOverview(
  data: GenomeTrackData | null
): MinimapOverview | null {
  const [retained, setRetained] = useState<{
    key: string;
    overview: MinimapOverview;
  } | null>(null);

  const key = data ? `${data.locus.accession}:${data.locus.chrom}` : null;
  const incoming = data?.overview ?? null;

  useEffect(() => {
    if (incoming) {
      setRetained({ key: key as string, overview: incoming });
      return;
    }

    setRetained((previous) =>
      previous && previous.key === key ? previous : null
    );
  }, [incoming, key]);

  if (incoming) return incoming;

  return retained && retained.key === key ? retained.overview : null;
}
