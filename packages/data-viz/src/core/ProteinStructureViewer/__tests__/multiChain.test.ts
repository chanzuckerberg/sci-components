import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { StructureProperties } from "molstar/lib/mol-model/structure";
import type { SequenceWrapperEntry } from "../components/SequenceView/hooks/useSequenceWrappers";
import { sequenceTextFromEntries } from "../components/SequenceView/utils/sequenceText";
import { injectPlddtIntoPdb } from "../utils/plddt";
import { eachResidue, structureFromPdb } from "./molstarStructure";

/**
 * Barnase (chain A) in complex with its inhibitor barstar (chain B), the first
 * eight residues of each chain, alpha carbons only. Real coordinates and
 * B-factors from an ESMFold co-fold of the two sequences, trimmed to keep the
 * fixture readable.
 *
 * Two chains of unequal length, numbered continuously across the boundary
 * (barstar starts at 111 because barnase is 110 residues), which is what the
 * viewer's structure sources emit. That numbering is load-bearing: the pLDDT
 * overlay indexes residues ordinally while the residue callbacks read
 * `label_seq_id`, and the two agree only while numbering runs unbroken from 1.
 */
const BARNASE_BARSTAR = [
  "ATOM      2  CA  ALA A   1      10.557  -5.651 -25.144  1.00 64.66           C",
  "ATOM      7  CA  GLN A   2      12.911  -3.660 -22.963  1.00 70.39           C",
  "ATOM     16  CA  VAL A   3      11.857  -3.233 -19.358  1.00 93.28           C",
  "ATOM     23  CA  ILE A   4      10.944   0.340 -18.413  1.00 97.47           C",
  "ATOM     31  CA  ASN A   5      11.042   0.676 -14.623  1.00 96.44           C",
  "ATOM     39  CA  THR A   6      12.919   3.868 -13.722  1.00 98.24           C",
  "ATOM     46  CA  PHE A   7      11.375   7.106 -12.480  1.00 98.78           C",
  "ATOM     57  CA  ASP A   8      12.223   9.076 -15.611  1.00 96.85           C",
  "ATOM    879  CA  LYS B 111      -0.309 -14.525  12.101  1.00 86.96           C",
  "ATOM    888  CA  LYS B 112      -1.419 -12.667  15.214  1.00 89.37           C",
  "ATOM    897  CA  ALA B 113      -0.757  -8.987  15.777  1.00 97.89           C",
  "ATOM    902  CA  VAL B 114      -1.548  -7.368  19.145  1.00 97.10           C",
  "ATOM    909  CA  ILE B 115      -1.947  -3.662  19.806  1.00 97.42           C",
  "ATOM    917  CA  ASN B 116      -2.154  -2.675  23.482  1.00 92.64           C",
  "ATOM    925  CA  GLY B 117      -3.936   0.644  23.032  1.00 95.12           C",
  "ATOM    929  CA  GLU B 118      -3.211   1.942  26.519  1.00 83.80           C",
].join("\n");

const BARNASE_RESIDUES = 8;
const BARSTAR_RESIDUES = 8;

/** B-factor occupies columns 60-66 (0-indexed 60 up to but not including 66). */
function bFactorOf(line: string): string {
  return line.substring(60, 66);
}

/** Minimal stand-in for a Mol* sequence wrapper, which needs a live plugin. */
function fakeWrapper(sequence: string): SequenceWrapper.Any {
  return {
    length: sequence.length,
    residueLabel: (i: number) => sequence[i] as string,
  } as unknown as SequenceWrapper.Any;
}

describe("barnase-barstar complex", () => {
  it("parses as two chains", async () => {
    const structure = await structureFromPdb(BARNASE_BARSTAR);
    const chains = new Set<string>();

    eachResidue(structure, (location) => {
      chains.add(StructureProperties.chain.auth_asym_id(location));
    });

    expect([...chains].sort()).toEqual(["A", "B"]);
  });

  it("numbers residues continuously across the chain boundary", async () => {
    const structure = await structureFromPdb(BARNASE_BARSTAR);
    const seqIds: number[] = [];

    eachResidue(structure, (location) => {
      seqIds.push(StructureProperties.residue.auth_seq_id(location));
    });

    expect(Math.min(...seqIds)).toBe(1);
    expect(seqIds).toContain(BARNASE_RESIDUES);
    // Barstar picks up where the full barnase chain leaves off, not at 1.
    expect(seqIds).toContain(111);
  });

  /**
   * `eachResidue` keys by `label_seq_id - 1`, the same index the overlay and the
   * residue callbacks use. Chains numbered from 1 apiece would collide here, so
   * a count short of the residue total is the signal that two chains have been
   * folded onto one another.
   */
  it("gives every residue in the complex a distinct index", async () => {
    const structure = await structureFromPdb(BARNASE_BARSTAR);
    const byResidue = eachResidue(structure, () => null);

    expect(byResidue.size).toBe(BARNASE_RESIDUES + BARSTAR_RESIDUES);
  });

  it("assigns pLDDT ordinally, without skipping at the chain break", () => {
    const scores = Array.from(
      { length: BARNASE_RESIDUES + BARSTAR_RESIDUES },
      (_, i) => (i + 1) / 100
    );
    const lines = injectPlddtIntoPdb(BARNASE_BARSTAR, scores).split("\n");

    // Last of chain A takes the 8th score, first of chain B the 9th -- the
    // scores array is flat and separator-free, so the boundary costs no slot.
    expect(bFactorOf(lines[BARNASE_RESIDUES - 1] as string)).toBe("  8.00");
    expect(bFactorOf(lines[BARNASE_RESIDUES] as string)).toBe("  9.00");
  });
});

describe("sequenceTextFromEntries", () => {
  const barnase = "AQVINTFD";
  const barstar = "KKAVINGE";

  it("separates chains so a complex does not read as one sequence", () => {
    const entries: SequenceWrapperEntry[] = [
      { label: "A | 1", wrapper: fakeWrapper(barnase) },
      { label: "B | 2", wrapper: fakeWrapper(barstar) },
    ];

    expect(sequenceTextFromEntries(entries)).toBe(`${barnase}|${barstar}`);
  });

  it("leaves a single chain unseparated", () => {
    const entries: SequenceWrapperEntry[] = [
      { label: "A | 1", wrapper: fakeWrapper(barnase) },
    ];

    expect(sequenceTextFromEntries(entries)).toBe(barnase);
  });

  it("drops chains that did not resolve to a wrapper", () => {
    const entries: SequenceWrapperEntry[] = [
      { label: "A | 1", wrapper: fakeWrapper(barnase) },
      { label: "B | 2", wrapper: "No sequence available" },
    ];

    expect(sequenceTextFromEntries(entries)).toBe(barnase);
  });
});
