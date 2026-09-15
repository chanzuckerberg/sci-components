import {
  ChainRef,
  ColorScale,
  DownloadResolution,
  ProteinStructureViewer,
  ProteinStructureViewerProps,
  PLASMA_COLOR_SCALE,
  PLDDT_COLOR_SCALE,
  ResidueRef,
  ResidueValueOverlay,
  StructureSelection,
  StructureStat,
  injectPlddtIntoPdb,
  sampleColorScale,
} from "@czi-sds/data-viz";
// Mol* is a peer dependency, so a consumer reaching for `molstarSpec` imports
// its types and config items from Mol* itself rather than from this package.
import { PluginConfig } from "molstar/lib/mol-plugin/config";
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

const CHAIN_COLORS: Record<string, string> = { A: "#0072B2", B: "#E69F00" };

/** Typed through the exported union, and labelled from the exported map. */
const DOWNLOAD_RESOLUTION: DownloadResolution = "maximum";

const ProteinStructureViewerNameSpaceTest = (
  props: ProteinStructureViewerProps
) => {
  const [selection, setSelection] = useState<StructureSelection | null>(null);
  const [hiddenChains, setHiddenChains] = useState<string[]>([]);
  const [chains, setChains] = useState<ChainRef[]>([]);

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

      {/* Controlled selection: one residue */}
      <ProteinStructureViewer
        onResidueClick={(residue: ResidueRef) =>
          setSelection({ residues: [residue.index] })
        }
        onResidueHover={(residue) =>
          console.log(residue?.chainId, residue?.seqId, residue?.compId)
        }
        onSelectionChange={setSelection}
        pdb={PDB}
        selection={selection}
      />

      {/* A range, a whole chain, and the two combined */}
      <ProteinStructureViewer pdb={PDB} selection={{ residues: [1, 2, 3] }} />
      <ProteinStructureViewer pdb={PDB} selection={{ chains: ["A"] }} />
      <ProteinStructureViewer
        pdb={PDB}
        selection={{ chains: ["A"], residues: [150] }}
      />

      {/* Chain visibility and coloring, uncontrolled */}
      <ProteinStructureViewer
        chainColors={CHAIN_COLORS}
        onChainsChange={setChains}
        pdb={PDB}
      />

      {/* The capture button, at its defaults and fully specified */}
      <ProteinStructureViewer download={{}} pdb={PDB} />
      <ProteinStructureViewer
        download={{
          backgroundColor: "#FFFFFF",
          filename: "structure",
          resolution: DOWNLOAD_RESOLUTION,
          showAxes: true,
        }}
        pdb={PDB}
      />

      {/* Chain visibility, controlled */}
      <ProteinStructureViewer
        disableChainHighlightOnHover
        hiddenChains={hiddenChains}
        onChainVisibilityChange={setHiddenChains}
        pdb={PDB}
        showChainLegend={chains.length > 1}
      />

      {/*
        Mol* settings the viewer has no prop of its own for. This is the
        example the docs show, kept here so it is typechecked rather than
        merely written down.
      */}
      <ProteinStructureViewer
        molstarSpec={{
          canvas3d: {
            renderer: { colorMarker: false },
            trackball: { rotateSpeed: 2 },
          },
          config: [[PluginConfig.Viewport.ShowControls, true]],
        }}
        pdb={PDB}
      />

      {/* A named choice has to be given whole, name and params together. */}
      <ProteinStructureViewer
        molstarSpec={{
          canvas3d: {
            postprocessing: { occlusion: { name: "off", params: {} } },
          },
          layout: { initial: { isExpanded: false } },
        }}
        pdb={PDB}
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
