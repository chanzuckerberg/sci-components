import { OrderedSet } from "molstar/lib/mol-data/int";
import type { ElementIndex } from "molstar/lib/mol-model/structure";
import {
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";

/**
 * Every atom of the residue at a 0-based index, as geometry Mol* can focus and
 * frame, or undefined when the structure has no such residue.
 *
 * The inverse of `residueRefFromLoci`, and keyed on the same residue ordinal,
 * so a `selectedResidue` echoed back from a click resolves to the residue that
 * was clicked - on a complex as much as on a single chain.
 *
 * The whole residue is collected rather than one atom, since the caller frames
 * the camera on the loci's bounding sphere and a single atom would zoom far
 * closer than the residue warrants.
 */
export function lociForResidueIndex(
  plugin: PluginUIContext,
  residueIndex: number
): StructureElement.Loci | undefined {
  for (const entry of plugin.managers.structure.hierarchy.current.structures) {
    const structure = entry.cell.obj?.data;
    if (!structure) continue;

    const location = StructureElement.Location.create(structure);

    for (const unit of structure.units) {
      location.unit = unit;
      const indices: StructureElement.UnitIndex[] = [];

      for (let i = 0; i < unit.elements.length; i++) {
        location.element = unit.elements[i] as ElementIndex;
        if (StructureProperties.residue.key(location) === residueIndex) {
          indices.push(i as StructureElement.UnitIndex);
        }
      }

      if (indices.length > 0) {
        return StructureElement.Loci(structure, [
          { indices: OrderedSet.ofSortedArray(indices), unit },
        ]);
      }
    }
  }

  return undefined;
}
