import {
  AnnotationBlock,
  BinAxis,
  FeatureNote,
  FeatureOverview,
  FeatureTrace,
  GenomeTrackData,
  MinimapOverview,
  SegmentBlock,
} from "../GenomeTrack.types";

/**
 * Synthetic `GenomeTrackData` for local development, stories, and tests.
 *
 * **This is mock data. It is not science and must never reach a user.** It
 * lives under `__storybook__` so it is excluded from the published bundle, and
 * every generated payload carries `sae: "mock-sae"` so a payload that somehow
 * escapes is identifiable at a glance.
 *
 * It exists because the real payload comes from an MCP tool over precomputed
 * SAE activation caches that are tens of gigabytes and not yet in S3. Waiting
 * for that data would block every rendering decision in the component. What the
 * renderer actually needs to be exercised is structural: overlapping intervals,
 * stranded blocks, pooled traces whose peaks land inside particular segments,
 * missing annotations, and truncation flags. All of that can be generated.
 *
 * Three properties make it useful rather than merely present:
 *
 * 1. **Deterministic.** A seeded PRNG, so the same seed gives byte-identical
 *    output on every machine and every run. Storybook snapshots and visual
 *    regression would be useless otherwise, and a flaky fixture is worse than
 *    no fixture.
 * 2. **Structurally faithful.** Coordinates are 1-based inclusive, segments
 *    tile the window contiguously and exhaustively the way the real
 *    segmentation pipeline emits them, and activation is correlated with
 *    segment boundaries rather than being noise — so the picture looks like
 *    something a reviewer can judge.
 * 3. **Honest about coverage.** Feature descriptions are present on roughly 5%
 *    of features, matching the real knowledge base. Most rows say
 *    "Feature 13492" and nothing else, which is the case the design has to
 *    handle and which a fixture with pretty labels everywhere would hide.
 */

/**
 * mulberry32. Small, fast, and good enough for shaping test data — chosen for
 * being reproducible across engines, which `Math.random` is not.
 */
function createRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;

    let t = state;

    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Gene names that read as prokaryotic without naming anything real. */
const GENE_STEMS = [
  "fixX",
  "yhbW",
  "mreB",
  "narL",
  "cydA",
  "sdhC",
  "tolC",
  "lpxK",
  "ftsZ",
  "acpP",
  "murE",
  "glnA",
  "rpoS",
  "dnaK",
  "ompF",
];

const PRODUCTS = [
  "Putative ferredoxin",
  "Hypothetical protein",
  "ABC transporter permease",
  "Two-component response regulator",
  "Cytochrome d ubiquinol oxidase subunit",
  "Succinate dehydrogenase membrane anchor",
  "Outer membrane channel",
  "Tetraacyldisaccharide kinase",
];

/**
 * Feature descriptions for the ~5% of features the knowledge base covers.
 * Deliberately domain-plausible, because the design's row titles are this long
 * and the truncation behaviour has to be exercised.
 */
const FEATURE_DESCRIPTIONS = [
  "ATP-binding cassette (ABC) transporter",
  "Metal-binding and coordination sites",
  "AT-rich intergenic regulatory regions",
  "Periplasmic binding protein-like fold domains",
  "Helix-turn-helix DNA-binding domains",
  "Alpha-helical catalytic domains",
  "Beta-strand structural elements",
];

const CLUSTER_LABELS = [
  "Transport and permeability",
  "DNA binding",
  "Core metabolism",
  "Membrane architecture",
];

/**
 * The segmentation's full category enum, most common first.
 *
 * Stranded, as the pipeline's `palette.py` names them: `+CDS` and `-CDS` are
 * the same category on opposite strands, and the component gives them one hue
 * and distinguishes the strand with a diagonal stripe. Nine distinct bases
 * across fifteen names, so the ramp is spent on categories rather than twice
 * over on strand.
 *
 * Ordering is the server's job in a real payload — it knows the global
 * frequencies — so this is a plausible prokaryote ordering rather than a
 * measured one.
 */
