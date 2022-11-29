import { ListProps as RawListProps } from "@mui/material";
import React from "react";
import { ListExtraProps, StyledList } from "./style";

export type ListProps = ListExtraProps & RawListProps;

/**
 * @see https://v4.mui.com/components/lists/
 */
const List = (props: ListProps): JSX.Element => {
  const { ordered } = props;

  return (
    <StyledList component={ordered ? "ol" : "ul"} disablePadding {...props} />
  );
};

export default List;
