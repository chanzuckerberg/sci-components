import { List as RawList, ListProps } from "@material-ui/core";
import React from "react";

export { ListProps };

const List = (props: ListProps): JSX.Element => {
  return <RawList disablePadding {...props} />;
};

export default List;
