import { ChipProps as RawChipProps } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import React from "react";
import { ChipExtraProps, StyledChip } from "./style";

type ChipProps = ChipExtraProps & RawChipProps;

export type { ChipProps };

const Chip = (props: ChipProps): JSX.Element => {
  const { onDelete } = props;
  if (onDelete) {
    return <StyledChip deleteIcon={<Clear />} {...props} />;
  }
  return <StyledChip {...props} />;
};

export default Chip;
