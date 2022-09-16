import React, { forwardRef } from "react";
import { StyledTable, StyledTableWrapper } from "./style";

export interface TableProps {
  children: React.ReactNode;
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  (props: TableProps, ref): JSX.Element | null => {
    const { children } = props;

    return (
      <StyledTableWrapper>
        <StyledTable ref={ref} {...props}>
          {children}
        </StyledTable>
      </StyledTableWrapper>
    );
  }
);

export default Table;
