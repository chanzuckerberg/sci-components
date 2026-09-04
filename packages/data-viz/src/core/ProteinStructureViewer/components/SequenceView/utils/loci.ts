import { OrderedSet } from "molstar/lib/mol-data/int";
import { StructureElement } from "molstar/lib/mol-model/structure";
import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";

/** The loci for a residue, or undefined when there is no residue there. */
export function getLoci(
  sequenceWrapper: SequenceWrapper.Any,
  seqIdx: number | undefined
): StructureElement.Loci | undefined {
  if (seqIdx !== undefined) {
    const loci = sequenceWrapper.getLoci(seqIdx);
    if (!StructureElement.Loci.isEmpty(loci)) return loci;
  }
  return undefined;
}

/**
 * Extends a loci to the range between the mouse-down anchor and the current
 * residue, so dragging across the sequence selects a contiguous span.
 *
 * Element indices are only comparable within a single unit, so a drag whose
 * endpoints land in different units is left unextended rather than resolved
 * against the anchor's unit, which would select an unrelated range.
 */
export function extendToRange(
  loci: StructureElement.Loci,
  anchor: StructureElement.Loci
): StructureElement.Loci {
  const ref = anchor.elements[0];
  const ext = loci.elements[0];
  if (!ref || !ext) return loci;
  if (ref.unit !== ext.unit) return loci;

  const min = Math.min(
    OrderedSet.min(ref.indices),
    OrderedSet.min(ext.indices)
  );
  const max = Math.max(
    OrderedSet.max(ref.indices),
    OrderedSet.max(ext.indices)
  );

  return StructureElement.Loci(loci.structure, [
    {
      indices: OrderedSet.ofRange(
        min as StructureElement.UnitIndex,
        max as StructureElement.UnitIndex
      ),
      unit: ref.unit,
    },
  ]);
}
