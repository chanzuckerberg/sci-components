"use client";

import React, { forwardRef } from "react";
import Tooltip, { TooltipProps } from "src/core/Tooltip";
import { RowExtraProps, StyledTableRow } from "./style";

interface RowRawProps {
  children: React.ReactNode;
  tooltipText?: string;
  tooltipSubtitle?: string;
  shouldShowTooltipOnHover?: boolean;
  tooltipProps?: Partial<TooltipProps>;
}

export type TableRowProps = RowRawProps & RowExtraProps;

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (props: TableRowProps, ref): JSX.Element | null => {
    const {
      children,
      shouldShowTooltipOnHover = true,
      tooltipProps,
      tooltipText = false,
      tooltipSubtitle,
      hover = true,
    } = props;

    if (shouldShowTooltipOnHover && hover) {
      return (
        <Tooltip
          arrow
          sdsStyle="dark"
          subtitle={tooltipSubtitle}
          title={tooltipText}
          {...tooltipProps}
        >
          <StyledTableRow ref={ref} {...props}>
            {children}
          </StyledTableRow>
        </Tooltip>
      );
    }
    return (
      <StyledTableRow ref={ref} {...props}>
        {children}
      </StyledTableRow>
    );
  }
);

export default TableRow;
