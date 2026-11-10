import { HTMLAttributes } from "react";

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
  /** Display form of `organism`, e.g. "E. coli K-12". */
  organism_label?: string;
  accession: string;
  chrom: string;
  start: number;
  end: number;
  genome_length: number;
  gene?: string;
}

/**
 * Maps trace index to genomic coordinates. Index `i` of every `values` array
 * covers `[start + i * stride, min(end, start + (i + 1) * stride - 1)]`, and
 * long windows are max-pooled.
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

/** An interval cut from the activation signal, with its predicted category. */
export interface SegmentBlock {
  /** Namespaced segment id; pass it back to the server unchanged. */
  id: string;
  start: number;
  end: number;
  strand: "+" | "-" | ".";
  /** +CDS | -CDS | intergenic | SINE | unknown | ... */
  category: string;
  predicted_label: string | null;
  /** kNN vote share, 0-1. Null when no vote was cast for this segment. */
  predicted_support: number | null;
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
   * Null when the window is not segment-aligned.
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

/** Chromosome-scale context for the minimap. Only `chrom_length` is read. */
export interface MinimapOverview {
  chrom: string;
  chrom_length: number;
  bins: BinAxis;
}

/** One feature's activation across the whole chromosome, for the minimap. */
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
  /** Whether this organism can produce a minimap at all. */
  overview_available: boolean;
}

/** Everything one track window needs. */
export interface GenomeTrackData {
  schema_version: 1;
  sae: ModelRef;
  locus: Locus;
  /**
   * Window nucleotides, 5' to 3'. Null when the window exceeds
   * `caps.max_sequence_window` or the sequence is unavailable.
   */
  sequence: string | null;
  bins: BinAxis;
  /**
   * Null when no minimap is available or the caller already has one;
   * `caps.overview_available` tells the two apart.
   */
  overview: MinimapOverview | null;
  /** Chromosome-wide activation for the currently selected feature. */
  feature_overview?: FeatureOverview | null;
  /** Null means no annotation coverage; `[]` means none in this window. */
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

/** How the features are ranked, and what `score` on each trace means. */
export type ActivationRanking = "peak" | "zscore";

/** Rows the track can draw. */
export type TrackKind =
  | "annotations"
  | "features"
  | "minimap"
  | "segments"
  | "sequence";

/** The visible bp range, 1-based inclusive. */
export interface GenomeViewport {
  start: number;
  end: number;
}

export type GenomeSelection =
  | { kind: "block"; id: string }
  | { kind: "range"; end: number; start: number }
  | { kind: "row"; id: string }
  | { kind: "series"; id: string };

/** A typed error, rendered in place of the track. */
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
   * Rows to draw, top to bottom.
   * @default ["minimap", "sequence", "annotations", "segments", "features"]
   */
  tracks?: TrackKind[];
  /**
   * Visible range. When supplied, pan and zoom only report through
   * `onViewportChange`; omit it to start at the payload's full window.
   */
  viewport?: GenomeViewport;
  /**
   * How far past the loaded window pan and zoom may go, as a multiple of its
   * span. Applies only when the payload has an `overview`.
   * @default 1
   */
  navigationMargin?: number;
  /** Called on pan and zoom. */
  onViewportChange?: (viewport: GenomeViewport) => void;
  /**
   * How the features are ranked. The dropdown shows only when
   * `onRankingChange` is supplied.
   * @default "zscore"
   */
  ranking?: ActivationRanking;
  /** Called when the user picks a ranking. */
  onRankingChange?: (ranking: ActivationRanking) => void;
  /** Controlled selection. */
  selection?: GenomeSelection | null;
  onSelectionChange?: (selection: GenomeSelection | null) => void;
  /**
   * Height in px of a segment row or of one annotation lane.
   * @default 16
   */
  blockRowHeight?: number;
  /**
   * Maximum number of annotation lanes. Blocks that do not fit are not drawn
   * but stay in the accessible table.
   * @default 4
   */
  maxAnnotationLanes?: number;
  /**
   * Height in px of one feature's bars, not counting its name above them.
   * @default 24
   */
  featureRowHeight?: number;
  /**
   * How many traces the features row draws, `pinned` first, then `features`.
   * @default 8
   */
  maxFeatureRows?: number;
  /**
   * Draw each section's name on a line above its rows.
   * @default true
   */
  showRowLabels?: boolean;
  /**
   * Compact tightens every row and drops the labels and captions.
   * @default "comfortable"
   */
  density?: "comfortable" | "compact";
  /** Render the skeleton instead of the data. */
  loading?: boolean;
  /**
   * A fetch is in flight while the current data is still shown.
   * @default false
   */
  refreshing?: boolean;
  /** Render a typed error state instead of the data. */
  error?: TrackError | null;
  /**
   * Disable wheel-zoom and drag-pan. Selection and keyboard still work.
   * @default false
   */
  disableNavigation?: boolean;
}