const SEGMENT_CATEGORIES = [
  "+CDS",
  "-CDS",
  "intergenic",
  "+tRNA",
  "-tRNA",
  "+rRNA",
  "-rRNA",
  "+promoter",
  "-promoter",
  "+terminator",
  "-terminator",
  "+tfbs",
  "-tfbs",
  "mobile_element",
  "unknown",
];

/**
 * The categories a window actually contains, a prefix of the enum.
 *
 * Deliberately fewer than the enum, and deliberately including both strands of
 * two categories: a real window holds a handful of what exists, and the key
 * lists only those. A fixture using every category would hide the two
 * properties that matter — that a category keeps its hue whether or not its
 * neighbours are present, and that the two strands share one.
 */
const CATEGORIES = SEGMENT_CATEGORIES.slice(0, 6);

export interface MockGenomeTrackOptions {
  /** Same seed gives the same payload, always. @default 20260921 */
  seed?: number;
  /** Window start, 1-based inclusive. @default 45462 */
  start?: number;
  /** Window end, 1-based inclusive. @default 45750 */
  end?: number;
  /** How many feature traces to emit. @default 8 */
  featureCount?: number;
  /** Include the nucleotide sequence. @default true */
  withSequence?: boolean;
  /**
   * Include reference annotations. False emits `null`, which is the "this
   * organism has no annotation coverage" case rather than "no genes here".
   * @default true
   */
  withAnnotations?: boolean;
  /** Cap on trace length; the window is pooled to fit. @default 2000 */
  maxPoints?: number;
  /**
   * Include the chromosome-scale overview the minimap spans.
   *
   * False emits `overview: null` with `overview_available: false`, which is the
   * "this deployment cannot draw a minimap" case — distinct from the null that
   * means "unchanged, you already have it". Without it the minimap falls back
   * to the payload's own window and the viewport cannot leave it.
   * @default true
   */
  withOverview?: boolean;
  /** Gene name to report on the locus. @default "fixX" */
  gene?: string;
  organism?: string;
  organismLabel?: string;
  accession?: string;
  chrom?: string;
}

/** Builds the pooled bin axis for a window, honouring `maxPoints`. */
function makeBins(start: number, end: number, maxPoints: number): BinAxis {
  const span = end - start + 1;
  const stride = Math.max(Math.ceil(span / maxPoints), 1);

  return { end, n_bins: Math.ceil(span / stride), start, stride };
}

/**
 * Contiguous segments tiling the window.
 *
 * The real pipeline partitions a chromosome exhaustively — segments abut, never
 * overlap, and leave no gaps — so the mock does too. A fixture with gaps would
 * let a renderer bug that drops abutting edges pass unnoticed.
 */
function makeSegments(
  random: () => number,
  start: number,
  end: number,
  namespace: string
): SegmentBlock[] {
  const segments: SegmentBlock[] = [];
  const span = end - start + 1;
  const targetLength = Math.max(Math.round(span / 6), 30);

  let cursor = start;
  let index = 76;

  while (cursor <= end) {
    const length = Math.max(
      Math.round(targetLength * (0.55 + random() * 0.9)),
      20
    );
    const segmentEnd = Math.min(cursor + length - 1, end);
    const category = CATEGORIES[Math.floor(random() * CATEGORIES.length)];
    const labelled = random() > 0.35;

    segments.push({
      category,
      end: segmentEnd,
      id: `${namespace}:seg_${String(index).padStart(5, "0")}`,
      pct_of_segment: Number((0.4 + random() * 0.6).toFixed(3)),
      predicted_label: labelled
        ? PRODUCTS[Math.floor(random() * PRODUCTS.length)]
        : null,
      predicted_support: Number((0.35 + random() * 0.6).toFixed(3)),
      predicted_top: labelled
        ? GENE_STEMS[Math.floor(random() * GENE_STEMS.length)]
        : undefined,
      start: cursor,
      // Segments come from an unstranded signal, so they are always ".". The
      // strand in the design's segment row comes from the annotation, not the
      // segment, and getting this wrong in a fixture would teach the renderer
      // to draw arrowheads it should not.
      strand: ".",
    });

    cursor = segmentEnd + 1;
    index += 1;
  }

  return segments;
}

