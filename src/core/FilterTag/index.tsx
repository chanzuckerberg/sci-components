import ClearIcon from "@material-ui/icons/Clear";
import React from "react";
import { SdsTagProps } from "../Tag";
import { StyledTag } from "./style";

export type FilterTagProps = SdsTagProps & {
  label: string;
  onDelete: React.EventHandler<any>;
};

/**
 * @see https://v4.mui.com/components/chips/
 */

const FilterTag = (props: FilterTagProps): JSX.Element => {
  return <StyledTag deleteIcon={<ClearIcon fontSize="small" />} {...props} />;
};

export default FilterTag;
