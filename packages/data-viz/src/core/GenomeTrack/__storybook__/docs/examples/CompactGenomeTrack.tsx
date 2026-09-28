// The compact variant, as a comparison row would use it: two loci side by
// side, each in its own card.
//
// Four props do the work. `density="compact"` tightens every row and drops the
// captions and tick labels, `showRowLabels={false}` drops the section names,
// `blockRowHeight` shrinks the blocks, and `disableNavigation` keeps a card
// from swallowing the page's scroll. Selection and the keyboard controls still
// work with navigation off — only wheel-zoom and drag-pan are turned off.

import {
  AnnotationBlock,
  GenomeTrack,
  GenomeTrackData,
  SegmentBlock,
} from "@czi-sds/data-viz";
import { CSSProperties } from "react";

/** Two windows built from the same shape, so the cards are comparable. */
function buildWindow(options: {
  accession: string;
  gene: string;
  organismLabel: string;
  organism: string;
  start: number;
}): GenomeTrackData {
  const { accession, gene, organism, organismLabel, start } = options;
  const end = start + 288;
  const span = end - start + 1;

  const annotations: AnnotationBlock[] = [
    {
      end: start + 89,
      id: `${gene}_ann_0`,
      kind: "CDS",
      name: gene,
      product: "Putative ferredoxin",
      start: start + 12,
      strand: "+",
    },
    {
      end: start + 198,
      id: `${gene}_ann_1`,
      kind: "CDS",
      name: "yhbW",
      product: "Hypothetical protein",
      start: start + 118,
      strand: "-",
    },
  ];

  // Segments tile the window, as the pipeline emits them.
  const segments: SegmentBlock[] = [
    {
      category: "+CDS",
      end: start + 108,
      id: `${accession}:seg_00076`,
      pct_of_segment: 0.62,
      predicted_label: "Putative ferredoxin",
      predicted_support: 0.81,
      start,
      strand: ".",
    },
    {
      category: "intergenic",
      end: start + 176,
      id: `${accession}:seg_00077`,
      pct_of_segment: 0.44,
      predicted_label: null,
      predicted_support: 0.37,
      start: start + 109,
      strand: ".",
    },
    {
      category: "-CDS",
      end,
      id: `${accession}:seg_00078`,
      pct_of_segment: 0.71,
      predicted_label: "Outer membrane channel",
      predicted_support: 0.64,
      start: start + 177,
      strand: ".",
    },
  ];

  const values = Array.from({ length: span }, (_, index) =>
    Number((0.15 + 0.7 * Math.abs(Math.sin(index / 14))).toFixed(3))
  );

  return {
    annotations,
    bins: { end, n_bins: span, start, stride: 1 },
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
    features: [
      {
        feature_id: 13492,
        pct_of_segment: 0.78,
        peak: Math.max(...values),
        score: 4.21,
        score_kind: "zscore",
        values,
      },
    ],
    locus: {
      accession,
      chrom: accession,
      end,
      gene,
      genome_length: 4641652,
      organism,
      organism_label: organismLabel,
      start,
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
    segments,
    sequence: null,
  };
}

const LEFT = buildWindow({
  accession: "NC_000913.3",
  gene: "fixX",
  organism: "e_coli_k12",
  organismLabel: "E. coli K-12",
  start: 45462,
});

const RIGHT = buildWindow({
  accession: "NC_002695.2",
  gene: "narL",
  organism: "e_coli_o157",
  organismLabel: "E. coli O157:H7",
  start: 128940,
});

const CARD: CSSProperties = {
  border: "1px solid rgb(0 0 0 / 12%)",
  borderRadius: 4,
  padding: 12,
};

function App() {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      }}
    >
      {[LEFT, RIGHT].map((data) => (
        <div key={data.locus.accession} style={CARD}>
          <GenomeTrack
            blockRowHeight={12}
            data={data}
            density="compact"
            disableNavigation
            showRowLabels={false}
            // The payload carries an activation trace as well; which rows to
            // draw is a display choice, so the cards leave it out.
            tracks={["annotations", "segments"]}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
