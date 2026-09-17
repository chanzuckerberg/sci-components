import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { RefObject, useCallback, useEffect, useMemo, useState } from "react";
import type {
  ResidueReadout,
  ResidueRef,
  ResidueValueOverlay,
  StructureSelection,
} from "../ProteinStructureViewer.types";
import { lociForSelection } from "../utils/residueLoci";
import { residueLabel, residueRefFromLoci } from "../utils/residueRef";
import {
  isEmptySelection,
  meanOverResidues,
  selectionKey,
  selectionLabel,
  selectionResidues,
} from "../utils/selection";

/** The residue under the pointer, as the viewer tracks it. */
export interface HoveredResidue {
  index: number;
  label: string;
}

export interface ResidueHoverState {
  hoveredResidue: HoveredResidue | null;
  /** Hand this to the plugin as its hover callback. */
  handleResidueHover: (residue: ResidueRef | null) => void;
}

/**
 * Tracks the residue under the pointer, deduplicated, and passes the event on
 * to the consumer.
 *
 * Mol* emits hover events continuously, so a residue the pointer is resting on
 * would otherwise cost a state update per event. The index alone does not
 * identify one: loading a new structure into the same plugin renumbers from
 * zero, so the residue now at an index is not the one that was there before.
 * Comparing the label as well is enough, because the readout this drives is
 * built from the label and the index and from nothing else.
 */
export function useResidueHoverState(
  onResidueHover?: (residue: ResidueRef | null) => void
): ResidueHoverState {
  const [hoveredResidue, setHoveredResidue] = useState<HoveredResidue | null>(
    null
  );

  const handleResidueHover = useCallback(
    (residue: ResidueRef | null) => {
      setHoveredResidue((prev) => {
        if (residue === null) return prev === null ? prev : null;

        const label = residueLabel(residue);
        const unchanged =
          prev !== null && prev.index === residue.index && prev.label === label;

        return unchanged ? prev : { index: residue.index, label };
      });
      onResidueHover?.(residue);
    },
    [onResidueHover]
  );

  return { handleResidueHover, hoveredResidue };
}

/** What the selection covers, read back off the structure that holds it. */
interface ResolvedSelection {
  label: string;
  residues: number[];
}

export interface UseSelectionReadoutOptions {
  pluginRef: RefObject<PluginUIContext | null>;
  /** Which residues sit on each chain, for expanding a whole-chain selection. */
  residuesByChainRef: RefObject<Map<string, number[]>>;
  isReady: boolean;
  selection?: StructureSelection | null;
  hoveredResidue: HoveredResidue | null;
  plddt?: number[] | null;
  residueOverlay?: ResidueValueOverlay | null;
}

export interface SelectionReadouts {
  hoveredReadout: ResidueReadout | null;
  selectedReadout: ResidueReadout | null;
}

/**
 * Derives the legend's readouts from what is hovered and what is selected.
 *
 * The viewer already knows everything they need - the label, the pLDDT, the
 * overlay value - so they are worked out here rather than asked of the
 * consumer. A readout covering several residues reports the mean of each,
 * which is the only reading that survives a range or a whole chain.
 */
export function useSelectionReadout({
  hoveredResidue,
  isReady,
  plddt,
  pluginRef,
  residueOverlay,
  residuesByChainRef,
  selection,
}: UseSelectionReadoutOptions): SelectionReadouts {
  const [resolved, setResolved] = useState<ResolvedSelection | null>(null);

  /**
   * What the selection covers has to be read off the structure, since a
   * selection can be made without a click ever naming anything: a lone residue
   * is named the way the click path names it, so the two readouts cannot
   * disagree, and a chain is expanded to the residues it actually holds rather
   * than to the span between its ends.
   */
  useEffect(() => {
    const plugin = pluginRef.current;

    if (!plugin || !isReady || isEmptySelection(selection)) {
      setResolved(null);
      return;
    }

    const chosen = selection as StructureSelection;
    const residues = selectionResidues(
      chosen,
      residuesByChainRef.current ?? new Map()
    );

    if (residues.length === 0) {
      setResolved(null);
      return;
    }

    if (residues.length > 1) {
      setResolved({ label: selectionLabel(chosen, residues.length), residues });
      return;
    }

    const loci = lociForSelection(plugin, chosen);
    const residue = loci && residueRefFromLoci(loci);

    setResolved(residue ? { label: residueLabel(residue), residues } : null);
    // `selection` is compared through its key, and the two refs are stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, selection && selectionKey(selection)]);

  const buildReadout = useCallback(
    (label: string, residues: number[]): ResidueReadout => ({
      label,
      plddt: meanOverResidues(residues, (i) => plddt?.[i]),
      // Null for residues the overlay has no value for, matching the neutral
      // the structure paints them rather than claiming a zero.
      value: meanOverResidues(residues, (i) => residueOverlay?.values.get(i)),
      residueCount: residues.length,
    }),
    [plddt, residueOverlay]
  );

  const hoveredReadout = useMemo(
    () =>
      hoveredResidue === null
        ? null
        : buildReadout(hoveredResidue.label, [hoveredResidue.index]),
    [hoveredResidue, buildReadout]
  );

  const selectedReadout = useMemo(
    () =>
      resolved === null
        ? null
        : buildReadout(resolved.label, resolved.residues),
    [resolved, buildReadout]
  );

  return { hoveredReadout, selectedReadout };
}
