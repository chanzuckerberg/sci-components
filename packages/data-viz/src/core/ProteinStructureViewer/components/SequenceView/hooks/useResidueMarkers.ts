import { EveryLoci } from "molstar/lib/mol-model/loci";
import { StructureElement } from "molstar/lib/mol-model/structure";
import type { SequenceWrapper } from "molstar/lib/mol-plugin-ui/sequence/wrapper";
import { Representation } from "molstar/lib/mol-repr/representation";
import type { MarkerAction } from "molstar/lib/mol-util/marker-action";
import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { usePlugin } from "../../../hooks/usePlugin";
import { useSubscribe } from "../../../hooks/useSubscribe";
import type { ResidueColors } from "../../../utils/theme";
import { SEQ_ID_ATTR } from "../constants";
import { getResidueClass } from "../utils/residue";

export interface UseResidueMarkersOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  sequenceWrapper: SequenceWrapper.Any;
  /**
   * Residue colors resolved from the active theme. Passed in rather than read
   * from context because they are written straight to the DOM.
   */
  residueColors: ResidueColors;
}

/**
 * Keeps the residue grid's hover and selection colors in sync with the 3D
 * view.
 *
 * The colors are written straight to the residue spans rather than rendered,
 * because a marker change would otherwise re-render a grid that can hold
 * thousands of nodes.
 */
export function useResidueMarkers({
  containerRef,
  residueColors,
  sequenceWrapper,
}: UseResidueMarkersOptions): void {
  const plugin = usePlugin();

  /**
   * Residues sit at the default color until something is active. A hovered,
   * selected, or focused residue brightens and takes a translucent fill; while
   * any residue is selected, the rest dim to draw attention to the selection.
   */
  const paintMarkers = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { activeBackground, activeText, defaultText, inactiveText } =
      residueColors;

    // Residue spans are nested inside per-group wrappers, so query them by
    // their data-seqid attribute; querySelectorAll returns them in document
    // (seqIdx) order.
    const spans = container.querySelectorAll<HTMLSpanElement>(
      `[${SEQ_ID_ATTR}]`
    );

    let anySelected = false;
    for (let i = 0; i < sequenceWrapper.length; i++) {
      if (sequenceWrapper.isSelected(i)) {
        anySelected = true;
        break;
      }
    }
    const inactiveColor = anySelected ? inactiveText : defaultText;

    for (let i = 0; i < sequenceWrapper.length; i++) {
      const span = spans[i];
      if (!span) return;

      const className = getResidueClass(sequenceWrapper, i);
      if (span.className !== className) span.className = className;

      const active =
        sequenceWrapper.isSelected(i) ||
        sequenceWrapper.isFocused(i) ||
        sequenceWrapper.isHighlighted(i);

      span.style.color = active ? activeText : inactiveColor;
      span.style.backgroundColor = active ? activeBackground : "";
    }
  }, [containerRef, residueColors, sequenceWrapper]);

  const markFocus = useCallback(
    (loci: StructureElement.Loci | undefined) => {
      sequenceWrapper.markResidue(EveryLoci, "unfocus");
      if (loci) sequenceWrapper.markResidue(loci, "focus");
    },
    [sequenceWrapper]
  );

  // The marker providers are registered for the component's lifetime, so they
  // reach the current wrapper and paint through refs rather than by
  // re-registering whenever either changes.
  const paintMarkersRef = useRef(paintMarkers);
  paintMarkersRef.current = paintMarkers;
  const sequenceWrapperRef = useRef(sequenceWrapper);
  sequenceWrapperRef.current = sequenceWrapper;

  useEffect(() => {
    // Each manager keeps its own provider list and removes by identity, so one
    // function can serve both.
    const markProvider = (loci: Representation.Loci, action: MarkerAction) => {
      const changed = sequenceWrapperRef.current.markResidue(loci.loci, action);
      if (changed) paintMarkersRef.current();
    };

    const { lociHighlights, lociSelects } = plugin.managers.interactivity;
    lociHighlights.addProvider(markProvider);
    lociSelects.addProvider(markProvider);

    return () => {
      lociHighlights.removeProvider(markProvider);
      lociSelects.removeProvider(markProvider);
    };
  }, [plugin]);

  useSubscribe(plugin.managers.structure.focus.behaviors.current, (focus) => {
    markFocus(focus?.loci);
    paintMarkers();
  });

  // Painting reads the spans this render just committed, so it has to run
  // after the DOM is in place but before the browser paints it.
  useLayoutEffect(() => {
    markFocus(plugin.managers.structure.focus.behaviors.current.value?.loci);
    paintMarkers();
  });
}
