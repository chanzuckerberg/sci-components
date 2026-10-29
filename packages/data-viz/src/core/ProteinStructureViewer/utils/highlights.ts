import type { Color } from "molstar/lib/mol-util/color";
import type { ResidueHighlight } from "../ProteinStructureViewer.types";
import { themeColor } from "./color";
import { residueAddressKey } from "./residueAddress";

/**
 * Colors for highlights that name none, in the order the highlights are given.
 * Saturated enough to stand out over a chain, pLDDT or overlay coloring, and
 * wrapping around once they run out.
 */
export const HIGHLIGHT_COLOR_PALETTE = [
  "#E64545",
  "#F0C229",
  "#12A9A0",
  "#BD57D4",
  "#FF8A32",
  "#559DF3",
] as const;

/** Highlights resolved against a loaded structure. */
export interface ResolvedHighlights {
  /** Color per highlighted residue, by 0-based index. */
  colors: Map<number, Color>;
  /** The highlighted residues on each chain, by 0-based index. */
  byChain: Map<string, number[]>;
}

/**
 * Resolves highlights to the residues they name and the colors they are
 * painted. A highlight naming a residue the structure does not have paints
 * nothing, and still spends its place in the palette, so the others keep
 * their colors whichever structure they land on.
 */
export function resolveHighlights(
  highlights: readonly ResidueHighlight[] | undefined,
  addressIndex: ReadonlyMap<string, number>
): ResolvedHighlights {
  const colors = new Map<number, Color>();
  const byChain = new Map<string, number[]>();

  (highlights ?? []).forEach((highlight, i) => {
    const residue = addressIndex.get(residueAddressKey(highlight));
    if (residue === undefined) return;

    const fallback = HIGHLIGHT_COLOR_PALETTE[
      i % HIGHLIGHT_COLOR_PALETTE.length
    ] as string;
    colors.set(residue, themeColor(highlight.color, fallback));

    const onChain = byChain.get(highlight.chainId) ?? [];
    if (!onChain.includes(residue)) onChain.push(residue);
    byChain.set(highlight.chainId, onChain);
  });

  return { byChain, colors };
}

/** A stable string for a set of highlights, colors included. */
export function highlightsKey(
  highlights: readonly ResidueHighlight[] | undefined
): string {
  return (highlights ?? [])
    .map(
      (highlight) =>
        `${residueAddressKey(highlight)}\u0000${highlight.color ?? ""}`
    )
    .join("\u0001");
}
