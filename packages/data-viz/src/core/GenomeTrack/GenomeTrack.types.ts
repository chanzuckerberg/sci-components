import { HTMLAttributes } from "react";

/**
 * Wire types for `GenomeTrack`.
 *
 * The payload types below use `snake_case` keys, unlike the component's props.
 * That is deliberate rather than an oversight: these are written to match
 * the Pydantic models an MCP tool serves. Camel-casing at the boundary would
 * mean a payload could not be diffed against a server fixture without
 * translating it first, which is exactly the kind of translation layer that
 * hides off-by-one bugs in coordinate data.
 *
 * Props are `camelCase`, as everywhere else in the library. The rule is: data
 * that crossed the network keeps the server's shape; anything a React caller
 * types by hand follows house style.
 */

/** Which SAE produced the activations, and how big its feature space is. */
export interface ModelRef {
  /** e.g. "esmgsedd-mvp". A `feature_id` is only meaningful alongside this. */
  sae: string;
  base_model: string;
  n_features: number;
  segmentation_threshold: number;
}

/** Where in a genome the window sits. Coordinates are 1-based inclusive. */
export interface Locus {
  organism: string;
  /** Display form of `organism`, e.g. "E. coli K-12". Server-supplied. */
  organism_label?: string;
  accession: string;
  chrom: string;
  /** 1-based inclusive. */
  start: number;
  /** 1-based inclusive. */
  end: number;
  genome_length: number;
  gene?: string;
}

/**
 * Maps trace index to genomic coordinates.
 *
 * Long windows are max-pooled server-side, so index `i` of every `values` array
 * covers `[start + i * stride, min(end, start + (i + 1) * stride - 1)]`. Max
 * rather than mean, so a single-base peak survives pooling.
 */
export interface BinAxis {
  start: number;
  end: number;
  /** Bases per point; 1 when unpooled. */
  stride: number;
  /** Equal to `values.length` for every trace in the payload. */
  n_bins: number;
}

/** A reference annotation: a gene, tRNA, or other feature from a GFF. */
export interface AnnotationBlock {
  id: string;
  /** Gene name, falling back to locus tag. */
  name: string;
  /** CDS | tRNA | rRNA | ncRNA | mobile_element | ... */
  kind: string;
  start: number;
  end: number;
  strand: "+" | "-" | ".";
  product?: string;
  locus_tag?: string;
}

/**
 * A precomputed segment: an interval the segmentation pipeline cut from the
 * activation signal, with the category it voted for.
 */
export interface SegmentBlock {
  /** Namespaced `segment_id` — pass back to segment-keyed tools unchanged. */
  id: string;
  start: number;
  end: number;
  strand: "+" | "-" | ".";
  /** +CDS | -CDS | intergenic | SINE | unknown | ... */
  category: string;
  predicted_label: string | null;
  /** kNN vote share, 0-1. */
  predicted_support: number;
  /** Nearest neighbour's product, when one was resolved. */
  predicted_top?: string;
  pct_of_segment: number;
}

/** One feature's activation across the window, on the payload's bin axis. */
export interface FeatureTrace {
  feature_id: number;
  /** Max raw activation in the window. */
  peak: number;
  /** Value of whichever metric ranked this feature. */
  score: number;
  score_kind: "peak" | "zscore";
  /**
   * Fraction of the segment's nucleotides where this feature is active, 0-1.
   * Defined against the segment rather than the window, so it is stable under
   * pan and zoom. Null when the window is not segment-aligned.
   */
  pct_of_segment: number | null;
  /** Length equals `bins.n_bins`. */
  values: number[];
}

/** Human-readable description of a feature, when the knowledge base has one. */
export interface FeatureNote {
  feature_id: number;
  /** Short display name; "" when unknown. */
  label: string;
  /** "" when unknown, which is the common case. */
  description: string;
  confidence: number | null;
  cluster: number | null;
  cluster_label: string;
  cluster_size: number | null;
}

/** Aggregate activation for a cluster of co-firing features. */
export interface ClusterTrace {
  cluster: number;
  cluster_label: string;
  cluster_size: number;
  /** Same bin axis as `FeatureTrace.values`. */
  values: number[];
}

