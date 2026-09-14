import { Tooltip } from "@czi-sds/components";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import type { ChainRef } from "../../ProteinStructureViewer.types";
import {
  ChainLabel,
  ChainRow,
  ChainRowList,
  ChainSwatch,
  VisibilityToggle,
} from "./style";

export interface ChainLegendProps {
  /** Chains to list. Nothing renders for fewer than two. */
  chains: ChainRef[];
  /**
   * Color per chain, by `chainId`. Undefined while something other than chain
   * coloring is painting the structure, which drops the swatches rather than
   * showing colors the structure does not carry.
   */
  chainColors?: Map<string, string>;
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
            {/*
              Same wording as the sequence panel's captions, since the two are
              the same affordance seen twice.
            */}
            <Tooltip
              arrow
              placement="left"
              title={`Click to ${selected ? "deselect" : "select"} Chain ${
                chain.label
              }`}
            >
              <ChainLabel
                aria-pressed={selected}
                isHidden={hidden}
                isSelected={selected}
                onClick={() => onChainSelect(chain.chainId)}
                type="button"
              >
                {chain.label}
              </ChainLabel>
            </Tooltip>
            <Tooltip
              arrow
              placement="left"
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
