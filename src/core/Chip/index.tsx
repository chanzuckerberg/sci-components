import { Clear } from "@mui/icons-material";
import { ChipProps as RawChipProps } from "@mui/material";
import React from "react";
import { ChipExtraProps, StyledChip } from "./style";

type ChipProps = ChipExtraProps & RawChipProps;

export type { ChipProps };

/**
 * @see https://v4.mui.com/components/chips/
 */
const Chip = (props: ChipProps): JSX.Element => {
  const { onDelete } = props;
  if (onDelete) {
    return <StyledChip deleteIcon={<Clear />} {...props} />;
  }
  return <StyledChip {...props} />;
};

export default Chip;