/**
 * Chromosome-scale context for the minimap row.
 *
 * This is the only part of the payload keyed to the chromosome rather than the
 * window, so a shell fetches it once per accession and reuses it across window
 * re-fetches.
 *
 * **Only `chrom_length` is read.** That one number is what widens the minimap
 * from the payload's window to the whole chromosome, and what bounds
 * navigation. The signal the row draws comes from `feature_overview` — one
 * feature the user picked, rather than a summary pooled across a set they did
 * not, which leaves almost no bin quiet and reads as noise.
 */
export interface MinimapOverview {
  chrom: string;
  /** What the bar spans, and what bounds navigation. */
  chrom_length: number;
  /**
   * Fixed bin count regardless of chromosome size, so the stride is ~40 kb for
   * a bacterial genome and ~200 kb for a human chromosome. A shape to aim at,
   * never a value to read.
   */
  bins: BinAxis;
}

/**
 * One feature's activation across the whole chromosome, for the minimap.
 *
 * Fetched per selection rather than per accession, which is the opposite of
 * `MinimapOverview`: the overview is chromosome-scoped and stable, where this
 * follows whichever feature the user clicked. That is also why it is not a map
 * inside `MinimapOverview` — the features a payload carries are ranked within
 * the *window*, so panning changes the set, and a chromosome-scoped field
 * cannot enumerate them.
 *
 * On the same fixed bin count as the overview, so one array is ~8 kB whatever
 * the chromosome's length. The cost is not the wire, it is the read behind it.
 */
export interface FeatureOverview {
  /** Which feature this describes. Must match the selection to be drawn. */
  feature_id: number;
  /** Chromosome-wide axis, the same shape as `MinimapOverview.bins`. */
  bins: BinAxis;
  values: number[];
}

/** What the server had to leave out, and why. */
export interface TrackCaps {
  max_points: number;
  max_sequence_window: number;
  requested_top_n: number;
  /** Features actually firing in the window, which may exceed what was sent. */
  available_features: number;
  features_truncated: boolean;
  /** Knowledge-base coverage, out of `sae.n_features`. */
  described_features: number;
  labelled_clusters: number;
  /**
   * Whether this organism can produce a minimap at all. Distinguishes "omitted
   * because you already have it" from "this deployment cannot draw it".
   */
  overview_available: boolean;
}

/** Everything one track window needs. */
export interface GenomeTrackData {
  schema_version: 1;
  sae: ModelRef;
  locus: Locus;
  /**
   * Window nucleotides, 5' to 3', length `locus.end - locus.start + 1`. Null
   * when the window exceeds `caps.max_sequence_window` or the genome's sequence
   * file is unavailable — the track degrades rather than breaking.
   */
  sequence: string | null;
  bins: BinAxis;
  /**
   * Null means this deployment cannot draw a minimap, or that the caller
   * already holds one. `caps.overview_available` tells the two apart.
   */
  overview: MinimapOverview | null;
  /**
   * Chromosome-wide activation for the currently selected feature.
   *
   * Null when no feature is selected, or when the shell has not fetched this
   * one yet. The minimap draws it only when `feature_id` matches the selected
   * series — a trace left over from the previously selected feature would
   * otherwise be drawn under the new one's selection, which is a lie about
   * whose signal you are looking at.
   */
  feature_overview?: FeatureOverview | null;
  /**
   * Null (not `[]`) means this organism has no annotation coverage at all —
   * "nobody looked", which is different from "nothing here".
   */
  annotations: AnnotationBlock[] | null;
  segments: SegmentBlock[];
  /**
   * Every category the segmentation can emit, most common first.
   *
   * The full enum, not the categories in this window — which is what makes the
   * colours comparable. A category's colour is its index in this list, so
   * `+CDS` is the same hue in every window and every organism; assigning from
   * the categories *present* would repaint them on every pan, since a narrower
   * window holds fewer and the indices shift underneath.
   *
   * It lives in the payload rather than in the component so the list can grow
   * without a component release — the segmentation gains categories over time,
   * and a hardcoded enum here would mean a version bump for each one. The
   * ordering is the server's: it knows the global frequencies, and the
   * commonest categories should take the start of the ramp where the hues are
   * furthest apart.
   *
   * Absent or empty draws every segment in one accent fill.
   */
  segment_categories?: string[];
  features: FeatureTrace[];
  pinned: FeatureTrace[];
  clusters?: ClusterTrace[];
  /** Keyed by `String(feature_id)`. */
  feature_notes: Record<string, FeatureNote>;
  caps: TrackCaps;
}

