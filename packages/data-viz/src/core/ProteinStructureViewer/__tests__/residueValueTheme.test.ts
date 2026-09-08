import type { StructureElement } from "molstar/lib/mol-model/structure";
import { Structure } from "molstar/lib/mol-model/structure";
import { Color } from "molstar/lib/mol-util/color";
import {
  PLASMA_COLOR_SCALE,
  sampleColorScale,
} from "../../../common/colorScales";
import {
  CRAMBIN_MAX_RESIDUE_VALUE,
  CRAMBIN_PDB,
  CRAMBIN_RESIDUE_VALUES,
} from "../__storybook__/constants";
import { neutralResidueColor } from "../utils/color";
import { createResidueValueTheme } from "../utils/residueValueTheme";
import { eachResidue, structureFromPdb } from "./molstarStructure";

/**
 * The overlay is keyed by 0-based residue index while Mol* reports residues by
 * 1-based `label_seq_id`, so these run the real PDB parser and the real color
 * theme rather than a stub: an off-by-one, or a value map pointing past the end
 * of the chain, both show up only as a structure that silently stays gray.
 */

type ColorFn = (location: StructureElement.Location) => Color;

/** The overlay's color function, primed with the values it should paint. */
function overlayColors(values: Map<number, number>, max: number): ColorFn {
  const theme = createResidueValueTheme("light");
  theme.setState({ colorScale: PLASMA_COLOR_SCALE, max, min: 0, values });

  // The provider is typed as unknown so the module carries no dependency on
  // Mol*'s theme types. factory() reads the state set above.
  const provider = theme.provider as { factory(): { color: ColorFn } };

  return provider.factory().color;
}

function sortedKeys(values: Map<number, number>): number[] {
  return [...values.keys()].sort((a, b) => a - b);
}

describe("residue value overlay", () => {
  let structure: Structure;

  beforeAll(async () => {
    structure = await structureFromPdb(CRAMBIN_PDB);
  });

  it("has a polymer for the cartoon to trace", () => {
    // A structure with no polymer residues renders an empty viewport under the
    // polymer-cartoon preset, however well-formed its ATOM records are.
    expect(structure.polymerResidueCount).toBeGreaterThan(0);
  });

  it("resolves the fixture to the residue indices the overlay is keyed by", () => {
    const indices = [...eachResidue(structure, () => null).keys()].sort(
      (a, b) => a - b
    );

    expect(indices[0]).toBe(0);
    expect(indices[indices.length - 1]).toBe(45);
    expect(indices).toHaveLength(46);
  });

  it("paints exactly the residues carrying a value", () => {
    const colors = eachResidue(
      structure,
      overlayColors(CRAMBIN_RESIDUE_VALUES, CRAMBIN_MAX_RESIDUE_VALUE)
    );
    const neutral = neutralResidueColor("light");

    const painted = [...colors.entries()]
      .filter(([, color]) => color !== neutral)
      .map(([residue]) => residue)
      .sort((a, b) => a - b);

    expect(painted).toEqual(sortedKeys(CRAMBIN_RESIDUE_VALUES));
  });

  it("maps each value through the color scale", () => {
    const colors = eachResidue(
      structure,
      overlayColors(CRAMBIN_RESIDUE_VALUES, CRAMBIN_MAX_RESIDUE_VALUE)
    );

    for (const [residue, value] of CRAMBIN_RESIDUE_VALUES) {
      const rgb = sampleColorScale(
        PLASMA_COLOR_SCALE,
        value,
        CRAMBIN_MAX_RESIDUE_VALUE
      );
      expect(rgb).not.toBeNull();

      const [r, g, b] = rgb as [number, number, number];
      expect(colors.get(residue)).toBe(Color.fromRgb(r, g, b));
    }
  });

  it("leaves the structure gray when no value lands on a residue", () => {
    // Values keyed past the end of the chain paint nothing, which is what made
    // the documented overlay example render an entirely gray structure.
    const beyondTheChain = new Map([
      [80, 1.2],
      [81, 2.4],
    ]);
    const colors = eachResidue(
      structure,
      overlayColors(beyondTheChain, CRAMBIN_MAX_RESIDUE_VALUE)
    );
    const neutral = neutralResidueColor("light");

    expect([...colors.values()].every((color) => color === neutral)).toBe(true);
  });
});
