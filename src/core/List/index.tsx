import { ListProps as RawListProps } from "@mui/material";
import React from "react";
import { ListExtraProps, StyledList } from "./style";

type ListProps = ListExtraProps & RawListProps;

/**
 * @see https://mui.com/material-ui/react-list/
 */
const List = (props: ListProps): JSX.Element => {
  const { ordered } = props;

  return (
    <StyledList component={ordered ? "ol" : "ul"} disablePadding {...props} />
  );
};

export default List;
