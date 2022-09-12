import React, { forwardRef } from "react";
import { StyledTable } from "./style";

export interface TableProps {
  children: React.ReactNode;
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  (props: TableProps, ref): JSX.Element | null => {
    const { children } = props;

    return (
      <StyledTable ref={ref} {...props}>
        {children}
      </StyledTable>
    );
  }
);

export default Table;
