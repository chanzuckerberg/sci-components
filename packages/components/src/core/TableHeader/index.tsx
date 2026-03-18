import React, { forwardRef } from "react";
import TableRow from "src/core/TableRow";
import { StyledTableHeader } from "./style";

export interface TableHeaderProps {
  children: React.ReactNode;
  filterRow?: React.ReactNode;
}

const TableHeader = forwardRef<HTMLTableElement["tHead"], TableHeaderProps>(
  (props: TableHeaderProps, ref): JSX.Element | null => {
    const { children, filterRow } = props;

    return (
      <StyledTableHeader ref={ref} hasFilterRow={!!filterRow} {...props}>
        <TableRow hover={false} shouldShowTooltipOnHover={false}>
          {children}
        </TableRow>
        {filterRow}
      </StyledTableHeader>
    );
  }
);

export default TableHeader;
