import { OrderedSet } from "molstar/lib/mol-data/int";
import type {
  ElementIndex,
  Structure,
  Unit,
} from "molstar/lib/mol-model/structure";
import {
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import type { StructureSelection } from "../ProteinStructureViewer.types";
import { isEmptySelection } from "./selection";

/**
 * Every atom the predicate accepts, as geometry Mol* can focus, frame and mark,
 * or undefined when it accepts none.
 *
 * One pass over the structure rather than a pass per residue: a whole-chain
 * selection names hundreds of residues, and resolving them one at a time would
 * walk the structure once for each.
 *
 * Atoms are bucketed by the unit they belong to because element indices are
 * unit-local. That bucketing is also what lets a result span a chain break: it
 * carries an entry per unit, which is what a range across two chains needs and
 * what a single unit-local entry cannot express.
 *
 * Whole residues are collected rather than one atom each, since the caller
 * frames the camera on the loci's bounding sphere and a lone atom would zoom
 * far closer than the residue warrants.
 */
function lociMatching(
  structure: Structure,
  matches: (location: StructureElement.Location) => boolean
): StructureElement.Loci | undefined {
  const location = StructureElement.Location.create(structure);
  const elements: { unit: Unit; indices: StructureElement.UnitIndex[] }[] = [];

  for (const unit of structure.units) {
    location.unit = unit;
    const indices: StructureElement.UnitIndex[] = [];

    for (let i = 0; i < unit.elements.length; i++) {
      location.element = unit.elements[i] as ElementIndex;
      if (matches(location)) indices.push(i as StructureElement.UnitIndex);
    }

    if (indices.length > 0) elements.push({ indices, unit });
  }

  if (elements.length === 0) return undefined;

  return StructureElement.Loci(
    structure,
    elements.map(({ indices, unit }) => ({
      indices: OrderedSet.ofSortedArray(indices),
      unit,
    }))
  );
}

/**
 * Every atom of the residues a selection covers, within one structure.
 *
 * `hiddenChains` is subtracted from the result. A hidden chain is not drawn, so
 * geometry built from it would have nothing to sit on: Mol*'s focus
 * representation draws its own ball-and-stick from whatever is focused, in a
 * part of the state tree the chain's own visibility does not reach, and a
 * hidden chain left in the loci would keep showing up there after its cartoon
 * had gone.
 */
export function lociForSelectionInStructure(
  structure: Structure,
  selection: StructureSelection,
  hiddenChains?: ReadonlySet<string>
): StructureElement.Loci | undefined {
  if (isEmptySelection(selection)) return undefined;

  const residues = new Set(selection.residues ?? []);
  const chains = new Set(selection.chains ?? []);

  return lociMatching(structure, (location) => {
    const chainId = StructureProperties.chain.auth_asym_id(location);
    if (hiddenChains?.has(chainId)) return false;

    return (
      residues.has(StructureProperties.residue.key(location)) ||
      chains.has(chainId)
    );
  });
}

/**
 * Every atom of the residues between two 0-based indices, inclusive.
 *
 * A contiguous span is tested by comparison rather than by expanding it into a
 * set of indices: this runs on every residue a drag crosses, and a drag can
 * span the whole structure.
 */
export function lociForResidueRange(
  structure: Structure,
  min: number,
  max: number
): StructureElement.Loci | undefined {
  return lociMatching(structure, (location) => {
    const index = StructureProperties.residue.key(location);
    return index >= min && index <= max;
  });
}

/**
 * The same, across every structure loaded into a plugin. Results are merged
 * into the first structure that matched: a loci belongs to one structure, and
 * the residue index space already spans them as though they were one.
 */
export function lociForSelection(
  plugin: PluginUIContext,
  selection: StructureSelection,
  hiddenChains?: ReadonlySet<string>
): StructureElement.Loci | undefined {
  for (const entry of plugin.managers.structure.hierarchy.current.structures) {
    const structure = entry.cell.obj?.data;
    if (!structure) continue;

    const loci = lociForSelectionInStructure(
      structure,
      selection,
      hiddenChains
    );
    if (loci) return loci;
  }

  return undefined;
}

/**
 * Every atom of the residue at a 0-based index.
 *
 * The inverse of `residueRefFromLoci`, and keyed on the same residue ordinal,
 * so an index echoed back from a click resolves to the residue that was
 * clicked - on a complex as much as on a single chain.
 */
export function lociForResidueIndex(
  plugin: PluginUIContext,
  residueIndex: number
): StructureElement.Loci | undefined {
  return lociForSelection(plugin, { residues: [residueIndex] });
}

/** Every atom of a set of residues, within one structure. */
export function lociForResidueIndices(
  structure: Structure,
  residueIndices: Iterable<number>
): StructureElement.Loci | undefined {
  return lociForSelectionInStructure(structure, {
    residues: [...residueIndices],
  });
}
