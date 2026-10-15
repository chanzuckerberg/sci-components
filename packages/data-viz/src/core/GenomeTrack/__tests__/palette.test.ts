import { resolvePalette, withAlpha } from "../utils/palette";

/**
 * The drawing palette.
 *
 * Mostly a mapping from theme tokens to canvas colors, which is not worth
 * asserting key by key. What is worth asserting is the handful of places where
 * two entries have to agree with each other, or where a value's *form* matters
 * to the code that consumes it — both of which are invisible until something
 * renders wrong.
 */

describe("resolvePalette", () => {
  it("draws the sequence band and the minimap bar in the same grey", () => {
    const palette = resolvePalette(null);

    expect(palette.rowBackground).toBe(palette.minimapTrack);
  });

  it("keeps those greys translucent, not flattened to an opaque tint", () => {
    const palette = resolvePalette(null);

    expect(palette.rowBackground).toMatch(/^#[0-9a-f]{8}$/i);
    expect(palette.minimapTrack).toMatch(/^#[0-9a-f]{8}$/i);
  });

  it("falls back wholesale outside a theme provider", () => {
    Object.values(resolvePalette(null)).forEach((color) => {
      expect(typeof color).toBe("string");
      expect(color).not.toBe("");
    });
  });
});

describe("withAlpha", () => {
  it("expands shorthand and applies the alpha", () => {
    expect(withAlpha("#fff", 0.5)).toBe("rgba(255, 255, 255, 0.5)");
    expect(withAlpha("#767676", 0.08)).toBe("rgba(118, 118, 118, 0.08)");
  });

  it("overwrites the alpha already in an 8-digit hex", () => {
    expect(withAlpha("#c3c3c333", 0.45)).toBe("rgba(195, 195, 195, 0.45)");
  });

  it("leaves a color it cannot parse at all unchanged", () => {
    expect(withAlpha("rgba(0, 0, 0, 0.2)", 0.45)).toBe("rgba(0, 0, 0, 0.2)");
    expect(withAlpha("nonsense", 0.45)).toBe("nonsense");
  });
});
