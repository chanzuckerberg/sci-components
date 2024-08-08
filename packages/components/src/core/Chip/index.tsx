"use client";

import { Clear } from "@mui/icons-material";
import { ChipProps as RawChipProps } from "@mui/material";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import { ChipExtraProps, StyledChip } from "./style";

type ChipProps = ChipExtraProps & RawChipProps;

export type { ChipProps };

/**
 * @see https://mui.com/material-ui/react-chip/
 *
 * @deprecated
 * This component is deprecated and will be removed in the next major version.
 * Please use `Tag` or `TagFilter` instead.
 */
const Chip = (props: ChipProps): JSX.Element => {
  showWarningIfFirstOccurence(SDSWarningTypes.ChipDeprecated);
  const { onDelete } = props;

  if (onDelete) {
    return <StyledChip deleteIcon={<Clear />} {...props} />;
  }
  return <StyledChip {...props} />;
};

export default Chip;
