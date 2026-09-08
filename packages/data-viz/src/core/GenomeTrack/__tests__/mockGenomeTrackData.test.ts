import { makeMockGenomeTrackData } from "../__storybook__/mockGenomeTrackData";

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
    const covered = (data.annotations ?? []).reduce(
      (total, annotation) => total + (annotation.end - annotation.start + 1),
      0
    );
    const span = data.locus.end - data.locus.start + 1;

    expect(covered).toBeLessThan(span);
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
