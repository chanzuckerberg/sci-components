import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { buildSequenceLabel } from "../components/SequenceView/utils/residue";

/**
 * The residue grid is exposed as an image, so this label is all a screen
 * reader gets of the sequence. What it has to carry is the residues rather
 * than just a count of them, spaced so they are read out one letter at a time
 * instead of run together into a word.
 */

/** One-letter residue codes, cycled so a stub of any length has labels. */
const LETTERS = "ACDEFGHIKLMNPQRSTVWY";

/** The label asks a wrapper for its length and its letters, only. */
function wrapper(length: number): SequenceWrapper.Any {
  return {
    length,
    residueLabel: (seqIdx: number) =>
      LETTERS[seqIdx % LETTERS.length] as string,
  } as unknown as SequenceWrapper.Any;
}

describe("buildSequenceLabel", () => {
  it("names the residues, spaced apart so they are read as letters", () => {
    expect(buildSequenceLabel(wrapper(5))).toBe(
      "Residue sequence, 5 residues: A C D E F"
    );
  });

  it("carries every residue, not just the ones the grid numbers", () => {
    expect(buildSequenceLabel(wrapper(25))).toBe(
      "Residue sequence, 25 residues: " +
        "A C D E F G H I K L M N P Q R S T V W Y A C D E F"
    );
  });

  it("says how many residues it covers", () => {
    expect(buildSequenceLabel(wrapper(46))).toMatch(
      /^Residue sequence, 46 residues: /
    );
  });

  it("stays a plain name for a wrapper with no residues", () => {
    expect(buildSequenceLabel(wrapper(0))).toBe("Residue sequence, 0 residues");
  });
});
