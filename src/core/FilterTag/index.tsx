import { ChipProps } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import React from "react";
import { StyledTag } from "./style";

export interface SdsFilterTagProps extends Omit<ChipProps, "color"> {
  label: string;
  onDelete: React.EventHandler<any>;
}

export type FilterTagProps = SdsFilterTagProps;

/**
 * @see https://v4.mui.com/components/chips/
 */

const FilterTag = (props: SdsFilterTagProps): JSX.Element => {
  return <StyledTag deleteIcon={<ClearIcon fontSize="small" />} {...props} />;
};

export default FilterTag;
