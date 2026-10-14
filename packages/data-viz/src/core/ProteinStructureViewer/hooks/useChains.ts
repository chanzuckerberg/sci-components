import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { chainColorMap } from "../../../common/chainColors";
import type { ChainRef } from "../ProteinStructureViewer.types";

export interface UseChainsOptions {
  /** Chains read off the loaded structure, or `[]` before one is loaded. */
  chains: ChainRef[];
  /** Controlled hidden chains, or undefined to let this hook own them. */
  hiddenChains?: string[];
  /** Per-chain color overrides, by `chainId`. */
  chainColors?: Record<string, string>;
  onChainVisibilityChange?: (hiddenChains: string[]) => void;
}

export interface UseChainsResult {
  /** Chain ids currently hidden, from whichever side owns them. */
  hidden: Set<string>;
  /** Every chain's color, overrides applied over the palette. */
  colors: Map<string, string>;
  /** Flips one chain's visibility and reports the result. */
  toggleChain: (chainId: string) => void;
}

/**
 * Reconciles the chains found in the structure with the visibility and coloring
 * the consumer asked for.
 *
 * Visibility is controlled when `hiddenChains` is passed and owned here when it
 * is not, so the legend's toggles work out of the box without taking the
 * decision away from a consumer that wants it. `onChainVisibilityChange` fires
 * either way: a consumer that only wants to follow along should not have to
 * take ownership to hear about it.
 */
export function useChains({
  chainColors,
  chains,
  hiddenChains,
  onChainVisibilityChange,
}: UseChainsOptions): UseChainsResult {
  const isControlled = hiddenChains !== undefined;
  const [ownHidden, setOwnHidden] = useState<string[]>([]);

  const onChainVisibilityChangeRef = useRef(onChainVisibilityChange);
  onChainVisibilityChangeRef.current = onChainVisibilityChange;

  const chainIds = useMemo(() => chains.map((c) => c.chainId), [chains]);

  /**
   * Chains the structure no longer has cannot be unhidden through the legend,
   * since it has no row for them, so a stale id would hide a chain that shares
   * its name in the next structure. Only the uncontrolled side is pruned; a
   * controlled consumer owns its own list.
   */
  useEffect(() => {
    if (isControlled) return;

    setOwnHidden((prev) => {
      const kept = prev.filter((id) => chainIds.includes(id));
      return kept.length === prev.length ? prev : kept;
    });
  }, [chainIds, isControlled]);

  /**
   * Both results below are keyed on their contents rather than on the props
   * they come from, because `hiddenChains` and `chainColors` are commonly
   * written inline and so arrive as fresh objects on every render. Keying on
   * identity would hand the plugin a new Set and a new color map every pass,
   * and the effects that consume them push into Mol* rather than just render.
   */
  const source = isControlled ? hiddenChains : ownHidden;
  const hiddenKey = [...source].sort().join("\u0000");
  const hidden = useMemo(
    () => new Set(hiddenKey === "" ? [] : hiddenKey.split("\u0000")),
    [hiddenKey]
  );

  const colorKey = chainIds
    .map((id) => `${id}:${chainColors?.[id] ?? ""}`)
    .join("\u0000");
  const colors = useMemo(
    () => chainColorMap(chainIds, chainColors),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorKey]
  );

  const toggleChain = useCallback(
    (chainId: string) => {
      const next = hidden.has(chainId)
        ? [...hidden].filter((id) => id !== chainId)
        : [...hidden, chainId];

      // Report in the structure's own chain order rather than the order the
      // toggles happened to be pressed in, so the list reads the same way the
      // legend does.
      const ordered = chainIds.filter((id) => next.includes(id));

      if (!isControlled) setOwnHidden(ordered);
      onChainVisibilityChangeRef.current?.(ordered);
    },
    [chainIds, hidden, isControlled]
  );

  return { colors, hidden, toggleChain };
}