/**
 * Reference annotations: a few genes with intergenic space between them, some
 * of them overlapping.
 *
 * Unlike segments these do *not* tile — real annotation coverage is patchy, and
 * intergenic regions carry much of the SAE signal, so a fixture that covers the
 * window end to end would hide the case the science cares about.
 *
 * They also overlap, in both of the ways a GFF does, because the annotations
 * row packs them into lanes and a fixture that never overlaps would exercise
 * exactly one lane:
 *
 * - **Partial overlap**, where one gene runs into the next. Common in bacteria
 *   and near-universal in phage genomes. Draws wrong in a flat row, but leaves
 *   `end` in ascending order, so the hit-test survives it.
 * - **Nesting**, where a short feature sits entirely inside a long one — a tRNA
 *   inside a CDS. This is the one that breaks a binary search over `end`, and
 *   it is the reason a lane is guaranteed not to nest. A fixture with only
 *   partial overlaps would let that regress unnoticed, so one is inserted
 *   unconditionally rather than left to the PRNG.
 */
function makeAnnotations(
  random: () => number,
  start: number,
  end: number,
  gene: string
): AnnotationBlock[] {
  const annotations: AnnotationBlock[] = [];
  const span = end - start + 1;

  let cursor = start + Math.round(span * 0.04);
  let index = 0;

  while (cursor < end) {
    const length = Math.round(span * (0.12 + random() * 0.22));
    const blockEnd = Math.min(cursor + length - 1, end);

    if (blockEnd - cursor < 10) break;

    annotations.push({
      end: blockEnd,
      id: `ann_${index}`,
      kind: random() > 0.85 ? "tRNA" : "CDS",
      locus_tag: `b${String(1000 + index * 7).padStart(4, "0")}`,
      // The first annotation is the gene the locus names, so the header and the
      // plot agree — the payload claims to be centred on it.
      name: index === 0 ? gene : GENE_STEMS[index % GENE_STEMS.length],
      product: PRODUCTS[index % PRODUCTS.length],
      strand: random() > 0.45 ? "+" : "-",
      start: cursor,
    });

    // Roughly a third of the time the next gene starts before this one ends.
    cursor =
      random() > 0.66
        ? blockEnd - Math.round(length * (0.08 + random() * 0.2))
        : blockEnd + Math.round(span * (0.02 + random() * 0.08));
    index += 1;
  }

  const host = annotations[0];

  // A tRNA nested inside the first gene, positioned off its middle so it clears
  // both ends and is a strict subset. Opposite strand to its host, which is the
  // usual arrangement and gives the lanes two arrow directions to draw.
  if (host && host.end - host.start > 40) {
    const hostLength = host.end - host.start + 1;
    const nestedStart = host.start + Math.round(hostLength * 0.45);

    annotations.push({
      end: nestedStart + Math.max(Math.round(hostLength * 0.12), 12),
      id: `ann_${index}`,
      kind: "tRNA",
      locus_tag: `b${String(1000 + index * 7).padStart(4, "0")}`,
      name: "tRNA-Ala",
      product: "Transfer RNA",
      start: nestedStart,
      strand: host.strand === "+" ? "-" : "+",
    });
  }

  // Start order is the contract the server keeps and the packing depends on, so
  // the inserted block is sorted back into place rather than left at the end.
  return annotations.sort((a, b) => a.start - b.start);
}

