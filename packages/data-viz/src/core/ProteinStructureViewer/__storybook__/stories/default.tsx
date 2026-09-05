import RawProteinStructureViewer from "@data-viz/src/core/ProteinStructureViewer";
import { Args } from "@storybook/react-vite";
import { useState } from "react";
import {
  CRAMBIN_MAX_RESIDUE_VALUE,
  CRAMBIN_PDB,
  CRAMBIN_PLDDT,
  CRAMBIN_RESIDUE_VALUES,
} from "../constants";

/** Mol* needs a sized box; stories give it one. */
const STORY_HEIGHT = 520;
const STORY_MAX_WIDTH = 640;

export const ProteinStructureViewer = (props: Args): JSX.Element => {
  const { showOverlay, showPlddt, stats, ...rest } = props;

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
        onResidueClick={(residueIndex) =>
          setSelectedResidue((prev) =>
            prev === residueIndex ? null : residueIndex
          )
        }
        onSelectionClear={() => setSelectedResidue(null)}
        pdb={CRAMBIN_PDB}
        plddt={showPlddt ? CRAMBIN_PLDDT : null}
        residueOverlay={
          showOverlay
            ? {
                label: "Feature activation",
                max: CRAMBIN_MAX_RESIDUE_VALUE,
                readoutLabel: "Activation",
                tooltip:
                  "Max activation across all residues for the selected feature",
                values: CRAMBIN_RESIDUE_VALUES,
              }
            : null
        }
        selectedResidue={selectedResidue}
        stats={stats}
        {...rest}
      />
    </div>
  );
};
