# GenomeTrack

A genome browser track: one shared base-pair axis with stacked rows for reference annotations, predicted segments, the nucleotide sequence, and sparse autoencoder (SAE) feature activation. The plot is drawn on a single canvas, with the header, row labels, tooltip, and an accessible table kept in the DOM.

The component is presentational and does no I/O. It takes one window of data and reports what the user did to it — pan, zoom, select — leaving the caller to decide whether that means fetching a new window.

> **Ships separately:** GenomeTrack comes from `@czi-sds/data-viz`, not `@czi-sds/components`. See the Data Viz overview for installation and peer dependencies.

## Source Code

The component's source code in the SDS codebase can be found [here](https://github.com/chanzuckerberg/sci-components/blob/main/packages/data-viz/src/core/GenomeTrack/index.tsx).

## Import

**React TypeScript**

```tsx
import { GenomeTrack } from "@czi-sds/data-viz";
```

## Sizing

The track fills the width of its parent and sizes its own height from the rows it was asked to draw, so there is no `width` or `height` prop. Height follows from `tracks`, `blockRowHeight`, `featureRowHeight`, `maxFeatureRows`, and `density`; a container that constrains it will clip rather than scale, since the plot is a canvas.

## The payload

Everything the track draws arrives as a single `GenomeTrackData` object. Its keys are `snake_case`, unlike the component's props, so a payload can be diffed against a server fixture without being translated first. Props are `camelCase`, as everywhere else in the library. Data that crossed the network keeps the server's shape; anything a React caller types by hand follows house style.

Three conventions run through it, and all three are load-bearing.

- **Coordinates are 1-based and inclusive**, as a GFF writes them. A block from `start` to `end` covers both endpoints. Pixel coordinates, where they appear at all, are 0-based and measured from the left edge of the plot area.

- **Long windows are pooled.** `bins.stride` is the number of bases each point of a trace covers, so index `i` of every `values` array describes `[start + i * stride, start + (i + 1) * stride - 1]`, clipped to the window. Pooling is by maximum rather than mean, so a single-base peak survives it. An unpooled window has `stride: 1`.

The header reports the stride whenever it is above 1 — `NC_000913.3 56,928–56,951 · 24 bp · 21 bp/point` — because nothing else on screen can. Zooming a pooled window magnifies its bins rather than sharpening them, so a 24 bp view drawn from 21 bp points looks exactly like one drawn from 24 individual bases. Recovering the detail takes a narrower payload, which is what `viewport` and `onViewportChange` are for: a shell re-fetches, the server returns a smaller `stride`, and the trace sharpens.

- **`null` and `[]` mean different things.** `annotations: null` says this organism has no annotation coverage — nobody looked — where `annotations: []` would say there are no genes in this window. The track drops the row entirely for the first and draws an empty row for the second. `sequence: null` means the window is wider than `caps.max_sequence_window`, or the genome's sequence file was unavailable; the track degrades to the rows it can draw rather than failing.

## Rows

`tracks` is an ordered array of row kinds, drawn top to bottom. An array rather than a set of boolean props, because the order is part of the design and several quite different frames come out of one component that way.

**React TypeScript**

```tsx
<GenomeTrack
  data={data}
  tracks={["minimap", "sequence", "annotations", "segments", "features"]}
/>
```

A row the payload cannot fill is dropped rather than drawn empty, so requesting a row is safe even when the data for it is missing:

- `"sequence"` — one letter per base, drawn only once bases are about 7 px wide. Below that the row falls back to a solid band, which says "there is sequence here, zoom in to read it" where crushed glyphs would suggest the component is broken. Its copy control sits on the section's header line. Dropped when `sequence` is `null`.

- `"annotations"` — reference features from a GFF: genes, tRNAs, and the rest. Stranded blocks point right for `+` and left for `-`, a non-color cue for strand that survives colorblindness and grayscale printing. Dropped when `annotations` is `null`.

Annotations overlap in real data — divergent gene pairs, overlapping ORFs, a tRNA nested inside a CDS — so the row packs them into lanes one block deep rather than drawing them on top of each other. It uses as many lanes as the window needs, up to `maxAnnotationLanes`, so a window without overlaps is a single row. Lane position carries no meaning and is not strand: strand stays on the arrowhead, which does not move when a neighbouring gene changes the packing.

