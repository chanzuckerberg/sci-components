"use client";

import { ListSubheaderProps as RawListSubheaderProps } from "@mui/material";
import { StyledListSubheader } from "./style";

export type ListSubheaderProps = RawListSubheaderProps;

/**
 * @see https://mui.com/material-ui/react-list/
 */
const ListSubheader = (props: ListSubheaderProps): JSX.Element => {
  return <StyledListSubheader disableGutters {...props} />;
};

export default ListSubheader;
