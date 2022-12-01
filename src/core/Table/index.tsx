import React, { forwardRef } from "react";
import { StyledTable, StyledTableWrapper, TableExtraProps } from "./style";

interface TableRawProps {
  children: React.ReactNode;
}

export type TableProps = TableRawProps & TableExtraProps;

const Table = forwardRef<HTMLTableElement, TableProps>(
  (props: TableProps, ref): JSX.Element | null => {
    const { children, height, width, ...rest } = props;

    return (
      <StyledTableWrapper height={height} width={width}>
        <StyledTable ref={ref} {...rest}>
          {children}
        </StyledTable>
      </StyledTableWrapper>
    );
  }
);

export default Table;
