import { useEffect, useState } from "react";
import { GenomeTrackData, MinimapOverview } from "../GenomeTrack.types";

/**
 * Holds on to the chromosome overview across window re-fetches.
 *
 * The overview is chromosome-scale, so it is the one part of the payload that
 * does not change when the window does: a shell fetches it once per accession
 * and omits it from every subsequent fetch. That makes `overview: null`
 * ambiguous on the wire, and `caps.overview_available` is what disambiguates:
 *
 * - `null` + `overview_available: true` — "unchanged, you already have it".
 *   Keep the last one. Clearing it here would drop the minimap on the first
 *   re-fetch after load, which is to say on the user's first zoom.
 * - `null` + `overview_available: false` — this deployment cannot draw one.
 *   There is nothing to keep.
 *
 * Retention is keyed on accession *and* chromosome, and dropped when either
 * changes. An overview carries `chrom_length`, which the track now uses as the
 * limit of navigation — so serving a stale one for a different chromosome would
 * not merely look wrong, it would let the user pan into coordinates that do not
 * exist on the chromosome they are looking at.
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

    // Nothing to keep for a chromosome we are no longer looking at. Note this
    // runs for an unavailable overview too, which is correct: both cases mean
    // "no overview for this chromosome", and neither should inherit one.
    setRetained((previous) =>
      previous && previous.key === key ? previous : null
    );
  }, [incoming, key]);

  if (incoming) return incoming;

  return retained && retained.key === key ? retained.overview : null;
}
