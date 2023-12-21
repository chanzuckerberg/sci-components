import React, { forwardRef } from "react";
import TableRow from "../TableRow";
import { StyledTableHeader } from "./style";

export interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader = forwardRef<
  NonNullable<HTMLTableElement["tHead"]>,
  TableHeaderProps
>((props: TableHeaderProps, ref): JSX.Element => {
  const { children } = props;

  return (
    <StyledTableHeader ref={ref} {...props}>
      <TableRow hover={false} shouldShowTooltipOnHover={false}>
        {children}
      </TableRow>
    </StyledTableHeader>
  );
});

export default TableHeader;
