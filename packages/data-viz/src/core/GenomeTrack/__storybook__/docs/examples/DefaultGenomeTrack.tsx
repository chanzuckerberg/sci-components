// One window of a genome, drawn as three stacked rows over a shared bp axis:
// reference annotations, predicted segments, and the activation trace.
//
// The payload below is written out by hand so the example stands alone. A real
// one comes from a tool call and keeps the server's `snake_case` keys, which is
// why the data shape reads differently from the props around it.
//
// Drag to pan, scroll to zoom, hover a block for its tooltip.

import {
  AnnotationBlock,
  FeatureTrace,
  GenomeTrack,
  GenomeTrackData,
  SegmentBlock,
} from "@czi-sds/data-viz";

// A 289 bp window on the E. coli K-12 chromosome. Every coordinate in the
// payload is 1-based and inclusive, the way a GFF writes them.
const START = 45462;
const END = 45750;
const SPAN = END - START + 1;

// Reference genes. These deliberately do not tile the window: annotation
// coverage is patchy, and the gaps between blocks are intergenic space.
const ANNOTATIONS: AnnotationBlock[] = [
  {
    end: 45551,
    id: "ann_0",
    kind: "CDS",
    locus_tag: "b1000",
    name: "fixX",
    product: "Putative ferredoxin",
    start: 45474,
    strand: "+",
  },
  {
    end: 45660,
    id: "ann_1",
    kind: "CDS",
    locus_tag: "b1007",
    name: "yhbW",
    product: "Hypothetical protein",
    start: 45580,
    strand: "-",
  },
  {
    end: 45744,
    id: "ann_2",
    kind: "CDS",
    locus_tag: "b1014",
    name: "mreB",
    product: "ABC transporter permease",
    start: 45688,
    strand: "+",
  },
];

// Segments from the segmentation pipeline. Unlike annotations these tile the
// window exhaustively — they abut, never overlap, and leave no gaps. Strand is
// always "." because the signal they come from is unstranded.
const SEGMENTS: SegmentBlock[] = [
  {
    category: "+CDS",
    end: 45540,
    id: "mock-sae:e_coli_k12:NC_000913.3:seg_00076",
    pct_of_segment: 0.62,
    predicted_label: "Putative ferredoxin",
    predicted_support: 0.81,
    predicted_top: "fixX",
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
    end: 45676,
    id: "mock-sae:e_coli_k12:NC_000913.3:seg_00078",
    pct_of_segment: 0.71,
    predicted_label: "Outer membrane channel",
    predicted_support: 0.64,
    predicted_top: "tolC",
    start: 45608,
    strand: ".",
  },
  {
    category: "+CDS",
    end: 45750,
    id: "mock-sae:e_coli_k12:NC_000913.3:seg_00079",
    pct_of_segment: 0.58,
    predicted_label: "ABC transporter permease",
    predicted_support: 0.72,
    predicted_top: "mreB",
    start: 45677,
    strand: ".",
  },
];

// One activation value per base, high inside the ranges the feature fires in
// and near zero elsewhere. The server sends these already max-pooled onto
// `bins`; the arithmetic here only stands in for that.
function trace(homes: number[][]): number[] {
  return Array.from({ length: SPAN }, (_, index) => {
    const bp = START + index;
    const firing = homes.some(([from, to]) => bp >= from && bp <= to);

    return Number(
      (firing
        ? 0.55 + 0.4 * Math.abs(Math.sin(index / 9))
        : 0.06 * Math.abs(Math.sin(index / 4))
      ).toFixed(3)
    );
  });
}

const VALUES = trace([
  [45462, 45540],
  [45677, 45750],
]);

// Traces are listed highest-scoring first; the activation row draws the first.
const FEATURES: FeatureTrace[] = [
  {
    feature_id: 13492,
    // Fraction of the segment's bases where this feature is active. Defined
    // against the segment, not the window, so it survives pan and zoom.
    pct_of_segment: 0.78,
    peak: Math.max(...VALUES),
    score: 4.21,
    score_kind: "zscore",
    values: VALUES,
  },
];

const DATA: GenomeTrackData = {
  annotations: ANNOTATIONS,
  // `stride: 1` means unpooled: one value per base. A wider window comes back
  // with a larger stride and correspondingly fewer values.
  bins: { end: END, n_bins: SPAN, start: START, stride: 1 },
  caps: {
    available_features: 22,
    described_features: 1600,
    features_truncated: true,
    labelled_clusters: 4,
    max_points: 2000,
    max_sequence_window: 30000,
    overview_available: false,
    requested_top_n: 1,
  },
  // Keyed by `String(feature_id)`. Most features have no entry: the knowledge
  // base describes roughly one in twenty.
  feature_notes: {
    "13492": {
      cluster: 0,
      cluster_label: "Transport and permeability",
      cluster_size: 214,
      confidence: 0.82,
      description: "ATP-binding cassette (ABC) transporter",
      feature_id: 13492,
      label: "ATP-binding cassette (ABC) transporter",
    },
  },
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
  return <GenomeTrack data={DATA} />;
}

export default App;
