import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { StructureElement } from "molstar/lib/mol-model/structure";
import type { Structure } from "molstar/lib/mol-model/structure";
import type { SequenceWrapperEntry } from "../components/SequenceView/hooks/useSequenceWrappers";
import { sequenceTextFromEntries } from "../components/SequenceView/utils/sequenceText";
import { injectPlddtIntoPdb } from "../utils/plddt";
import { residueLabel, residueRefFromLoci } from "../utils/residueRef";
import {
  bFactorOf,
  eachResidue,
  lociForSeqId,
  structureFromPdb,
} from "./molstarStructure";

/**
 * Barnase (chain A) in complex with its inhibitor barstar (chain B), the first
 * eight residues of each chain, alpha carbons only. Real coordinates and
 * B-factors from an ESMFold co-fold of the two sequences, trimmed to keep the
 * fixture readable.
 *
 * Barstar keeps its original numbering, so it starts at 111 rather than 9. That
 * gap is deliberate: it is what tells a residue's ordinal position apart from
 * the number written against it, which the viewer must not confuse.
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

const RESIDUES_PER_CHAIN = 8;

/** Minimal stand-in for a Mol* sequence wrapper, which needs a live plugin. */
function fakeWrapper(sequence: string): SequenceWrapper.Any {
  return {
    length: sequence.length,
    residueLabel: (i: number) => sequence[i] as string,
  } as unknown as SequenceWrapper.Any;
}

describe("barnase-barstar complex", () => {
  let structure: Structure;

  beforeAll(async () => {
    structure = await structureFromPdb(BARNASE_BARSTAR);
  });

  /**
   * The index every residue-keyed API shares: `plddt`, `residueOverlay`,
   * `selectedResidue` and the residue callbacks. Two chains numbered from 1
   * apiece would collide here, and a chain numbered from 200 would run off the
   * end of `plddt` -- so it counts positions rather than reading numbers.
   */
  it("indexes residues by position, not by the number in the file", () => {
    const byResidue = eachResidue(structure, () => null);

    expect([...byResidue.keys()]).toEqual([
      ...Array(2 * RESIDUES_PER_CHAIN).keys(),
    ]);
  });

  it("assigns pLDDT ordinally, without skipping at the chain break", () => {
    const scores = Array.from(
      { length: 2 * RESIDUES_PER_CHAIN },
      (_, i) => (i + 1) / 100
    );
    const lines = injectPlddtIntoPdb(BARNASE_BARSTAR, scores).split("\n");

    // Last of chain A takes the 8th score, first of chain B the 9th: the
    // boundary costs no slot, matching the index above.
    expect(bFactorOf(lines[RESIDUES_PER_CHAIN - 1] as string)).toBe("  8.00");
    expect(bFactorOf(lines[RESIDUES_PER_CHAIN] as string)).toBe("  9.00");
  });
});

describe("residueRefFromLoci", () => {
  let structure: Structure;

  beforeAll(async () => {
    structure = await structureFromPdb(BARNASE_BARSTAR);
  });

  /**
   * `index` counts positions while `seqId` reports the file's own number, and
   * `chainId` says which chain it belongs to. Barstar's first residue is the
   * case that separates all three: ninth by position, numbered 111, on chain B.
   */
  it.each([
    [1, { chainId: "A", compId: "ALA", insCode: "", index: 0, seqId: 1 }],
    [
      111,
      {
        chainId: "B",
        compId: "LYS",
        insCode: "",
        index: RESIDUES_PER_CHAIN,
        seqId: 111,
      },
    ],
  ])("reports residue %i in every scheme at once", (seqId, expected) => {
    expect(residueRefFromLoci(lociForSeqId(structure, seqId))).toEqual(
      expected
    );
  });

  it("returns null for a loci pointing at nothing", () => {
    expect(residueRefFromLoci(StructureElement.Loci(structure, []))).toBeNull();
  });
});

describe("residueLabel", () => {
  it("names a residue by the file's numbering, not its position", () => {
    expect(
      residueLabel({
        chainId: "B",
        compId: "LYS",
        insCode: "",
        index: 8,
        seqId: 111,
      })
    ).toBe("LYS 111");
  });

  it("keeps the insertion code, which is part of the residue's name", () => {
    expect(
      residueLabel({
        chainId: "A",
        compId: "SER",
        insCode: "A",
        index: 3,
        seqId: 10,
      })
    ).toBe("SER 10A");
  });
});

/**
 * Insertion codes let one sequence number cover several residues -- `10`, `10A`,
 * `10B` -- and Mol* counts each as its own. The pLDDT injector has to agree: if
 * it read only the chain and the number it would spend one score on all three,
 * and every residue after them would take its neighbour's.
 */
describe("insertion codes", () => {
  const WITH_INS_CODES = [
    "ATOM      1  CA  MET A  10      10.000  10.000  10.000  1.00  0.00           C",
    "ATOM      2  CA  SER A  10A     13.800  10.000  10.000  1.00  0.00           C",
    "ATOM      3  CA  LYS A  11      17.600  10.000  10.000  1.00  0.00           C",
  ].join("\n");

  it("counts a residue and its insertion-coded neighbour separately", () => {
    const lines = injectPlddtIntoPdb(WITH_INS_CODES, [0.1, 0.2, 0.3]).split(
      "\n"
    );

    expect(lines.map((line) => bFactorOf(line))).toEqual([
      " 10.00",
      " 20.00",
      " 30.00",
    ]);
  });

  it("agrees with the index Mol* assigns", async () => {
    const structure = await structureFromPdb(WITH_INS_CODES);

    expect([...eachResidue(structure, () => null).keys()]).toEqual([0, 1, 2]);
    expect(residueRefFromLoci(lociForSeqId(structure, 10))).toEqual({
      chainId: "A",
      compId: "MET",
      insCode: "",
      index: 0,
      seqId: 10,
    });
  });
});

describe("sequenceTextFromEntries", () => {
  const barnase = "AQVINTFD";
  const barstar = "KKAVINGE";

  it("separates chains so a complex does not read as one sequence", () => {
    const entries: SequenceWrapperEntry[] = [
      { label: "A", wrapper: fakeWrapper(barnase) },
      { label: "B", wrapper: fakeWrapper(barstar) },
    ];

    expect(sequenceTextFromEntries(entries)).toBe(`${barnase}|${barstar}`);
  });

  it("leaves a single chain unseparated", () => {
    const entries: SequenceWrapperEntry[] = [
      { label: "A", wrapper: fakeWrapper(barnase) },
    ];

    expect(sequenceTextFromEntries(entries)).toBe(barnase);
  });

  it("drops chains that did not resolve to a wrapper", () => {
    const entries: SequenceWrapperEntry[] = [
      { label: "A", wrapper: fakeWrapper(barnase) },
      { label: "B", wrapper: "No sequence available" },
    ];

    expect(sequenceTextFromEntries(entries)).toBe(barnase);
  });
});
