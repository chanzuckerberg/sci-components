import type { ElementIndex, Structure } from "molstar/lib/mol-model/structure";
import {
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import { BondType } from "molstar/lib/mol-model/structure/model/types";
import { elementLabel } from "molstar/lib/mol-theme/label";
import { MolScriptBuilder as MS } from "molstar/lib/mol-script/language/builder";
import type { Expression } from "molstar/lib/mol-script/language/expression";
import type { ChainRef } from "../ProteinStructureViewer.types";

/**
 * The polymer of one chain, as named in the file. What each chain's cartoon is
 * built from, and so what makes a chain a thing Mol* can hide on its own.
 *
 * Paired with `chainLigandExpression`: between them they cover everything on a
 * chain the viewer draws, split by what it draws it as. The polymer
 * restriction is the one Mol*'s `polymer-cartoon` preset applied, and is what
 * keeps a heme from being handed to a representation that can only trace a
 * backbone.
 */
export function chainPolymerExpression(chainId: string): Expression {
  return MS.struct.generator.atomGroups({
    "chain-test": MS.core.rel.eq([MS.ammp("auth_asym_id"), chainId]),
    "entity-test": MS.core.rel.eq([MS.ammp("entityType"), "polymer"]),
  });
}

/**
 * Bonds worth following out of a ligand: the ones holding it to the protein.
 *
 * Mol*'s own pair, and metallic coordination is the half that matters most -
 * a heme's iron is held to its histidine by a coordination bond and not a
 * covalent one, so covalent alone would leave every metalloprotein's cofactor
 * looking dropped in rather than bound.
 */
const CONNECTING_BOND = MS.core.flags.hasAny([
  MS.struct.bondProperty.flags(),
  MS.core.type.bitflags([
    // By name rather than by or-ing `BondType.Flag`, whose members are an
    // ambient const enum that `isolatedModules` will not let us read.
    BondType.fromNames(["covalent", "metal-coordination"]),
  ]),
]);

/**
 * The heteroatoms of one chain - ligands, ions, glycans, lipids - along with
 * the residues holding them, which is what its ball-and-stick is built from.
 *
 * `non-polymer` is the one entity type a PDB's HETATM records land under,
 * ligands and ions alike, so there is nothing finer to test here: the
 * distinction Mol*'s presets draw between their `ligand`, `ion` and `lipid`
 * components is a residue-name lookup made to give each a slightly different
 * style, and all three are sticks. `branched` is the separate type glycans
 * arrive as.
 *
 * Water is the third type and is left out of the seed. Every solvent molecule
 * drawn as sticks buries the structure they surround, which is why Mol* draws
 * them at 60% alpha rather than plain, and none of them is what "show the
 * ligands" asks for.
 *
 * One layer of bonds out from there, taken as whole residues, is what brings
 * the binding residue along - myoglobin's His93, say. Without it the heme
 * floats unattached in the middle of a cartoon it is visibly bonded to, and
 * the bond drawn to its iron ends in mid-air. One layer and no more: the
 * residue that holds the ligand, not that residue's own neighbours.
 *
 * Intersected back with the chain, so everything a chain is drawn with belongs
 * to that chain. A ligand bonded across an interface would otherwise leave the
 * partner chain's residue in this chain's component, somewhere hiding the
 * partner chain could not reach.
 */
export function chainLigandExpression(chainId: string): Expression {
  const onThisChain = MS.core.rel.eq([MS.ammp("auth_asym_id"), chainId]);

  return MS.struct.modifier.union([
    MS.struct.modifier.intersectBy({
      0: MS.struct.modifier.includeConnected({
        0: MS.struct.generator.atomGroups({
          "chain-test": onThisChain,
          "entity-test": MS.core.set.has([
            MS.set("non-polymer", "branched"),
            MS.ammp("entityType"),
          ]),
        }),
        "as-whole-residues": true,
        "bond-test": CONNECTING_BOND,
        "layer-count": 1,
      }),
      by: MS.struct.generator.atomGroups({ "chain-test": onThisChain }),
    }),
  ]);
}

/**
 * Matches how the sequence panel captions its chains, which reaches the same
 * label through Mol*'s own `getChainOptions`. Deriving it the same way is what
 * keeps a chain from going by one name in the legend and another in the panel.
 */
const CHAIN_LABEL_OPTIONS = {
  granularity: "chain" as const,
  hidePrefix: true,
  htmlStyling: false,
};

/** Mutable accumulator; the residues become the chain's range and count. */
interface ChainAccumulator {
  chainId: string;
  label: string;
  /** Polymer residues only, so a heteroatom-only chain holds none. */
  residues: Set<number>;
}

export interface ChainScan {
  /** The chains carrying polymer, ordered by where they start. */
  chains: ChainRef[];
  /**
   * Which polymer residues sit on each chain, ascending, by `chainId`. What a
   * whole-chain selection stands for when it has to be read residue by
   * residue - counting it, or averaging a score over it.
   */
  residuesByChain: Map<string, number[]>;
  /**
   * Every chain the file names and the label Mol* gives it, in the order they
   * first appear - including the chains `chains` leaves out for having no
   * polymer. What the load path draws from, which has to reach wider than what
   * the legend lists: a file can give a ligand a chain of its own, and it is
   * still something to render.
   */
  chainLabels: Map<string, string>;
}

/**
 * Reads the chains of a structure and the polymer residues on each.
 *
 * Residue indices are Mol*'s residue keys, counting residues in file order
 * across the whole structure, so what is reported here addresses the same
 * residues as `plddt`, `residueOverlay` and `selection`.
 *
 * Heteroatoms are drawn (see `chainLigandExpression`) but are not counted
 * here. A heme is a residue to the file and not to a reader: it is no part of
 * the sequence the panel lists, and averaging a confidence score over it would
 * divide by a residue that has none.
 *
 * Residues are gathered into a set rather than inferred from the ends: a chain
 * carrying several symmetry operators repeats each of its residues once per
 * operator, and a structure whose chains interleave leaves a chain's indices
 * non-contiguous. Neither is what a predicted complex looks like, but a range
 * would misread both.
 */
export function scanChains(structure: Structure): ChainScan {
  const accumulators = new Map<string, ChainAccumulator>();
  const location = StructureElement.Location.create(structure);

  for (const unit of structure.units) {
    location.unit = unit;

    for (let i = 0; i < unit.elements.length; i++) {
      location.element = unit.elements[i] as ElementIndex;

      const chainId = StructureProperties.chain.auth_asym_id(location);
      let chain = accumulators.get(chainId);

      if (!chain) {
        chain = {
          chainId,
          label: elementLabel(location, CHAIN_LABEL_OPTIONS),
          residues: new Set<number>(),
        };
        accumulators.set(chainId, chain);
      }

      if (StructureProperties.entity.type(location) !== "polymer") continue;

      chain.residues.add(StructureProperties.residue.key(location));
    }
  }

  // Sorted here rather than tracked as the walk goes, so that the range and
  // the count come off the one set and cannot disagree with it.
  const ordered = [...accumulators.values()]
    .filter((chain) => chain.residues.size > 0)
    .map((chain) => ({
      ...chain,
      residues: [...chain.residues].sort((a, b) => a - b),
    }))
    .sort((a, b) => (a.residues[0] ?? 0) - (b.residues[0] ?? 0));

  return {
    chainLabels: new Map(
      [...accumulators.values()].map(({ chainId, label }) => [chainId, label])
    ),
    chains: ordered.map(({ chainId, label, residues }) => ({
      chainId,
      endIndex: residues[residues.length - 1] ?? 0,
      label,
      residueCount: residues.length,
      startIndex: residues[0] ?? 0,
    })),
    residuesByChain: new Map(
      ordered.map(({ chainId, residues }) => [chainId, residues])
    ),
  };
}

/** The polymer chains of a structure, ordered by where they start. */
export function chainsFromStructure(structure: Structure): ChainRef[] {
  return scanChains(structure).chains;
}

/** True when the two lists name the same chains, in the same order. */
export function chainsEqual(a: ChainRef[], b: ChainRef[]): boolean {
  return (
    a.length === b.length &&
    a.every((chain, i) => {
      const other = b[i];
      return (
        other !== undefined &&
        chain.chainId === other.chainId &&
        chain.startIndex === other.startIndex &&
        chain.endIndex === other.endIndex &&
        chain.residueCount === other.residueCount
      );
    })
  );
}
