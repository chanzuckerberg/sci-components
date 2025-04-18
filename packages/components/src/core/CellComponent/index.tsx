import React, { forwardRef, ReactNode } from "react";
import { CellComponentExtraProps, StyledCellComponentData } from "./style";

interface CellComponentContentProps
  extends Omit<React.HTMLProps<HTMLTableCellElement>, "as"> {
  children?: ReactNode;
}

export type CellComponentProps = CellComponentContentProps &
  CellComponentExtraProps;

const CellComponent = forwardRef(
  (props: CellComponentProps, _): JSX.Element | null => {
    const { children, ...rest } = props;

    return (
      <StyledCellComponentData className="cell-component" {...rest}>
        {children}
      </StyledCellComponentData>
    );
  }
);

export default CellComponent;
