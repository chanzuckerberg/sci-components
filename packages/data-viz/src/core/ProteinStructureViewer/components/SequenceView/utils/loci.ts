import { StructureElement } from "molstar/lib/mol-model/structure";
import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { lociForResidueRange } from "../../../utils/residueLoci";
import { residueRefFromLoci } from "../../../utils/residueRef";

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
 * The span is measured in the viewer's own residue index - position in file
 * order across the whole structure - rather than in element indices, which are
 * unit-local and so cannot describe a range reaching from one chain into the
 * next. Measuring it the way every other residue-keyed API measures it is what
 * lets a drag cross a chain break, and it means a range covers exactly the
 * residues whose indices lie between its ends.
 *
 * An endpoint that names no residue leaves the drag unextended rather than
 * guessing at where it was. An endpoint spanning several units - a chain with
 * more than one symmetry operator - is fine: each copy of a residue carries the
 * same index, so the span is the same either way and resolves back across all
 * of them.
 */
export function extendToRange(
  loci: StructureElement.Loci,
  anchor: StructureElement.Loci
): StructureElement.Loci {
  const from = residueRefFromLoci(anchor);
  const to = residueRefFromLoci(loci);
  if (!from || !to) return loci;

  // Hovering the residue the drag started on. Already what `loci` holds, and
  // resolving it again would walk the structure for nothing.
  if (from.index === to.index) return loci;

  const min = Math.min(from.index, to.index);
  const max = Math.max(from.index, to.index);

  return lociForResidueRange(loci.structure, min, max) ?? loci;
}
