import {
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import type { ResidueRef } from "../ProteinStructureViewer.types";

/**
 * Reads the residue a loci points at, or null when it points at nothing the
 * viewer can address.
 *
 * `index` comes from Mol*'s residue key, which counts residues in file order
 * from zero and is the same counter `injectPlddtIntoPdb` walks. Deriving it
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
    compId: StructureProperties.residue.label_comp_id(firstLoc),
    insCode: StructureProperties.residue.pdbx_PDB_ins_code(firstLoc) ?? "",
    index: StructureProperties.residue.key(firstLoc),
    seqId: StructureProperties.residue.auth_seq_id(firstLoc),
  };
}

/**
 * How a residue is named in the readout, e.g. `"LYS 111"`. Takes the number and
 * the insertion code from the file so that the readout and the sequence panel
 * beneath it agree on what to call a residue.
 */
export function residueLabel(residue: ResidueRef): string {
  return `${residue.compId} ${residue.seqId}${residue.insCode}`;
}
