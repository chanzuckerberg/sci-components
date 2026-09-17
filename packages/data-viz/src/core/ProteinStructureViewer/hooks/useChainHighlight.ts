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
  /** Turns hover off, for `disableChainHighlightOnHover`. */
  disabled: boolean;
  /** Chains the selection covers whole, which stay lit while it stands. */
  selectedChains: ReadonlySet<string>;
  /** Chains hidden from the 3D view, which cannot be the one left lit. */
  hiddenChains: ReadonlySet<string>;
  /**
   * Counts the structures loaded into the plugin. A load rewrites the state
   * tree the dimming was written into, so it has to be laid down again after
   * one - which is what a `plddt` array arriving late comes down to.
   */
  loadCount: number;
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

/** A set of chain ids as one comparable string. */
function chainsKey(chains: ReadonlySet<string>): string {
  return [...chains].sort().join("\u0000");
}

/**
 * Makes every chain outside `lit` transparent, or all of them opaque again when
 * nothing is lit.
 *
 * Transparency layers accumulate, so what is already there is cleared before
 * the next chain is dimmed rather than added to - otherwise moving along the
 * list would leave every chain it passed dimmed behind it.
 *
 * False when there is no structure to write to yet, which is what a selection
 * arriving before the first load looks like. It is applied again after the load
 * rather than being taken as done.
 */
async function dimChainsOutside(
  plugin: PluginUIContext,
  lit: ReadonlySet<string>
): Promise<boolean> {
  const components = structureComponents(plugin);
  if (components.length === 0) return false;

  await clearStructureTransparency(plugin, components);

  if (lit.size === 0) return true;

  const dimmed = components.filter((component) => {
    const chainId = componentChainId(component);
    return chainId !== undefined && !lit.has(chainId);
  });
  if (dimmed.length === 0) return true;

  await setStructureTransparency(
    plugin,
    dimmed,
    CHAIN_DIM_TRANSPARENCY,
    async (structure) => Structure.toStructureElementLoci(structure)
  );

  return true;
}

/**
 * Leaves one chain lit and dims the rest: the chain whose name is pointed at,
 * in the sequence panel's captions or the chain legend's rows, or the chain the
 * selection covers once the pointer has gone.
 *
 * The chain left lit is exactly as it was - in the chain palette, in pLDDT
 * bands, or in an overlay - and the others recede around it. Nothing is painted
 * over the top, so what the reader is being pointed at is still the color the
 * legend beside it is describing, and a selected chain reads the same as a
 * hovered one rather than sprouting a highlight of its own.
 *
 * A hover outranks the selection while it lasts, since pointing at a chain is a
 * question about that chain, and hands it back on the way out.
 *
 * Dimming is a state-tree commit rather than a renderer setting, so it is
 * applied one at a time and coalesced: a pointer crossing the list faster than
 * a commit finishes skips the chains it passed over and settles on the one it
 * came to rest on, instead of working through a queue of hovers that have
 * already been left.
 */
export function useChainHighlight({
  disabled,
  hiddenChains,
  loadCount,
  pluginRef,
  selectedChains,
}: UseChainHighlightOptions): (chainId: string | null) => void {
  const hoveredRef = useRef<string | null>(null);

  /**
   * The chains left lit on the canvas as it stands. A freshly loaded structure
   * carries no dimming at all, which is what the empty key means.
   */
  const shownRef = useRef(chainsKey(new Set<string>()));
  const committingRef = useRef(false);

  /**
   * Read when a commit comes round rather than closed over, so one already in
   * flight settles on the current props instead of the ones it started under.
   */
  const propsRef = useRef({ disabled, hiddenChains, selectedChains });
  propsRef.current = { disabled, hiddenChains, selectedChains };

  const litChains = useCallback((): Set<string> => {
    const {
      disabled: hoverOff,
      hiddenChains: hidden,
      selectedChains: selected,
    } = propsRef.current;
    const hovered = hoveredRef.current;

    if (!hoverOff && hovered !== null && !hidden.has(hovered)) {
      return new Set([hovered]);
    }

    // A hidden chain is not drawn, so leaving it as the lit one would dim the
    // whole structure and leave nothing for the dimming to point at.
    return new Set([...selected].filter((chainId) => !hidden.has(chainId)));
  }, []);

  const settle = useCallback(async () => {
    // A commit already running will pick the latest up when it comes round,
    // which is what collapses a sweep across the list into its last chain.
    if (committingRef.current) return;
    committingRef.current = true;

    try {
      while (pluginRef.current) {
        const lit = litChains();
        const key = chainsKey(lit);
        if (key === shownRef.current) break;

        // Recorded only once it is on the canvas: before a structure is loaded
        // there is nothing to write to, and the load asks again.
        if (!(await dimChainsOutside(pluginRef.current, lit))) break;
        shownRef.current = key;
      }
    } catch (error) {
      // Left as it is rather than recorded as shown, so the next change retries.
      console.error("Failed to dim chains:", error);
    } finally {
      committingRef.current = false;
    }
  }, [litChains, pluginRef]);

  const highlightChain = useCallback(
    (chainId: string | null) => {
      hoveredRef.current = chainId;
      void settle();
    },
    [settle]
  );

  /*
   * Selection and visibility arrive as props, so they are applied from here
   * rather than through the callback above. `disabled` is among them because
   * turning hover off part way through one reads as the pointer having left:
   * the dimming falls back to the selection rather than being stranded by a
   * prop change no hover will follow.
   */
  useEffect(() => {
    void settle();
  }, [disabled, hiddenChains, selectedChains, settle]);

  // A load leaves a structure with no dimming on it, whatever was on the last.
  useEffect(() => {
    shownRef.current = chainsKey(new Set<string>());
    void settle();
  }, [loadCount, settle]);

  return highlightChain;
}
