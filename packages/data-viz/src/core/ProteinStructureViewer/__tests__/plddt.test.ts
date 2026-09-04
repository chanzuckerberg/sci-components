import { injectPlddtIntoPdb } from "../utils/plddt";
import { bFactorOf } from "./molstarStructure";

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

  it("treats a repeated residue number in a new chain as a new residue", () => {
    const chainB = ATOM_1.substring(0, 21) + "B" + ATOM_1.substring(22);
    const lines = injectPlddtIntoPdb(`${ATOM_1}\n${chainB}`, [0.9, 0.3]).split(
      "\n"
    );
    expect(bFactorOf(lines[0] as string)).toBe(" 90.00");
    expect(bFactorOf(lines[1] as string)).toBe(" 30.00");
  });
});
