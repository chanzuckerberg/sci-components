import { formatTick, tickInterval, ticksFor } from "../utils/format";

/**
 * Tick labelling, which the first Storybook render caught getting wrong.
 *
 * The original implementation chose precision from the magnitude of the
 * coordinate, so a 289 bp window with 50 bp ticks rendered "45.5k" four times
 * in a row. The bug is invisible in unit tests that check one label at a time,
 * so these assert the property that actually matters: consecutive ticks must
 * not collide.
 */
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
    // Precision comes from the interval, but a megabase-scale coordinate reads
    // as "2.05M" rather than "2050k".
    expect(formatTick(2_050_000, 50_000)).toMatch(/M$/);
    expect(formatTick(120_000, 50_000)).toMatch(/k$/);
  });

  it("spells out the base at megabase coordinates when zoomed right in", () => {
    // Three decimals of Mb cannot separate 50 bp ticks, so the guard for
    // sub-kilobase intervals has to win regardless of magnitude.
    expect(formatTick(2_000_050, 50)).toBe("2,000,050");
    expect(formatTick(2_000_100, 50)).toBe("2,000,100");
  });

  it("never labels two consecutive ticks the same, at any zoom", () => {
    const spans = [50, 289, 1_000, 40_000, 250_000, 5_000_000, 250_000_000];

    spans.forEach((span) => {
      // A eukaryotic start coordinate, where abbreviation is most tempting and
      // most dangerous.
      const start = 98_765_432;
      const interval = tickInterval(span);
      const labels = ticksFor(start, start + span - 1, interval).map((bp) =>
        formatTick(bp, interval)
      );

      // A ruler whose adjacent labels are equal reads as precise while being
      // unreadable, which is worse than having no labels at all.
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

describe("ticksFor", () => {
  it("places ticks on round multiples inside the range", () => {
    expect(ticksFor(45_462, 45_750, 100)).toEqual([
      45_500, 45_600, 45_700,
    ]);
  });

  it("returns nothing when no multiple falls inside the range", () => {
    expect(ticksFor(101, 149, 1_000)).toEqual([]);
  });
});
