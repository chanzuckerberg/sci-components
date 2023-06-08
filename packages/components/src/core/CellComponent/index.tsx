import React, { forwardRef, ReactNode } from "react";
import { CellComponentExtraProps, StyledCellComponentData } from "./style";

interface CellComponentContentProps
  extends Omit<
    React.HTMLProps<HTMLTableCellElement>,
    "as" | "nonce" | "rev" | "rel" | "autoFocus" | "content"
  > {
  children?: ReactNode;
}

export type CellComponentProps = CellComponentContentProps &
  CellComponentExtraProps;

const CellComponent = forwardRef(
  (props: CellComponentProps, _): JSX.Element | null => {
    const { children } = props;

    return (
      <StyledCellComponentData className="cell-component" {...props}>
        {children}
      </StyledCellComponentData>
    );
  }
);

export default CellComponent;