- `"segments"` — the intervals the segmentation pipeline cut from the activation signal, labelled with the category it voted for. Dropped when `segments` is empty.

- `"features"` — the payload's feature traces as a stack, one labelled row each, drawn as a bar per bin. This is the one kind that expands: it becomes as many rows as there are traces, up to `maxFeatureRows`. Dropped when both `features` and `pinned` are empty.

- `"minimap"` — a bar spanning the whole chromosome, with the loaded window outlined and the visible range banded inside it, the range captioned above and tick labels beneath. Always drawable: with no `overview` it falls back to spanning the payload's own window. It is the one row with no section name — the chromosome bar and its own ruler say what it is, so a heading would spend a line of height restating it.

## The minimap

The minimap answers one question — where on this chromosome am I? — by drawing the chromosome as a bar and the visible range as a band inside it. Zoom in and the band narrows; pan and it slides.

It draws two ranges:

- The **chromosome** is the bar, carrying — once a feature is selected — that feature's activation across the whole chromosome from `feature_overview`. With nothing selected the bar carries no signal.

- The **viewport** is the filled band, and the only band the row draws. Translucent, so a signal underneath still reads through it — at chromosome scale the band is a few pixels wide, and an opaque one would delete the only informative pixel in it.

**Click any features row to put that feature on the minimap.** The row emits a `"series"` selection naming the feature, the shell fetches that feature's whole-chromosome activation, and the bar draws it — which is the only way to see where a feature fires outside the loaded window. Clicking the same row again clears it. `featureIdFromSeries` turns the selection id back into a feature id for the fetch.

The bar used to draw a maximum pooled across the top features, from `MinimapOverview.values`. That sounded useful and was not: every bin was a max over eight traces, so almost no bin was quiet and the row read as noise. One feature's trace answers a question someone actually asked. `values` is now optional and unread — producing it is the expensive half of the minimap's data path, and a server that never computes it loses nothing.

The component draws `feature_overview` only when its `feature_id` matches the current selection. The two arrive separately — the selection is immediate, the trace is a fetch — so between a click and its response the payload still holds the previous feature's trace, and drawing that would attribute one feature's activation to another.

The bar spans the chromosome, but pan and zoom do not. They stop at the loaded window plus `navigationMargin` times its span on each side, so the band can travel a little way out of the outline and no further. That is not a hedge: navigation reaching the whole chromosome is unusable without a shell refilling the window behind it, because the viewport outruns its data and the loaded slice compresses into a few pixels. A 20 kb view of a 289 bp payload draws every row in a 25 px column. The margin bounds it, and each re-fetch widens the window and so widens the margin — so the user walks out in steps that are each backed by real data, which is how a genome browser is meant to work. Crossing a megabase is a fetch, not a pan.

The row used to draw two more markers — an outline around the loaded window, and the coarse landmarks in `overview.bands`. Both are gone, for the same reason: at chromosome scale every marker collapses to a three-pixel floor, so all three landed on each other as indistinguishable grey ticks. The loaded range is named in the header and shown by the wash over the plot, which needed no third grey tick to explain it. `overview.values` and `overview.bands` are both optional and unread; only `chrom_length` is read.

`overview` is fixed at a thousand bins regardless of chromosome length, so human chr 1 and _E. coli_ cost the same bytes, and it is fetched once per accession rather than per window. A re-fetch that omits it means "unchanged, you already have it", which `caps.overview_available` distinguishes from "this deployment cannot draw one" — the component retains the last one it saw rather than dropping the minimap on the user's first zoom. Retention is keyed on accession and chromosome and dropped when either changes, since `chrom_length` is also the limit of navigation.

It is the only row not drawn on the shared viewport scale. Every other row maps the visible range across the plot; this one maps the chromosome across the plot and then places the visible range within it. Its tick labels follow that same second scale, and they are the only coordinates drawn inside the plot: the header states the visible range, the bar states what that range sits inside. A minimap labelled with the coordinates it already contains would say nothing.

A deeply zoomed window would be a fraction of a pixel wide, so the band has a three-pixel floor and is held inside the bar at either end — an indicator that vanishes, or slides off the edge, fails exactly when a user is most lost. The band's range is captioned above the bar and centred on it, clamped so a band against either edge does not caption itself off the side.

