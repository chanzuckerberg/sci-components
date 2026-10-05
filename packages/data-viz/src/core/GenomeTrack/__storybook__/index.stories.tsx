import { Meta } from "@storybook/react-vite";
import {
  DEFAULT_TRACK_DATA,
  NO_OVERVIEW_TRACK_DATA,
  POOLED_TRACK_DATA,
} from "./constants";
import { GenomeTrack } from "./stories/default";

export default {
  argTypes: {
    blockRowHeight: {
      control: { max: 64, min: 12, step: 2, type: "range" },
      description: "Height of a segment row, or of one annotation lane, in px",
    },
    data: {
      control: { type: "object" },
      description:
        "The window to draw. Null renders the empty state. Story fixtures are synthetic — see mockGenomeTrackData.ts",
    },
    density: {
      control: { type: "inline-radio" },
      description:
        "Compact tightens every row and drops the labels and captions, for the in-card variant",
      options: ["comfortable", "compact"],
    },
    disableNavigation: {
      control: { type: "boolean" },
      description:
        "Turn off wheel-zoom and drag-pan. Keyboard navigation and selection still work.",
    },
    featureRowHeight: {
      control: { max: 64, min: 8, step: 2, type: "range" },
      description: "Height of one feature's bars, in px, excluding its name",
    },
    maxAnnotationLanes: {
      control: { max: 8, min: 1, step: 1, type: "range" },
      description:
        "Ceiling on the lanes the annotations row packs overlapping genes into",
    },
    maxFeatureRows: {
      control: { max: 16, min: 1, step: 1, type: "range" },
      description: "How many traces the features row draws, pinned first",
    },
    navigationMargin: {
      control: { max: 6, min: 0, step: 0.5, type: "range" },
      description:
        "How far pan and zoom may go outside the loaded window, as a multiple of its span. Zero pins the viewport to the payload.",
    },
    ranking: {
      control: { type: "inline-radio" },
      description:
        "How the features are ranked, shown in the features dropdown. A fetch parameter: a real shell re-fetches on change.",
      options: ["zscore", "peak"],
    },
    showRowLabels: {
      control: { type: "boolean" },
      description:
        "Draw each section's name on a line above its rows. Off for the compact variant.",
    },
    loading: {
      control: { type: "boolean" },
      description: "Render the skeleton instead of the data",
    },
    refreshing: {
      control: { type: "boolean" },
      description:
        "A re-fetch is in flight. Keeps the last good data drawn, unlike loading.",
    },
    tracks: {
      control: { type: "check" },
      description: "Rows to draw, in order",
      options: ["minimap", "sequence", "annotations", "segments", "features"],
    },
  },
  component: GenomeTrack,
  title: "Data Viz/GenomeTrack",
} as Meta;

const DEFAULT_ARGS = {
  data: DEFAULT_TRACK_DATA,
  density: "comfortable",
  tracks: ["minimap", "sequence", "annotations", "segments", "features"],
};

/**
 * The locus from the designs: `fixX` in E. coli K-12, 289 bp. Drag to pan,
 * scroll to zoom, click a block to select it.
 */
export const Default = {
  args: DEFAULT_ARGS,
};

/**
 * The same window with navigation pinned to the payload, which is what
 * `navigationMargin={0}` does.
 */
export const PinnedToThePayload = {
  args: { ...DEFAULT_ARGS, navigationMargin: 0 },
};

/**
 * A deployment that cannot produce an overview: `overview` is null and
 * `caps.overview_available` is false.
 */
export const WithoutOverview = {
  args: { ...DEFAULT_ARGS, data: NO_OVERVIEW_TRACK_DATA },
};

/**
 * A re-fetch in flight, with the previous window still on screen.
 */
export const Refreshing = {
  args: { ...DEFAULT_ARGS, data: POOLED_TRACK_DATA, refreshing: true },
};

/**
 * A 40 kb window, wide enough that the server pools the trace.
 */
export const PooledWindow = {
  args: { ...DEFAULT_ARGS, data: POOLED_TRACK_DATA },
};

/**
 * The in-card variant used by a comparison row: tighter rows, no captions or
 * tick labels, no section names, and navigation off so the card does not
 * capture scroll.
 */
export const Compact = {
  args: {
    ...DEFAULT_ARGS,
    blockRowHeight: 12,
    density: "compact",
    disableNavigation: true,
    showRowLabels: false,
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
    tracks: ["minimap", "sequence", "annotations", "segments", "features"],
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
