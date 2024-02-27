import { Clear } from "@mui/icons-material";
import { ChipProps } from "@mui/material";
import React from "react";
import { StyledTag } from "./style";

export interface SdsTagFilterProps
  extends Omit<ChipProps, "color" | "variant"> {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete: React.EventHandler<any>;
}

export type TagFilterProps = SdsTagFilterProps;

/**
 * @see https://mui.com/material-ui/react-chip/
 */

const TagFilter = (props: SdsTagFilterProps): JSX.Element => {
  return <StyledTag deleteIcon={<Clear />} {...props} color="info" />;
};

export default TagFilter;
