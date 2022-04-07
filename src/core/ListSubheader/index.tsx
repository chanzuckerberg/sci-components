import { ListSubheaderProps } from "@mui/material";
import React from "react";
import { StyledListSubheader } from "./style";

export type { ListSubheaderProps };

const ListSubheader = (props: ListSubheaderProps): JSX.Element => {
  return <StyledListSubheader disableGutters {...props} />;
};

export default ListSubheader;