/**
 * Chromosome-scale overview for the minimap row.
 *
 * Fixed at 1,000 bins regardless of chromosome length, which is the shape the
 * real endpoint promises: human chr 1 and E. coli cost the same bytes, and the
 * stride comes out at ~4.6 kb for this genome.
 *
 * Carries no `values`. The minimap no longer draws a pooled signal — it draws
 * the one feature the user selected, from `feature_overview` — so the field is
 * left off to exercise the optional path a server that never computes it will
 * take.
 */
function makeOverview(chrom: string, chromLength: number): MinimapOverview {
  const nBins = 1_000;
  const stride = Math.ceil(chromLength / nBins);

  return {
    bins: { end: chromLength, n_bins: nBins, start: 1, stride },
    chrom,
    chrom_length: chromLength,
  };
}

/**
 * One feature's activation across the chromosome, for the minimap.
 *
 * Exported because it is fetched per *selection* rather than per payload: a
 * story that lets the user click a feature row has to be able to build the
 * trace for whichever feature was clicked, which is exactly what the shell
 * will do with a real endpoint.
 *
 * Seeded from the feature id, so the same feature always gets the same trace
 * and two different features get visibly different ones. Deliberately sparse —
 * a handful of clusters over a quiet chromosome, which is what distinguishes
 * one feature's trace from the pooled maximum that used to be drawn here and
 * lit up almost every bin.
 */
export function makeFeatureOverview(
  featureId: number,
  chromLength = 4_641_652
): FeatureOverview {
  const nBins = 1_000;
  const stride = Math.ceil(chromLength / nBins);
  const random = createRandom(featureId);

  const homes = Array.from({ length: 2 + Math.floor(random() * 3) }, () => ({
    center: random(),
    weight: 0.5 + random() * 0.5,
  }));

  const values = Array.from({ length: nBins }, (_, index) => {
    const position = index / nBins;
    const signal = homes.reduce((total, home) => {
      const distance = Math.abs(position - home.center);

      return total + home.weight * Math.exp(-((distance / 0.012) ** 2));
    }, 0);

    // A low floor rather than zero, since a real trace is never perfectly
    // silent — but low enough that the clusters are what the eye finds.
    return Number(Math.min(signal + random() * 0.04, 1).toFixed(3));
  });

  return {
    bins: { end: chromLength, n_bins: nBins, start: 1, stride },
    feature_id: featureId,
    values,
  };
}

/**
 * Activation traces whose peaks land inside segments.
 *
 * Correlating the signal with the segmentation is the point: the real pipeline
 * *derives* segments from where activation changes, so a fixture of independent
 * noise would produce a picture in which the two rows have nothing to do with
 * each other — and a reviewer looking at it could not tell whether the
 * component or the data was wrong.
 */
function makeFeatures(
  random: () => number,
  bins: BinAxis,
  segments: SegmentBlock[],
  count: number
): FeatureTrace[] {
  return Array.from({ length: count }, (_, featureIndex) => {
    const values = new Array<number>(bins.n_bins).fill(0);
    // Each feature favours a couple of segments, the way a real feature fires
    // in some contexts and not others.
    const homeCount = 1 + Math.floor(random() * 2);
    const homes = Array.from(
      { length: homeCount },
      () => segments[Math.floor(random() * segments.length)]
    );

    for (let i = 0; i < bins.n_bins; i += 1) {
      const bp = bins.start + i * bins.stride;
      const inHome = homes.some(
        (segment) => segment && bp >= segment.start && bp <= segment.end
      );
      const baseline = random() * 0.12;
      const signal = inHome ? 0.45 + random() * 0.55 : 0;

      values[i] = Number(Math.min(baseline + signal, 1).toFixed(3));
    }

    const peak = Math.max(...values);

    return {
      feature_id: 13492 - featureIndex * 1187 + Math.floor(random() * 40),
      pct_of_segment: Number((0.55 + random() * 0.45).toFixed(3)),
      peak,
      score: Number((peak * (1 + random())).toFixed(3)),
      score_kind: "zscore" as const,
      values,
    };
  }).sort((a, b) => b.score - a.score);
}

