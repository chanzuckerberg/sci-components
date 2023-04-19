import React, { ForwardedRef, forwardRef } from "react";
import { StyledTable } from "./style";

export interface SdsTableProps {
  children: React.ReactNode;
}

export type TableProps = SdsTableProps & React.HTMLAttributes<HTMLTableElement>;

const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    props: TableProps,
    ref: ForwardedRef<HTMLTableElement>
  ): JSX.Element | null => {
    const { children } = props;

    return (
      <StyledTable ref={ref} {...props}>
        {children}
      </StyledTable>
    );
  }
);

export default Table;
