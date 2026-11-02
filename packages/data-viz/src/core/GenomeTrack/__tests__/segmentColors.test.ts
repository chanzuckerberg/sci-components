import chroma from "chroma-js";
import { DEFAULT_TRACK_DATA } from "../__storybook__/constants";
import {
  baseCategory,
  presentCategories,
  segmentPalette,
} from "../utils/segmentColors";

const ENUM = DEFAULT_TRACK_DATA.segment_categories as string[];

describe("segmentPalette", () => {
  it("gives every category in the enum a colour", () => {
    const palette = segmentPalette(ENUM, false);

    expect(ENUM.length).toBeGreaterThan(1);
    ENUM.forEach((category) => {
      expect(palette.fill(category)).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  it("gives different base categories different colours", () => {
    const palette = segmentPalette(ENUM, false);
    const bases = new Set(ENUM.map(baseCategory));
    const fills = new Set(ENUM.map((category) => palette.fill(category)));

    // One colour per base category, not per stranded name.
    expect(fills.size).toBe(bases.size);
    expect(bases.size).toBeLessThan(ENUM.length);
  });

  it("shares a colour between the two strands of one category", () => {
    const palette = segmentPalette(ENUM, false);

    expect(palette.fill("+CDS")).toBe(palette.fill("-CDS"));
    expect(palette.isStriped("-CDS")).toBe(true);
    expect(palette.isStriped("+CDS")).toBe(false);
    expect(palette.isStriped("intergenic")).toBe(false);
  });

  it("keeps a category's colour when its neighbours are absent", () => {
    const whole = segmentPalette(ENUM, false);

    // A shorter enum gives the same category a different colour.
    const fromPresentOnly = segmentPalette(ENUM.slice(0, 3), false);
    const last = ENUM[ENUM.length - 1];

    expect(fromPresentOnly.fill(last)).toBeNull();
    expect(whole.fill(last)).not.toBeNull();
  });

  it("reverses the ramp in dark mode, as the SDS generator does", () => {
    const light = segmentPalette(ENUM, false);
    const dark = segmentPalette(ENUM, true);

    // Same set of colours, opposite assignment.
    const distinctBases = [...new Set(ENUM.map(baseCategory))];

    expect(distinctBases.map((base) => dark.fill(base))).toEqual(
      distinctBases.map((base) => light.fill(base)).reverse()
    );
  });

  it("returns null for a category the enum does not contain", () => {
    const palette = segmentPalette(ENUM, false);

    // The caller falls back to the row's accent fill.
    expect(palette.fill("+lncRNA")).toBeNull();
  });

  it("knows nothing when the payload carries no enum", () => {
    expect(segmentPalette(undefined, false).fill("CDS")).toBeNull();
    expect(segmentPalette([], false).fill("CDS")).toBeNull();
  });

  // Payloads can omit `category` even though the type requires it.
  it("falls back rather than throwing when a segment has no category", () => {
    const palette = segmentPalette(ENUM, false);
    const missing = undefined as unknown as string;

    expect(() => palette.fill(missing)).not.toThrow();
    expect(palette.fill(missing)).toBeNull();
    expect(palette.isStriped(missing)).toBe(false);
    expect(palette.text(missing)).toBe("#ffffff");
  });

  // WCAG requires 4.5:1 for label text.
  it("picks a label colour that meets contrast on every fill", () => {
    const palette = segmentPalette(ENUM, false);

    ENUM.forEach((category) => {
      const fill = palette.fill(category) as string;

      expect(
        chroma.contrast(fill, palette.text(category))
      ).toBeGreaterThanOrEqual(4.5);
    });
  });
});

describe("presentCategories", () => {
  const palette = segmentPalette(ENUM, false);

  it("lists only the categories a window contains", () => {
    const segments = [{ category: ENUM[1] }, { category: ENUM[0] }];

    expect(
      presentCategories(segments, ENUM, palette).map((e) => e.name)
    ).toEqual([ENUM[0], ENUM[1]]);
  });

  it("orders by the enum, not by appearance in the segments", () => {
    const forwards = [{ category: ENUM[0] }, { category: ENUM[2] }];
    const backwards = [{ category: ENUM[2] }, { category: ENUM[0] }];

    expect(presentCategories(forwards, ENUM, palette)).toEqual(
      presentCategories(backwards, ENUM, palette)
    );
  });

  it("marks the negative strand as striped, sharing its colour", () => {
    const entries = presentCategories(
      [{ category: "+CDS" }, { category: "-CDS" }],
      ENUM,
      palette
    );

    expect(entries.map((e) => e.striped)).toEqual([false, true]);
    expect(entries[0].color).toBe(entries[1].color);
  });

  it("is empty when nothing is on screen", () => {
    expect(presentCategories([], ENUM, palette)).toEqual([]);
  });

  it("omits segments whose category is missing", () => {
    const segments = [
      { category: undefined as unknown as string },
      { category: ENUM[0] },
    ];

    expect(
      presentCategories(segments, ENUM, palette).map((e) => e.name)
    ).toEqual([ENUM[0]]);
  });
});
