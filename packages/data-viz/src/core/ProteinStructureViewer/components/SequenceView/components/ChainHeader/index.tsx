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
  /** Dims other chains in the 3D view; called with null on leave. */
  onHover?: (chainId: string | null) => void;
}

/**
 * The row above one chain's residue grid: a visibility toggle and the chain's
 * name, which selects it.
 *
 * The name is a toggle rather than a one-way switch, so the tooltip says which
 * way the next click goes - offering to select a chain that is already selected
 * would be telling the reader the wrong thing. A hidden chain cannot be
 * selected at all, so the name stops being a button then: there is no geometry
 * to focus, and the toggle beside it is what the reader wants instead.
 */
export default function ChainHeader({
  chainId,
  isHidden,
  isSelected,
  label,
  onHover,
  onSelect,
  onToggle,
}: ChainHeaderProps): JSX.Element {
  return (
    /*
     * The row rather than the name inside it. The name is a button that a
     * hidden chain disables, and a disabled button reports no pointer leaving
     * it - so a chain hidden while its name was under the pointer would strand
     * the dim on. The row is never disabled, and it is the chain's line
     * either way.
     *
     * Focus as well as hover, so the dim is reachable by keyboard. React
     * gives these from `focusin`/`focusout`, which bubble, so tabbing to the
     * name or the toggle inside dims the other chains.
     */
    <ChainHeaderRow
      onBlur={() => onHover?.(null)}
      onFocus={() => onHover?.(chainId)}
      onMouseEnter={() => onHover?.(chainId)}
      onMouseLeave={() => onHover?.(null)}
    >
      <Tooltip
        arrow
        placement="top"
        title={
          isHidden
            ? `Chain ${label} is hidden`
            : `Click to ${isSelected ? "deselect" : "select"} Chain ${label}`
        }
        textAlign="left"
      >
        <ChainLabel
          aria-pressed={isSelected}
          // A hidden chain draws nothing, so there is nothing to select: the
          // focus would resolve to no geometry and be dropped again.
          disabled={isHidden}
          isHidden={isHidden}
          isSelected={isSelected}
          onClick={() => onSelect?.(chainId)}
          type="button"
        >
          Chain {label}
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
