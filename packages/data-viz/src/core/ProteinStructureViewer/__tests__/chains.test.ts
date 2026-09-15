/* eslint-disable sonarjs/no-duplicate-string */
import { OrderedSet } from "molstar/lib/mol-data/int";
import {
  QueryContext,
  StructureElement,
  StructureProperties,
  StructureSelection,
} from "molstar/lib/mol-model/structure";
import type { ElementIndex, Structure } from "molstar/lib/mol-model/structure";
import type { Expression } from "molstar/lib/mol-script/language/expression";
import { compile } from "molstar/lib/mol-script/runtime/query/compiler";
import {
  CHAIN_COLOR_PALETTE,
  chainColorMap,
} from "../../../common/chainColors";
import { BARNASE_BARSTAR_PDB } from "../__storybook__/barnaseBarstar";
import { MYOGLOBIN_PDB } from "../__storybook__/myoglobin";
import {
  chainLigandExpression,
  chainPolymerExpression,
  chainsEqual,
  chainsFromStructure,
  scanChains,
} from "../utils/chains";
import { structureFromPdb } from "./molstarStructure";

/**
 * Barnase occupies residue indices 0-109 and barstar 110-198, and barstar is
 * numbered from 111 rather than 1. Those two facts are what the chain model has
 * to hold apart: the ranges below are positions, not the numbers in the file.
 */
describe("chainsFromStructure", () => {
  let complex: Structure;

  beforeAll(async () => {
    complex = await structureFromPdb(BARNASE_BARSTAR_PDB);
  });

  it("reports both chains with the index range each covers", () => {
    expect(chainsFromStructure(complex)).toEqual([
      {
        chainId: "A",
        endIndex: 109,
        label: "A",
        residueCount: 110,
        startIndex: 0,
      },
      {
        chainId: "B",
        endIndex: 198,
        label: "B",
        residueCount: 89,
        startIndex: 110,
      },
    ]);
  });

  it("leaves no gap at the chain break, which is what shared indexing means", () => {
    const [barnase, barstar] = chainsFromStructure(complex);

    expect(barstar?.startIndex).toBe((barnase?.endIndex ?? 0) + 1);
  });

  it("counts a single-chain structure as one chain", async () => {
    const single = await structureFromPdb(
      [
        "ATOM      1  CA  MET A   1      10.000  10.000  10.000  1.00  0.00           C",
        "ATOM      2  CA  SER A   2      13.800  10.000  10.000  1.00  0.00           C",
        "ATOM      3  CA  LYS A   3      17.600  10.000  10.000  1.00  0.00           C",
      ].join("\n")
    );

    expect(chainsFromStructure(single)).toEqual([
      {
        chainId: "A",
        endIndex: 2,
        label: "A",
        residueCount: 3,
        startIndex: 0,
      },
    ]);
  });

  /**
   * A residue and its insertion-coded neighbour are two residues, so the chain
   * carrying them has to count two. Sharing a sequence number is what would
   * otherwise collapse them.
   */
  it("counts an insertion-coded residue separately", async () => {
    const withInsCode = await structureFromPdb(
      [
        "ATOM      1  CA  MET A  10      10.000  10.000  10.000  1.00  0.00           C",
        "ATOM      2  CA  SER A  10A     13.800  10.000  10.000  1.00  0.00           C",
        "ATOM      3  CA  LYS A  11      17.600  10.000  10.000  1.00  0.00           C",
      ].join("\n")
    );

    expect(chainsFromStructure(withInsCode)[0]?.residueCount).toBe(3);
  });

  /**
   * A heme and a hydroxide are residues to the file, and occupy indices in the
   * shared index space, but they are not the chain's sequence. Counting them
   * would report 155 residues for a chain the sequence panel lists 153 of, and
   * would average a confidence score over two residues that have none.
   */
  it("counts a chain's polymer, not the heteroatoms on it", async () => {
    const myoglobin = await structureFromPdb(MYOGLOBIN_PDB);

    expect(chainsFromStructure(myoglobin)).toEqual([
      {
        chainId: "A",
        endIndex: 152,
        label: "A",
        residueCount: 153,
        startIndex: 0,
      },
    ]);
  });

  /**
   * Such a chain has no sequence to describe, so there is nothing for the
   * legend to list or the readout to average - but it is still drawn, which
   * `chainLabels` is what carries (see the load path).
   */
  it("leaves out a chain holding nothing but heteroatoms", async () => {
    const separateLigandChain = await structureFromPdb(
      [
        "ATOM      1  CA  MET A   1      10.000  10.000  10.000  1.00  0.00           C",
        "ATOM      2  CA  SER A   2      13.800  10.000  10.000  1.00  0.00           C",
        "HETATM    3 ZN    ZN B 101      20.000  10.000  10.000  1.00  0.00          ZN",
      ].join("\n")
    );
    const scan = scanChains(separateLigandChain);

    expect(scan.chains.map((chain) => chain.chainId)).toEqual(["A"]);
    expect([...scan.chainLabels.keys()]).toEqual(["A", "B"]);
  });
});

