import RawProteinStructureViewer from "@data-viz/src/core/ProteinStructureViewer";
import { Args } from "@storybook/react-vite";
import { useState } from "react";
import { CRAMBIN_PDB, CRAMBIN_PLDDT } from "../constants";

/** Mol* needs a sized box; stories give it one. */
const STORY_HEIGHT = 520;
const STORY_MAX_WIDTH = 640;

export const ProteinStructureViewer = (props: Args): JSX.Element => {
  // Selection is controlled, so the story owns it the way a consumer would:
  // clicking a residue selects it, clicking it again clears it.
  const [selectedResidue, setSelectedResidue] = useState<number | null>(null);

  return (
    <div
      style={{
        height: STORY_HEIGHT,
        width: "100%",
        maxWidth: STORY_MAX_WIDTH,
      }}
    >
      <RawProteinStructureViewer
        plddt={CRAMBIN_PLDDT}
        {...props}
        onResidueClick={(residueIndex) =>
          setSelectedResidue((prev) =>
            prev === residueIndex ? null : residueIndex
          )
        }
        onSelectionClear={() => setSelectedResidue(null)}
        pdb={CRAMBIN_PDB}
        selectedResidue={selectedResidue}
      />
    </div>
  );
};
