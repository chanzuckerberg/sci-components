import { Clear } from "@mui/icons-material";
import { ChipProps } from "@mui/material";
import React from "react";
import { StyledTag } from "./style";

export interface SdsTagFilterProps
  extends Omit<ChipProps, "color" | "variant"> {
  label: string;
  onDelete: React.EventHandler<any>;
}

export type TagFilterProps = SdsTagFilterProps;

/**
 * @see https://v4.mui.com/components/chips/
 */

const TagFilter = (props: SdsTagFilterProps): JSX.Element => {
  return <StyledTag deleteIcon={<Clear />} {...props} />;
};

export default TagFilter;
