import { HTMLAttributes } from "react";

/**
 * Wire types for `GenomeTrack`.
 *
 * The payload types below use `snake_case` keys, unlike the component's props.
 * That is deliberate rather than an oversight: these mirror Pydantic models
 * served by an MCP tool, and are generated from that JSON Schema. Camel-casing
 * at the boundary would mean a payload could not be diffed against a server
 * fixture without translating it first, which is exactly the kind of
 * translation layer that hides off-by-one bugs in coordinate data.
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

/** A coarse band on the chromosome overview: centromere, assembly gap, etc. */
export interface OverviewBand {
  start: number;
  end: number;
  kind: string;
  label: string;
}

/**
 * Chromosome-scale context for the minimap row.
 *
 * This is the only part of the payload keyed to the chromosome rather than the
 * window, so a shell fetches it once per accession and reuses it across window
 * re-fetches.
 */
export interface MinimapOverview {
  chrom: string;
  chrom_length: number;
  /**
   * Fixed bin count regardless of chromosome size, so the stride is ~40 kb for
   * a bacterial genome and ~200 kb for a human chromosome. A shape to aim at,
   * never a value to read.
   */
  bins: BinAxis;
  /** Max-pooled across the top features: "where is anything happening". */
  values: number[];
  /** Empty when the organism has no coarse bands. */
  bands: OverviewBand[];
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
   * Null (not `[]`) means this organism has no annotation coverage at all —
   * "nobody looked", which is different from "nothing here".
   */
  annotations: AnnotationBlock[] | null;
  segments: SegmentBlock[];
  features: FeatureTrace[];
  pinned: FeatureTrace[];
  clusters?: ClusterTrace[];
  /** Keyed by `String(feature_id)`. */
  feature_notes: Record<string, FeatureNote>;
  caps: TrackCaps;
}

/**
 * Rows the track can draw, in the order they are listed on the `tracks` prop.
 *
 * "minimap" and "features" are declared here but not yet implemented; passing
 * them is accepted and renders nothing, so a caller written against the final
 * API keeps working as those rows land.
 */
export type TrackKind =
  | "activation"
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
   * @default ["annotations", "segments", "activation"]
   */
  tracks?: TrackKind[];
  /**
   * Visible range. Controlled when supplied — pan and zoom then report through
   * `onViewportChange` and change nothing until the prop comes back. Omit for
   * uncontrolled, where the component owns the range and starts at the
   * payload's full window.
   */
  viewport?: GenomeViewport;
  /** Called on pan and zoom. A shell typically re-fetches from this. */
  onViewportChange?: (viewport: GenomeViewport) => void;
  /** Controlled selection. */
  selection?: GenomeSelection | null;
  onSelectionChange?: (selection: GenomeSelection | null) => void;
  /**
   * Row height for annotation and segment rows, in px. The ruler and activation
   * rows size themselves.
   * @default 28
   */
  blockRowHeight?: number;
  /**
   * Height of the activation trace row, in px.
   * @default 64
   */
  activationRowHeight?: number;
  /**
   * Width reserved for row labels down the left edge. Zero hides them, which is
   * what the compact variant does.
   * @default 96
   */
  labelWidth?: number;
  /**
   * Comfortable is the standalone view; compact is the in-card variant used by
   * a comparison row, which tightens every row and drops the ruler labels.
   * @default "comfortable"
   */
  density?: "comfortable" | "compact";
  /** Render the skeleton instead of the data. */
  loading?: boolean;
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
