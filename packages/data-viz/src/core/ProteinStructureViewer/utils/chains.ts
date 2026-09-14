import type { ElementIndex, Structure } from "molstar/lib/mol-model/structure";
import {
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import { elementLabel } from "molstar/lib/mol-theme/label";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { MolScriptBuilder as MS } from "molstar/lib/mol-script/language/builder";
import type { Expression } from "molstar/lib/mol-script/language/expression";
import type { ChainRef } from "../ProteinStructureViewer.types";

/**
 * The polymer of one chain, as named in the file. What each chain's cartoon is
 * built from, and so what makes a chain a thing Mol* can hide on its own.
 *
 * The polymer restriction is the one Mol*'s `polymer-cartoon` preset used to
 * apply before the chains were split apart, and keeps water and ligands out of
 * the cartoon.
 */
export function chainExpression(chainId: string): Expression {
  return MS.struct.generator.atomGroups({
    "chain-test": MS.core.rel.eq([MS.ammp("auth_asym_id"), chainId]),
    "entity-test": MS.core.rel.eq([MS.ammp("entityType"), "polymer"]),
  });
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

/** Mutable accumulator; `residues` is dropped before the chain is returned. */
interface ChainAccumulator extends ChainRef {
  residues: Set<number>;
}

export interface ChainScan {
  /** The chains, ordered by where they start. */
  chains: ChainRef[];
  /**
   * Which residues sit on each chain, ascending, by `chainId`. What a
   * whole-chain selection stands for when it has to be read residue by
   * residue - counting it, or averaging a score over it.
   */
  residuesByChain: Map<string, number[]>;
}

/**
 * Reads the chains of a structure and the residues on each.
 *
 * Residue indices are Mol*'s residue keys, counting residues in file order
 * across the whole structure, so what is reported here addresses the same
 * residues as `plddt`, `residueOverlay` and `selection`.
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
      const index = StructureProperties.residue.key(location);
      const chain = accumulators.get(chainId);

      if (!chain) {
        accumulators.set(chainId, {
          chainId,
          endIndex: index,
          label: elementLabel(location, CHAIN_LABEL_OPTIONS),
          residueCount: 0,
          residues: new Set([index]),
          startIndex: index,
        });
        continue;
      }

      chain.residues.add(index);
      if (index < chain.startIndex) chain.startIndex = index;
      if (index > chain.endIndex) chain.endIndex = index;
    }
  }

  const ordered = [...accumulators.values()].sort(
    (a, b) => a.startIndex - b.startIndex
  );

  return {
    chains: ordered.map(({ residues, ...chain }) => ({
      ...chain,
      residueCount: residues.size,
    })),
    residuesByChain: new Map(
      ordered.map(({ chainId, residues }) => [
        chainId,
        [...residues].sort((a, b) => a - b),
      ])
    ),
  };
}

/** The chains of a structure, ordered by where they start. */
export function chainsFromStructure(structure: Structure): ChainRef[] {
  return scanChains(structure).chains;
}

/**
 * The chains of every structure loaded into a plugin. Several structures are
 * flattened into one result, which matches how the residue index space already
 * spans them.
 */
export function scanChainsInPlugin(plugin: PluginUIContext): ChainScan {
  const chains: ChainRef[] = [];
  const residuesByChain = new Map<string, number[]>();

  for (const entry of plugin.managers.structure.hierarchy.current.structures) {
    const structure = entry.cell.obj?.data;
    if (!structure) continue;

    const scan = scanChains(structure);
    chains.push(...scan.chains);
    for (const [chainId, residues] of scan.residuesByChain) {
      residuesByChain.set(chainId, residues);
    }
  }

  return { chains, residuesByChain };
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
