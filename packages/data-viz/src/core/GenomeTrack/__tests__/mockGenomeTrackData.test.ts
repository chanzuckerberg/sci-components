import {
  makeFeatureOverview,
  makeMockGenomeTrackData,
} from "../__storybook__/mockGenomeTrackData";

/**
 * The fixture generator gets its own tests.
 *
 * A fixture that drifts between runs makes every snapshot flaky, and a fixture
 * that violates the wire contract teaches the component to handle data the
 * server will never send. Both failures are worse than having no fixture, so
 * the properties the generator promises are asserted rather than assumed.
 */

describe("makeMockGenomeTrackData", () => {
  it("is deterministic for a given seed", () => {
    const a = makeMockGenomeTrackData({ seed: 7 });
    const b = makeMockGenomeTrackData({ seed: 7 });

    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it("produces different data for different seeds", () => {
    const a = makeMockGenomeTrackData({ seed: 1 });
    const b = makeMockGenomeTrackData({ seed: 2 });

    expect(JSON.stringify(a)).not.toBe(JSON.stringify(b));
  });

  it("marks itself as mock data so a stray payload is identifiable", () => {
    expect(makeMockGenomeTrackData().sae.sae).toBe("mock-sae");
  });

  it("emits every trace on the payload's bin axis", () => {
    const data = makeMockGenomeTrackData({ end: 60_000, start: 45_462 });

    data.features.forEach((feature) => {
      expect(feature.values).toHaveLength(data.bins.n_bins);
    });
  });

  it("pools long windows and drops the sequence past the cap", () => {
    const data = makeMockGenomeTrackData({ end: 145_462, start: 45_462 });

    expect(data.bins.stride).toBeGreaterThan(1);
    expect(data.bins.n_bins).toBeLessThanOrEqual(data.caps.max_points);
    expect(data.sequence).toBeNull();
  });

  it("gives the sequence exactly one base per position in the window", () => {
    const data = makeMockGenomeTrackData({ end: 45_750, start: 45_462 });

    expect(data.sequence).toHaveLength(289);
    expect(data.sequence).toMatch(/^[ACGT]+$/);
  });

  it("tiles segments contiguously and exhaustively, like the real pipeline", () => {
    const data = makeMockGenomeTrackData();

    expect(data.segments[0].start).toBe(data.locus.start);
    expect(data.segments[data.segments.length - 1].end).toBe(data.locus.end);

    data.segments.slice(1).forEach((segment, index) => {
      // Abutting, never overlapping and never leaving a gap.
      expect(segment.start).toBe(data.segments[index].end + 1);
    });
  });

  it("leaves segments unstranded, because they come from an unstranded signal", () => {
    makeMockGenomeTrackData().segments.forEach((segment) => {
      expect(segment.strand).toBe(".");
    });
  });

  it("does not tile annotations, so intergenic regions exist", () => {
    const data = makeMockGenomeTrackData();
    const span = data.locus.end - data.locus.start + 1;

    // Union rather than summed length: annotations overlap, so adding up their
    // lengths can exceed the window while still leaving it full of gaps.
    const bases = new Set<number>();

    (data.annotations ?? []).forEach((annotation) => {
      for (let bp = annotation.start; bp <= annotation.end; bp += 1) {
        bases.add(bp);
      }
    });

    expect(bases.size).toBeLessThan(span);
  });

  it("emits annotations in start order, as the server does", () => {
    // The packing that lays out the annotation lanes sorts defensively, but a
    // fixture that arrived unsorted would mean the tests never exercise the
    // ordered path the real payload takes.
    const { annotations } = makeMockGenomeTrackData();

    (annotations ?? []).slice(1).forEach((annotation, index) => {
      expect(annotation.start).toBeGreaterThanOrEqual(
        (annotations ?? [])[index].start
      );
    });
  });

  /**
   * The fixture has to contain both shapes of overlap or the annotation lanes
   * are never exercised by anything but a hand-written test.
   */
  it("overlaps some annotations, the way a real GFF does", () => {
    const annotations = makeMockGenomeTrackData().annotations ?? [];
    const overlapping = annotations.filter((annotation, index) =>
      annotations.some(
        (other, otherIndex) =>
          otherIndex !== index &&
          annotation.start <= other.end &&
          other.start <= annotation.end
      )
    );

    expect(overlapping.length).toBeGreaterThan(0);
  });

  it("nests one annotation inside another, which is the case that broke hit-testing", () => {
    // Partial overlap leaves `end` ascending, so a binary search over it
    // survives. Nesting does not, and it is the reason a lane is guaranteed
    // not to contain overlapping blocks.
    const annotations = makeMockGenomeTrackData().annotations ?? [];
    const nested = annotations.filter((annotation, index) =>
      annotations.some(
        (host, hostIndex) =>
          hostIndex !== index &&
          host.start < annotation.start &&
          host.end > annotation.end
      )
    );

    expect(nested.length).toBeGreaterThan(0);
  });

  it("emits a fixed-size overview regardless of chromosome length", () => {
    const { overview } = makeMockGenomeTrackData();

    // The shape the real endpoint promises: 1,000 bins whether the chromosome
    // is 4.6 Mb or 250 Mb, so the payload cost does not scale with the genome.
    expect(overview?.bins.n_bins).toBe(1_000);
    expect(overview?.chrom_length).toBe(
      makeMockGenomeTrackData().locus.genome_length
    );
  });

  it("spans the whole chromosome with the overview's bin axis", () => {
    const { overview } = makeMockGenomeTrackData();

    // The minimap maps bin index to chromosome coordinate through this axis,
    // so an axis that did not start at 1 or cover `chrom_length` would put the
    // signal in the wrong place along the bar.
    expect(overview?.bins.start).toBe(1);
    expect(overview?.bins.end).toBe(overview?.chrom_length);
    expect(
      (overview?.bins.stride ?? 0) * (overview?.bins.n_bins ?? 0)
    ).toBeGreaterThanOrEqual(overview?.chrom_length ?? 0);
  });

  it("gives a feature's chromosome trace quiet stretches as well as peaks", () => {
    const { values } = makeFeatureOverview(13_492);

    // A minimap against uniform noise is a solid block, which would hide both
    // the normalization and the question the row exists to answer. This is the
    // shape a single feature has, and why it beats a pooled maximum: a max
    // over eight features is quiet nowhere.
    expect(Math.max(...values)).toBeGreaterThan(0.5);
    expect(values.filter((value) => value < 0.1).length).toBeGreaterThan(
      values.length / 2
    );
  });

  it("gives each feature its own trace, stable for a given feature", () => {
    const a = makeFeatureOverview(13_492);
    const b = makeFeatureOverview(5_912);

    // Keyed off the feature id, so selecting the same feature twice draws the
    // same thing and two features are visibly different.
    expect(a.values).toEqual(makeFeatureOverview(13_492).values);
    expect(a.values).not.toEqual(b.values);
    expect(a.feature_id).toBe(13_492);
  });

  it("puts a feature's trace on the chromosome's own bin axis", () => {
    const { bins } = makeFeatureOverview(13_492);
    const { overview } = makeMockGenomeTrackData();

    // The minimap maps bin index to chromosome coordinate through this axis,
    // so an axis disagreeing with the overview's would place the signal wrong.
    expect(bins).toEqual(overview?.bins);
  });

  it("distinguishes an absent overview from an omitted one", () => {
    // False emits the "this deployment cannot draw a minimap" case: null with
    // `overview_available` false. That is a different claim from the null a
    // re-fetch sends, which means "unchanged, you already have it".
    const without = makeMockGenomeTrackData({ withOverview: false });

    expect(without.overview).toBeNull();
    expect(without.caps.overview_available).toBe(false);
    expect(makeMockGenomeTrackData().caps.overview_available).toBe(true);
  });

  it("distinguishes no annotation coverage from an empty list", () => {
    expect(
      makeMockGenomeTrackData({ withAnnotations: false }).annotations
    ).toBeNull();
    expect(makeMockGenomeTrackData().annotations).not.toBeNull();
  });

  it("names the locus gene as the first annotation, so header and plot agree", () => {
    const data = makeMockGenomeTrackData({ gene: "narL" });

    expect(data.locus.gene).toBe("narL");
    expect(data.annotations?.[0].name).toBe("narL");
  });

  it("keeps feature description coverage sparse, as the real one is", () => {
    const data = makeMockGenomeTrackData({ featureCount: 24 });
    const described = Object.keys(data.feature_notes).length;

    // Two are always described so a story can show the labelled case; the rest
    // fall off to roughly 5%. Most rows must stay undescribed or the design's
    // hardest case never appears in Storybook.
    expect(described).toBeGreaterThanOrEqual(2);
    expect(described).toBeLessThan(data.features.length / 2);
  });

  it("ranks features by score, highest first", () => {
    const { features } = makeMockGenomeTrackData({ featureCount: 8 });

    features.slice(1).forEach((feature, index) => {
      expect(feature.score).toBeLessThanOrEqual(features[index].score);
    });
  });

  it("keeps activations within the normalized range the renderer assumes", () => {
    makeMockGenomeTrackData().features.forEach((feature) => {
      feature.values.forEach((value) => {
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(1);
      });

      expect(feature.peak).toBe(Math.max(...feature.values));
    });
  });

  it("namespaces segment ids with model, organism, and accession", () => {
    const data = makeMockGenomeTrackData();

    data.segments.forEach((segment) => {
      expect(segment.id).toMatch(
        /^mock-sae:e_coli_k12:NC_000913\.3:seg_\d{5}$/
      );
    });
  });
});
