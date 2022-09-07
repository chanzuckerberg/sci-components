import React, { forwardRef } from "react";
import { StyledTableHeader } from "./style";

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader = forwardRef<HTMLTableElement["tHead"], TableHeaderProps>(
  (props: TableHeaderProps, ref): JSX.Element | null => {
    const { children } = props;

    return (
      <StyledTableHeader ref={ref} {...props}>
        {children}
      </StyledTableHeader>
    );
  }
);

export default TableHeader;
