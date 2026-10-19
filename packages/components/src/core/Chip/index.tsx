import React, { ForwardedRef, forwardRef } from "react";
import Icon from "../Icon";
import { TagProps } from "../Tag";
import { StyledChip } from "./style";

export interface SdsChipProps extends Omit<
  TagProps,
  "color" | "href" | "iconOnly" | "rel" | "showLinkIcon" | "size" | "target"
> {
  /** The filter's text. Cut off with an ellipsis when there is not room for it. */
  label: string;
  /**
   * Runs when the chip is clicked or activated with Enter or Space, and when
   * Backspace or Delete is pressed on it. Drop the filter from your state
   * here; the component does not remove itself.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete: React.EventHandler<any>;
  /**
   * `solid` fills the chip with the accent color. `outline` tints it and
   * draws the label, the X and a 1px border in the accent color.
   */
  sdsStyle?: TagProps["sdsStyle"];
  /**
   * The chip's accessible name, "Remove" followed by the label unless set.
   * Override it to word the removal differently.
   */
  "aria-label"?: string;
}

export type ChipProps = SdsChipProps;

/**
 * @see https://mui.com/material-ui/react-chip/
 */
const Chip = forwardRef(
  (props: ChipProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const {
      "aria-label": ariaLabel,
      label,
      onClick,
      onDelete,
      sdsStyle = "solid",
      ...rest
    } = props;

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(event);
      onDelete(event);
    };

    return (
      <StyledChip
        ref={ref}
        aria-label={ariaLabel ?? `Remove ${label}`}
        {...rest}
        color="accent"
        deleteIcon={<Icon sdsIcon="XMark" sdsSize="xs" />}
        label={label}
        onClick={handleClick}
        onDelete={onDelete}
        sdsStyle={sdsStyle}
        size="medium"
      />
    );
  }
);

export default Chip;
