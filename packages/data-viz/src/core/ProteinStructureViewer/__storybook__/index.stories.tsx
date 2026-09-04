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
 * Mol* renders through WebGL, which none of our automated runners can drive:
 * not Chromatic, not the jsdom snapshot runner, and not the Vitest addon's
 * headless Chromium, where the context request fails outright and the viewer
 * never paints. So visual regression and accessibility are both skipped here.
 *
 * Skipping the accessibility check leaves these stories unaudited rather than
 * accessible. What it would measure is a viewer that failed to start: the
 * legend's labels against an unpainted canvas, which is not the contrast a
 * reader would meet. The viewer's own contrast is ours to check by hand until
 * it can be driven headlessly.
 */
const NO_AUTOMATED_CHECKS = {
  a11y: { test: "off" as const },
  chromatic: { disableSnapshot: true },
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
  parameters: NO_AUTOMATED_CHECKS,
  title: "Data Viz/ProteinStructureViewer",
} as Meta;

/**
 * Snapshots one story, to find out whether Chromatic can drive Mol* at all.
 *
 * Locally it cannot: stubbing `getContext` to refuse `webgl` makes Mol* render
 * "WebGL does not seem to be available", and the sequence panel never mounts.
 * Whether Chromatic's capture browsers behave the same way is untested, and one
 * enabled story answers it. Until it does, this stays an exception rather than
 * a lifting of `NO_AUTOMATED_CHECKS`.
 *
 * `disableSnapshot` is set explicitly because story parameters merge over the
 * meta's, so omitting it would leave the opt-out in force. The delay covers
 * Mol* parsing the structure and drawing its first frame.
 */
const CHROMATIC_PROBE_PENDING_RESULT = {
  ...NO_AUTOMATED_CHECKS,
  chromatic: { delay: 3000, disableSnapshot: false },
};

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
  parameters: NO_AUTOMATED_CHECKS,
};

/**
 * A per-residue value overlay replaces pLDDT coloring and swaps the legend to
 * the continuous plasma scale. Hovering a residue reports its activation.
 */
export const WithResidueOverlay = {
  args: { ...DEFAULT_ARGS, showOverlay: true },
  parameters: NO_AUTOMATED_CHECKS,
};

/** The 3D view fills the whole box when the sequence panel is hidden. */
export const WithoutSequenceViewer = {
  args: { ...DEFAULT_ARGS, showSequenceViewer: false },
  parameters: NO_AUTOMATED_CHECKS,
};

/** Bare viewer, for embedding somewhere that supplies its own chrome. */
export const WithoutLegend = {
  args: {
    ...DEFAULT_ARGS,
    showAxes: false,
    showLegend: false,
  },
  parameters: NO_AUTOMATED_CHECKS,
};

/**
 * Without pLDDT scores the structure falls back to Mol*'s chain coloring, and
 * the per-residue readout shows a dash where the confidence would be.
 */
export const WithoutPlddt = {
  args: { ...DEFAULT_ARGS, showPlddt: false, stats: [] },
  parameters: NO_AUTOMATED_CHECKS,
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
  parameters: NO_AUTOMATED_CHECKS,
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
  parameters: CHROMATIC_PROBE_PENDING_RESULT,
};
