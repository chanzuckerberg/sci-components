import { Clear } from "@mui/icons-material";
import { ChipProps as RawChipProps } from "@mui/material";
import React from "react";
import { ChipExtraProps, StyledChip } from "./style";

type ChipProps = ChipExtraProps & RawChipProps;

export type { ChipProps };

let hasWarned = false;

/**
 * @see https://v4.mui.com/components/chips/
 */
const Chip = (props: ChipProps): JSX.Element => {
  if (!hasWarned) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: <Chip /> will be deprecated and replaced with <Tag />"
    );
    hasWarned = true;
  }
  const { onDelete } = props;

  if (onDelete) {
    return <StyledChip deleteIcon={<Clear />} {...props} />;
  }
  return <StyledChip {...props} />;
};

export default Chip;
