import { Structure } from "molstar/lib/mol-model/structure";
import {
  clearStructureTransparency,
  setStructureTransparency,
} from "molstar/lib/mol-plugin-state/helpers/structure-transparency";
import type { StructureComponentRef } from "molstar/lib/mol-plugin-state/manager/structure/hierarchy-state";
import type { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { RefObject, useCallback, useEffect, useRef } from "react";

/**
 * How transparent the other chains go while one is pointed at.
 *
 * Enough that the chain under the pointer is the one being read, not enough
 * that the rest of the complex stops being context for it. 0 is opaque, 1 is
 * invisible.
 */
export const CHAIN_DIM_TRANSPARENCY = 0.65;

/**
 * The chain id in a component key.
 *
 * Chain components are tagged `structure-component-<part>-<chainId>`, and a
 * key is the component's tags sorted and joined with commas. Anchoring on the
 * part name and stopping at the comma is what keeps `A` from also matching the
 * chain named `AA`.
 */
const COMPONENT_CHAIN_ID = /structure-component-(?:polymer|ligand)-([^,]+)/;

interface UseChainHighlightOptions {
  pluginRef: RefObject<PluginUIContext | null>;
  /** Turns the dimming off, for `disableChainHighlightOnHover`. */
  disabled: boolean;
}

/** The chain a component was built for, or undefined if it is not a chain's. */
export function componentChainId(
  component: Pick<StructureComponentRef, "key"> & {
    cell: { transform: { ref: string } };
  }
): string | undefined {
  const key = component.key ?? component.cell.transform.ref;
  return COMPONENT_CHAIN_ID.exec(key)?.[1];
}

/** Every chain component of every loaded structure, polymers and ligands. */
function structureComponents(plugin: PluginUIContext): StructureComponentRef[] {
  return plugin.managers.structure.hierarchy.current.structures.flatMap(
    (entry) => entry.components
  );
}

/**
 * Makes every chain but `chainId` transparent, or all of them opaque again
 * when nothing is pointed at.
 *
 * Transparency layers accumulate, so what is already there is cleared before
 * the next chain is dimmed rather than added to - otherwise moving along the
 * list would leave every chain it passed dimmed behind it.
 */
async function dimOtherChains(
  plugin: PluginUIContext,
  chainId: string | null
): Promise<void> {
  const components = structureComponents(plugin);
  if (components.length === 0) return;

  await clearStructureTransparency(plugin, components);

  if (chainId === null) return;

  const others = components.filter(
    (component) => componentChainId(component) !== chainId
  );
  if (others.length === 0) return;

  await setStructureTransparency(
    plugin,
    others,
    CHAIN_DIM_TRANSPARENCY,
    async (structure) => Structure.toStructureElementLoci(structure)
  );
}

/**
 * Dims every chain but the one whose name is pointed at, in the sequence
 * panel's captions or the chain legend's rows.
 *
 * The chain being pointed at is left exactly as it was - in the chain palette,
 * in pLDDT bands, or in an overlay - and the others recede around it. Nothing
 * is painted over the top, so what the reader is being pointed at is still the
 * color the legend beside it is describing.
 *
 * Dimming is a state-tree commit rather than a renderer setting, so it is
 * applied one at a time and coalesced: a pointer crossing the list faster than
 * a commit finishes skips the chains it passed over and settles on the one it
 * came to rest on, instead of working through a queue of hovers that have
 * already been left.
 */
export function useChainHighlight({
  disabled,
  pluginRef,
}: UseChainHighlightOptions): (chainId: string | null) => void {
  /** The chain the pointer is on, and the one the canvas is showing. */
  const wantedRef = useRef<string | null>(null);
  const shownRef = useRef<string | null>(null);
  const committingRef = useRef(false);

  const settle = useCallback(async () => {
    // A commit already running will pick up `wantedRef` when it comes round,
    // which is what collapses a sweep across the list into its last chain.
    if (committingRef.current) return;
    committingRef.current = true;

    try {
      while (pluginRef.current && wantedRef.current !== shownRef.current) {
        const wanted = wantedRef.current;
        await dimOtherChains(pluginRef.current, wanted);
        shownRef.current = wanted;
      }
    } catch (error) {
      // Left as it is rather than recorded as shown, so the next hover retries.
      console.error("Failed to dim chains:", error);
    } finally {
      committingRef.current = false;
    }
  }, [pluginRef]);

  const highlightChain = useCallback(
    (chainId: string | null) => {
      if (disabled) return;

      wantedRef.current = chainId;
      void settle();
    },
    [disabled, settle]
  );

  // Turned off part way through a hover reads as the pointer having left, so
  // whatever is dimmed goes back to full opacity rather than being stranded by
  // a prop change no hover will follow.
  useEffect(() => {
    if (!disabled) return;

    wantedRef.current = null;
    void settle();
  }, [disabled, settle]);

  return highlightChain;
}
