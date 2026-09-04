import {
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import type { ResidueRef } from "../ProteinStructureViewer.types";

/**
 * Reads the residue a loci points at, or null when it points at nothing the
 * viewer can address.
 *
 * `label_seq_id` is what Mol* assigns a PDB residue, and for PDB input it
 * carries the number written in the file rather than a per-chain count. That
 * makes `index` correct only while numbering runs unbroken from 1 across every
 * chain -- which is what the structure sources feeding this viewer emit, and
 * what `injectPlddtIntoPdb`'s ordinal numbering assumes on the other side.
 * `chainId` and `seqId` are reported alongside so a caller never has to
 * reconstruct them from `index`.
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
    // label_seq_id is 1-based in PDB output; convert to 0-based.
    index: StructureProperties.residue.label_seq_id(firstLoc) - 1,
    seqId: StructureProperties.residue.auth_seq_id(firstLoc),
  };
}

/**
 * How a residue is named in the readout, e.g. `"LYS 111"`.
 *
 * The number comes from the file rather than from `index + 1`. Those agree only
 * for a single chain numbered from 1, and the readout should say what the
 * sequence panel beneath it says.
 */
export function residueLabel(residue: ResidueRef): string {
  return `${residue.compId} ${residue.seqId}`;
}
