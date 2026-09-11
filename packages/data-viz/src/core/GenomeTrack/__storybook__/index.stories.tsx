import { Meta } from "@storybook/react-vite";
import {
  DEFAULT_TRACK_DATA,
  POOLED_TRACK_DATA,
  UNANNOTATED_TRACK_DATA,
} from "./constants";
import { GenomeTrack } from "./stories/default";

export default {
  argTypes: {
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
    maxFeatureRows: {
      control: { max: 16, min: 1, step: 1, type: "range" },
      description: "How many traces the features row draws, pinned first",
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
 *
 * Two of the fixture's eight traces carry a description and the rest read
 * "Feature 13492", which is the coverage the knowledge base actually has — and
 * for a checkpoint whose description pipeline has not run, every row reads that
 * way. The layout has to survive it, so the fixture does not pretend otherwise.
 *
 * Bar heights are normalized per trace, not across the stack, so a weak
 * feature's shape stays legible. The consequence is that heights cannot be
 * compared between rows; the tooltip carries the absolute value.
 */
export const Default = {
  args: DEFAULT_ARGS,
};

/**
 * Zoomed in far enough to read the sequence. Letters appear once bases are at
 * least 7 px wide; below that the row falls back to a solid band rather than an
 * unreadable smear.
 *
 * This is also where the minimap earns its keep: the band narrows to show how
 * little of the window is on screen, captioned with the range it covers, while
 * the ticks under the bar stay on the window's coordinates.
 */
export const ZoomedIn = {
  args: { ...DEFAULT_ARGS, viewport: { end: 45_500, start: 45_462 } },
};

/**
 * Only the block rows, for a caller that wants neither the position indicator
 * nor the letters. `tracks` is an ordered list, so leaving a row out is all it
 * takes.
 */
export const BlocksOnly = {
  args: { ...DEFAULT_ARGS, tracks: ["annotations", "segments"] },
};

/**
 * A single feature, for a card that has room for one row rather than eight.
 * `maxFeatureRows` takes a prefix of the payload's rank order, so this is the
 * highest-scoring trace.
 */
export const OneFeature = {
  args: { ...DEFAULT_ARGS, maxFeatureRows: 1 },
};

/**
 * A 40 kb window, wide enough that the server pools the trace: `bins.stride`
 * climbs above 1 and the sequence comes back null. Every point is a max over
 * `stride` bases, so a single-base peak survives rather than being averaged
 * away.
 *
 * The header states the stride as well as the span, since zooming in here
 * magnifies bins rather than sharpening them — the resolution is fixed by
 * whoever fetched the window, not by the current viewport.
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
 * The in-card variant used by a comparison row: tighter rows, no captions or
 * tick labels, no label gutter, and navigation off so the card does not capture
 * scroll.
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
    tracks: ["minimap", "sequence", "annotations", "segments", "features"],
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
