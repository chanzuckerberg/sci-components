import { OrderedSet } from "molstar/lib/mol-data/int";
import type { ElementIndex } from "molstar/lib/mol-model/structure";
import {
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import type {
  ResidueRef,
  StructureSelection,
} from "../ProteinStructureViewer.types";

/**
 * Reads the residue a loci points at, or null when it points at nothing the
 * viewer can address.
 *
 * `index` comes from Mol*'s residue key, which counts residues in file order
 * from zero and is the same counter `injectPlddt` walks. Deriving it
 * from the residue's *number* instead would tie it to how the file happens to
 * be numbered: a crop beginning at residue 200 would index `plddt` at 199, and
 * a file numbering each chain from 1 would give two residues the same index.
 */
export function residueRefFromLoci(
  loci: StructureElement.Loci
): ResidueRef | null {
  const location = StructureElement.Location.create(void 0);
  const firstLoc = StructureElement.Loci.getFirstLocation(loci, location);
  if (!firstLoc) return null;

  return {
    chainId: StructureProperties.chain.auth_asym_id(firstLoc),
    // Read off the atom rather than the residue: the two report the same code
    // for a residue-level location, but Mol* only added the residue spelling in
    // 5, and the peer range this package declares reaches back to 4.
    compId: StructureProperties.atom.label_comp_id(firstLoc),
    insCode: StructureProperties.residue.pdbx_PDB_ins_code(firstLoc) ?? "",
    index: StructureProperties.residue.key(firstLoc),
    seqId: StructureProperties.residue.auth_seq_id(firstLoc),
  };
}

/**
 * Every residue a loci covers, as a selection the consumer can echo back.
 *
 * The counterpart to `residueRefFromLoci`, which names only the first: a drag
 * across the sequence hands Mol* a range, and reporting its first residue
 * alone would turn a range the user drew into a single-residue selection.
 *
 * Reported as residues rather than as chains even when a whole chain is
 * covered. What the user drew is a span of residues, and calling it a chain
 * because it happens to end where one does would change the selection's meaning
 * on a structure where the two coincide.
 */
export function selectionFromLoci(
  loci: StructureElement.Loci
): StructureSelection {
  const location = StructureElement.Location.create(loci.structure);
  const residues = new Set<number>();

  for (const element of loci.elements) {
    location.unit = element.unit;

    OrderedSet.forEach(element.indices, (i) => {
      location.element = element.unit.elements[i] as ElementIndex;
      residues.add(StructureProperties.residue.key(location));
    });
  }

  return { residues: [...residues].sort((a, b) => a - b) };
}

/**
 * How a residue is named in the readout, e.g. `"LYS 111"`. Takes the number and
 * the insertion code from the file so that the readout and the sequence panel
 * beneath it agree on what to call a residue.
 */
export function residueLabel(residue: ResidueRef): string {
  return `${residue.compId} ${residue.seqId}${residue.insCode}`;
}
