import { ListSubheaderProps } from "@material-ui/core";
import React from "react";
import { StyledListSubheader } from "./style";

export type { ListSubheaderProps };

/**
 * @see https://v4.mui.com/components/lists/
 */
const ListSubheader = (props: ListSubheaderProps): JSX.Element => {
  return <StyledListSubheader disableGutters {...props} />;
};

export default ListSubheader;
