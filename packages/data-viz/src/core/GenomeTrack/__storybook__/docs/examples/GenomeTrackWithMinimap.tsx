// The minimap: the whole chromosome as a bar, with the loaded window outlined
// and the visible range banded inside it.
//
// Three ranges, and telling them apart is the point of the row. The bar is the
// chromosome, with its pooled activation summary inside it. The outline is the
// 289 bp this payload actually holds — a hair's width of 4.6 Mb. The filled
// band is the viewport, which opens on a 60 bp slice of that.
//
// Zoom out and the band leaves the loaded window, so a shell can re-fetch a
// wider one instead of the user hitting a wall. It stops at the window plus
// `navigationMargin` times its span, though — unbounded, the loaded slice would
// compress into a few pixels of empty plot. The coordinates with no data are
// washed out and ruled at the boundary rather than drawn empty, and the header
// names the loaded range alongside the visible one.
//
// The ticks beneath the bar are the chromosome's coordinates, not the
// viewport's — the band needs something fixed to be positioned against, and the
// header already states where you are.

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
const CHROM_LENGTH = 4641652;

// A thousand bins across the chromosome, which is the shape the real endpoint
// returns regardless of how long the chromosome is. Generated rather than
// inlined for the obvious reason; a real payload carries the numbers.
const OVERVIEW_BINS = 1000;
const OVERVIEW_VALUES = Array.from({ length: OVERVIEW_BINS }, (_, index) => {
  const position = index / OVERVIEW_BINS;
  // A few dense regions over a quiet floor, including one on this window, so
  // the band lands somewhere the eye has a reason to look.
  const humps = [START / CHROM_LENGTH, 0.28, 0.42, 0.71, 0.88];
  const signal = humps.reduce(
    (total, center) => total + Math.exp(-(((position - center) / 0.015) ** 2)),
    0
  );

  return Number(Math.min(signal, 1).toFixed(3));
});

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
    // True alongside a non-null `overview` means "here it is". True alongside a
    // null one would mean "unchanged, you already have it", which is what a
    // window re-fetch sends — the component keeps the last one rather than
    // dropping the minimap.
    overview_available: true,
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
    genome_length: CHROM_LENGTH,
    organism: "e_coli_k12",
    organism_label: "E. coli K-12",
    start: START,
  },
  // `chrom_length` here is what the minimap spans and what bounds navigation.
  // Note it is not taken from `locus.genome_length`: for any organism with more
  // than one chromosome those differ, and using the genome length would draw
  // the window in the wrong place on a bar of the wrong size.
  overview: {
    bands: [
      { end: 23208, kind: "origin", label: "oriC", start: 1 },
      { end: 2459875, kind: "terminus", label: "ter", start: 2367243 },
    ],
    bins: {
      end: CHROM_LENGTH,
      n_bins: OVERVIEW_BINS,
      start: 1,
      stride: Math.ceil(CHROM_LENGTH / OVERVIEW_BINS),
    },
    chrom: "NC_000913.3",
    chrom_length: CHROM_LENGTH,
    values: OVERVIEW_VALUES,
  },
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
