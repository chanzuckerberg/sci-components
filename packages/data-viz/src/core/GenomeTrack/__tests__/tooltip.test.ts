import { tooltipLeft } from "../components/HitTooltip";

describe("tooltipLeft", () => {
  const WIDTH = 1000;
  const BOX = 300;

  it("centres the tooltip over its block where it fits", () => {
    expect(tooltipLeft(500, BOX, WIDTH)).toBe(350);
  });

  it("slides inward rather than hang off the left edge", () => {
    expect(tooltipLeft(40, BOX, WIDTH)).toBe(0);
  });

  it("slides inward rather than hang off the right edge", () => {
    const left = tooltipLeft(980, BOX, WIDTH);

    expect(left).toBe(WIDTH - BOX);
    expect(left + BOX).toBeLessThanOrEqual(WIDTH);
  });

  it("pins a tooltip wider than the plot to its left edge", () => {
    expect(tooltipLeft(500, WIDTH + 50, WIDTH)).toBe(0);
  });

  it("centres on the block before the tooltip has been measured", () => {
    expect(tooltipLeft(500, 0, WIDTH)).toBe(500);
  });
});
