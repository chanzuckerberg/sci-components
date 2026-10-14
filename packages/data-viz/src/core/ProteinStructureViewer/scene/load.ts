import type { Structure } from "molstar/lib/mol-model/structure";
import type { PluginContext } from "molstar/lib/mol-plugin/context";
import type {
  ChainRef,
  StructureLoadInfo,
} from "../ProteinStructureViewer.types";
import { scanChains } from "../utils/chains";
import { indexResidueAddresses } from "../utils/residueAddress";
import { detectStructureFormat } from "../utils/structureFormat";
import type { StructureSelector } from "./representation";

/** A structure parsed into a plugin, and what the rest of the viewer reads off it. */
export interface LoadedStructure {
  chains: ChainRef[];
  /** Every chain the file names and its label, ligand-only chains included. */
  chainLabels: Map<string, string>;
  /** Which residues sit on each chain, by `chainId`. */
  residuesByChain: Map<string, number[]>;
  /** Residue index by address. */
  addressIndex: Map<string, number>;
  /** The parsed structure's cell, or undefined when nothing was loaded. */
  structure?: StructureSelector;
  /** The parsed structure itself. */
  structureData?: Structure;
  atomCount: number;
}

export const NOTHING_LOADED: LoadedStructure = {
  addressIndex: new Map(),
  atomCount: 0,
  chainLabels: new Map(),
  chains: [],
  residuesByChain: new Map(),
};

/**
 * How a load went. A failure is handed back rather than thrown, so that each
 * caller can report it the way it reports things.
 */
export type LoadOutcome =
  | { ok: true; loaded: LoadedStructure }
  | { ok: false; error: unknown };

/**
 * Clears the plugin and parses the structure into it, reading off what the
 * rest of the viewer addresses it by. Nothing is drawn here.
 *
 * The format is detected from the text - PDB or mmCIF - and handed to Mol*.
 */
export async function parseStructure(
  plugin: PluginContext,
  structureText: string
): Promise<LoadOutcome> {
  try {
    await plugin.clear();

    const data = await plugin.builders.data.rawData({
      data: structureText,
      label: "Structure",
    });
    const trajectory = await plugin.builders.structure.parseTrajectory(
      data,
      detectStructureFormat(structureText)
    );
    const model = await plugin.builders.structure.createModel(trajectory);
    const structure = await plugin.builders.structure.createStructure(model, {
      name: "model",
      params: {},
    });

    const data3d = structure.data;
    if (!data3d) return { loaded: NOTHING_LOADED, ok: true };

    const { chainLabels, chains, residuesByChain } = scanChains(data3d);

    return {
      loaded: {
        addressIndex: indexResidueAddresses(data3d),
        atomCount: data3d.elementCount,
        chainLabels,
        chains,
        residuesByChain,
        structure,
        structureData: data3d,
      },
      ok: true,
    };
  } catch (error) {
    return { error, ok: false };
  }
}

/** What a load reports to a consumer. */
export function loadInfo(loaded: LoadedStructure): StructureLoadInfo {
  return {
    atomCount: loaded.atomCount,
    chains: loaded.chains,
    residueCount: loaded.chains.reduce(
      (count, chain) => count + chain.residueCount,
      0
    ),
  };
}
