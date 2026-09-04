import {
  ColorScale,
  ProteinStructureViewer,
  ProteinStructureViewerProps,
  PLASMA_COLOR_SCALE,
  PLDDT_COLOR_SCALE,
  ResidueValueOverlay,
  StructureStat,
  injectPlddtIntoPdb,
  sampleColorScale,
} from "@czi-sds/data-viz";
import React, { useState } from "react";

const PDB =
  "ATOM      1  N   THR A   1      17.047  14.099   3.625  1.00 13.79           N";

const STATS: StructureStat[] = [
  { label: "Known", value: "62%" },
  { label: "pTM", value: "0.874" },
  { label: "Mean pLDDT", value: "0.781" },
];

const OVERLAY: ResidueValueOverlay = {
  colorScale: PLASMA_COLOR_SCALE,
  label: "Feature activation",
  max: 2.4,
  min: 0,
  readoutLabel: "Activation",
  tooltip: "Max activation across all residues",
  values: new Map([[8, 1.2]]),
};

const CUSTOM_SCALE: ColorScale = {
  kind: "continuous",
  stops: [
    { color: "#ffffff", t: 0 },
    { color: "#000000", t: 1 },
  ],
};

const ProteinStructureViewerNameSpaceTest = (
  props: ProteinStructureViewerProps
) => {
  const [selectedResidue, setSelectedResidue] = useState<number | null>(null);

  // Utilities re-exported alongside the component.
  injectPlddtIntoPdb(PDB, [0.94]);
  sampleColorScale(PLDDT_COLOR_SCALE, 0.9, 1);
  sampleColorScale(CUSTOM_SCALE, 1, 2, 0.5);

  return (
    <>
      {/* Basic usage */}
      <ProteinStructureViewer pdb={PDB} />

      {/* With pLDDT coloring and stats */}
      <ProteinStructureViewer pdb={PDB} plddt={[0.94]} stats={STATS} />

      {/* Reserved stat slot */}
      <ProteinStructureViewer pdb={PDB} stats={[null, STATS[1], null]} />

      {/* With a residue value overlay */}
      <ProteinStructureViewer pdb={PDB} residueOverlay={OVERLAY} />

      {/* Controlled selection */}
      <ProteinStructureViewer
        onResidueClick={(residueIndex, compId) =>
          setSelectedResidue(compId ? residueIndex : null)
        }
        onResidueHover={(residueIndex, compId) =>
          console.log(residueIndex, compId)
        }
        onSelectionClear={() => setSelectedResidue(null)}
        pdb={PDB}
        selectedResidue={selectedResidue}
      />

      {/* Chrome toggles and background overrides */}
      <ProteinStructureViewer
        backgroundColor="#101010"
        pdb={PDB}
        sequenceViewerBackgroundColor="rgb(24 24 27)"
        showAxes={false}
        showLegend={false}
        showSequenceViewer={false}
      />

      {/* Forwarded div props */}
      <ProteinStructureViewer
        aria-label="Protein structure"
        className="structure"
        style={{ height: 480 }}
        {...props}
      />
    </>
  );
};