/**
 * What the expression selects: which chains it reached into, how many residues
 * it covers, and which components those residues are.
 */
function selectFrom(structure: Structure, expression: Expression) {
  const loci = StructureSelection.toLociWithSourceUnits(
    compile<StructureSelection>(expression)(new QueryContext(structure))
  );

  const chains = new Set<string>();
  const components = new Set<string>();
  const residues = new Set<number>();
  const location = StructureElement.Location.create(loci.structure);

  for (const element of loci.elements) {
    location.unit = element.unit;

    OrderedSet.forEach(element.indices, (i) => {
      location.element = element.unit.elements[i] as ElementIndex;
      chains.add(StructureProperties.chain.auth_asym_id(location));
      components.add(StructureProperties.atom.label_comp_id(location));
      residues.add(StructureProperties.residue.key(location));
    });
  }

  return {
    chains: [...chains],
    components: [...components].sort(),
    residueCount: residues.size,
  };
}

/**
 * The expressions each chain is drawn from, run through Mol*'s real query
 * compiler.
 *
 * The component tests above them stub out `tryCreateComponentFromExpression`,
 * so they would pass just as well with a misspelled property - `entityType`
 * under the wrong namespace, say - and the chains would come back empty only
 * once a browser drew them. Compiling the expressions here is what pins them.
 */
describe("chainPolymerExpression", () => {
  let complex: Structure;

  function select(chainId: string) {
    const { chains, residueCount } = selectFrom(
      complex,
      chainPolymerExpression(chainId)
    );

    return { chains, residueCount };
  }

  beforeAll(async () => {
    complex = await structureFromPdb(BARNASE_BARSTAR_PDB);
  });

  it("selects one chain and the whole of it", () => {
    expect(select("A")).toEqual({ chains: ["A"], residueCount: 110 });
  });

  it("selects the other chain without reaching into the first", () => {
    expect(select("B")).toEqual({ chains: ["B"], residueCount: 89 });
  });

  it("selects nothing for a chain the structure does not have", () => {
    expect(select("Z")).toEqual({ chains: [], residueCount: 0 });
  });

  /**
   * The cartoon has no backbone to trace through a heme, so the polymer test
   * is what keeps one out of it - and what leaves it to the ball-and-stick.
   */
  it("leaves the heteroatoms on a chain out", async () => {
    const myoglobin = await structureFromPdb(MYOGLOBIN_PDB);

    expect(selectFrom(myoglobin, chainPolymerExpression("A"))).toMatchObject({
      residueCount: 153,
    });
  });
});

/**
 * Myoglobin's chain A carries both kinds of heteroatom the fix is about: HEM,
 * a ligand, and OH, an ion. Both arrive as `non-polymer`, which is the whole
 * reason one expression covers them. His93 holds the heme's iron, which is why
 * it comes too.
 */
