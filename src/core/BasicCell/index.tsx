import React, { forwardRef } from "react";
import Tooltip, { TooltipProps } from "../Tooltip";

import {
  BasicCellExtraProps,
  PrimaryText,
  SecondaryText,
  StyledTableData,
} from "./style";

interface BasicCellContentProps {
  primaryText: string;
  secondaryText?: string;
  shouldTextWrap?: boolean;
}

export interface BasicCellRawProps {
  shouldShowTooltipOnHover?: boolean;
  tooltipProps?: Partial<TooltipProps>;
}

export type BasicCellProps = BasicCellRawProps &
  BasicCellExtraProps &
  BasicCellContentProps;

const BasicCellContent = forwardRef(
  (props: BasicCellContentProps, _): JSX.Element | null => {
    const { primaryText, secondaryText, shouldTextWrap = false } = props;

    return (
      <>
        <PrimaryText shouldTextWrap={shouldTextWrap}>{primaryText}</PrimaryText>

        {secondaryText && (
          <SecondaryText shouldTextWrap={shouldTextWrap}>
            {secondaryText}
          </SecondaryText>
        )}
      </>
    );
  }
);

const BasicCell = forwardRef((props: BasicCellProps, _): JSX.Element | null => {
  const {
    primaryText,
    secondaryText,
    shouldShowTooltipOnHover = true,
    tooltipProps,
  } = props;

  if (shouldShowTooltipOnHover) {
    return (
      <Tooltip
        title={primaryText}
        subtitle={secondaryText}
        arrow
        {...tooltipProps}
      >
        <StyledTableData {...props}>
          <BasicCellContent {...props} />
        </StyledTableData>
      </Tooltip>
    );
  }
  return (
    <StyledTableData {...props}>
      <BasicCellContent {...props} />
    </StyledTableData>
  );
});

export default BasicCell;
