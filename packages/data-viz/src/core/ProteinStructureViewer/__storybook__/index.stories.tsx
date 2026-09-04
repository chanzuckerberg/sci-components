import { Meta } from "@storybook/react-vite";
import { BARNASE_BARSTAR_PDB, BARNASE_BARSTAR_PLDDT } from "./barnaseBarstar";
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
    showOverlay: {
      control: { type: "boolean" },
      description:
        "Story-only: paint a synthetic per-residue value overlay, which takes over from pLDDT coloring",
    },
    showPlddt: {
      control: { type: "boolean" },
      description:
        "Story-only: supply per-residue pLDDT scores, which color the structure by confidence",
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
  showOverlay: false,
  showPlddt: true,
  showSequenceViewer: true,
  stats: DEFAULT_STATS,
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
  args: { ...DEFAULT_ARGS, showOverlay: true },
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
 * Without pLDDT scores the structure falls back to Mol*'s chain coloring, and
 * the per-residue readout shows a dash where the confidence would be.
 */
export const WithoutPlddt = {
  args: { ...DEFAULT_ARGS, showPlddt: false, stats: [] },
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
