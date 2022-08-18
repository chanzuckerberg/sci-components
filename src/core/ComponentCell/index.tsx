import React, { forwardRef, ReactNode } from "react";

import { ComponentCellExtraProps, StyledTableData } from "./style";

export interface ComponentCellRawProps {
  children?: ReactNode | React.ReactNode[];
}

export type ComponentCellProps = ComponentCellRawProps &
  ComponentCellExtraProps;

const ComponentCell = forwardRef(
  (props: ComponentCellProps, _): JSX.Element | null => {
    const { children } = props;

    return <StyledTableData {...props}>{children}</StyledTableData>;
  }
);

export default ComponentCell;
