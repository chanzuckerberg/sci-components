import { ListProps as RawListProps } from "@mui/material";
import React from "react";
import { ExtraProps, StyledList } from "./style";

type ListProps = ExtraProps & RawListProps;

const List = (props: ListProps): JSX.Element => {
  const { ordered } = props;

  return (
    <StyledList component={ordered ? "ol" : "ul"} disablePadding {...props} />
  );
};

export default List;