The caption sits above the band rather than inside it for two reasons. The band shrinks as the user zooms in, so at a deep zoom there is no room for text on it at all; and a caption on the row's own background can use a colour that contrasts in both themes, where text on the band cannot. The band is a neutral fill, which is dark in light mode and light in dark mode, and no `textOnFill` token flips with it.

> **Not yet interactive.** Dragging the minimap does nothing on purpose. Panning the plot is inverted the way dragging a map is, so the same gesture on a minimap would send the window the opposite way to the band under the pointer — worse than no response. Dragging the band, and clicking to jump, mean treating the minimap as its own control rather than part of the plot surface. At chromosome scale that is also the gesture most worth having, since it is the only way to cross a megabase in one movement.

**Example: GenomeTrackWithMinimap**

```tsx
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
```

## The sequence row

One letter per base, and a copy control on the section's header line beside its name. The control is a real button rather than a drawn affordance: it needs a tab stop, a focus ring and an accessible name, none of which a rectangle on a canvas can have. It also lives outside the plot element, which carries `role="img"` and so cannot contain a control.

It opens a menu with two choices rather than copying straight away: **Copy Visible Segment** and **Copy Full Segment**. A single button had to pick one, and either choice is wrong half the time — copying only what is on screen surprises anyone who zoomed in to read a detail and wanted the region, and copying the whole payload surprises anyone who framed a range deliberately. Both items name the range they would copy, so there is nothing to infer: "Copy Visible Segment (45,500–45,600)". The full item is disabled when the payload is already entirely on screen, since two items copying identical text is a choice without a difference.

The band the row draws stops where the sequence does rather than spanning the plot, so a viewport wider than the payload does not imply letters it has none of. The icon becomes a tick for two seconds on success and does not change at all when the clipboard write fails, since a tick for a copy that did not happen is worse than no feedback.

## The features row

One row per trace, `pinned` first and then `features` in the payload's own rank order — the track never re-sorts, because the server ranks and a second opinion derived from `score` would only disagree. `maxFeatureRows` caps how many are drawn.

Bars rather than a filled area, and the difference is not only cosmetic. A filled area implies a continuous signal you can read between the points; a bar per bin says each one is a discrete measurement, which is what a pooled maximum is. At `stride: 1` the bars are one base wide and the distinction stops mattering.

> **Bar heights are not comparable between rows.** Each trace is normalized to its own `peak`, so every row uses its full height and a weak feature's shape stays legible. A scale shared across the stack would make the rows comparable and flatten everything below the strongest into a line — which, for a list ordered by score, is most of it. The tooltip carries the absolute value for anyone comparing two rows for real.

Feature names sit inside their own rows rather than on the section's header line, since there is one per trace and only one header. They are DOM text above the bars, and they disappear at `density="compact"`, where a card has no room for them. A name comes from `feature_notes` and falls back to `Feature 13492`, which is the common case rather than the exceptional one: the knowledge base describes a few percent of features today, and none at all for a checkpoint its pipeline has not run against. A layout that only looks right with prose labels is a layout that only looks right on a fixture.

## Code examples

### **Default GenomeTrack**

`data` is the only required prop. With no `tracks` the track draws the rows the designs stack: minimap, sequence, annotations, segments, and the features stack. Drag to pan, scroll to zoom, hover a block or a bar for a tooltip.

**Example: DefaultGenomeTrack**

```tsx
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
```

### Sequence row

Adding `"sequence"` to `tracks` puts the nucleotides above the annotation row. This example opens on a 61 bp slice of a 289 bp payload so the letters are legible; zoom out and the row becomes a band.

**Example: GenomeTrackWithSequence**

```tsx
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
```

### Features stack

Adding `"features"` to `tracks` draws one row per trace. Two of the four features below are described and two are not, so the rows show both the labelled case and the bare one.

**Example: GenomeTrackWithFeatures**

```tsx
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
```

### Viewport and selection

Both are controlled when supplied. Passing `viewport` means pan and zoom report through `onViewportChange` and change nothing until the prop comes back — which is what lets a shell re-fetch a wider window instead of scaling the one it has. Omit it for uncontrolled, where the component owns the range and starts at the payload's full window.

Selection is deliberately domain-free: clicking a block emits `{ kind: "block", id }` and nothing more. The id is one the caller already holds — an annotation's `id`, or a segment's namespaced `segment_id` — so the track can report a selection without knowing what it refers to. Clicking the selected block again, or clicking empty space, emits `null`, so a detail panel can be closed from the plot.

