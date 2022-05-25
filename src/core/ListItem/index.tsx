import { ListItemProps as RawListItemProps } from "@mui/material";
import React from "react";
import { ListItemExtraProps, ListItemLabel, StyledListItem } from "./style";

export { ListItemLabel };

export type ListItemProps = RawListItemProps & ListItemExtraProps;

/**
 * @see https://v4.mui.com/components/lists/
 */
const ListItem = (props: ListItemProps): JSX.Element => {
  return <StyledListItem disableGutters {...(props as never)} />;
};

export default ListItem;