/**
 * Feature notes at realistic coverage: about one feature in twenty is
 * described. See the class comment — this is the single biggest gap between the
 * designs and the data, so the fixture reproduces it rather than papering over
 * it.
 */
function makeFeatureNotes(
  random: () => number,
  features: FeatureTrace[]
): Record<string, FeatureNote> {
  const notes: Record<string, FeatureNote> = {};

  features.forEach((feature, index) => {
    // Always describe the first two so a story can show the labelled case, and
    // then fall off to ~5% for the rest.
    const described = index < 2 || random() < 0.05;

    if (!described) return;

    const cluster = Math.floor(random() * CLUSTER_LABELS.length);

    notes[String(feature.feature_id)] = {
      cluster,
      cluster_label: CLUSTER_LABELS[cluster],
      cluster_size: 40 + Math.floor(random() * 400),
      confidence: Number((0.6 + random() * 0.4).toFixed(2)),
      description: FEATURE_DESCRIPTIONS[index % FEATURE_DESCRIPTIONS.length],
      feature_id: feature.feature_id,
      label: FEATURE_DESCRIPTIONS[index % FEATURE_DESCRIPTIONS.length],
    };
  });

  return notes;
}

/** Nucleotides for the window. GC content is uniform; nothing reads it. */
function makeSequence(random: () => number, length: number): string {
  const bases = "ACGT";
  let sequence = "";

  for (let i = 0; i < length; i += 1) {
    sequence += bases[Math.floor(random() * 4)];
  }

  return sequence;
}

/**
 * Builds one synthetic track payload.
 *
 * Every call with the same options returns the same data, so this is safe to
 * call at module scope for a story fixture or inside a test.
 */
export function makeMockGenomeTrackData(
  options: MockGenomeTrackOptions = {}
): GenomeTrackData {
  const {
    accession = "NC_000913.3",
    chrom = "NC_000913.3",
    end = 45750,
    featureCount = 8,
    gene = "fixX",
    maxPoints = 2000,
    organism = "e_coli_k12",
    organismLabel = "E. coli K-12",
    seed = 20260921,
    start = 45462,
    withAnnotations = true,
    withOverview = true,
    withSequence = true,
  } = options;

  const random = createRandom(seed);
  const span = end - start + 1;
  const bins = makeBins(start, end, maxPoints);
  const namespace = `mock-sae:${organism}:${accession}`;
  const segments = makeSegments(random, start, end, namespace);
  const features = makeFeatures(random, bins, segments, featureCount);
  const maxSequenceWindow = 30_000;
  const genomeLength = 4_641_652;
  const overview = withOverview ? makeOverview(chrom, genomeLength) : null;

  return {
    annotations: withAnnotations
      ? makeAnnotations(random, start, end, gene)
      : null,
    bins,
    caps: {
      available_features: featureCount + 14,
      described_features: 1_600,
      features_truncated: true,
      labelled_clusters: CLUSTER_LABELS.length,
      max_points: maxPoints,
      max_sequence_window: maxSequenceWindow,
      overview_available: withOverview,
      requested_top_n: featureCount,
    },
    clusters: [],
    feature_notes: makeFeatureNotes(random, features),
    features,
    locus: {
      accession,
      chrom,
      end,
      gene,
      genome_length: genomeLength,
      organism,
      organism_label: organismLabel,
      start,
    },
    overview,
    pinned: [],
    sae: {
      base_model: "mock-base-model",
      n_features: 30_720,
      sae: "mock-sae",
      segmentation_threshold: 0.35,
    },
    schema_version: 1,
    segment_categories: SEGMENT_CATEGORIES,
    segments,
    // A window wider than the cap gets no sequence, exactly as the server
    // behaves — which is how the degraded path gets exercised without a flag.
    sequence:
      withSequence && span <= maxSequenceWindow
        ? makeSequence(random, span)
        : null,
  };
}