**Example: SelectableGenomeTrack**

```tsx
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
```

### Compact density

`density="compact"` tightens every row and drops the minimap's caption and tick labels along with the feature names; it is the in-card variant, used where a comparison row shows several loci at once. It pairs with `showRowLabels={false}` to drop the section names, a smaller `blockRowHeight`, and `disableNavigation` so a card does not swallow the page's scroll. Navigation only turns off wheel-zoom and drag-pan — selection and the keyboard controls still work.

**Example: CompactGenomeTrack**

```tsx
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
```

### Loading, error, and empty states

All three replace the plot and are reached through props, so the surrounding layout does not change as a window loads, fails, or is cleared. The skeleton is shaped from `tracks` rather than being one grey box, so nothing jumps when the data lands. An error is a typed `{ code, message }` rather than free text: the code chooses the headline, so a missing activation cache reads differently from a region nobody precomputed, and an unrecognised code falls back to the server's own message.

**Example: GenomeTrackStates**

```tsx
// The three states that replace the plot entirely. Each is a prop rather than
// something the caller renders instead of the track, so the surrounding layout
// does not have to change as a window loads, fails, or is cleared.
//
// `loading` draws a skeleton shaped like the rows in `tracks`, so the layout
// does not jump when the data lands. `error` takes a typed tool error: the code
// chooses the headline and the server's message is shown underneath, so a
// missing activation cache reads differently from a region nobody precomputed.
// An unrecognised code falls back to the message alone.

import { GenomeTrack } from "@czi-sds/data-viz";

const CAPTION = {
  color: "rgb(0 0 0 / 60%)",
  fontSize: 12,
  marginBottom: 4,
};

function App() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div>
        <div style={CAPTION}>loading</div>
        <GenomeTrack
          data={null}
          loading
          tracks={["annotations", "segments", "features"]}
        />
      </div>

      <div>
        <div style={CAPTION}>error</div>
        <GenomeTrack
          data={null}
          error={{
            code: "dependency_unavailable",
            message:
              "Continuous activation cache is not loaded for e_coli_k12.",
          }}
        />
      </div>

      <div>
        <div style={CAPTION}>empty — nothing loaded yet</div>
        <GenomeTrack data={null} />
      </div>
    </div>
  );
}

export default App;
```

## Navigation

Pan and zoom are clamped to the payload's window and to a floor of 20 bases, so the user cannot navigate to a range the payload has nothing to say about. Zooming past the floor holds the span and re-centres, which reads as a limit rather than as a bug.

| Input              | Result                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Drag               | Pans against the drag, the way dragging a map does. A drag under 4 px counts as a click, so selecting a block is reliable.     |
| Wheel              | Zooms about the pointer, keeping the base under the cursor fixed. The page does not scroll while the pointer is over the plot. |
| Left / Right arrow | Pans by 15% of the visible window.                                                                                             |
| Up arrow, `+`, `=` | Zooms in about the centre.                                                                                                     |
| Down arrow, `-`    | Zooms out about the centre.                                                                                                    |
| Home               | Returns to the payload's full window.                                                                                          |

Any other key falls through without `preventDefault`, so the page's own shortcuts keep working while the plot has focus.

## Accessibility

A canvas exposes nothing to assistive technology, so the track renders its contents a second time as a visually hidden table — one per row kind that was actually drawn, with the annotations, segments, and top features spelled out. The plot references it through `aria-describedby`, and carries `role="img"` with a label naming the organism and range. Without that table the component would be a blank region and the data simply unavailable, so it is not an enhancement to be switched off.

The table describes the whole payload window rather than the current viewport. Panning is a visual affordance; a reader stepping through a table wants the region the tool returned, not whatever happens to be scrolled into view.

The plot is a tab stop and takes focus on click, so the keyboard controls are available without a separate control to reach them, and strand is drawn as a block's shape as well as its color.

## Theming

A canvas cannot resolve CSS variables — `fillStyle` takes a color, and a `var(--x)` string paints nothing — so the track resolves a palette from the active SDS theme's semantic colors on each render and draws from that. Annotations use the neutral fill, segments the accent fill, and the feature bars the accent fill, with the tick labels, row labels and row banding coming from the base tokens. There are no color props: a track follows the theme in both light and dark, and the built-in fallback palette exists only for a track mounted outside a theme provider, as in a bare unit test.

