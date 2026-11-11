import { ChipProps } from "@mui/material";
import { XIcon } from "@phosphor-icons/react";
import React from "react";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
import { StyledTag } from "./style";
import Button from "../Button";

export interface SdsTagFilterProps extends Omit<
  ChipProps,
  "color" | "variant"
> {
  /** The filter's text. Cut off with an ellipsis when there is not room for it. */
  label: string;
  /**
   * Runs when the X is clicked or activated, and when Backspace or Delete is
   * pressed on the tag. Drop the filter from your state here; the component
   * does not remove itself.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete: React.EventHandler<any>;
}

export type TagFilterProps = SdsTagFilterProps;

/**
 * @see https://mui.com/material-ui/react-chip/
 *
 * @deprecated Use Chip instead. TagFilter will be removed in a future release.
 */
const TagFilter = (props: SdsTagFilterProps): JSX.Element => {
  return (
    <StyledTag
      role="none presentation"
      {...props}
      deleteIcon={
        <Button
          aria-label="Delete Tag"
          sdsStyle="minimal"
          sdsType="secondary"
          size="medium"
          backgroundOnHover={false}
        >
          <XIcon {...INTERNAL_ICON_PROPS} size={16} />
        </Button>
      }
      color="info"
    />
  );
};

export default TagFilter;