describe("chainLigandExpression", () => {
  let myoglobin: Structure;

  /** Residues selected on the chain, as `name` plus the file's own number. */
  function residuesOn(structure: Structure, chainId: string): string[] {
    const loci = StructureSelection.toLociWithSourceUnits(
      compile<StructureSelection>(chainLigandExpression(chainId))(
        new QueryContext(structure)
      )
    );
    const named = new Set<string>();
    const location = StructureElement.Location.create(loci.structure);

    for (const element of loci.elements) {
      location.unit = element.unit;

      OrderedSet.forEach(element.indices, (i) => {
        location.element = element.unit.elements[i] as ElementIndex;
        named.add(
          `${StructureProperties.atom.label_comp_id(location)} ${StructureProperties.residue.auth_seq_id(location)}`
        );
      });
    }

    return [...named].sort();
  }

  beforeAll(async () => {
    myoglobin = await structureFromPdb(MYOGLOBIN_PDB);
  });

  it("selects the ligand and the ion on the chain", () => {
    expect(selectFrom(myoglobin, chainLigandExpression("A"))).toMatchObject({
      chains: ["A"],
      components: ["HEM", "HIS", "OH"],
    });
  });

  /**
   * The heme is held to the protein by a coordination bond from its iron to
   * His93. Drawing the heme alone leaves it floating in the middle of a
   * cartoon it is visibly bonded to, with the bond ending in mid-air.
   *
   * One layer of bonds, so the residue holding the ligand comes and its own
   * backbone neighbours - 92 and 94 - do not.
   */
  it("brings the residue holding the ligand, and no further", () => {
    expect(residuesOn(myoglobin, "A")).toEqual(["HEM 155", "HIS 93", "OH 154"]);
  });

  it("selects nothing on a chain with no heteroatoms", async () => {
    const complex = await structureFromPdb(BARNASE_BARSTAR_PDB);

    expect(selectFrom(complex, chainLigandExpression("A"))).toEqual({
      chains: [],
      components: [],
      residueCount: 0,
    });
  });

  /**
   * Water is a third entity type, and a structure's worth of it drawn as
   * sticks buries the structure it surrounds.
   */
  it("leaves water out while taking the ion beside it", async () => {
    const solvated = await structureFromPdb(
      [
        "ATOM      1  CA  MET A   1      10.000  10.000  10.000  1.00  0.00           C",
        "ATOM      2  CA  SER A   2      13.800  10.000  10.000  1.00  0.00           C",
        "HETATM    3 ZN    ZN A 101      20.000  10.000  10.000  1.00  0.00          ZN",
        "HETATM    4  O   HOH A 201      30.000  10.000  10.000  1.00  0.00           O",
      ].join("\n")
    );

    expect(selectFrom(solvated, chainLigandExpression("A"))).toEqual({
      chains: ["A"],
      components: ["ZN"],
      residueCount: 1,
    });
  });

  /**
   * A zinc bonded to a cysteine on its own chain and a histidine on another,
   * which is what a metal site at an interface looks like.
   *
   * Everything a chain is drawn with has to belong to that chain, or hiding
   * the chain a residue sits on could not reach it. The cysteine is what keeps
   * this honest: it proves the expansion ran at all, so the absent histidine
   * is the chain constraint at work rather than a bond that never formed.
   */
  it("does not reach across a bond into another chain", async () => {
    const bridged = await structureFromPdb(
      [
        "ATOM      1  N   CYS A   1      10.000  10.000  10.000  1.00  0.00           N",
        "ATOM      2  CA  CYS A   1      11.400  10.000  10.000  1.00  0.00           C",
        "ATOM      3  C   CYS A   1      12.000  11.400  10.000  1.00  0.00           C",
        "ATOM      4  O   CYS A   1      13.200  11.600  10.000  1.00  0.00           O",
        "ATOM      5  CB  CYS A   1      11.900   9.000  11.100  1.00  0.00           C",
        "ATOM      6  SG  CYS A   1      13.700   8.900  11.200  1.00  0.00           S",
        "ATOM      7  N   HIS B   1      20.000  20.000  20.000  1.00  0.00           N",
        "ATOM      8  CA  HIS B   1      21.400  20.000  20.000  1.00  0.00           C",
        "ATOM      9  C   HIS B   1      22.000  21.400  20.000  1.00  0.00           C",
        "ATOM     10  O   HIS B   1      23.200  21.600  20.000  1.00  0.00           O",
        "ATOM     11  CB  HIS B   1      21.900  19.000  21.100  1.00  0.00           C",
        "ATOM     12  NE2 HIS B   1      15.500   8.900  11.200  1.00  0.00           N",
        "HETATM   13 ZN    ZN A 101      14.000   8.900  13.500  1.00  0.00          ZN",
        "CONECT    6   13",
        "CONECT   12   13",
        "CONECT   13    6   12",
      ].join("\n")
    );

    expect(residuesOn(bridged, "A")).toEqual(["CYS 1", "ZN 101"]);
  });
});

describe("chainsEqual", () => {
  const chains = [
    { chainId: "A", endIndex: 9, label: "A", residueCount: 10, startIndex: 0 },
  ];

  it("accepts a list against itself", () => {
    expect(chainsEqual(chains, [...chains])).toBe(true);
  });

  it("rejects a list whose ranges moved", () => {
    expect(
      chainsEqual(chains, [{ ...chains[0]!, endIndex: 8, residueCount: 9 }])
    ).toBe(false);
  });

  it("rejects a list with a chain added", () => {
    expect(
      chainsEqual(chains, [
        ...chains,
        {
          chainId: "B",
          endIndex: 19,
          label: "B",
          residueCount: 10,
          startIndex: 10,
        },
      ])
    ).toBe(false);
  });
});

describe("chainColorMap", () => {
  it("walks the palette in chain order", () => {
    expect(chainColorMap(["A", "B"])).toEqual(
      new Map([
        ["A", CHAIN_COLOR_PALETTE[0]],
        ["B", CHAIN_COLOR_PALETTE[1]],
      ])
    );
  });

  it("wraps around for more chains than the palette holds", () => {
    const ids = CHAIN_COLOR_PALETTE.map((_, i) => `chain-${i}`);
    const colors = chainColorMap([...ids, "one-past-the-end"]);

    expect(colors.get("one-past-the-end")).toBe(CHAIN_COLOR_PALETTE[0]);
  });

  /**
   * Overriding a chain must not shift the chains after it, or recoloring one
   * would silently repaint the rest.
   */
  it("spends a palette slot on an overridden chain anyway", () => {
    const colors = chainColorMap(["A", "B"], { A: "#123456" });

    expect(colors.get("A")).toBe("#123456");
    expect(colors.get("B")).toBe(CHAIN_COLOR_PALETTE[1]);
  });
});
