import { resolvePalette, withAlpha } from "../utils/palette";

/**
 * The drawing palette.
 *
 * Mostly a mapping from theme tokens to canvas colours, which is not worth
 * asserting key by key. What is worth asserting is the handful of places where
 * two entries have to agree with each other, or where a value's *form* matters
 * to the code that consumes it — both of which are invisible until something
 * renders wrong.
 */

describe("resolvePalette", () => {
  /**
   * The minimap's bar and the sequence row's band are one grey:
   * `base.surfaceSecondary`. They are separate entries so a later design can
   * split them, which means nothing stops the two drifting apart — and drifting
   * is silent, since each looks reasonable alone.
   */
  it("draws the sequence band and the minimap bar in the same grey", () => {
    const palette = resolvePalette(null);

    expect(palette.rowBackground).toBe(palette.minimapTrack);
  });

  /**
   * Both are gray 300 at 20%, which arrives from the theme as 8-digit hex.
   * `withAlpha` parses 6 digits only and returns anything else unchanged, so
   * passing one of these through it would silently keep full opacity — hence
   * they go straight to `fillStyle`, and hence this check that they really are
   * the translucent form rather than an opaque approximation of it.
   */
  it("keeps those greys translucent, not flattened to an opaque tint", () => {
    const palette = resolvePalette(null);

    expect(palette.rowBackground).toMatch(/^#[0-9a-f]{8}$/i);
    expect(palette.minimapTrack).toMatch(/^#[0-9a-f]{8}$/i);
  });

  it("falls back wholesale outside a theme provider", () => {
    // Every entry has to be a usable colour string: a canvas silently paints
    // nothing for `undefined`, so a missing entry is invisible rather than loud.
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

  /**
   * The trap, pinned as it actually behaves rather than as it reads.
   *
   * An 8-digit hex already carries an alpha, and this does *not* pass it
   * through: it slices the first six digits, parses those, and builds an
   * `rgba()` with the alpha it was handed — discarding the embedded one. So
   * `base.surfaceSecondary` at 20% comes out at whatever alpha the caller
   * asked for, which is why the translucent entries go straight to `fillStyle`
   * and never through here.
   */
  it("overwrites the alpha already in an 8-digit hex", () => {
    expect(withAlpha("#c3c3c333", 0.45)).toBe("rgba(195, 195, 195, 0.45)");
  });

  it("leaves a colour it cannot parse at all unchanged", () => {
    expect(withAlpha("rgba(0, 0, 0, 0.2)", 0.45)).toBe("rgba(0, 0, 0, 0.2)");
    expect(withAlpha("nonsense", 0.45)).toBe("nonsense");
  });
});
