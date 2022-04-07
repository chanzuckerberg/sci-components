import { Clear } from "@mui/icons-material";
import { ChipProps as RawChipProps } from "@mui/material";
import React from "react";
import { ExtraProps, StyledChip } from "./style";

type ChipProps = ExtraProps & RawChipProps;

export type { ChipProps };

const Chip = (props: ChipProps): JSX.Element => {
  const { onDelete } = props;
  if (onDelete) {
    return <StyledChip deleteIcon={<Clear />} {...props} />;
  }
  return <StyledChip {...props} />;
};

export default Chip;
