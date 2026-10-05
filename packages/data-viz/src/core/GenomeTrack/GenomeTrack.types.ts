import { HTMLAttributes } from "react";

/**
 * Wire types for `GenomeTrack`.
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
  /** Nearest neighbor's product, when one was resolved. */
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
 * **Only `chrom_length` is read.** That one number is what widens the minimap
 * from the payload's window to the whole chromosome, and what bounds
 * navigation.
 */
export interface MinimapOverview {
  chrom: string;
  chrom_length: number;
  bins: BinAxis;
}

/**
 * One feature's activation across the whole chromosome, for the minimap.
 */
export interface FeatureOverview {
  feature_id: number;
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
 */
export type GenomeSelection =
  | { kind: "block"; id: string }
  | { kind: "range"; end: number; start: number }
  | { kind: "row"; id: string }
  | { kind: "series"; id: string };

/** A typed tool error, rendered as a first-class state rather than a toast. */
export interface TrackError {
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
   */
  viewport?: GenomeViewport;
  /**
   * How far outside the loaded window pan and zoom may go, as a multiple of
   * that window's span. Zero pins the viewport to the payload.
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
   * @default 16
   */
  blockRowHeight?: number;
  /**
   * Cap on how many lanes the annotations row may use, one block deep each.
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
   * @default 8
   */
  maxFeatureRows?: number;
  /**
   * Draw each section's name on a line above its rows.
   * @default true
   */
  showRowLabels?: boolean;
  /**
   * Comfortable is the standalone view; compact tightens every row and drops
   * the labels and captions.
   * @default "comfortable"
   */
  density?: "comfortable" | "compact";
  /** Render the skeleton instead of the data. */
  loading?: boolean;
  /**
   * A fetch is in flight for data the track is already showing something for.
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
