// The features row: one labelled row per trace, each a bar per bin.
//
// Two of the four features below carry a description and two do not, which is
// the coverage the knowledge base actually has. The undescribed rows fall back
// to "Feature 13492" — the common case, not an edge case, and the reason the
// row reserves the same space either way.
//
// Bar heights are normalized per trace, so every row uses its full height and a
// weak feature stays legible. The cost is that heights cannot be compared
// between rows; hover a bar for the absolute value.

import {
  FeatureNote,
  FeatureTrace,
  GenomeTrack,
  GenomeTrackData,
  SegmentBlock,
} from "@czi-sds/data-viz";

const START = 45462;
const END = 45750;
const SPAN = END - START + 1;

const SEGMENTS: SegmentBlock[] = [
  {
    category: "+CDS",
    end: 45540,
    id: "mock-sae:e_coli_k12:NC_000913.3:seg_00076",
    pct_of_segment: 0.62,
    predicted_label: "Putative ferredoxin",
    predicted_support: 0.81,
    start: 45462,
    strand: ".",
  },
  {
    category: "intergenic",
    end: 45607,
    id: "mock-sae:e_coli_k12:NC_000913.3:seg_00077",
    pct_of_segment: 0.44,
    predicted_label: null,
    predicted_support: 0.37,
    start: 45541,
    strand: ".",
  },
  {
    category: "-CDS",
    end: 45750,
    id: "mock-sae:e_coli_k12:NC_000913.3:seg_00078",
    pct_of_segment: 0.71,
    predicted_label: "Outer membrane channel",
    predicted_support: 0.64,
    start: 45608,
    strand: ".",
  },
];

/**
 * A feature that fires inside the ranges it favours and is silent elsewhere.
 * Real values arrive max-pooled from the server; this stands in for them.
 */
function trace(
  featureId: number,
  score: number,
  homes: number[][]
): FeatureTrace {
  const values = Array.from({ length: SPAN }, (_, index) => {
    const bp = START + index;
    const firing = homes.some(([from, to]) => bp >= from && bp <= to);

    // Silent bins are exactly zero, not a small number: the row draws no bar
    // for a zero, and a floor would make silence look like faint signal.
    return firing
      ? Number((0.35 + 0.6 * Math.abs(Math.sin(index / 6))).toFixed(3))
      : 0;
  });

  return {
    feature_id: featureId,
    pct_of_segment: 0.78,
    peak: Math.max(...values),
    score,
    score_kind: "zscore",
    values,
  };
}

// Highest-scoring first. The track draws them in this order and never re-sorts.
const FEATURES: FeatureTrace[] = [
  trace(13492, 4.21, [
    [45462, 45540],
    [45700, 45750],
  ]),
  trace(12305, 3.84, [[45541, 45607]]),
  trace(9932, 2.97, [
    [45608, 45676],
    [45462, 45490],
  ]),
  trace(4118, 1.62, [[45677, 45750]]),
];

/**
 * Descriptions for two of the four. Keyed by `String(feature_id)`, and absent
 * for the rest — the endpoint that ranks a segment's features returns
 * `description: null` until the knowledge-base pipeline has run against that
 * checkpoint, so most rows look like the bare ones here.
 */
const FEATURE_NOTES: Record<string, FeatureNote> = {
  "12305": {
    cluster: 1,
    cluster_label: "DNA binding",
    cluster_size: 96,
    confidence: 0.71,
    description: "AT-rich intergenic regulatory regions",
    feature_id: 12305,
    label: "AT-rich intergenic regulatory regions",
  },
  "13492": {
    cluster: 0,
    cluster_label: "Transport and permeability",
    cluster_size: 214,
    confidence: 0.82,
    description: "ATP-binding cassette (ABC) transporter",
    feature_id: 13492,
    label: "ATP-binding cassette (ABC) transporter",
  },
};

const DATA: GenomeTrackData = {
  annotations: [
    {
      end: 45551,
      id: "ann_0",
      kind: "CDS",
      name: "fixX",
      product: "Putative ferredoxin",
      start: 45474,
      strand: "+",
    },
  ],
  bins: { end: END, n_bins: SPAN, start: START, stride: 1 },
  caps: {
    available_features: 22,
    described_features: 1600,
    features_truncated: true,
    labelled_clusters: 4,
    max_points: 2000,
    max_sequence_window: 30000,
    overview_available: false,
    requested_top_n: 4,
  },
  feature_notes: FEATURE_NOTES,
  features: FEATURES,
  locus: {
    accession: "NC_000913.3",
    chrom: "NC_000913.3",
    end: END,
    gene: "fixX",
    genome_length: 4641652,
    organism: "e_coli_k12",
    organism_label: "E. coli K-12",
    start: START,
  },
  overview: null,
  pinned: [],
  sae: {
    base_model: "esm2-t33-650M",
    n_features: 30720,
    sae: "esmgsedd-mvp",
    segmentation_threshold: 0.35,
  },
  schema_version: 1,
  segments: SEGMENTS,
  sequence: null,
};

function App() {
  return (
    <GenomeTrack data={DATA} tracks={["annotations", "segments", "features"]} />
  );
}

export default App;
