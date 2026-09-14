import { Args, Meta } from "@storybook/react-vite";
import {
  BARNASE_BARSTAR_INTERFACE,
  BARNASE_BARSTAR_MAX_INTERFACE,
  BARNASE_BARSTAR_PDB,
  BARNASE_BARSTAR_PLDDT,
} from "./barnaseBarstar";
import { CRAMBIN_MAX_RESIDUE_VALUE, CRAMBIN_RESIDUE_VALUES } from "./constants";
import { ProteinStructureViewer } from "./stories/default";

/**
 * Whole-structure stats for the three legend slots. Real consumers pass
 * whatever suits their data; these mirror the confidence metrics that usually
 * accompany a predicted structure.
 */
const DEFAULT_STATS = [
  { label: "Known", value: "62%" },
  { label: "pTM", value: "0.874" },
  { label: "Mean pLDDT", value: "0.781" },
];

/**
 * Mol* renders through WebGL, so where a runner can supply a context decides
 * what it is worth asking of these stories.
 *
 * Chromatic's capture browsers can: build 3050 drew the two-chain complex in
 * both Chrome and Firefox, so visual regression is on. `delay` covers Mol*
 * parsing the structure and drawing its first frame, which is asynchronous and
 * finishes well inside it.
 *
 * The jsdom snapshot runner cannot. Refusing a `webgl` context locally makes
 * Mol* render "WebGL does not seem to be available" and the viewer never
 * mounts, so a snapshot there would capture that notice rather than the
 * component.
 *
 * Accessibility stays off, now pending a deliberate pass rather than a missing
 * canvas: keyboard traversal of individual residues is a known gap in both the
 * sequence panel and the 3D view, so enabling the check today would report that
 * gap on every story instead of a regression.
 */
const VIEWER_CHECKS = {
  a11y: { test: "off" as const },
  chromatic: { delay: 3000 },
  snapshot: { skip: true },
};

export default {
  argTypes: {
    backgroundColor: {
      control: { type: "color" },
      description:
        "Canvas background. Defaults to near-black in dark mode and white in light mode.",
    },
    chainColors: {
      control: { type: "object" },
      description:
        "Color per chain, by chainId. Applies only while chain coloring is what the structure is painted with, which is when neither plddt nor residueOverlay is set.",
    },
    hiddenChains: {
      control: { type: "object" },
      description:
        "Chains hidden from the 3D view, by chainId. Omit to let the chain legend's toggles own visibility.",
    },
    download: {
      control: { type: "object" },
      description:
        "Turns on the capture button under the reset-camera control. Takes resolution (low | medium | high | maximum), backgroundColor, showAxes and filename.",
    },
    molstarSpec: {
      control: { type: "object" },
      description:
        "Mol* plugin spec laid over the viewer's own, for settings with no prop of their own. Read once at creation, except canvas3d.",
    },
    showChainLegend: {
      control: { type: "boolean" },
      description:
        "Show the chain legend. Ignored on a single-chain structure.",
    },
    showAxes: {
      control: { type: "boolean" },
      description:
        "Show the orientation axes widget and the reset-camera button",
    },
    showLegend: {
      control: { type: "boolean" },
      description:
        "Show the stats and color scale legend overlaid on the viewer",
    },
    sequenceViewerBackgroundColor: {
      control: { type: "color" },
      description:
        "Sequence panel background. Defaults to the theme's primary surface.",
    },
    showSequenceViewer: {
      control: { type: "boolean" },
      description: "Show the sequence panel pinned along the bottom",
    },
    stats: {
      control: { type: "object" },
      description: "Up to three whole-structure stats shown along the bottom",
    },
  },
  component: ProteinStructureViewer,
  parameters: VIEWER_CHECKS,
  title: "Data Viz/ProteinStructureViewer",
} as Meta;

/** Confidence metrics from the co-fold behind the two-chain fixture. */
const COMPLEX_STATS = [
  { label: "pTM", value: "0.973" },
  { label: "Interface pTM", value: "0.968" },
  { label: "Mean pLDDT", value: "0.961" },
];

const DEFAULT_ARGS = {
  showAxes: true,
  showLegend: true,
  showSequenceViewer: true,
  stats: DEFAULT_STATS,
};

