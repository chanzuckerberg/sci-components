import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { OrderedSet } from "molstar/lib/mol-data/int";
import { StructureElement } from "molstar/lib/mol-model/structure";
import type { Structure } from "molstar/lib/mol-model/structure";
import type { SequenceWrapperEntry } from "../components/SequenceView/hooks/useSequenceWrappers";
import { sequenceTextFromEntries } from "../components/SequenceView/utils/sequenceText";
import { extendToRange } from "../components/SequenceView/utils/loci";
import { BARNASE_BARSTAR_PDB } from "../__storybook__/barnaseBarstar";
import { injectPlddtIntoPdb } from "../utils/plddt";
import { residueLabel, residueRefFromLoci } from "../utils/residueRef";
import {
  bFactorOf,
  eachResidue,
  lociForSeqId,
  structureFromPdb,
} from "./molstarStructure";

/**
 * The story's complex, cut down to the first `residuesPerChain` residues of each
 * chain and to alpha carbons alone.
 *
 * Deriving it rather than pasting a second copy keeps the two from drifting, and
 * carries over the property the tests turn on: barstar keeps its original
 * numbering, so it starts at 111 rather than 9, and a residue's position in the
 * file stops matching the number written against it.
 */
function excerpt(pdb: string, residuesPerChain: number): string {
  const seen = new Map<string, Set<string>>();

  return pdb
    .split("\n")
    .filter((line) => {
      if (line.substring(12, 16) !== " CA ") return false;

      const chain = line.substring(21, 22);
      const residues = seen.get(chain) ?? new Set<string>();
      seen.set(chain, residues);
      residues.add(line.substring(22, 27));

      return residues.size <= residuesPerChain;
    })
    .join("\n");
}

const RESIDUES_PER_CHAIN = 8;

const BARNASE_BARSTAR = excerpt(BARNASE_BARSTAR_PDB, RESIDUES_PER_CHAIN);

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
      { id: "1:0:0", label: "A", wrapper: fakeWrapper(barnase) },
      { id: "2:1:0", label: "B", wrapper: fakeWrapper(barstar) },
    ];

    expect(sequenceTextFromEntries(entries)).toBe(`${barnase}|${barstar}`);
  });

  it("leaves a single chain unseparated", () => {
    const entries: SequenceWrapperEntry[] = [
      { id: "1:0:0", label: "A", wrapper: fakeWrapper(barnase) },
    ];

    expect(sequenceTextFromEntries(entries)).toBe(barnase);
  });

  it("drops chains that did not resolve to a wrapper", () => {
    const entries: SequenceWrapperEntry[] = [
      { id: "1:0:0", label: "A", wrapper: fakeWrapper(barnase) },
      { id: "2:1:0", label: "B", wrapper: "No sequence available" },
    ];

    expect(sequenceTextFromEntries(entries)).toBe(barnase);
  });
});

/**
 * Dragging across the sequence extends the selection to a range, which is only
 * meaningful within one unit: element indices are unit-local, and the extended
 * loci is built on the anchor's unit alone. Endpoints that do not both resolve
 * to a single element of the same unit are left alone rather than collapsed
 * onto one and reinterpreted.
 */
describe("extendToRange", () => {
  let structure: Structure;

  beforeAll(async () => {
    structure = await structureFromPdb(BARNASE_BARSTAR);
  });

  it("extends a drag within one unit", () => {
    const anchor = lociForSeqId(structure, 1);
    const extended = extendToRange(lociForSeqId(structure, 4), anchor);

    expect(OrderedSet.size(extended.elements[0].indices)).toBe(4);
  });

  it("leaves a drag spanning two units unextended", () => {
    const anchor = lociForSeqId(structure, 1);
    const other = lociForSeqId(structure, 111);

    expect(anchor.elements[0].unit).not.toBe(other.elements[0].unit);
    expect(extendToRange(other, anchor)).toBe(other);
  });

  it("leaves an endpoint covering several units unextended", () => {
    const anchor = lociForSeqId(structure, 1);
    const multiUnit = StructureElement.Loci(structure, [
      ...anchor.elements,
      ...lociForSeqId(structure, 111).elements,
    ]);

    expect(extendToRange(multiUnit, anchor)).toBe(multiUnit);
  });
});
