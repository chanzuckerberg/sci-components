import chroma from "chroma-js";
import { DEFAULT_TRACK_DATA } from "../__storybook__/constants";
import {
  baseCategory,
  presentCategories,
  segmentPalette,
} from "../utils/segmentColors";

/**
 * Category colours for the predicted-segment row.
 *
 * The property that matters is not which colours come out — those are SDS's
 * generator and are not chosen here — but that a category keeps the same one
 * wherever it appears. Without that, two windows cannot be compared, which is
 * the entire reason to colour the row.
 */

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

    // One hue per base, not per stranded name.
    expect(fills.size).toBe(bases.size);
    expect(bases.size).toBeLessThan(ENUM.length);
  });

  it("shares a colour between the two strands of one category", () => {
    const palette = segmentPalette(ENUM, false);

    // Colour is the category, pattern is the strand. Two hues would spend the
    // ramp twice on one distinction and imply the two are unrelated.
    expect(palette.fill("+CDS")).toBe(palette.fill("-CDS"));
    expect(palette.isStriped("-CDS")).toBe(true);
    expect(palette.isStriped("+CDS")).toBe(false);
    expect(palette.isStriped("intergenic")).toBe(false);
  });

  /**
   * The reason the full enum is in the payload at all.
   *
   * A window holds a handful of the categories that exist. Assigning colours
   * from the categories *present* would repaint them on every pan, because a
   * narrower window holds fewer and the indices shift underneath.
   */
  it("keeps a category's colour when its neighbours are absent", () => {
    const whole = segmentPalette(ENUM, false);

    // Assigning from a window's own categories would not: a shorter enum gives
    // the same category a different colour, so a pan would repaint the row.
    const fromPresentOnly = segmentPalette(ENUM.slice(0, 3), false);
    const last = ENUM[ENUM.length - 1];

    expect(fromPresentOnly.fill(last)).toBeNull();
    expect(whole.fill(last)).not.toBeNull();
  });

  it("reverses the ramp in dark mode, as the SDS generator does", () => {
    const light = segmentPalette(ENUM, false);
    const dark = segmentPalette(ENUM, true);

    // Same set of colours, opposite assignment — which is why the palette is
    // rebuilt on a theme change rather than cached across one.
    expect(dark.bases.map((base) => base.color)).toEqual(
      light.bases.map((base) => base.color).reverse()
    );
  });

  it("returns null for a category the enum does not contain", () => {
    const palette = segmentPalette(ENUM, false);

    // The segmentation gains categories over time and the payload's enum can
    // lag. The caller falls back to the row's single accent fill rather than
    // drawing an invisible block.
    expect(palette.fill("+lncRNA")).toBeNull();
  });

  it("knows nothing when the payload carries no enum", () => {
    expect(segmentPalette(undefined, false).fill("CDS")).toBeNull();
    expect(segmentPalette([], false).bases).toEqual([]);
  });

  /**
   * Block labels are drawn on the fill. White was safe while every segment was
   * one indigo; across a generated ramp the light end takes white to about 2:1,
   * well under the 4.5:1 the accessibility rules require.
   */
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
    // So the key does not reshuffle as the user pans: the same categories list
    // in the same order whichever one the window happens to start with.
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
});
