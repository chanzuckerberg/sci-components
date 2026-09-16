import { Meta } from "@storybook/react-vite";
import {
  DEFAULT_TRACK_DATA,
  NO_OVERVIEW_TRACK_DATA,
  POOLED_TRACK_DATA,
  UNANNOTATED_TRACK_DATA,
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
 * Overlapping annotations, packed into lanes.
 *
 * The fixture contains both shapes a GFF produces: genes that run into the next
 * one, and a tRNA nested inside a CDS. Drawn in one flat row the nested feature
 * would be painted over and unreachable by the pointer, so the row uses as many
 * lanes as it needs — one block deep each, up to `maxAnnotationLanes`.
 *
 * Lane position carries no meaning and is not strand. Strand stays on the
 * arrowhead, which is the cue that survives a colorblind reader and does not
 * move when a neighbouring gene changes the packing. Hover any block, including
 * the nested one, to confirm each is independently addressable.
 */
export const OverlappingAnnotations = {
  args: { ...DEFAULT_ARGS, tracks: ["annotations"] },
};

/**
 * The same window with the lanes capped at one, which is what the row did
 * before it packed.
 *
 * Overlapping blocks collapse back onto each other and the nested tRNA is gone
 * from the plot entirely. It is still in the accessible table — the table
 * describes the payload rather than the picture — and the count of what went
 * undrawn is stated there too, because a plot that is quietly incomplete is
 * worse than one that says so.
 */
export const CappedAnnotationLanes = {
  args: { ...DEFAULT_ARGS, maxAnnotationLanes: 1, tracks: ["annotations"] },
};

/**
 * Zoomed out past the loaded window, as far as the default margin allows.
 *
 * Zooming out is always possible — otherwise a shell that re-fetched the zoomed
 * range would trap the user inside it, each zoom-in permanently narrowing the
 * reachable genome. But it is bounded: pan and zoom stop at the loaded window
 * plus `navigationMargin` times its span on each side, which at the default
 * keeps the data over a third of the plot. Unbounded, the loaded slice
 * compresses into a few pixels and every row becomes a sliver.
 *
 * The coordinates the payload does not cover are washed out and ruled at the
 * boundary rather than drawn empty: "no data loaded here" is a claim about the
 * fetch, where empty space would be a claim about the genome. The header names
 * the loaded range alongside the visible one, since the wash and the minimap's
 * outline are both canvas and a screen reader gets neither.
 *
 * Drag and scroll from here: the limit is a soft one in practice, because each
 * re-fetch widens the window and so widens the margin with it.
 */
export const ZoomedPastTheWindow = {
  args: {
    ...DEFAULT_ARGS,
    viewport: { end: 46_039, start: 45_173 },
  },
};

/**
 * The same window with navigation pinned to the payload, which is what
 * `navigationMargin={0}` does.
 *
 * The viewport cannot leave the data at all, so nothing is ever washed out —
 * and a re-fetch that narrows the window traps the user inside it. Right for a
 * static embed that will never fetch again, wrong for anything interactive.
 */
export const PinnedToThePayload = {
  args: { ...DEFAULT_ARGS, navigationMargin: 0 },
};

/**
 * The minimap over the whole chromosome, which is what it spans whenever the
 * payload carries an `overview`.
 *
 * Three ranges, and telling them apart is the point of the row: the bar is the
 * chromosome, with its pooled activation summary inside it; the outline is the
 * slice the payload holds; the filled band is the viewport. At this zoom the
 * band is a few pixels of 4.6 Mb, which is why it has a minimum width and why
 * it is translucent — an opaque one would delete the only informative pixel
 * underneath it.
 *
 * `overview` costs a fixed thousand bins regardless of chromosome length and is
 * fetched once per accession, so it does not grow with the genome and does not
 * cost anything on a window re-fetch.
 */
export const ChromosomeMinimap = {
  args: { ...DEFAULT_ARGS, tracks: ["minimap", "annotations", "segments"] },
};

/**
 * A feature selected, with its activation across the whole chromosome in the
 * minimap.
 *
 * Click any features row and the minimap's signal becomes that feature's,
 * chromosome-wide — which is the only way to see where a feature fires outside
 * the loaded window. Click it again to clear.
 *
 * The minimap used to draw a maximum pooled across the top features. That
 * sounded useful and was not: every bin was a max over eight traces, so almost
 * no bin was quiet and the row read as noise. One feature's trace answers a
 * question someone actually asked.
 *
 * The trace arrives as `feature_overview`, fetched per *selection* rather than
 * per payload — this story builds it locally on click, which is what a shell
 * will do against the endpoint. The component draws it only when its
 * `feature_id` matches the selection, so a trace left over from a previous
 * feature is never shown under a new one.
 */
export const FeatureOnTheMinimap = {
  args: DEFAULT_ARGS,
};

/**
 * A deployment that cannot produce an overview: `overview` is null and
 * `caps.overview_available` is false.
 *
 * The minimap falls back to spanning the payload's own window, and the viewport
 * cannot leave it — nothing in the payload says what is out there, so claiming
 * a chromosome would be inventing one. This is also exactly how the row behaved
 * before it spanned chromosomes.
 */
export const WithoutOverview = {
  args: { ...DEFAULT_ARGS, data: NO_OVERVIEW_TRACK_DATA },
};

/**
 * A re-fetch in flight, with the previous window still on screen.
 *
 * The counterpart to `Loading`, and the distinction matters: a shell that
 * fetches a finer stride on zoom does so on every wheel notch, so replacing the
 * plot with a skeleton would make it flicker. The header keeps reporting the
 * resolution of the data actually drawn rather than the one being fetched —
 * claiming the finer stride early would overstate the precision on screen.
 */
export const Refreshing = {
  args: { ...DEFAULT_ARGS, data: POOLED_TRACK_DATA, refreshing: true },
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