## Props

The track spreads any remaining props onto its root div, so standard HTML attributes such as `className`, `id`, and `data-testid` work as usual.

| Name                 | Type                         | Default                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------- | ---------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`               | `GenomeTrackData \| null`    | - (required)                                                     | The window to draw. `null` renders the empty state. See the table below for its shape.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `tracks`             | `TrackKind[]`                | `["minimap", "sequence", "annotations", "segments", "features"]` | Rows to draw, top to bottom. A row the payload cannot fill is dropped rather than drawn empty.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `viewport`           | `GenomeViewport`             | -                                                                | Visible range. Controlled when supplied: pan and zoom report through `onViewportChange` and change nothing until the prop comes back. Omit for uncontrolled, starting at the payload's full window. May extend past the payload's window, by up to `navigationMargin` — a shell that re-fetches a narrower window at a finer stride needs the user to be able to zoom back out, and clamping to the payload would make each zoom-in permanent. The rows wash out the coordinates they have no data for. Supplied as a prop it is not clamped at all: controlled means the caller owns it, and only pan and zoom originating inside the component are bounded. |
| `onViewportChange`   | `function`                   | -                                                                | `(viewport: GenomeViewport) => void`. Called on pan and zoom. A shell typically re-fetches from this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `selection`          | `GenomeSelection \| null`    | `null`                                                           | Controlled selection. The track outlines the block whose id matches a `"block"` selection.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `onSelectionChange`  | `function`                   | -                                                                | `(selection: GenomeSelection \| null) => void`. Called with the clicked block, or with `null` when the click clears the selection.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `blockRowHeight`     | `number`                     | `16`                                                             | Height of one block row, in px: a segment row, or one lane of the annotations row. The minimap and sequence rows size themselves from `density`, and the features rows have a prop of their own. Deliberately slim — a block row carries an interval and, when it fits, a name, where the features rows below it are measurements whose shape needs room. Below about 14 the on-block gene names stop fitting and blocks draw unlabelled.                                                                                                                                                                                                                     |
| `maxAnnotationLanes` | `number`                     | `4`                                                              | Ceiling on the lanes the annotations row packs overlapping genes into. The row uses only as many as the window needs. Blocks that do not fit are left undrawn rather than stacked into the last lane, and stay listed in the accessible table.                                                                                                                                                                                                                                                                                                                                                                                                                |
| `featureRowHeight`   | `number`                     | `24`                                                             | Height of one feature's bars in the features row, in px, not counting the space above them that the feature's name occupies.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `maxFeatureRows`     | `number`                     | `8`                                                              | How many traces the features row draws, `pinned` first and then `features` in the payload's own rank order. A cap because the row's height is unbounded in the data: the segment-features endpoint returns up to 128 features for a segment, which at this row height is three thousand pixels of track.                                                                                                                                                                                                                                                                                                                                                      |
| `showRowLabels`      | `boolean`                    | `true`                                                           | Draw each section's name on a line above its rows, with a separator ruling off whatever sits above. The minimap is unnamed either way. Replaces the fixed left-hand gutter these labels used to occupy: the gutter cost a column of the plot's width at every zoom and still truncated the longer names, where above the row a name has the full width. The trade is vertical — each section costs a line. False for the compact variant, which has room for neither.                                                                                                                                                                                         |
| `density`            | `"comfortable" \| "compact"` | `"comfortable"`                                                  | Comfortable is the standalone view; compact is the in-card variant used by a comparison row, which tightens every row and drops the labels and captions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `loading`            | `boolean`                    | `false`                                                          | Render the skeleton instead of the data. It is shaped from `tracks`, so the layout does not jump when the data lands.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `navigationMargin`   | `number`                     | `1`                                                              | How far outside the loaded window pan and zoom may go, as a multiple of that window's span. Zero pins the viewport to the payload. This is the ceiling on how far the viewport may outrun its data: at the default the loaded slice always occupies at least a third of the plot, where unbounded navigation compresses it into a few pixels of an otherwise empty plot. A soft limit in practice, since each re-fetch widens the window and so widens this with it. Only applies when the payload carries an `overview`.                                                                                                                                     |
| `ranking`            | `"zscore" \| "peak"`         | `"zscore"`                                                       | How the features are ranked, shown in a dropdown on the features section's header line — "Z-Score" and "Raw" respectively. These are the tool's own `rank_by` values, so a shell can pass the callback's argument straight through; "Raw" is the label for `peak`, not a value the server accepts. Controlled with no internal fallback, because it is a fetch parameter rather than a view option: `rank_by` changes which features the tool returns and in what order, so a change is a request for different data and the component changes nothing itself. The dropdown is drawn only when `onRankingChange` is supplied.                                 |
| `onRankingChange`    | `function`                   | -                                                                | Called with the chosen `rank_by` value. A shell re-fetches from this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `refreshing`         | `boolean`                    | `false`                                                          | A fetch is in flight for data the track is already showing something for. Unlike `loading` this keeps the last good data drawn and marks the plot busy, which is what a shell re-fetching a finer stride on every wheel notch needs — replacing the plot each time would make it flicker. The header keeps reporting the resolution of the data on screen, not of the fetch in flight.                                                                                                                                                                                                                                                                        |
| `error`              | `TrackError \| null`         | `null`                                                           | Render a typed error state instead of the data. Takes precedence over `data`, and is itself preceded by `loading`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `disableNavigation`  | `boolean`                    | `false`                                                          | Disable wheel-zoom and drag-pan. The track still reports selection, and the keyboard controls still work — this only turns off pointer navigation, for a card that should not capture scroll.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### GenomeTrackData

One track window, as the tool returns it. Keys are the server's, so they are `snake_case`.

| Name             | Type                          | Default      | Description                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------- | ----------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `schema_version` | `1`                           | - (required) | Version of the payload contract.                                                                                                                                                                                                                                                                                                                                                  |
| `sae`            | `ModelRef`                    | - (required) | Which SAE produced the activations. A `feature_id` is only meaningful alongside it.                                                                                                                                                                                                                                                                                               |
| `locus`          | `Locus`                       | - (required) | Where in the genome the window sits. Its `start` and `end` are the bounds pan and zoom are clamped to.                                                                                                                                                                                                                                                                            |
| `sequence`       | `string \| null`              | - (required) | Window nucleotides, 5' to 3'. `null` when the window exceeds `caps.max_sequence_window` or the sequence file is unavailable.                                                                                                                                                                                                                                                      |
| `bins`           | `BinAxis`                     | - (required) | Maps trace index to genomic coordinates. Every `values` array in the payload is on this axis.                                                                                                                                                                                                                                                                                     |
| `annotations`    | `AnnotationBlock[] \| null`   | - (required) | Reference features. `null`, not `[]`, means the organism has no annotation coverage at all.                                                                                                                                                                                                                                                                                       |
| `segments`       | `SegmentBlock[]`              | - (required) | Precomputed segments. The pipeline partitions exhaustively, so they abut and leave no gaps.                                                                                                                                                                                                                                                                                       |
| `features`       | `FeatureTrace[]`              | - (required) | Top features by score, highest first. The features row draws them in this order and never re-sorts.                                                                                                                                                                                                                                                                               |
| `pinned`         | `FeatureTrace[]`              | - (required) | Features the caller asked to keep regardless of score. Listed ahead of `features` in the accessible table.                                                                                                                                                                                                                                                                        |
| `feature_notes`  | `Record<string, FeatureNote>` | - (required) | Descriptions keyed by `String(feature_id)`. Coverage is sparse — most features have no entry.                                                                                                                                                                                                                                                                                     |
| `caps`           | `TrackCaps`                   | - (required) | What the server had to leave out, and why.                                                                                                                                                                                                                                                                                                                                        |
| `overview`       | `MinimapOverview \| null`     | - (required) | Chromosome-scale context for the minimap row, and the source of the chromosome length that bounds navigation. `caps.overview_available` distinguishes "omitted because you already have it" — where the component keeps the last one — from "this deployment cannot draw it", where the minimap falls back to spanning the payload's own window and the viewport cannot leave it. |
| `clusters`       | `ClusterTrace[]`              | -            | Aggregate activation for clusters of co-firing features, on the same bin axis. Optional, and not drawn by any row yet.                                                                                                                                                                                                                                                            |

### Locus

| Name             | Type     | Default      | Description                                                                                                                |
| ---------------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `organism`       | `string` | - (required) | Organism key, for example `e_coli_k12`.                                                                                    |
| `organism_label` | `string` | -            | Display form of `organism`, for example "E. coli K-12". Shown in the header when present, with `organism` as the fallback. |
| `accession`      | `string` | - (required) | Assembly or sequence accession.                                                                                            |
| `chrom`          | `string` | - (required) | Chromosome or contig name, shown in the header.                                                                            |
| `start`          | `number` | - (required) | First base of the window, 1-based inclusive.                                                                               |
| `end`            | `number` | - (required) | Last base of the window, 1-based inclusive.                                                                                |
| `genome_length`  | `number` | - (required) | Length of the genome the window is cut from.                                                                               |
| `gene`           | `string` | -            | Gene the window is centred on, shown ahead of the organism in the header.                                                  |

### BinAxis

| Name     | Type     | Default      | Description                                                                                                 |
| -------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| `start`  | `number` | - (required) | First base the axis covers, 1-based inclusive.                                                              |
| `end`    | `number` | - (required) | Last base the axis covers, 1-based inclusive.                                                               |
| `stride` | `number` | - (required) | Bases per point; `1` when unpooled. Each point is the maximum over its bases, so single-base peaks survive. |
| `n_bins` | `number` | - (required) | Number of points, equal to `values.length` for every trace in the payload.                                  |

### AnnotationBlock

| Name        | Type                | Default      | Description                                                                                                                                                                               |
| ----------- | ------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | `string`            | - (required) | Identifier reported by `onSelectionChange` when the block is clicked.                                                                                                                     |
| `name`      | `string`            | - (required) | Gene name, falling back to the locus tag. Drawn on the block when it is wide enough, and truncated with an ellipsis when it is not.                                                       |
| `kind`      | `string`            | - (required) | Feature type: `CDS`, `tRNA`, `rRNA`, `ncRNA`, `mobile_element`, and so on.                                                                                                                |
| `start`     | `number`            | - (required) | First base of the feature, 1-based inclusive.                                                                                                                                             |
| `end`       | `number`            | - (required) | Last base of the feature, 1-based inclusive.                                                                                                                                              |
| `strand`    | `"+" \| "-" \| "."` | - (required) | Drawn as the block's shape: `+` points right, `-` points left, `.` is a plain rectangle. Blocks too narrow for an arrowhead degrade to a rectangle rather than misreporting their extent. |
| `product`   | `string`            | -            | Gene product, shown in the tooltip and the accessible table. Reads "Not annotated" when absent.                                                                                           |
| `locus_tag` | `string`            | -            | Locus tag from the annotation source.                                                                                                                                                     |

### SegmentBlock

| Name                | Type                | Default      | Description                                                                                                                                                          |
| ------------------- | ------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                | `string`            | - (required) | Namespaced `segment_id`. Pass it back to segment-keyed tools unchanged; the block itself is labelled with the trailing part, since the full id is 40-odd characters. |
| `start`             | `number`            | - (required) | First base of the segment, 1-based inclusive.                                                                                                                        |
| `end`               | `number`            | - (required) | Last base of the segment, 1-based inclusive.                                                                                                                         |
| `strand`            | `"+" \| "-" \| "."` | - (required) | Usually `"."`: segments come from an unstranded signal, and the strand in the design's segment row comes from the annotation above it.                               |
| `category`          | `string`            | - (required) | The category the segmentation voted for: `+CDS`, `-CDS`, `intergenic`, `SINE`, `unknown`, and so on. Drawn on the block beside the id.                               |
| `predicted_label`   | `string \| null`    | - (required) | Predicted function. `null` reads as "Unlabelled" rather than as a blank.                                                                                             |
| `predicted_support` | `number`            | - (required) | kNN vote share behind the label, 0-1.                                                                                                                                |
| `predicted_top`     | `string`            | -            | Nearest neighbour's product, when one was resolved.                                                                                                                  |
| `pct_of_segment`    | `number`            | - (required) | Fraction of the segment the vote was taken over, 0-1.                                                                                                                |

### FeatureTrace

| Name             | Type                 | Default      | Description                                                                                                                                                                                               |
| ---------------- | -------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feature_id`     | `number`             | - (required) | Index into the SAE's feature space. Only meaningful alongside `sae`.                                                                                                                                      |
| `values`         | `number[]`           | - (required) | Activation across the window, on the payload's bin axis. Length equals `bins.n_bins`.                                                                                                                     |
| `peak`           | `number`             | - (required) | Maximum raw activation in the window. Each feature row scales its bars to it.                                                                                                                             |
| `score`          | `number`             | - (required) | Value of whichever metric ranked this feature.                                                                                                                                                            |
| `score_kind`     | `"peak" \| "zscore"` | - (required) | Which metric `score` reports.                                                                                                                                                                             |
| `pct_of_segment` | `number \| null`     | - (required) | Fraction of the segment's bases where this feature is active, 0-1. Defined against the segment rather than the window, so it is stable under pan and zoom. `null` when the window is not segment-aligned. |

