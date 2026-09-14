import { OrderedSet } from "molstar/lib/mol-data/int";
import {
  QueryContext,
  StructureElement,
  StructureProperties,
  StructureSelection,
} from "molstar/lib/mol-model/structure";
import type { ElementIndex, Structure } from "molstar/lib/mol-model/structure";
import { compile } from "molstar/lib/mol-script/runtime/query/compiler";
import {
  CHAIN_COLOR_PALETTE,
  chainColorMap,
} from "../../../common/chainColors";
import { BARNASE_BARSTAR_PDB } from "../__storybook__/barnaseBarstar";
import {
  chainExpression,
  chainsEqual,
  chainsFromStructure,
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
});

/**
 * The expression each chain's cartoon is built from, run through Mol*'s real
 * query compiler.
 *
 * The component tests above it stub out `tryCreateComponentFromExpression`, so
 * they would pass just as well with a misspelled property - `entityType` under
 * the wrong namespace, say - and the chains would come back empty only once a
 * browser drew them. Compiling it here is what pins the expression itself.
 */
describe("chainExpression", () => {
  let complex: Structure;

  /** Chain ids and residue count of whatever the expression selects. */
  function select(chainId: string) {
    const query = compile<StructureSelection>(chainExpression(chainId));
    const loci = StructureSelection.toLociWithSourceUnits(
      query(new QueryContext(complex))
    );

    const chains = new Set<string>();
    const residues = new Set<number>();
    const location = StructureElement.Location.create(loci.structure);

    for (const element of loci.elements) {
      location.unit = element.unit;

      OrderedSet.forEach(element.indices, (i) => {
        location.element = element.unit.elements[i] as ElementIndex;
        chains.add(StructureProperties.chain.auth_asym_id(location));
        residues.add(StructureProperties.residue.key(location));
      });
    }

    return { chains: [...chains], residueCount: residues.size };
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
