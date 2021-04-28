import { ListSubheaderProps } from "@material-ui/core";
import React from "react";
import { StyledListSubheader } from "./style";

export { ListSubheaderProps };

const ListSubheader = (props: ListSubheaderProps): JSX.Element => {
  return <StyledListSubheader disableGutters {...props} />;
};

export default ListSubheader;