/**
 * How the features are ranked, and what `score` on each trace means.
 *
 * These are the tool's own `rank_by` values, passed through unchanged — the
 * design calls them "Z-Score" and "Raw", but `peak` is the wire form of the
 * second and the server rejects anything else.
 */
export type ActivationRanking = "peak" | "zscore";

/** Rows the track can draw, in the order they are listed on the `tracks` prop. */
export type TrackKind =
  | "annotations"
  | "features"
  | "minimap"
  | "segments"
  | "sequence";

/** The visible bp range. 1-based inclusive, like every other coordinate. */
export interface GenomeViewport {
  start: number;
  end: number;
}

/**
 * Cross-component selection.
 *
 * Domain-free on purpose: every variant is an id into data the caller already
 * holds, so a component can emit one without knowing what it refers to.
 */
export type GenomeSelection =
  | { kind: "block"; id: string }
  | { kind: "range"; end: number; start: number }
  | { kind: "row"; id: string }
  | { kind: "series"; id: string };

/** A typed tool error, rendered as a first-class state rather than a toast. */
export interface TrackError {
  /**
   * Server error code. `dependency_unavailable` and `region_too_large` render
   * differently from a generic failure, so the code is part of the contract.
   */
  code: string;
  message: string;
}

export interface GenomeTrackProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  /** The window to draw. Null renders the empty state. */
  data: GenomeTrackData | null;
  /**
   * Rows to draw, top to bottom. An ordered array rather than a set of boolean
   * props, which is how the design's several frames come out of one component.
   * @default ["minimap", "sequence", "annotations", "segments", "features"]
   */
  tracks?: TrackKind[];
  /**
   * Visible range. Controlled when supplied — pan and zoom then report through
   * `onViewportChange` and change nothing until the prop comes back. Omit for
   * uncontrolled, where the component owns the range and starts at the
   * payload's full window.
   *
   * The viewport may extend past the payload's window, by up to
   * `navigationMargin`. That is deliberate: a shell that re-fetches a narrower
   * window at a finer stride needs the user to be able to zoom back out, and
   * clamping to the payload would make each zoom-in permanent. The rows tint
   * the coordinates they have no data for rather than drawing them empty.
   *
   * Supplied as a prop it is not clamped at all — controlled means the caller
   * owns it. Only pan and zoom originating inside the component are bounded.
   */
  viewport?: GenomeViewport;
  /**
   * How far outside the loaded window pan and zoom may go, as a multiple of
   * that window's span. Zero pins the viewport to the payload.
   *
   * This is the ceiling on how far the viewport may outrun its data, and it
   * exists because the alternative is unusable. Allowing navigation across the
   * whole chromosome sounds generous, but with no shell refilling the window
   * behind it the loaded slice compresses into a few pixels of an otherwise
   * empty plot — a 20 kb view of a 289 bp payload puts every row in a 25 px
   * column. The margin bounds that: the data always occupies at least
   * `1 / (1 + 2 × margin)` of the plot width.
   *
   * It is a soft limit rather than a wall, because each re-fetch widens the
   * loaded window and so widens this in turn. The user zooms out in steps that
   * are each backed by real data, which is how a genome browser is meant to
   * behave — navigation is a fetch, not a pan across megabases of nothing.
   *
   * Only applies when the payload carries an `overview`; without a chromosome
   * length there is nothing to navigate into and the window is the hard limit.
   * @default 1
   */
  navigationMargin?: number;
  /** Called on pan and zoom. A shell typically re-fetches from this. */
  onViewportChange?: (viewport: GenomeViewport) => void;
  /**
   * How the features are ranked, shown in the features section's dropdown.
   *
   * Controlled, with no internal fallback, because it is a *fetch* parameter
   * rather than a view option: `rank_by` changes which features the tool
   * returns and in what order, so a change is a request for different data. Held
   * locally the label would change and the rows would not, which reads as a
   * broken control.
   *
   * The dropdown is drawn only when `onRankingChange` is supplied — a control
   * nobody is listening to does nothing when used.
   * @default "zscore"
   */
  ranking?: ActivationRanking;
  /** Called when the user picks a ranking. A shell re-fetches from this. */
  onRankingChange?: (ranking: ActivationRanking) => void;
  /** Controlled selection. */
  selection?: GenomeSelection | null;
  onSelectionChange?: (selection: GenomeSelection | null) => void;
  /**
   * Height of one block row, in px: a segment row, or one lane of the
   * annotations row. The minimap and sequence rows size themselves from
   * `density`, and the features rows have a prop of their own.
   *
   * Note this is a lane rather than the whole annotations row, which is as tall
   * as the lanes its annotations packed into — see `maxAnnotationLanes`.
   *
   * Deliberately slim. A block row carries an interval and, when it fits, a
   * name; it is not a plot and gains nothing from height, where the features
   * rows below it are measurements whose shape needs room. Raise it if the
   * on-block gene names need to be larger — the label font is 10–11 px, so
   * below about 14 they stop fitting and blocks draw unlabelled.
   * @default 16
   */
  blockRowHeight?: number;
  /**
   * Cap on how many lanes the annotations row may use, one block deep each.
   *
   * Annotations overlap — divergent gene pairs, overlapping ORFs, a tRNA inside
   * a CDS — so the row packs them into lanes instead of drawing them on top of
   * one another. It uses as many as the window needs and no more, so a window
   * without overlaps is a single row exactly as before; this is the ceiling,
   * for the same reason `maxFeatureRows` has one. Overlap depth is bounded by
   * biology rather than by the request, though, so the default is generous
   * enough that a real gene-level payload does not reach it.
   *
   * Blocks that do not fit are left undrawn rather than stacked into the last
   * lane, and stay listed in the accessible table. Reaching this cap is worth
   * knowing about: it means the plot is not showing everything.
   * @default 4
   */
  maxAnnotationLanes?: number;
  /**
   * Height of one feature's bars in the features row, in px, not counting the
   * space above them that the feature's name occupies.
   * @default 24
   */
  featureRowHeight?: number;
  /**
   * How many traces the features row draws, `pinned` first and then `features`
   * in the payload's own rank order.
   *
   * A cap rather than "all of them" because the row's height is unbounded in
   * the data: the segment-features endpoint will return up to 128 features for
   * a segment, which at this row height is three thousand pixels of track. The
   * caller that fetched them chose how many to ask for; this is how it says how
   * many to show.
   * @default 8
   */
  maxFeatureRows?: number;
  /**
   * Draw each section's name on a line above its rows.
   *
   * Above the row rather than in a left-hand gutter, so a name has the plot's
   * full width instead of a fixed column that the axis could use and that
   * truncates the longer names anyway. The trade is vertical: each section
   * costs a line.
   *
   * False for the compact variant, where a comparison card has room for
   * neither the line nor the names.
   * @default true
   */
  showRowLabels?: boolean;
  /**
   * Comfortable is the standalone view; compact is the in-card variant used by
   * a comparison row, which tightens every row and drops the labels and
   * captions.
   * @default "comfortable"
   */
  density?: "comfortable" | "compact";
  /** Render the skeleton instead of the data. */
  loading?: boolean;
  /**
   * A fetch is in flight for data the track is already showing something for.
   *
   * Distinct from `loading`, and the distinction is the whole point: `loading`
   * replaces the plot with a skeleton, which is right for a first load and
   * wrong for every subsequent one. A shell that re-fetches a finer stride on
   * zoom would otherwise blank the plot on every wheel notch. This keeps the
   * last good data drawn and marks the track as busy, so the picture degrades
   * to "slightly stale" rather than to "gone".
   *
   * The header keeps reporting the resolution of the data actually on screen
   * while this is set. Showing the pending stride would be a claim about
   * precision the plot does not yet have.
   * @default false
   */
  refreshing?: boolean;
  /** Render a typed error state instead of the data. */
  error?: TrackError | null;
  /**
   * Disable wheel-zoom and drag-pan. The track still reports selection, and the
   * keyboard controls still work — this only turns off pointer navigation, for
   * a card that should not capture scroll.
   * @default false
   */
  disableNavigation?: boolean;
}
