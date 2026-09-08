import RawGenomeTrack from "@data-viz/src/core/GenomeTrack";
import {
  GenomeSelection,
  GenomeViewport,
} from "@data-viz/src/core/GenomeTrack/GenomeTrack.types";
import { Args } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { STORY_WIDTH } from "../constants";

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

  return (
    <div style={{ maxWidth: "100%", width: STORY_WIDTH }}>
      <RawGenomeTrack
        data={data}
        onSelectionChange={setSelection}
        onViewportChange={setViewport}
        selection={selection}
        viewport={viewport}
        {...rest}
      />
    </div>
  );
};
