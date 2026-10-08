// Selection is controlled, and domain-free: clicking a block emits
// `{ kind: "block", id }` and nothing else. The id is one the caller already
// holds — an annotation's `id` or a segment's namespaced `segment_id` — so the
// track never has to know what a selection means. Resolving it back to a
// record, and deciding what to show, is the shell's job.
//
// Clicking the selected block again, or clicking empty space, emits `null`,
// which is what lets a detail panel be closed from the plot.

import {
  AnnotationBlock,
  FeatureTrace,
  GenomeSelection,
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
    kind: "tRNA",
    locus_tag: "b1014",
    name: "argW",
    product: "tRNA-Arg",
    start: 45688,
    strand: "+",
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

const VALUES = Array.from({ length: SPAN }, (_, index) => {
  const bp = START + index;
  const firing = bp <= 45540 || bp >= 45677;

  return Number(
    (firing
      ? 0.55 + 0.4 * Math.abs(Math.sin(index / 9))
      : 0.06 * Math.abs(Math.sin(index / 4))
    ).toFixed(3)
  );
});

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
  sequence: null,
};

/** Resolve a selection back to something worth showing. */
function describe(selection: GenomeSelection | null): string {
  if (selection?.kind !== "block") return "Nothing selected";

  const annotation = ANNOTATIONS.find((block) => block.id === selection.id);
  if (annotation) {
    return `${annotation.name} · ${annotation.kind} ${annotation.start}–${annotation.end} (${annotation.strand}) · ${annotation.product}`;
  }

  const segment = SEGMENTS.find((block) => block.id === selection.id);
  if (segment) {
    return `${segment.category} ${segment.start}–${segment.end} · ${
      segment.predicted_label ?? "Unlabelled"
    } at ${Math.round(segment.predicted_support * 100)}% support`;
  }

  return selection.id;
}

function App() {
  const [selection, setSelection] = useState<GenomeSelection | null>(null);
  const [viewport, setViewport] = useState<GenomeViewport>({
    end: END,
    start: START,
  });

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <GenomeTrack
        data={DATA}
        onSelectionChange={setSelection}
        // A shell typically re-fetches from here, asking the tool for the new
        // range. This one only records it, since the whole payload is local.
        onViewportChange={setViewport}
        selection={selection}
        viewport={viewport}
      />
      <div style={{ fontSize: 13, lineHeight: 1.5 }}>
        <div>
          <strong>Selection:</strong> {describe(selection)}
        </div>
        <div>
          <strong>Viewport:</strong> {viewport.start}–{viewport.end} (
          {viewport.end - viewport.start + 1} bp)
        </div>
      </div>
    </div>
  );
}

export default App;
