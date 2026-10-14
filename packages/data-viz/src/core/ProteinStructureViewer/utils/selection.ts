import type { StructureSelection } from "../ProteinStructureViewer.types";

/**
 * A stable string for a selection, for comparing one against another.
 *
 * A consumer holding the selection in state hands back a new object on every
 * render, so identity says nothing about whether the selection changed. Order
 * is normalized too: `{ residues: [2, 1] }` and `{ residues: [1, 2] }` select
 * the same residues and must not read as a change.
 */
export function selectionKey(selection: StructureSelection): string {
  const residues = [...new Set(selection.residues ?? [])].sort((a, b) => a - b);
  const chains = [...new Set(selection.chains ?? [])].sort();

  return `${chains.join(",")}|${residues.join(",")}`;
}

/** True when the selection names nothing at all. */
export function isEmptySelection(
  selection: StructureSelection | null | undefined
): boolean {
  if (!selection) return true;
  return !selection.residues?.length && !selection.chains?.length;
}

/**
 * The residues a selection covers, ascending and without repeats.
 *
 * Chains are expanded through `residuesByChain`, which was read off the loaded
 * structure, so a chain contributes exactly the residues it holds rather than
 * the span between its ends. A residue named directly and also carried by a
 * selected chain is counted once.
 */
export function selectionResidues(
  selection: StructureSelection,
  residuesByChain: Map<string, number[]>
): number[] {
  const residues = new Set(selection.residues ?? []);

  for (const chainId of selection.chains ?? []) {
    for (const index of residuesByChain.get(chainId) ?? []) {
      residues.add(index);
    }
  }

  return [...residues].sort((a, b) => a - b);
}

/**
 * Names a selection for the legend's readout.
 *
 * A single chain is named as one, since "Chain A" says more than the number of
 * residues it happens to hold. Anything else is reported as a count, which is
 * the only thing true of every shape a selection can take. A lone residue is
 * named by the caller instead, which reads it back off the structure to get its
 * three-letter code and the number the file gives it.
 */
export function selectionLabel(
  selection: StructureSelection,
  residueCount: number
): string {
  const chains = selection.chains ?? [];

  if (chains.length === 1 && !selection.residues?.length) {
    return `Chain ${chains[0]}`;
  }

  return `${residueCount} residues`;
}

/** The mean of the values `read` returns, ignoring residues without one. */
export function meanOverResidues(
  residues: number[],
  read: (index: number) => number | null | undefined
): number | null {
  let sum = 0;
  let count = 0;

  for (const index of residues) {
    const value = read(index);
    if (value === null || value === undefined) continue;
    sum += value;
    count++;
  }

  return count === 0 ? null : sum / count;
}
