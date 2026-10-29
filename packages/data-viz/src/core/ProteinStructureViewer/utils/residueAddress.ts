import type { ElementIndex, Structure } from "molstar/lib/mol-model/structure";
import {
  StructureElement,
  StructureProperties,
} from "molstar/lib/mol-model/structure";
import type {
  ResidueAddress,
  StructureSelection,
} from "../ProteinStructureViewer.types";

/**
 * A residue's address as one comparable string.
 *
 * Insertion codes are trimmed, so a blank one and an absent one are the same
 * code: a file writes "no insertion" as a space, and a caller as nothing.
 */
export function residueAddressKey(address: ResidueAddress): string {
  const insCode = (address.insCode ?? "").trim();
  return `${address.chainId}\u0000${address.seqId}\u0000${insCode}`;
}

/**
 * Every residue's 0-based index by its address, from one pass over the
 * structure: what turns the address a caller knows a residue by into the index
 * the viewer keys everything else on.
 *
 * A residue carrying several symmetry operators is indexed once, under the
 * first, as `ChainRef` counts its chain once.
 */
export function indexResidueAddresses(
  structure: Structure
): Map<string, number> {
  const index = new Map<string, number>();
  const location = StructureElement.Location.create(structure);

  for (const unit of structure.units) {
    location.unit = unit;
    let previous = -1;

    for (let i = 0; i < unit.elements.length; i++) {
      location.element = unit.elements[i] as ElementIndex;

      // Atoms of one residue sit together, so a residue is read once rather
      // than once per atom.
      const residue = StructureProperties.residue.key(location);
      if (residue === previous) continue;
      previous = residue;

      const key = residueAddressKey({
        chainId: StructureProperties.chain.auth_asym_id(location),
        insCode: StructureProperties.residue.pdbx_PDB_ins_code(location),
        seqId: StructureProperties.residue.auth_seq_id(location),
      });
      if (!index.has(key)) index.set(key, residue);
    }
  }

  return index;
}

/** The indices of the addresses the structure has, in the order given. */
export function resolveResidueAddresses(
  index: ReadonlyMap<string, number>,
  addresses: readonly ResidueAddress[]
): number[] {
  const resolved: number[] = [];

  for (const address of addresses) {
    const residue = index.get(residueAddressKey(address));
    if (residue !== undefined) resolved.push(residue);
  }

  return resolved;
}

/**
 * A selection with its addresses resolved into `residues`, which is the only
 * form the rest of the viewer reads. Handed back unchanged when it names none.
 */
export function resolveSelectionAddresses(
  selection: StructureSelection | null | undefined,
  index: ReadonlyMap<string, number>
): StructureSelection | null | undefined {
  if (!selection?.addresses?.length) return selection;

  const { addresses, ...rest } = selection;
  const residues = [
    ...new Set([
      ...(rest.residues ?? []),
      ...resolveResidueAddresses(index, addresses),
    ]),
  ];

  return { ...rest, residues };
}

/** A stable string for a list of addresses, for comparing one with another. */
export function residueAddressesKey(
  addresses: readonly ResidueAddress[] | undefined
): string {
  return (addresses ?? []).map(residueAddressKey).join("\u0001");
}
