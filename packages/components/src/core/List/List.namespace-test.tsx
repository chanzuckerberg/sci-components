import { List, ListItem, ListProps, ListSubheader } from "@czi-sds/components";
import React from "react";

const ListSpaceTest = (props: ListProps) => {
  return (
    <List
      subheader={
        <ListSubheader disableSticky>
          Font sizes and spacing for an unordered list
        </ListSubheader>
      }
    >
      <ListItem fontSize="l" marginBottom="s">
        fontSize=l marginBottom=s
      </ListItem>
    </List>
  );
};
