import React, { forwardRef } from "react";
import Tooltip, { TooltipProps } from "../Tooltip";
import { RowExtraProps, StyledTableRow } from "./style";

interface RowRawProps {
  children: React.ReactNode;
  tooltipText?: string;
  tooltipSubtitle?: string;
  shouldShowTooltipOnHover?: boolean;
  tooltipProps?: Partial<TooltipProps>;
}

export type RowProps = RowRawProps & RowExtraProps;

const Row = forwardRef<HTMLTableRowElement, RowProps>(
  (props: RowProps, ref): JSX.Element | null => {
    const {
      children,
      shouldShowTooltipOnHover = true,
      tooltipProps,
      tooltipText = false,
      tooltipSubtitle,
    } = props;

    if (shouldShowTooltipOnHover) {
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
    return <StyledTableRow {...props}>{children}</StyledTableRow>;
  }
);

export default Row;
