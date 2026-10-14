import type { StructureElement } from "molstar/lib/mol-model/structure";
import {
  Structure,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import { Color } from "molstar/lib/mol-util/color";
import { BARNASE_BARSTAR_PDB } from "../__storybook__/barnaseBarstar";
import { createChainColorTheme } from "../utils/chainColorTheme";
import { eachResidue, structureFromPdb } from "./molstarStructure";

/**
 * The theme that stands in for Mol*'s built-in `chain-id`, run against the real
 * parser rather than a stub.
 *
 * Owning the assignment is the whole point of it - it is what lets the chain
 * legend show a swatch that matches the structure - so the colors it paints
 * have to be exactly the ones handed to it. A wrong property lookup would come
 * out as a uniformly gray complex, which no other test would catch.
 */

type ColorFn = (location: StructureElement.Location) => Color;

const BLUE = "#0072B2";
const ORANGE = "#E69F00";

/** The theme's color function, primed with the colors it should paint. */
function chainColors(colors: Map<string, string>): ColorFn {
  const theme = createChainColorTheme();
  theme.setState(colors);

  // The provider is typed as unknown so the module carries no dependency on
  // Mol*'s theme types. factory() reads the state set above.
  const provider = theme.provider as { factory(): { color: ColorFn } };

  return provider.factory().color;
}

const GRAY = Color.fromRgb(128, 128, 128);

describe("chain color theme", () => {
  let complex: Structure;

  beforeAll(async () => {
    complex = await structureFromPdb(BARNASE_BARSTAR_PDB);
  });

  it("paints each chain the color it was given", () => {
    const color = chainColors(
      new Map([
        ["A", BLUE],
        ["B", ORANGE],
      ])
    );

    // Keyed by residue index, which is what makes the chain break visible
    // here: 109 is barnase's last residue and 110 is barstar's first.
    const painted = eachResidue(complex, color);

    expect(painted.get(0)).toBe(Color.fromRgb(0, 114, 178));
    expect(painted.get(109)).toBe(Color.fromRgb(0, 114, 178));
    expect(painted.get(110)).toBe(Color.fromRgb(230, 159, 0));
    expect(painted.get(198)).toBe(Color.fromRgb(230, 159, 0));
  });

  it("gives every residue of a chain the same color", () => {
    const color = chainColors(
      new Map([
        ["A", BLUE],
        ["B", ORANGE],
      ])
    );

    const byChain = new Map<string, Set<Color>>();
    eachResidue(complex, (location) => {
      const chainId = StructureProperties.chain.auth_asym_id(location);
      const seen = byChain.get(chainId) ?? new Set<Color>();
      byChain.set(chainId, seen);
      seen.add(color(location));
      return null;
    });

    expect([...(byChain.get("A") ?? [])]).toHaveLength(1);
    expect([...(byChain.get("B") ?? [])]).toHaveLength(1);
  });

  it("falls back to gray for a chain it was given no color for", () => {
    const painted = eachResidue(complex, chainColors(new Map([["A", BLUE]])));

    expect(painted.get(0)).toBe(Color.fromRgb(0, 114, 178));
    expect(painted.get(110)).toBe(GRAY);
  });

  /**
   * `chainColors` is arbitrary text from a consumer until it has been checked,
   * and a color parsed out of nonsense would come through as NaN channels -
   * which Mol* renders as black rather than as an obvious mistake.
   */
  it("falls back to gray for a color it cannot parse", () => {
    const painted = eachResidue(
      complex,
      chainColors(new Map([["A", "not a color"]]))
    );

    expect(painted.get(0)).toBe(GRAY);
  });

  it("repaints when the colors change, rather than serving the old ones", () => {
    // Mol* caches per model, so the theme carries a version as its contextHash.
    const theme = createChainColorTheme();
    const provider = theme.provider as {
      factory(): { color: ColorFn; contextHash: number };
    };

    theme.setState(new Map([["A", BLUE]]));
    const first = provider.factory();

    theme.setState(new Map([["A", ORANGE]]));
    const second = provider.factory();

    expect(second.contextHash).not.toBe(first.contextHash);

    const painted = eachResidue(complex, second.color);
    expect(painted.get(0)).toBe(Color.fromRgb(230, 159, 0));
  });
});
