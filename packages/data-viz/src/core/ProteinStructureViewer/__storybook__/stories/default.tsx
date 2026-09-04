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
const STORY_WIDTH = 640;

export const ProteinStructureViewer = (props: Args): JSX.Element => {
  // `pdb`/`plddt` default to crambin so most stories need only toggle args; the
  // multi-chain story passes a complex instead.
  const {
    pdb = CRAMBIN_PDB,
    plddt = CRAMBIN_PLDDT,
    showOverlay,
    showPlddt,
    stats,
    ...rest
  } = props;

  // Selection is controlled, so the story owns it the way a consumer would:
  // clicking a residue selects it, clicking it again clears it.
  const [selectedResidue, setSelectedResidue] = useState<number | null>(null);

  return (
    <div style={{ height: STORY_HEIGHT, width: STORY_WIDTH }}>
      <RawProteinStructureViewer
        onResidueClick={({ index }) =>
          setSelectedResidue((prev) => (prev === index ? null : index))
        }
        onSelectionClear={() => setSelectedResidue(null)}
        pdb={pdb}
        plddt={showPlddt ? plddt : null}
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
