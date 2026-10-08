// The sequence ruler, added by listing "sequence" first in `tracks`.
//
// Letters are only drawn once bases are about 7 px wide. Below that the row
// falls back to a solid band rather than an unreadable smear, so this example
// opens on a 61 bp slice of the payload's 289 bp window. Zoom out and the band
// takes over; zoom back in and the letters return.

import {
  AnnotationBlock,
  FeatureTrace,
  GenomeTrack,
  GenomeTrackData,
  GenomeViewport,
  SegmentBlock,
} from "@czi-sds/data-viz";
import { useState } from "react";

const START = 45462;
const END = 45750;
const SPAN = END - START + 1;

// Stand-in nucleotides. A real payload carries the window's actual sequence,
// 5' to 3', with one character per base — and `null` instead once the window is
// wider than `caps.max_sequence_window`, which is why the row can disappear.
const SEQUENCE = Array.from(
  { length: SPAN },
  (_, index) => "ACGT"[(index * 7 + (index % 5)) % 4]
).join("");

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
];

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
    end: 45750,
    id: "mock-sae:e_coli_k12:NC_000913.3:seg_00078",
    pct_of_segment: 0.71,
    predicted_label: "Outer membrane channel",
    predicted_support: 0.64,
    predicted_top: "tolC",
    start: 45608,
    strand: ".",
  },
];

const VALUES = Array.from({ length: SPAN }, (_, index) =>
  Number((0.2 + 0.6 * Math.abs(Math.sin(index / 12))).toFixed(3))
);

const FEATURES: FeatureTrace[] = [
  {
    feature_id: 13492,
    pct_of_segment: 0.78,
    peak: Math.max(...VALUES),
    score: 4.21,
    score_kind: "zscore",
    values: VALUES,
  },
];

const DATA: GenomeTrackData = {
  annotations: ANNOTATIONS,
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
  feature_notes: {},
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
  sequence: SEQUENCE,
};

function App() {
  // Supplying `viewport` makes the range controlled: pan and zoom report
  // through `onViewportChange` and change nothing until the prop comes back.
  const [viewport, setViewport] = useState<GenomeViewport>({
    end: 45560,
    start: 45500,
  });

  return (
    <GenomeTrack
      data={DATA}
      onViewportChange={setViewport}
      tracks={["sequence", "annotations", "segments", "features"]}
      viewport={viewport}
    />
  );
}

export default App;
