import { OrderedSet } from "molstar/lib/mol-data/int";
import type { ElementIndex, Structure } from "molstar/lib/mol-model/structure";
import {
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import { BARNASE_BARSTAR_PDB } from "../__storybook__/barnaseBarstar";
import { scanChains } from "../utils/chains";
import { lociForSelectionInStructure } from "../utils/residueLoci";
import { selectionKey, selectionResidues } from "../utils/selection";
import { structureFromPdb } from "./molstarStructure";

/**
 * A selection can name whole chains as well as individual residues, and the
 * chain half is what a click on a chain caption produces. Barnase occupies
 * residue indices 0-109 and barstar 110-198.
 */
describe("selecting whole chains", () => {
  let complex: Structure;
  let residuesByChain: Map<string, number[]>;

  beforeAll(async () => {
    complex = await structureFromPdb(BARNASE_BARSTAR_PDB);
    residuesByChain = scanChains(complex).residuesByChain;
  });

  /** Chain ids and residue count of whatever a loci covers. */
  function covered(loci: StructureElement.Loci) {
    const location = StructureElement.Location.create(loci.structure);
    const chains = new Set<string>();
    const residues = new Set<number>();

    for (const element of loci.elements) {
      location.unit = element.unit;
      OrderedSet.forEach(element.indices, (i) => {
        location.element = element.unit.elements[i] as ElementIndex;
        chains.add(StructureProperties.chain.auth_asym_id(location));
        residues.add(StructureProperties.residue.key(location));
      });
    }

    return { chains: [...chains].sort(), residueCount: residues.size };
  }

  it("resolves a whole chain to every residue on it", () => {
    const loci = lociForSelectionInStructure(complex, { chains: ["B"] });

    expect(loci).toBeDefined();
    expect(covered(loci as StructureElement.Loci)).toEqual({
      chains: ["B"],
      residueCount: 89,
    });
  });

  it("resolves residues and chains together", () => {
    const loci = lociForSelectionInStructure(complex, {
      chains: ["B"],
      residues: [0],
    });

    expect(covered(loci as StructureElement.Loci)).toEqual({
      chains: ["A", "B"],
      residueCount: 90,
    });
  });

  it("expands a chain to the residue indices the readout averages over", () => {
    expect(selectionResidues({ chains: ["B"] }, residuesByChain)).toHaveLength(
      89
    );
    expect(selectionResidues({ chains: ["A"] }, residuesByChain)).toHaveLength(
      110
    );
  });

  it("counts a residue once when a selected chain also carries it", () => {
    expect(
      selectionResidues({ chains: ["A"], residues: [0, 1] }, residuesByChain)
    ).toHaveLength(110);
  });

  /**
   * A hidden chain draws no cartoon, but Mol*'s focus representation builds its
   * own ball-and-stick from whatever is focused, in a part of the state tree
   * the chain's visibility does not reach. Subtracting hidden chains from the
   * loci is what keeps a hidden chain from showing up there.
   */
  describe("with a chain hidden", () => {
    it("resolves to nothing when the only selected chain is hidden", () => {
      expect(
        lociForSelectionInStructure(complex, { chains: ["B"] }, new Set(["B"]))
      ).toBeUndefined();
    });

    it("keeps the chains that are still shown", () => {
      const loci = lociForSelectionInStructure(
        complex,
        { chains: ["A", "B"] },
        new Set(["B"])
      );

      expect(covered(loci as StructureElement.Loci)).toEqual({
        chains: ["A"],
        residueCount: 110,
      });
    });

    it("drops a residue that sits on a hidden chain", () => {
      // Residue 110 is barstar's first.
      expect(
        lociForSelectionInStructure(
          complex,
          { residues: [110] },
          new Set(["B"])
        )
      ).toBeUndefined();
    });

    it("keeps a residue on a chain that is still shown", () => {
      const loci = lociForSelectionInStructure(
        complex,
        { residues: [0, 110] },
        new Set(["B"])
      );

      expect(covered(loci as StructureElement.Loci)).toEqual({
        chains: ["A"],
        residueCount: 1,
      });
    });

    it("is unaffected by hiding a chain the selection does not touch", () => {
      const loci = lociForSelectionInStructure(
        complex,
        { chains: ["B"] },
        new Set(["A"])
      );

      expect(covered(loci as StructureElement.Loci)).toEqual({
        chains: ["B"],
        residueCount: 89,
      });
    });
  });

  it("keys a chain selection distinctly from a residue selection", () => {
    expect(selectionKey({ chains: ["B"] })).not.toBe(
      selectionKey({ residues: [110] })
    );
  });

  it("reads the same selection to the same key whatever the order", () => {
    expect(selectionKey({ chains: ["B", "A"], residues: [2, 1] })).toBe(
      selectionKey({ chains: ["A", "B"], residues: [1, 2] })
    );
  });
});
