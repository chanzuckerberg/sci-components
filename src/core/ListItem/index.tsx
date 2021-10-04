import { ListItemProps as RawListItemProps } from "@material-ui/core";
import React from "react";
import { ExtraProps, ListItemLabel, StyledListItem } from "./style";

export { ListItemLabel };

export type ListItemProps = RawListItemProps & ExtraProps;

const ListItem = (props: ListItemProps): JSX.Element => {
  return <StyledListItem disableGutters {...(props as never)} />;
};

export default ListItem;