### FeatureNote

| Name            | Type             | Default      | Description                                                                                                |
| --------------- | ---------------- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| `feature_id`    | `number`         | - (required) | The feature this note describes.                                                                           |
| `label`         | `string`         | - (required) | Short display name, or `""` when unknown — which is the common case, and the one the layout has to handle. |
| `description`   | `string`         | - (required) | Longer description, or `""` when unknown.                                                                  |
| `confidence`    | `number \| null` | - (required) | Confidence in the description, 0-1.                                                                        |
| `cluster`       | `number \| null` | - (required) | Cluster of co-firing features this one belongs to.                                                         |
| `cluster_label` | `string`         | - (required) | Display name for that cluster.                                                                             |
| `cluster_size`  | `number \| null` | - (required) | How many features the cluster holds.                                                                       |

### TrackCaps

| Name                  | Type      | Default      | Description                                                                                                                                    |
| --------------------- | --------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `max_points`          | `number`  | - (required) | Longest trace the server will send. A wider window is pooled to fit, which is where `bins.stride` comes from.                                  |
| `max_sequence_window` | `number`  | - (required) | Widest window that comes back with a `sequence`. Past it the sequence row disappears.                                                          |
| `requested_top_n`     | `number`  | - (required) | How many features the caller asked for.                                                                                                        |
| `available_features`  | `number`  | - (required) | Features actually firing in the window, which may exceed what was sent.                                                                        |
| `features_truncated`  | `boolean` | - (required) | Whether features were left out. The accessible table says so when they were.                                                                   |
| `described_features`  | `number`  | - (required) | Knowledge-base coverage, out of `sae.n_features`.                                                                                              |
| `labelled_clusters`   | `number`  | - (required) | How many feature clusters carry a label.                                                                                                       |
| `overview_available`  | `boolean` | - (required) | Whether this organism can produce a minimap at all. Distinguishes "omitted because you already have it" from "this deployment cannot draw it". |

