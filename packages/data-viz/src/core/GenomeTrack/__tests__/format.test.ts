import {
  formatActivation,
  formatResolution,
  formatTick,
  segmentLabel,
  shortSegmentId,
  tickInterval,
  ticksFor,
} from "../utils/format";

describe("formatTick", () => {
  it("spells out coordinates when ticks are under a kilobase apart", () => {
    expect(formatTick(45_500, 50)).toBe("45,500");
    expect(formatTick(45_550, 50)).toBe("45,550");
  });

  it("uses enough decimals to separate kilobase ticks", () => {
    expect(formatTick(120_000, 5_000)).toBe("120k");
    expect(formatTick(125_000, 5_000)).toBe("125k");
    expect(formatTick(1_500, 1_000)).toBe("2k");
  });

  it("uses enough decimals to separate megabase ticks", () => {
    expect(formatTick(2_000_000, 1_000_000)).toBe("2M");
    expect(formatTick(2_050_000, 50_000)).toBe("2.05M");
    expect(formatTick(2_001_000, 1_000)).toBe("2.001M");
  });

  it("picks the unit from the coordinate, not the interval", () => {
    expect(formatTick(2_050_000, 50_000)).toMatch(/M$/);
    expect(formatTick(120_000, 50_000)).toMatch(/k$/);
  });

  it("spells out the base at megabase coordinates when zoomed right in", () => {
    expect(formatTick(2_000_050, 50)).toBe("2,000,050");
    expect(formatTick(2_000_100, 50)).toBe("2,000,100");
  });

  it("never labels two consecutive ticks the same, at any zoom", () => {
    const spans = [50, 289, 1_000, 40_000, 250_000, 5_000_000, 250_000_000];

    spans.forEach((span) => {
      const start = 98_765_432;
      const interval = tickInterval(span);
      const labels = ticksFor(start, start + span - 1, interval).map((bp) =>
        formatTick(bp, interval)
      );

      expect(new Set(labels).size).toBe(labels.length);
    });
  });
});

describe("tickInterval", () => {
  it("snaps to a 1/2/5 ladder so labels are numbers a reader can hold", () => {
    expect(tickInterval(289, 6)).toBe(50);
    expect(tickInterval(1_000, 5)).toBe(200);
    expect(tickInterval(40_000, 6)).toBe(10_000);
  });
});

describe("formatResolution", () => {
  it("says nothing about an unpooled trace", () => {
    expect(formatResolution(1)).toBeNull();
  });

  it("states the stride once a trace is pooled", () => {
    expect(formatResolution(21)).toBe("21 bp/point");
  });

  it("abbreviates a chromosome-scale stride", () => {
    expect(formatResolution(200_000)).toBe("200 kb/point");
  });
});

describe("ticksFor", () => {
  it("places ticks on round multiples inside the range", () => {
    expect(ticksFor(45_462, 45_750, 100)).toEqual([45_500, 45_600, 45_700]);
  });

  it("returns nothing when no multiple falls inside the range", () => {
    expect(ticksFor(101, 149, 1_000)).toEqual([]);
  });
});

describe("formatActivation", () => {
  it("drops trailing zeros, so a peak of 2 reads as 2", () => {
    expect(formatActivation(2)).toBe("2");
    expect(formatActivation(1)).toBe("1");
  });

  it("keeps two significant figures below ten", () => {
    expect(formatActivation(0.874)).toBe("0.87");
    expect(formatActivation(0.5)).toBe("0.5");
    expect(formatActivation(1.05)).toBe("1.1");
  });

  it("rounds to whole numbers above ten, where decimals will not fit", () => {
    expect(formatActivation(12.7)).toBe("13");
    expect(formatActivation(123)).toBe("123");
  });

  it("says nothing for a silent or invalid trace", () => {
    expect(formatActivation(0)).toBe("");
    expect(formatActivation(-1)).toBe("");
    expect(formatActivation(Number.NaN)).toBe("");
    expect(formatActivation(Number.POSITIVE_INFINITY)).toBe("");
  });
});

/** An atlas segment id as the genomic atlas service returns it. */
const ATLAS_SEGMENT_ID = "seg.NC_000913.3.s99";

describe("shortSegmentId", () => {
  it("keeps the trailing part of a namespaced id", () => {
    expect(
      shortSegmentId("esmgsedd-mvp:e_coli_k12:NC_000913.3:seg_01142")
    ).toBe("seg_01142");
  });

  it("keeps the segment number of an atlas id, past the dotted accession", () => {
    expect(shortSegmentId(ATLAS_SEGMENT_ID)).toBe("s99");
    expect(shortSegmentId("seg.22.s5")).toBe("s5");
  });
});

describe("segmentLabel for an unclassified segment", () => {
  it("leaves off a category of unknown", () => {
    expect(segmentLabel({ category: "unknown", id: ATLAS_SEGMENT_ID })).toBe(
      "s99"
    );
  });

  it("keeps a real category", () => {
    expect(segmentLabel({ category: "+CDS", id: ATLAS_SEGMENT_ID })).toBe(
      "s99 +CDS"
    );
  });
});
