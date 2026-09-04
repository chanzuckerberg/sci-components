import RawProteinStructureViewer from "@data-viz/src/core/ProteinStructureViewer";
import { Args } from "@storybook/react-vite";
import { useState } from "react";
import { BARNASE_BARSTAR_PDB, BARNASE_BARSTAR_PLDDT } from "../barnaseBarstar";

/** Mol* needs a sized box; stories give it one. */
const STORY_HEIGHT = 520;
const STORY_WIDTH = 640;

/**
 * The two-chain case: a target and the partner bound to it, folded together and
 * rendered as one structure. Exercises the sequence panel's per-chain grids,
 * which the single-chain stories cannot reach.
 */
export const ProteinStructureViewerComplex = (props: Args): JSX.Element => {
  const { showPlddt, stats, ...rest } = props;

  const [selectedResidue, setSelectedResidue] = useState<number | null>(null);

  return (
    <div style={{ height: STORY_HEIGHT, width: STORY_WIDTH }}>
      <RawProteinStructureViewer
        onResidueClick={(residueIndex) =>
          setSelectedResidue((prev) =>
            prev === residueIndex ? null : residueIndex
          )
        }
        onSelectionClear={() => setSelectedResidue(null)}
        pdb={BARNASE_BARSTAR_PDB}
        plddt={showPlddt ? BARNASE_BARSTAR_PLDDT : null}
        selectedResidue={selectedResidue}
        stats={stats}
        {...rest}
      />
    </div>
  );
};
