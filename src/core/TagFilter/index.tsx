import { ChipProps } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";
import { StyledTag } from "./style";

export interface SdsTagFilterProps extends Omit<ChipProps, "color"> {
  label: string;
  onDelete: React.EventHandler<any>;
}

export type TagFilterProps = SdsTagFilterProps;

/**
 * @see https://v4.mui.com/components/chips/
 */

const TagFilter = (props: SdsTagFilterProps): JSX.Element => {
  return <StyledTag deleteIcon={<ClearIcon fontSize="small" />} {...props} />;
};

export default TagFilter;
