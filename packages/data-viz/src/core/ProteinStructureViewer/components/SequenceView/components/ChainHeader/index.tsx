import { Tooltip } from "@czi-sds/components";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { ChainHeaderRow, ChainLabel, ChainVisibilityToggle } from "../../style";

export interface ChainHeaderProps {
  /** Chain as the panel captions it, e.g. `"A"`. */
  label: string;
  /** Chain as the file names it, which the callbacks below take. */
  chainId: string;
  /** Whether the chain's cartoon is hidden from the 3D view. */
  isHidden: boolean;
  /** Whether the selection covers this chain whole. */
  isSelected: boolean;
  /** Selects the chain, or clears it when it is already the selection. */
  onSelect?: (chainId: string) => void;
  /** Shows or hides the chain's cartoon. */
  onToggle?: (chainId: string) => void;
}

/**
 * The row above one chain's residue grid: a visibility toggle and the chain's
 * name, which selects it.
 *
 * The name is a toggle rather than a one-way switch, so the tooltip says which
 * way the next click goes - offering to select a chain that is already selected
 * would be telling the reader the wrong thing.
 */
export default function ChainHeader({
  chainId,
  isHidden,
  isSelected,
  label,
  onSelect,
  onToggle,
}: ChainHeaderProps): JSX.Element {
  return (
    <ChainHeaderRow>
      <Tooltip
        arrow
        placement="top"
        title={`Click to ${isSelected ? "deselect" : "select"} Chain ${label}`}
        textAlign="left"
      >
        <ChainLabel
          aria-pressed={isSelected}
          isHidden={isHidden}
          isSelected={isSelected}
          onClick={() => onSelect?.(chainId)}
          type="button"
        >
          {label}
        </ChainLabel>
      </Tooltip>
      {onToggle && (
        <Tooltip
          arrow
          placement="top"
          title={`${isHidden ? "Show" : "Hide"} Chain ${label}`}
        >
          <ChainVisibilityToggle
            aria-label={`${isHidden ? "Show" : "Hide"} chain ${label}`}
            aria-pressed={isHidden}
            onClick={() => onToggle(chainId)}
            type="button"
          >
            {isHidden ? <EyeSlashIcon size={12} /> : <EyeIcon size={12} />}
          </ChainVisibilityToggle>
        </Tooltip>
      )}
    </ChainHeaderRow>
  );
}
