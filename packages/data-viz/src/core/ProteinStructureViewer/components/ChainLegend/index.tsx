import { Tooltip } from "@czi-sds/components";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import type { ChainRef } from "../../ProteinStructureViewer.types";
import {
  ChainLabel,
  ChainRow,
  ChainRowList,
  ChainSwatch,
  ChainSwatchGrid,
  ChainSwatchQuadrant,
  VisibilityToggle,
} from "./style";

export interface ChainLegendProps {
  /** Chains to list. Nothing renders for fewer than two. */
  chains: ChainRef[];
  /**
   * Color per chain, by `chainId`. Undefined while something other than chain
   * coloring is painting the structure, in which case the swatch falls to
   * `bandColors` or goes entirely.
   */
  chainColors?: Map<string, string>;
  /**
   * Colors to quarter the swatch into, when what is painting the structure has
   * no single color per chain to show. The pLDDT bands, in practice: every
   * chain then carries the same key, which says the chains are colored by
   * confidence rather than telling them apart.
   *
   * Undefined for a coloring with no discrete colors at all - a continuous
   * overlay - where the color key beside the legend is the honest answer.
   */
  bandColors?: string[];
  /** Chains currently hidden. */
  hiddenChains: Set<string>;
  /** Chains the current selection covers whole. */
  selectedChains?: Set<string>;
  /** Flips one chain's visibility. */
  onChainToggle: (chainId: string) => void;
  /** Selects a whole chain, or clears it when it is already the selection. */
  onChainSelect: (chainId: string) => void;
}

/**
 * Lists the structure's chains, each with its color and a visibility toggle.
 *
 * Only drawn for a complex: one chain needs no key to tell it from anything,
 * and hiding it would leave an empty canvas with no way back. Its home is the
 * legend rather than the sequence panel so that it survives
 * `showSequenceViewer={false}`, where the chains would otherwise have nowhere
 * to be listed.
 */
export default function ChainLegend({
  bandColors,
  chainColors,
  chains,
  hiddenChains,
  onChainSelect,
  onChainToggle,
  selectedChains,
}: ChainLegendProps): JSX.Element | null {
  if (chains.length < 2) return null;

  return (
    <ChainRowList>
      {chains.map((chain) => {
        const hidden = hiddenChains.has(chain.chainId);
        const selected = selectedChains?.has(chain.chainId) ?? false;
        const color = chainColors?.get(chain.chainId);

        return (
          <ChainRow key={chain.chainId}>
            {color !== undefined && (
              <ChainSwatch isHidden={hidden} swatchColor={color} />
            )}
            {color === undefined && bandColors !== undefined && (
              <ChainSwatchGrid isHidden={hidden}>
                {bandColors.map((band) => (
                  <ChainSwatchQuadrant key={band} swatchColor={band} />
                ))}
              </ChainSwatchGrid>
            )}
            {/*
              Same wording as the sequence panel's captions, since the two are
              the same affordance seen twice.
            */}
            <Tooltip
              arrow
              placement="top"
              disableInteractive
              title={
                hidden
                  ? `Chain ${chain.label} is hidden`
                  : `Click to ${selected ? "deselect" : "select"} Chain ${
                      chain.label
                    }`
              }
            >
              <ChainLabel
                aria-pressed={selected}
                // A hidden chain draws nothing, so there is nothing to select:
                // the focus would resolve to no geometry and be dropped again.
                disabled={hidden}
                isHidden={hidden}
                isSelected={selected}
                onClick={() => onChainSelect(chain.chainId)}
                type="button"
              >
                Chain {chain.label}
              </ChainLabel>
            </Tooltip>
            <Tooltip
              arrow
              placement="top"
              disableInteractive
              title={
                hidden
                  ? `Show Chain ${chain.label}`
                  : `Hide Chain ${chain.label}`
              }
            >
              <VisibilityToggle
                aria-label={`${hidden ? "Show" : "Hide"} chain ${chain.label}`}
                aria-pressed={hidden}
                onClick={() => onChainToggle(chain.chainId)}
                type="button"
              >
                {hidden ? <EyeSlashIcon size={12} /> : <EyeIcon size={12} />}
              </VisibilityToggle>
            </Tooltip>
          </ChainRow>
        );
      })}
    </ChainRowList>
  );
}
