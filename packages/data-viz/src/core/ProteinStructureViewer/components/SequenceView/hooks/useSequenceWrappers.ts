import { Structure } from "molstar/lib/mol-model/structure";
import type { StructureSelectionManager } from "molstar/lib/mol-plugin-state/manager/structure/selection";
import { PluginStateObject as PSO } from "molstar/lib/mol-plugin-state/objects";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import {
  getChainOptions,
  getModelEntityOptions,
  getOperatorOptions,
  getSequenceWrapper,
  getStructureOptions,
  type SequenceView as MolstarSequenceView,
} from "molstar/lib/mol-plugin-ui/sequence";
import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { StateSelection } from "molstar/lib/mol-state/state/selection";
import { arrayEqual } from "molstar/lib/mol-util";
import { ParamDefinition as PD } from "molstar/lib/mol-util/param-definition";
import { useCallback, useEffect, useState } from "react";
import { usePlugin } from "../../../hooks/usePlugin";
import { useSubscribe } from "../../../hooks/useSubscribe";

/** One chain's residues, or a placeholder string when it has none to show. */
export interface SequenceWrapperEntry {
  wrapper: string | SequenceWrapper.Any;
  /** Chain the entry covers, as Mol* names it. */
  label: string;
}

interface SequenceViewState {
  structureOptions: { options: [string, string][]; all: Structure[] };
  structure: Structure;
  structureRef: string;
  modelEntityId: string;
  chainGroupId: number;
  operatorKey: string;
}

export interface SequenceWrappers {
  /** True while no structure is loaded, so there is nothing to show. */
  isEmpty: boolean;
  entries: SequenceWrapperEntry[];
  /** Total residues across every entry that holds a wrapper. */
  residueCount: number;
}

const EMPTY_STATE: SequenceViewState = {
  chainGroupId: -1,
  modelEntityId: "",
  operatorKey: "",
  structure: Structure.Empty,
  structureOptions: { all: [], options: [] },
  structureRef: "",
};

function readStructure(plugin: PluginUIContext, ref: string): Structure {
  const cell = plugin.state.data.select(ref)[0];
  if (!ref || !cell || !cell.obj) return Structure.Empty;
  return (cell.obj as PSO.Molecule.Structure).data;
}

/** Picks the first structure, entity, chain, and operator Mol* offers. */
function readInitialState(plugin: PluginUIContext): SequenceViewState {
  const structureOptions = getStructureOptions(plugin.state.data);
  const structureRef = (structureOptions.options[0] as [string, string])[0];
  const structure = readStructure(plugin, structureRef);
  const modelEntityId = (
    getModelEntityOptions(structure)[0] as [string, string]
  )[0];
  const chainGroupId = (
    getChainOptions(structure, modelEntityId)[0] as [number, string]
  )[0];
  const operatorKey = (
    getOperatorOptions(structure, modelEntityId, chainGroupId)[0] as [
      string,
      string,
    ]
  )[0];

  return {
    chainGroupId,
    modelEntityId,
    operatorKey,
    structure,
    structureOptions,
    structureRef,
  };
}

function buildParams(state: SequenceViewState) {
  const { modelEntityId, structure, structureOptions } = state;
  const chainOptions = getChainOptions(structure, modelEntityId);

  return {
    chain: PD.Select((chainOptions[0] as [number, string])[0], chainOptions, {
      shortLabel: true,
    }),
    structure: PD.Select(
      (structureOptions.options[0] as [string, string])[0],
      structureOptions.options,
      { shortLabel: true }
    ),
  };
}

/** One entry per chain, in Mol*'s entity / chain / operator order. */
function buildEntries(
  structure: Structure,
  selection: StructureSelectionManager,
  _params: MolstarSequenceView["params"]
): SequenceWrapperEntry[] {
  const entries: SequenceWrapperEntry[] = [];

  for (const [modelEntityId] of getModelEntityOptions(structure)) {
    for (const [chainGroupId, cLabel] of getChainOptions(
      structure,
      modelEntityId
    )) {
      for (const [operatorKey] of getOperatorOptions(
        structure,
        modelEntityId,
        chainGroupId
      )) {
        entries.push({
          // The chain alone. Mol* pairs this with an entity label for its
          // chain dropdown, which this panel does not render; for a
          // coordinates-only file that half degrades to "Polymer 1 (PDB)".
          label: cLabel,
          wrapper: getSequenceWrapper(
            { chainGroupId, modelEntityId, operatorKey, structure },
            selection
          ),
        });
      }
    }
  }

  return entries;
}

function countResidues(entries: SequenceWrapperEntry[]): number {
  return entries.reduce(
    (sum, entry) =>
      sum + (typeof entry.wrapper === "string" ? 0 : entry.wrapper.length),
    0
  );
}

/**
 * The residue wrappers for every chain of the loaded structure, resynced
 * whenever Mol* creates, updates, or removes a structure object.
 *
 * The wrappers read the live selection, so they are rebuilt on each render
 * rather than memoized; that is what keeps the grid's dimming in step with a
 * selection made in the 3D view.
 */
export function useSequenceWrappers(): SequenceWrappers {
  const plugin = usePlugin();
  const [state, setState] = useState<SequenceViewState>(EMPTY_STATE);

  const sync = useCallback(() => {
    const structureOptions = getStructureOptions(plugin.state.data);
    if (arrayEqual(structureOptions.all, state.structureOptions.all)) return;
    setState(readInitialState(plugin));
  }, [plugin, state.structureOptions.all]);

  useEffect(() => {
    if (
      plugin.state.data.select(
        StateSelection.Generators.rootsOfType(PSO.Molecule.Structure)
      ).length > 0
    ) {
      setState(readInitialState(plugin));
    }
    // Mount only: later structures arrive through the subscriptions below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useSubscribe(plugin.state.events.object.updated, ({ ref, obj }) => {
    if (
      ref === state.structureRef &&
      obj &&
      obj.type === PSO.Molecule.Structure.type &&
      obj.data !== state.structure
    ) {
      sync();
    }
  });

  useSubscribe(plugin.state.events.object.created, ({ obj }) => {
    if (obj && obj.type === PSO.Molecule.Structure.type) sync();
  });

  useSubscribe(plugin.state.events.object.removed, ({ obj }) => {
    if (obj && obj.type === PSO.Molecule.Structure.type) sync();
  });

  const structure = readStructure(plugin, state.structureRef);
  if (structure === Structure.Empty) {
    return { entries: [], isEmpty: true, residueCount: 0 };
  }

  const entries = buildEntries(
    structure,
    plugin.managers.structure.selection,
    buildParams(state) as unknown as MolstarSequenceView["params"]
  );

  return { entries, isEmpty: false, residueCount: countResidues(entries) };
}
