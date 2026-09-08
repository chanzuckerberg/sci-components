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
 * This is the inverse of the index the click and hover callbacks report, which
 * they derive from `label_seq_id`. That id restarts with every chain, so on a
 * multi-chain structure this resolves to the first chain carrying the index -
 * the same limitation the callbacks and the value overlay already carry.
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
        // label_seq_id is 1-based in PDB output; the callbacks report 0-based.
        if (
          StructureProperties.residue.label_seq_id(location) - 1 ===
          residueIndex
        ) {
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

/** The residue's three-letter code, e.g. `THR`. */
export function residueCompId(loci: StructureElement.Loci): string | undefined {
  const location = StructureElement.Location.create(void 0);
  const first = StructureElement.Loci.getFirstLocation(loci, location);

  return first ? StructureProperties.residue.label_comp_id(first) : undefined;
}