const RESIDUE_OVERLAY = {
  label: "Feature activation",
  max: CRAMBIN_MAX_RESIDUE_VALUE,
  readoutLabel: "Activation",
  tooltip: "Max activation across all residues for the selected feature",
  values: CRAMBIN_RESIDUE_VALUES,
};

const INTERFACE_OVERLAY = {
  label: "Interface depth",
  max: BARNASE_BARSTAR_MAX_INTERFACE,
  readoutLabel: "Depth",
  tooltip:
    "How far inside the 8A interface shell the residue sits, in angstroms",
  values: BARNASE_BARSTAR_INTERFACE,
};

export const Default = {
  args: DEFAULT_ARGS,
  parameters: VIEWER_CHECKS,
};

/**
 * A per-residue value overlay replaces pLDDT coloring and swaps the legend to
 * the continuous plasma scale. Hovering a residue reports its activation.
 */
export const WithResidueOverlay = {
  args: { ...DEFAULT_ARGS, residueOverlay: RESIDUE_OVERLAY },
  parameters: VIEWER_CHECKS,
};

/** The 3D view fills the whole box when the sequence panel is hidden. */
export const WithoutSequenceViewer = {
  args: { ...DEFAULT_ARGS, showSequenceViewer: false },
  parameters: VIEWER_CHECKS,
};

/** Bare viewer, for embedding somewhere that supplies its own chrome. */
export const WithoutLegend = {
  args: {
    ...DEFAULT_ARGS,
    showAxes: false,
    showLegend: false,
  },
  parameters: VIEWER_CHECKS,
};

/**
 * Without pLDDT scores the structure falls back to Mol*'s chain coloring. No
 * per-residue scale describes that, so the legend keeps its stats but drops
 * the color key rather than showing one for colors that are not on screen.
 * The per-residue readout shows a dash where the confidence would be.
 */
export const WithoutPlddt = {
  args: { ...DEFAULT_ARGS, plddt: null },
  parameters: VIEWER_CHECKS,
};

/**
 * Only the 3D view, for a caller that supplies its own sequence panel and
 * readouts. The axes widget and its reset-camera button stay, since `showAxes`
 * controls those separately.
 */
export const WithoutSequenceViewerOrLegend = {
  args: {
    ...DEFAULT_ARGS,
    showAxes: false,
    showLegend: false,
    showSequenceViewer: false,
  },
  parameters: VIEWER_CHECKS,
};

/**
 * A two-chain complex: barnase with barstar bound to it, folded together. The
 * sequence panel splits into one grid per chain with a caption above each, so
 * the two are not read as a single continuous protein -- and copying takes the
 * chains separated by `|` rather than concatenated.
 *
 * This is the shape a designed binder arrives in, rendered against the target
 * it was designed for.
 */
export const Complex = {
  args: {
    ...DEFAULT_ARGS,
    pdb: BARNASE_BARSTAR_PDB,
    plddt: BARNASE_BARSTAR_PLDDT,
    stats: COMPLEX_STATS,
  },
  parameters: VIEWER_CHECKS,
};

/**
 * The complex under an overlay, which is how a binder is usually read: not by
 * confidence, but by some per-residue quantity scored over the pair. Here that
 * is how deep each residue sits in the interface, so the two contact faces
 * light up and the rest of both chains stays neutral.
 *
 * It also shows the overlay spanning a chain break. The map is keyed by the
 * residue's position in the structure, so its entries past 110 fall on barstar
 * rather than wrapping back onto barnase - the two patches are one map, not
 * one per chain.
 */
export const ComplexWithResidueOverlay = {
  args: {
    ...DEFAULT_ARGS,
    pdb: BARNASE_BARSTAR_PDB,
    plddt: BARNASE_BARSTAR_PLDDT,
    residueOverlay: INTERFACE_OVERLAY,
    stats: COMPLEX_STATS,
  },
  parameters: VIEWER_CHECKS,
};

/**
 * With no pLDDT scores and no overlay, the structure is colored by chain and
 * the legend grows a key for it: one row per chain, each with the color it was
 * given and a toggle that hides it.
 *
 * Visibility is uncontrolled here, which is the default - the toggles work
 * without the consumer holding any state. Clicking a chain's name selects the
 * whole chain, as does clicking its caption in the sequence panel.
 */
