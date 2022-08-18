import React, { forwardRef } from "react";

import { StyledTable } from "./style";

export interface TableProps {
  children: React.ReactNode;
}

const Table = forwardRef((props: TableProps, _): JSX.Element | null => {
  const { children } = props;

  return <StyledTable {...props}>{children}</StyledTable>;
});

export default Table;