### ModelRef

| Name                     | Type     | Default      | Description                                                                                |
| ------------------------ | -------- | ------------ | ------------------------------------------------------------------------------------------ |
| `sae`                    | `string` | - (required) | Name of the sparse autoencoder, for example `esmgsedd-mvp`. Named in the accessible table. |
| `base_model`             | `string` | - (required) | Model the SAE was trained against.                                                         |
| `n_features`             | `number` | - (required) | Size of the feature space.                                                                 |
| `segmentation_threshold` | `number` | - (required) | Activation threshold the segmentation was cut at.                                          |

### GenomeViewport

| Name    | Type     | Default      | Description                            |
| ------- | -------- | ------------ | -------------------------------------- |
| `start` | `number` | - (required) | First visible base, 1-based inclusive. |
| `end`   | `number` | - (required) | Last visible base, 1-based inclusive.  |

### GenomeSelection

A union of four shapes, every one of them an id into data the caller already holds, so a component can emit one without knowing what it refers to. Clicking the plot produces the `"block"` form; the rest are there for other components in the same cross-selection.

**React TypeScript**

```tsx
type GenomeSelection =
  | { kind: "block"; id: string }
  | { kind: "range"; start: number; end: number }
  | { kind: "row"; id: string }
  | { kind: "series"; id: string };
```

### TrackError

| Name      | Type     | Default      | Description                                                                                                                                                                                                                      |
| --------- | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `code`    | `string` | - (required) | Server error code, which chooses the headline. The track has copy for `dependency_unavailable`, `invalid_input`, `not_found`, `rate_limited`, `region_too_large`, and `restricted`; anything else falls back to `message` alone. |
| `message` | `string` | - (required) | The server's own message, shown under the headline.                                                                                                                                                                              |
