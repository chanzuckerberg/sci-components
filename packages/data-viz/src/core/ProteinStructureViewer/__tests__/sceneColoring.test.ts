import type { StructureElement } from "molstar/lib/mol-model/structure";
import { Structure } from "molstar/lib/mol-model/structure";
import { Color } from "molstar/lib/mol-util/color";
import { CRAMBIN_PDB, CRAMBIN_PLDDT } from "../__storybook__/constants";
import { createChainColorTheme } from "../utils/chainColorTheme";
import { neutralResidueColor } from "../utils/color";
import { createPlddtTheme, plddtColor } from "../utils/plddtTheme";
import { createResidueColorOverrides } from "../utils/residueColorOverrides";
import { createResidueValueTheme } from "../utils/residueValueTheme";
import { resolveColorBy } from "../scene/coloring";
import { eachResidue, structureFromPdb } from "./molstarStructure";

/**
 * The themes run against the real parser, as the others are: a score keyed to
 * the wrong residue, or an override that loses to the theme under it, shows
 * up only as a structure painted wrong.
 */

type ColorFn = (location: StructureElement.Location) => Color;

/** A theme's color function, as Mol* would get it once its state is set. */
const colorsOf = (provider: unknown): ColorFn =>
  (provider as { factory(): { color: ColorFn } }).factory().color;

const RED = Color.fromRgb(255, 0, 0);

describe("pLDDT theme", () => {
  let structure: Structure;

  beforeAll(async () => {
    structure = await structureFromPdb(CRAMBIN_PDB);
  });

  function plddtColors(scores: (number | null)[], mode: "light" | "dark") {
    const theme = createPlddtTheme(mode);
    theme.setState({ scores });
    return eachResidue(structure, colorsOf(theme.provider));
  }

  it("paints each residue the band its own score falls in", () => {
    const colors = plddtColors(CRAMBIN_PLDDT, "light");

    CRAMBIN_PLDDT.forEach((score, residue) => {
      expect(colors.get(residue)).toBe(plddtColor(score));
    });
  });

  it("uses AlphaFold's bands", () => {
    expect(plddtColor(0.95)).toBe(Color.fromRgb(0x00, 0x53, 0xd5));
    expect(plddtColor(0.3)).toBe(Color.fromRgb(0xff, 0x7c, 0x45));
  });

  /**
   * A column of B-factors could not say "unscored", so a residue without a
   * score used to be handed a middling one. Read from the scores, it stays
   * unscored - neutral, not painted at the bottom of the scale.
   */
  it("reads a residue without a score as neutral", () => {
    const scores: (number | null)[] = [...CRAMBIN_PLDDT];
    scores[3] = null;
    const colors = plddtColors(scores.slice(0, 10), "light");
    const neutral = neutralResidueColor("light");

    expect(colors.get(3)).toBe(neutral);
    expect(colors.get(2)).toBe(plddtColor(CRAMBIN_PLDDT[2] as number));
    // Past the end of the scores.
    expect(colors.get(20)).toBe(neutral);
  });

  it("follows the mode for residues without a score", () => {
    const colors = plddtColors([], "dark");

    expect(colors.get(0)).toBe(neutralResidueColor("dark"));
  });
});

/**
 * A highlight paints over whatever colors the rest of the structure, so every
 * theme has to defer to it - and only for the residues it names.
 */
describe("highlight overrides", () => {
  let structure: Structure;

  beforeAll(async () => {
    structure = await structureFromPdb(CRAMBIN_PDB);
  });

  const themes = {
    chain: (overrides: ReturnType<typeof createResidueColorOverrides>) => {
      const theme = createChainColorTheme(overrides);
      theme.setState(new Map([["A", "#00FF00"]]));
      return theme.provider;
    },
    plddt: (overrides: ReturnType<typeof createResidueColorOverrides>) => {
      const theme = createPlddtTheme("light", overrides);
      theme.setState({ scores: CRAMBIN_PLDDT });
      return theme.provider;
    },
    value: (overrides: ReturnType<typeof createResidueColorOverrides>) => {
      const theme = createResidueValueTheme("light", overrides);
      theme.setState({ max: 1, values: new Map([[12, 0.5]]) });
      return theme.provider;
    },
  };

  it.each(Object.keys(themes) as (keyof typeof themes)[])(
    "paint over the %s theme, residue by residue",
    (name) => {
      const overrides = createResidueColorOverrides();
      const provider = themes[name](overrides);
      const before = eachResidue(structure, colorsOf(provider));

      overrides.current = new Map([[12, RED]]);
      const after = eachResidue(structure, colorsOf(provider));

      expect(after.get(12)).toBe(RED);
      expect(after.get(11)).toBe(before.get(11));
      expect(after.get(13)).toBe(before.get(13));
    }
  );
});

describe("resolveColorBy", () => {
  const OVERLAY = { max: 1, values: new Map<number, number>() };

  it("follows what is supplied, overlay first", () => {
    expect(resolveColorBy(undefined, OVERLAY, [0.9])).toBe("overlay");
    expect(resolveColorBy(undefined, null, [0.9])).toBe("plddt");
    expect(resolveColorBy(undefined, null, [])).toBe("chain");
    expect(resolveColorBy(undefined, undefined, null)).toBe("chain");
  });

  it("paints what colorBy names over anything supplied", () => {
    expect(resolveColorBy("chain", OVERLAY, [0.9])).toBe("chain");
    expect(resolveColorBy("plddt", null, null)).toBe("plddt");
  });
});
