import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { Color } from "molstar/lib/mol-util/color";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { lociForChainPolymer } from "../utils/residueLoci";

/**
 * What a chain lights up in while its name is under the pointer.
 *
 * Its own color rather than the theme's hover tint, because it answers a
 * different question. Hovering a residue asks "what is this?" and a tint is
 * enough; pointing at a chain's name asks "where is this chain?" of a
 * structure where the answer may be half the screen, and has to carry across
 * a cartoon already painted in the chain palette, in pLDDT bands, or in an
 * overlay. A saturated pink is in none of those, so it cannot be mistaken for
 * the structure's own coloring.
 */
export const CHAIN_HIGHLIGHT_COLOR = Color.fromRgb(200, 45, 149);

/**
 * Stronger than the residue hover's tint, for the same reason. A whole chain
 * washed in 20% pink reads as a rendering artifact; at this strength it reads
 * as deliberate.
 */
const CHAIN_HIGHLIGHT_STRENGTH = 0.7;

interface UseChainHighlightOptions {
  pluginRef: RefObject<PluginUIContext | null>;
  /** Turns the highlight off, for `disableChainHighlightOnHover`. */
  disabled: boolean;
}

/** The renderer settings a highlight borrows, to be handed back after. */
interface BorrowedMarking {
  highlightColor: Color;
  highlightEdgeColor: Color;
  highlightStrength: number;
}

/**
 * Lights up a whole chain in the 3D view while its name is pointed at, in the
 * sequence panel's captions or the chain legend's rows.
 *
 * Mol*'s marking system is what draws it, so the chain is tinted and outlined
 * exactly as a hovered residue is, with no geometry added to the state tree
 * and nothing to tear down. Marking colors are a property of the renderer
 * rather than of the loci, though, so the pink is swapped in for the length of
 * the hover and the theme's own colors handed back on the way out.
 *
 * Those colors are read off the canvas at that moment rather than passed in.
 * They are already derived from the theme in two places, and a third copy kept
 * in step by hand would be the one to drift.
 */
export function useChainHighlight({
  disabled,
  pluginRef,
}: UseChainHighlightOptions): (chainId: string | null) => void {
  const borrowedRef = useRef<BorrowedMarking | null>(null);

  const highlightChain = useCallback(
    (name: string | null) => {
      const plugin = pluginRef.current;
      const canvas3d = plugin?.canvas3d;
      if (!plugin || !canvas3d) return;

      // Turned off part way through a hover reads as the pointer having left,
      // so whatever is lit goes dark and the borrowed colors go back rather
      // than being stranded by a prop change.
      const chainId = disabled ? null : name;

      if (chainId === null) {
        plugin.managers.interactivity.lociHighlights.clearHighlights();

        const borrowed = borrowedRef.current;
        if (borrowed) {
          canvas3d.setProps({
            marking: { highlightEdgeColor: borrowed.highlightEdgeColor },
            renderer: {
              highlightColor: borrowed.highlightColor,
              highlightStrength: borrowed.highlightStrength,
            },
          });
          borrowedRef.current = null;
        }

        return;
      }

      const loci = lociForChainPolymer(plugin, chainId);
      if (!loci) return;

      // Only on the way in, so moving between two chain names without leaving
      // the list does not snapshot the pink as the color to restore.
      borrowedRef.current ??= {
        highlightColor: canvas3d.props.renderer.highlightColor,
        highlightEdgeColor: canvas3d.props.marking.highlightEdgeColor,
        highlightStrength: canvas3d.props.renderer.highlightStrength,
      };

      canvas3d.setProps({
        marking: { highlightEdgeColor: CHAIN_HIGHLIGHT_COLOR },
        renderer: {
          highlightColor: CHAIN_HIGHLIGHT_COLOR,
          highlightStrength: CHAIN_HIGHLIGHT_STRENGTH,
        },
      });

      plugin.managers.interactivity.lociHighlights.highlightOnly({ loci });
    },
    [disabled, pluginRef]
  );

  // A chain hidden, a structure swapped, or the viewer unmounted while a name
  // is still under the pointer all leave without a matching mouse-leave, and
  // the borrowed colors would stay borrowed.
  useEffect(() => () => void (borrowedRef.current = null), []);

  return highlightChain;
}
