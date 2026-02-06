import React, { forwardRef, ReactNode } from "react";
import { CellComponentExtraProps, StyledCellComponentData } from "./style";

interface CellComponentContentProps extends Omit<
  React.HTMLProps<HTMLDivElement>,
  "as"
> {
  children?: ReactNode;
  as?: React.ElementType;
}

export type CellComponentProps = CellComponentContentProps &
  CellComponentExtraProps;

const CellComponent = forwardRef<HTMLDivElement, CellComponentProps>(
  (props: CellComponentProps, ref): JSX.Element | null => {
    const { children, as = "td", ...rest } = props;

    return (
      <StyledCellComponentData
        ref={ref}
        className="cell-component"
        as={as}
        {...rest}
      >
        {children}
      </StyledCellComponentData>
    );
  }
);

export default CellComponent;
