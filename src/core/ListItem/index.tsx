import { ListItemProps as RawListItemProps } from "@material-ui/core";
import React from "react";
import { ListItemExtraProps, ListItemLabel, StyledListItem } from "./style";

export { ListItemLabel };

export type ListItemProps = RawListItemProps & ListItemExtraProps;

const ListItem = (props: ListItemProps): JSX.Element => {
  return <StyledListItem disableGutters {...(props as never)} />;
};

export default ListItem;
