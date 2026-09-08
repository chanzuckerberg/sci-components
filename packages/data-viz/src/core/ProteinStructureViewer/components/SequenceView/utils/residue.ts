import {
  StructureElement,
  StructureProperties,
  Unit,
} from "molstar/lib/mol-model/structure";
import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { SEQ_ID_ATTR } from "../constants";

/** Reads the sequence index off a residue span, or undefined if it is not one. */
export function readSeqIdx(el: HTMLElement | null): number | undefined {
  if (!el || !el.getAttribute) return undefined;
  return el.hasAttribute(SEQ_ID_ATTR)
    ? +(el.getAttribute(SEQ_ID_ATTR) as string)
    : undefined;
}

/**
 * Nearest ancestor that scrolls vertically, or null if none. Used to scope the
 * residue tooltip's hide-on-scroll listener to the sequence's own overflow
 * container instead of a global window listener.
 */
export function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let el = node?.parentElement ?? null;
  while (el) {
    const overflowY = getComputedStyle(el).overflowY;
    if (overflowY === "auto" || overflowY === "scroll") return el;
    el = el.parentElement;
  }
  return null;
}

export function getResidueClass(
  sequenceWrapper: SequenceWrapper.Any,
  seqIdx: number
): string {
  const active =
    sequenceWrapper.isHighlighted(seqIdx) ||
    sequenceWrapper.isSelected(seqIdx) ||
    sequenceWrapper.isFocused(seqIdx);

  return active
    ? "msp-sequence-present msp-sequence-residue-active"
    : "msp-sequence-present msp-sequence-residue";
}

/**
 * The label shown above a residue: its author sequence id for atomic units,
 * or a 1-based position for coarse ones.
 *
 * `location` is a scratch object the caller reuses across residues, since this
 * runs once per numbered residue on every render.
 */
export function getSequenceNumber(
  sequenceWrapper: SequenceWrapper.Any,
  seqIdx: number,
  location: StructureElement.Location
): string {
  let seqNum = "";
  const loci = sequenceWrapper.getLoci(seqIdx);
  const l = StructureElement.Loci.getFirstLocation(loci, location);

  if (l) {
    if (Unit.isAtomic(l.unit)) {
      const seqId = StructureProperties.residue.auth_seq_id(l);
      const insCode = StructureProperties.residue.pdbx_PDB_ins_code(l);
      seqNum = `${seqId}${insCode ? insCode : ""}`;
    } else if (Unit.isCoarse(l.unit)) {
      seqNum = `${seqIdx + 1}`;
    }
  }

  return seqNum;
}

/**
 * How often a sequence number is drawn above the residues.
 *
 * Long sequences get one every ten residues. Short ones number every residue,
 * unless their numbers run to more than one digit, which would crowd them.
 */
export function resolveSequenceNumberPeriod(
  sequenceWrapper: SequenceWrapper.Any,
  location: StructureElement.Location,
  sequenceNumberPeriod?: number
): number {
  if (sequenceNumberPeriod !== undefined) return sequenceNumberPeriod;
  if (sequenceWrapper.length > 10) return 10;

  const lastSeqNum = getSequenceNumber(
    sequenceWrapper,
    sequenceWrapper.length - 1,
    location
  );
  if (lastSeqNum.length > 1) return 5;

  return 1;
}

/**
 * The grid's accessible name.
 *
 * The grid is a rendering of the structure rather than a control of its own,
 * so it is exposed as an image; that makes this label the only thing an
 * assistive technology gets, which is why it carries the residues themselves
 * rather than just how many there are. They are spaced apart so they are read
 * as individual letters instead of running together into a word.
 */
export function buildSequenceLabel(
  sequenceWrapper: SequenceWrapper.Any
): string {
  const letters: string[] = [];

  for (let i = 0; i < sequenceWrapper.length; i++) {
    letters.push(sequenceWrapper.residueLabel(i));
  }

  const name = `Residue sequence, ${sequenceWrapper.length} residues`;

  return letters.length > 0 ? `${name}: ${letters.join(" ")}` : name;
}
