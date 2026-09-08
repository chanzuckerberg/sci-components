import RawProteinStructureViewer from "@data-viz/src/core/ProteinStructureViewer";
import { Args } from "@storybook/react-vite";
import { useState } from "react";
import { CRAMBIN_PDB, CRAMBIN_PLDDT } from "../constants";

/** Mol* needs a sized box; stories give it one. */
const STORY_HEIGHT = 520;
const STORY_MAX_WIDTH = 640;

export const ProteinStructureViewer = (props: Args): JSX.Element => {
  // Crambin unless a story names its own structure, as the complex does. These
  // are defaults rather than fixed values so that every arg a story sets is a
  // real component prop, and the controls panel offers nothing the component
  // does not actually take.
  const { pdb = CRAMBIN_PDB, plddt = CRAMBIN_PLDDT, ...rest } = props;

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
        {...rest}
        onResidueClick={({ index }) =>
          setSelectedResidue((prev) => (prev === index ? null : index))
        }
        onSelectionClear={() => setSelectedResidue(null)}
        pdb={pdb}
        plddt={plddt}
        selectedResidue={selectedResidue}
      />
    </div>
  );
};
