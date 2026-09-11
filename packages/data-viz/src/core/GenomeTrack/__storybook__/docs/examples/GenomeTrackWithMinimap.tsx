// The minimap: the payload's whole window as a bar, with a box marking the
// visible range inside it.
//
// This example opens on a 60 bp slice of a 289 bp window, so the box starts
// narrow. Scroll to zoom out and it widens to fill the bar; pan and it slides.
// The ticks beneath the bar are the window's coordinates, not the viewport's —
// the band needs something fixed to be positioned against, and the header
// already states where you are.

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

const ANNOTATIONS: AnnotationBlock[] = [
  {
    end: 45551,
    id: "ann_0",
    kind: "CDS",
    name: "fixX",
    product: "Putative ferredoxin",
    start: 45474,
    strand: "+",
  },
  {
    end: 45660,
    id: "ann_1",
    kind: "CDS",
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

function trace(featureId: number, score: number, homes: number[][]) {
  const values = Array.from({ length: SPAN }, (_, index) => {
    const bp = START + index;
    const firing = homes.some(([from, to]) => bp >= from && bp <= to);

    return firing
      ? Number((0.35 + 0.6 * Math.abs(Math.sin(index / 6))).toFixed(3))
      : 0;
  });

  return {
    feature_id: featureId,
    pct_of_segment: 0.78,
    peak: Math.max(...values),
    score,
    score_kind: "zscore" as const,
    values,
  };
}

const FEATURES: FeatureTrace[] = [
  trace(13492, 4.21, [
    [45462, 45540],
    [45700, 45750],
  ]),
  trace(12305, 3.84, [[45541, 45607]]),
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
    // The minimap does not read this. It reports whether the deployment could
    // produce the chromosome-scale summary, which is a different row.
    overview_available: false,
    requested_top_n: 2,
  },
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
  // Null, and the minimap still draws: its extent comes from `locus`.
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
  const [viewport, setViewport] = useState<GenomeViewport>({
    end: 45560,
    start: 45500,
  });

  return (
    <GenomeTrack
      data={DATA}
      onViewportChange={setViewport}
      tracks={["minimap", "annotations", "segments", "features"]}
      viewport={viewport}
    />
  );
}

export default App;
