import {
  GenomeSelection,
  GenomeTrack,
  GenomeTrackData,
  GenomeTrackProps,
  GenomeViewport,
  TrackKind,
} from "@czi-sds/data-viz";
import React from "react";

/**
 * Namespace check: every type a consumer needs has to be reachable from the
 * package root, not just from a deep path inside it.
 *
 * This file is typechecked, never run. It fails the build if the public surface
 * stops being usable the way a consumer would use it — which is not something
 * the component's own tests can catch, since they import by relative path.
 */

const DATA: GenomeTrackData = {
  annotations: [
    {
      end: 45_600,
      id: "ann_0",
      kind: "CDS",
      locus_tag: "b1000",
      name: "fixX",
      product: "Putative ferredoxin FixX",
      start: 45_500,
      strand: "+",
    },
  ],
  bins: { end: 45_750, n_bins: 289, start: 45_462, stride: 1 },
  caps: {
    available_features: 22,
    described_features: 1_600,
    features_truncated: true,
    labelled_clusters: 4,
    max_points: 2_000,
    max_sequence_window: 30_000,
    overview_available: false,
    requested_top_n: 8,
  },
  feature_notes: {
    "13492": {
      cluster: 1,
      cluster_label: "Transport and permeability",
      cluster_size: 214,
      confidence: 0.82,
      description: "ATP-binding cassette (ABC) transporter",
      feature_id: 13_492,
      label: "ABC transporter",
    },
  },
  features: [
    {
      feature_id: 13_492,
      pct_of_segment: 0.84,
      peak: 0.819,
      score: 1.42,
      score_kind: "zscore",
      values: new Array(289).fill(0.1),
    },
  ],
  locus: {
    accession: "NC_000913.3",
    chrom: "NC_000913.3",
    end: 45_750,
    gene: "fixX",
    genome_length: 4_641_652,
    organism: "e_coli_k12",
    organism_label: "E. coli K-12",
    start: 45_462,
  },
  overview: null,
  pinned: [],
  sae: {
    base_model: "esm4-glm-alpha-prok",
    n_features: 30_720,
    sae: "esmgsedd-mvp",
    segmentation_threshold: 0.35,
  },
  schema_version: 1,
  segments: [
    {
      category: "+CDS",
      end: 45_560,
      id: "esmgsedd-mvp:e_coli_k12:NC_000913.3:seg_00076",
      pct_of_segment: 0.84,
      predicted_label: "Putative ferredoxin",
      predicted_support: 0.71,
      predicted_top: "fixX",
      start: 45_462,
      strand: ".",
    },
  ],
  sequence: null,
};

const GenomeTrackNameSpaceTest = (props: GenomeTrackProps) => {
  const viewport: GenomeViewport = { end: 45_750, start: 45_462 };
  const selection: GenomeSelection = { id: "ann_0", kind: "block" };
  const tracks: TrackKind[] = ["annotations", "segments", "activation"];

  return (
    <>
      {/* Minimal usage */}
      <GenomeTrack data={DATA} />

      {/* Controlled viewport and selection, as a shell would drive it */}
      <GenomeTrack
        data={DATA}
        onSelectionChange={(next) => console.log(next)}
        onViewportChange={(next) => console.log(next.start, next.end)}
        selection={selection}
        tracks={tracks}
        viewport={viewport}
      />

      {/* Every row kind, including the ones not yet implemented */}
      <GenomeTrack
        data={DATA}
        tracks={[
          "minimap",
          "sequence",
          "annotations",
          "segments",
          "activation",
          "features",
        ]}
      />

      {/* The compact in-card variant */}
      <GenomeTrack
        activationRowHeight={32}
        blockRowHeight={16}
        data={DATA}
        density="compact"
        disableNavigation
        labelWidth={0}
        tracks={["annotations", "segments"]}
      />

      {/* States */}
      <GenomeTrack data={null} loading />
      <GenomeTrack
        data={null}
        error={{ code: "not_found", message: "Region not precomputed." }}
      />
      <GenomeTrack data={null} />

      {/* Spread-through of the underlying div props */}
      <GenomeTrack {...props} className="custom" data={DATA} id="track" />
    </>
  );
};
