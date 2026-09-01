import { Meta } from "@storybook/react-vite";
import { StructureViewer } from "./stories/default";

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
 * Mol* renders through WebGL, which neither Chromatic nor the jsdom snapshot
 * runner can drive, so visual regression is skipped for every story here.
 */
const NO_SNAPSHOT = {
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
    showSequenceViewer: {
      control: { type: "boolean" },
      description: "Show the sequence panel pinned along the bottom",
    },
    stats: {
      control: { type: "object" },
      description: "Up to three whole-structure stats shown along the bottom",
    },
  },
  component: StructureViewer,
  parameters: NO_SNAPSHOT,
  title: "Data Viz/StructureViewer",
} as Meta;

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
  parameters: NO_SNAPSHOT,
};

/**
 * A per-residue value overlay replaces pLDDT coloring and swaps the legend to
 * the continuous plasma scale. Hovering a residue reports its activation.
 */
export const WithResidueOverlay = {
  args: { ...DEFAULT_ARGS, showOverlay: true },
  parameters: NO_SNAPSHOT,
};

/** The 3D view fills the whole box when the sequence panel is hidden. */
export const WithoutSequenceViewer = {
  args: { ...DEFAULT_ARGS, showSequenceViewer: false },
  parameters: NO_SNAPSHOT,
};

/** Bare viewer, for embedding somewhere that supplies its own chrome. */
export const WithoutLegend = {
  args: {
    ...DEFAULT_ARGS,
    showAxes: false,
    showLegend: false,
  },
  parameters: NO_SNAPSHOT,
};

/**
 * Without pLDDT scores the structure falls back to Mol*'s chain coloring, and
 * the per-residue readout shows a dash where the confidence would be.
 */
export const WithoutPlddt = {
  args: { ...DEFAULT_ARGS, showPlddt: false, stats: [] },
  parameters: NO_SNAPSHOT,
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
  parameters: NO_SNAPSHOT,
};
