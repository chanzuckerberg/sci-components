import React, { forwardRef, ReactElement } from "react";
import Tooltip, { TooltipProps } from "../Tooltip";

import { RowExtraProps, StyledTableRow } from "./style";

interface RowContentProps {
  children: ReactElement;
}

interface RowRawProps {
  tooltipText?: string;
  tooltipSubtitle?: string;
  shouldShowTooltipOnHover?: boolean;
  tooltipProps?: Partial<TooltipProps>;
}

export type RowProps = RowRawProps & RowExtraProps & RowContentProps;

const RowContent = forwardRef(
  (props: RowContentProps, _): JSX.Element | null => {
    const { children } = props;

    return <>{children}</>;
  }
);

const Row = forwardRef((props: RowProps, _): JSX.Element | null => {
  const {
    children,
    shouldShowTooltipOnHover = true,
    tooltipProps,
    tooltipText = props.children,
    tooltipSubtitle,
  } = props;

  if (shouldShowTooltipOnHover) {
    return (
      <Tooltip
        arrow
        placement="top-start"
        sdsStyle="dark"
        subtitle={tooltipSubtitle}
        title={tooltipText}
        {...tooltipProps}
      >
        <StyledTableRow {...props}>
          <RowContent {...props}>{children}</RowContent>
        </StyledTableRow>
      </Tooltip>
    );
  }
  return (
    <StyledTableRow {...props}>
      <RowContent {...props}>{children}</RowContent>
    </StyledTableRow>
  );
});

export default Row;
