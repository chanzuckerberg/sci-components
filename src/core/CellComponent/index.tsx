import React, { forwardRef, ReactNode } from "react";

import { CellComponentExtraProps, StyledCellComponentData } from "./style";

export interface CellComponentRawProps {
  children?: ReactNode | React.ReactNode[];
}

export type CellComponentProps = CellComponentRawProps &
  CellComponentExtraProps;

const CellComponent = forwardRef(
  (props: CellComponentProps, _): JSX.Element | null => {
    const { children } = props;

    return (
      <StyledCellComponentData {...props}>{children}</StyledCellComponentData>
    );
  }
);

export default CellComponent;