export const ComplexWithChainColoring = {
  args: {
    ...DEFAULT_ARGS,
    pdb: BARNASE_BARSTAR_PDB,
    plddt: null,
    stats: COMPLEX_STATS,
  },
  parameters: VIEWER_CHECKS,
};

/**
 * Chain colors chosen by the consumer rather than taken from the palette. Only
 * the chains named are overridden; any others keep the color they were
 * assigned, since an override does not spend a palette slot.
 */
export const ComplexWithCustomChainColors = {
  args: {
    ...DEFAULT_ARGS,
    chainColors: { A: "#8C5AE8", B: "#1FA37B" },
    pdb: BARNASE_BARSTAR_PDB,
    plddt: null,
    stats: COMPLEX_STATS,
  },
  parameters: VIEWER_CHECKS,
};

/**
 * Barstar hidden to begin with, leaving the target on its own, and the toggles
 * live so either chain can be brought back or taken away.
 *
 * Visibility is controlled here - the story holds it and echoes
 * `onChainVisibilityChange` back into `hiddenChains`, which is what a consumer
 * driving visibility from elsewhere in its own UI does. The stories above
 * leave it uncontrolled, where the viewer owns it and the toggles need no
 * state on the consumer's side at all.
 *
 * The hidden chain stays in the sequence panel, dimmed. Removing its grid would
 * reflow the panel every time a chain was toggled, and the sequence is still
 * the sequence whether or not the cartoon is drawn. Hiding a chain that is
 * selected takes its ball-and-stick with it, so nothing of it is left on the
 * canvas.
 */
export const ComplexWithHiddenChain = {
  args: {
    ...DEFAULT_ARGS,
    pdb: BARNASE_BARSTAR_PDB,
    plddt: BARNASE_BARSTAR_PLDDT,
    stats: COMPLEX_STATS,
  },
  parameters: VIEWER_CHECKS,
  // Seeded through `render` rather than set as a `hiddenChains` arg: the prop
  // is controlled, so a story that set it and never updated it would pin
  // barstar hidden and leave the toggles able only to report. The story owns
  // the state instead, the way a consumer driving visibility would, which
  // leaves the toggles live.
  render: (props: Args) => (
    <ProteinStructureViewer {...props} initialHiddenChains={["B"]} />
  ),
};

/**
 * A capture button under the reset-camera control, which downloads the
 * structure as a PNG.
 *
 * Transparent by default, since that is what a figure usually wants, and
 * without the axes widget - it orients a reader who can turn the structure and
 * earns its place less in a still. The image is rendered fresh at the size
 * asked for rather than scaled up from the canvas, so it comes out as sharp as
 * the resolution says whatever size the viewer happens to be on screen.
 */
export const WithImageDownload = {
  args: {
    ...DEFAULT_ARGS,
    download: { filename: "crambin", resolution: "high" },
  },
  parameters: VIEWER_CHECKS,
};

/**
 * A whole chain selected on load. The camera frames everything the selection
 * covers rather than approaching a point, so a chain is fitted to the view, and
 * the readout reports the mean pLDDT across it instead of a single score.
 */
export const ComplexWithChainSelected = {
  args: {
    ...DEFAULT_ARGS,
    pdb: BARNASE_BARSTAR_PDB,
    plddt: BARNASE_BARSTAR_PLDDT,
    stats: COMPLEX_STATS,
  },
  parameters: VIEWER_CHECKS,
  // Through `render` rather than `args`, since the selection the story opens
  // on is the harness seeding its own state rather than a prop of the viewer.
  render: (props: Args) => (
    <ProteinStructureViewer {...props} initialSelection={{ chains: ["B"] }} />
  ),
};

// Test

/**
 * The fixture the unit tests mount, carrying the `data-testid` they query by.
 * Everything the viewer draws is on in its default configuration, so a test
 * reaches the legend, the sequence panel, and the axes without arranging them.
 */
export const Test = {
  args: DEFAULT_ARGS,
  parameters: VIEWER_CHECKS,
  render: (props: Args) => (
    <ProteinStructureViewer {...props} data-testid="protein-structure-viewer" />
  ),
};
