import { Meta } from "@storybook/react-vite";
import {
  DEFAULT_TRACK_DATA,
  POOLED_TRACK_DATA,
  UNANNOTATED_TRACK_DATA,
} from "./constants";
import { GenomeTrack } from "./stories/default";

export default {
  argTypes: {
    activationRowHeight: {
      control: { max: 160, min: 24, step: 4, type: "range" },
      description: "Height of the activation trace row, in px",
    },
    blockRowHeight: {
      control: { max: 64, min: 12, step: 2, type: "range" },
      description: "Height of the annotation and segment rows, in px",
    },
    data: {
      control: { type: "object" },
      description:
        "The window to draw. Null renders the empty state. Story fixtures are synthetic — see mockGenomeTrackData.ts",
    },
    density: {
      control: { type: "inline-radio" },
      description:
        "Compact tightens every row and drops ruler labels, for the in-card variant",
      options: ["comfortable", "compact"],
    },
    disableNavigation: {
      control: { type: "boolean" },
      description:
        "Turn off wheel-zoom and drag-pan. Keyboard navigation and selection still work.",
    },
    labelWidth: {
      control: { max: 160, min: 0, step: 8, type: "range" },
      description: "Width of the row label gutter. Zero hides it.",
    },
    loading: {
      control: { type: "boolean" },
      description: "Render the skeleton instead of the data",
    },
    tracks: {
      control: { type: "check" },
      description: "Rows to draw, in order",
      options: ["sequence", "annotations", "segments", "activation"],
    },
  },
  component: GenomeTrack,
  title: "Data Viz/GenomeTrack",
} as Meta;

const DEFAULT_ARGS = {
  data: DEFAULT_TRACK_DATA,
  density: "comfortable",
  tracks: ["annotations", "segments", "activation"],
};

/**
 * The locus from the designs: `fixX` in E. coli K-12, 289 bp. Drag to pan,
 * scroll to zoom, click a block to select it.
 */
export const Default = {
  args: DEFAULT_ARGS,
};

/**
 * With the sequence ruler. Letters appear once bases are at least 7 px wide;
 * below that the row falls back to a solid band rather than an unreadable
 * smear, so zoom in to read them.
 */
export const WithSequence = {
  args: {
    ...DEFAULT_ARGS,
    tracks: ["sequence", "annotations", "segments", "activation"],
  },
};

/**
 * A 40 kb window, wide enough that the server pools the trace: `bins.stride`
 * climbs above 1 and the sequence comes back null. Every point is a max over
 * `stride` bases, so a single-base peak survives rather than being averaged
 * away.
 */
export const PooledWindow = {
  args: { ...DEFAULT_ARGS, data: POOLED_TRACK_DATA },
};

/**
 * An organism with no annotation coverage. `annotations` is null rather than
 * empty, so the row is dropped entirely — an empty row would read as "no genes
 * here", which is a different claim from "nobody looked".
 */
export const WithoutAnnotations = {
  args: { ...DEFAULT_ARGS, data: UNANNOTATED_TRACK_DATA },
};

/**
 * The in-card variant used by a comparison row: tighter rows, no ruler labels,
 * no label gutter, and navigation off so the card does not capture scroll.
 */
export const Compact = {
  args: {
    ...DEFAULT_ARGS,
    blockRowHeight: 16,
    density: "compact",
    disableNavigation: true,
    labelWidth: 0,
    tracks: ["annotations", "segments"],
  },
};

/** Skeleton shown while the app-only fetch is in flight. */
export const Loading = {
  args: { ...DEFAULT_ARGS, loading: true },
};

/**
 * A typed error, rendered as a first-class state rather than a toast. The code
 * decides the copy, so a missing activation cache reads differently from a
 * region that was never precomputed.
 */
export const ErrorState = {
  args: {
    ...DEFAULT_ARGS,
    data: null,
    error: {
      code: "dependency_unavailable",
      message: "Continuous activation cache is not loaded for e_coli_k12.",
    },
  },
};

/** Nothing loaded yet — the state before a launcher has run. */
export const Empty = {
  args: { ...DEFAULT_ARGS, data: null },
};

/**
 * Test story: exercises every row kind at once against a deterministic fixture,
 * which is what the snapshot test renders.
 */
export const Test = {
  args: {
    ...DEFAULT_ARGS,
    tracks: ["sequence", "annotations", "segments", "activation"],
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
