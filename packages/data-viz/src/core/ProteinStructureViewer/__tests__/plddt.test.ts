import { CRAMBIN_PDB, CRAMBIN_PLDDT } from "../__storybook__/constants";
import { injectPlddtIntoPdb } from "../utils/plddt";

/** B-factor occupies columns 60-66 (0-indexed 60 up to but not including 66). */
function bFactorOf(line: string): string {
  return line.substring(60, 66);
}

const ATOM_1 =
  "ATOM      1  N   THR A   1      17.047  14.099   3.625  1.00 13.79           N";
const ATOM_2 =
  "ATOM      2  CA  THR A   1      16.967  12.784   4.338  1.00 10.80           C";
const ATOM_3 =
  "ATOM      3  N   CYS A   2      15.115  11.555   6.914  1.00  9.85           N";

describe("injectPlddtIntoPdb", () => {
  it("writes the score into the B-factor column, scaled to 0-100", () => {
    const [line] = injectPlddtIntoPdb(ATOM_1, [0.94]).split("\n");
    expect(bFactorOf(line as string)).toBe(" 94.00");
  });

  it("keeps every other column untouched", () => {
    const [line] = injectPlddtIntoPdb(ATOM_1, [0.94]).split("\n");
    expect((line as string).substring(0, 60)).toBe(ATOM_1.substring(0, 60));
    expect((line as string).substring(66)).toBe(ATOM_1.substring(66));
  });

  it("gives every atom of a residue the same score", () => {
    const lines = injectPlddtIntoPdb(`${ATOM_1}\n${ATOM_2}`, [0.5]).split("\n");
    expect(bFactorOf(lines[0] as string)).toBe(" 50.00");
    expect(bFactorOf(lines[1] as string)).toBe(" 50.00");
  });

  it("advances to the next score when the residue number changes", () => {
    const lines = injectPlddtIntoPdb(
      `${ATOM_1}\n${ATOM_2}\n${ATOM_3}`,
      [0.5, 0.8]
    ).split("\n");
    expect(bFactorOf(lines[0] as string)).toBe(" 50.00");
    expect(bFactorOf(lines[1] as string)).toBe(" 50.00");
    expect(bFactorOf(lines[2] as string)).toBe(" 80.00");
  });

  it("falls back to mid confidence for residues past the end of the scores", () => {
    const lines = injectPlddtIntoPdb(`${ATOM_1}\n${ATOM_3}`, [0.94]).split(
      "\n"
    );
    expect(bFactorOf(lines[0] as string)).toBe(" 94.00");
    expect(bFactorOf(lines[1] as string)).toBe(" 50.00");
  });

  it("leaves non-coordinate records alone", () => {
    const input = `HEADER    PLANT PROTEIN\n${ATOM_1}\nEND`;
    const lines = injectPlddtIntoPdb(input, [0.94]).split("\n");
    expect(lines[0]).toBe("HEADER    PLANT PROTEIN");
    expect(lines[2]).toBe("END");
  });

  it("processes HETATM records too", () => {
    const hetatm = ATOM_1.replace("ATOM  ", "HETATM");
    const [line] = injectPlddtIntoPdb(hetatm, [0.25]).split("\n");
    expect(bFactorOf(line as string)).toBe(" 25.00");
  });

  it("pads short coordinate lines out to the B-factor column", () => {
    const short = "ATOM      1  N   THR A   1      17.047  14.099   3.625";
    const [line] = injectPlddtIntoPdb(short, [0.94]).split("\n");
    expect(bFactorOf(line as string)).toBe(" 94.00");
  });

  /**
   * Insertion codes let a structure add residues without renumbering the ones
   * after them, so 42, 42A and 42B are three residues sharing a number. Kabat
   * and Chothia antibody numbering leans on them heavily.
   */
  describe("insertion codes", () => {
    /** The same atom line, moved to a residue number and insertion code. */
    function atResidue(resSeq: string, insertionCode = " "): string {
      return (
        ATOM_1.substring(0, 22) +
        resSeq.padStart(4, " ") +
        insertionCode +
        ATOM_1.substring(27)
      );
    }

    it("treats residues differing only by insertion code as separate", () => {
      const lines = injectPlddtIntoPdb(
        [atResidue("42"), atResidue("42", "A"), atResidue("42", "B")].join(
          "\n"
        ),
        [0.1, 0.2, 0.3]
      ).split("\n");

      expect(bFactorOf(lines[0] as string)).toBe(" 10.00");
      expect(bFactorOf(lines[1] as string)).toBe(" 20.00");
      expect(bFactorOf(lines[2] as string)).toBe(" 30.00");
    });

    it("keeps the residues after an insertion on their own scores", () => {
      const lines = injectPlddtIntoPdb(
        [atResidue("42"), atResidue("42", "A"), atResidue("43")].join("\n"),
        [0.1, 0.2, 0.3]
      ).split("\n");

      expect(bFactorOf(lines[2] as string)).toBe(" 30.00");
    });
  });

  it("treats a repeated residue number in a new chain as a new residue", () => {
    const chainB = ATOM_1.substring(0, 21) + "B" + ATOM_1.substring(22);
    const lines = injectPlddtIntoPdb(`${ATOM_1}\n${chainB}`, [0.9, 0.3]).split(
      "\n"
    );
    expect(bFactorOf(lines[0] as string)).toBe(" 90.00");
    expect(bFactorOf(lines[1] as string)).toBe(" 30.00");
  });

  it("hands out one score per residue across a whole structure", () => {
    // Crambin carries no insertion codes, so its 46 residues have to consume
    // exactly the 46 scores: a boundary counted once too often anywhere in the
    // chain would leave the last residue short of its own.
    const lines = injectPlddtIntoPdb(CRAMBIN_PDB, CRAMBIN_PLDDT).split("\n");
    const atoms = lines.filter((line) => line.startsWith("ATOM"));
    const last = CRAMBIN_PLDDT[CRAMBIN_PLDDT.length - 1] as number;

    expect(bFactorOf(atoms[atoms.length - 1] as string)).toBe(
      (last * 100).toFixed(2).padStart(6, " ")
    );
  });
});
