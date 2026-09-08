import { StructureElement } from "molstar/lib/mol-model/structure";
import { Representation } from "molstar/lib/mol-repr/representation";
import type {
  ButtonsType,
  ModifiersKeys,
} from "molstar/lib/mol-util/input/input-observer";
import { useCallback, useMemo } from "react";
import { usePlugin } from "../../../hooks/usePlugin";
import { extendToRange } from "../utils/loci";

/**
 * Wraps a residue loci and the mouse state into a Mol* interaction event. An
 * `anchor` extends the loci to the range between it and `loci`, which is how a
 * drag across the sequence comes out as a contiguous span.
 */
function buildEvent(
  loci: StructureElement.Loci | undefined,
  buttons: ButtonsType,
  button: ButtonsType.Flag,
  modifiers: ModifiersKeys,
  anchor?: StructureElement.Loci
) {
  const ev = {
    button,
    buttons,
    current: Representation.Loci.Empty,
    modifiers,
  };

  if (loci === undefined || StructureElement.Loci.isEmpty(loci)) return ev;

  ev.current = { loci: anchor ? extendToRange(loci, anchor) : loci };

  return ev;
}

export interface LociDispatch {
  hover: (
    loci: StructureElement.Loci | undefined,
    buttons: ButtonsType,
    button: ButtonsType.Flag,
    modifiers: ModifiersKeys,
    anchor?: StructureElement.Loci
  ) => void;
  click: (
    loci: StructureElement.Loci | undefined,
    buttons: ButtonsType,
    button: ButtonsType.Flag,
    modifiers: ModifiersKeys,
    anchor?: StructureElement.Loci
  ) => void;
}

/**
 * Reports the grid's hover and click to Mol*, on the same behaviors the 3D
 * view publishes to, so an interaction in either surface reaches the other.
 */
export function useLociDispatch(): LociDispatch {
  const plugin = usePlugin();

  const hover = useCallback<LociDispatch["hover"]>(
    (loci, buttons, button, modifiers, anchor) => {
      plugin.behaviors.interaction.hover.next(
        buildEvent(loci, buttons, button, modifiers, anchor)
      );
    },
    [plugin]
  );

  const click = useCallback<LociDispatch["click"]>(
    (loci, buttons, button, modifiers, anchor) => {
      plugin.behaviors.interaction.click.next(
        buildEvent(loci, buttons, button, modifiers, anchor)
      );
    },
    [plugin]
  );

  return useMemo(() => ({ click, hover }), [click, hover]);
}
