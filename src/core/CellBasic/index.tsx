import React, { forwardRef } from "react";
import Tooltip, { TooltipProps } from "../Tooltip";
import {
  CellBasicExtraProps,
  PrimaryText,
  SecondaryText,
  StyledTableData,
} from "./style";

interface CellBasicContentProps {
  primaryText: string;
  primaryTextWrapLineCount?: number;
  secondaryText?: string;
  secondaryTextWrapLineCount?: number;
  shouldTextWrap?: boolean;
}

export interface CellBasicRawProps {
  shouldShowTooltipOnHover?: boolean;
  tooltipProps?: Partial<TooltipProps>;
}

export type CellBasicProps = CellBasicRawProps &
  CellBasicExtraProps &
  CellBasicContentProps;

const CellBasicContent = forwardRef(
  (props: CellBasicContentProps, _): JSX.Element | null => {
    const {
      primaryText,
      primaryTextWrapLineCount,
      secondaryText,
      secondaryTextWrapLineCount,
      shouldTextWrap = false,
    } = props;

    return (
      <>
        <PrimaryText
          shouldTextWrap={shouldTextWrap}
          primaryTextWrapLineCount={primaryTextWrapLineCount}
        >
          {primaryText}
        </PrimaryText>

        {secondaryText && (
          <SecondaryText
            shouldTextWrap={shouldTextWrap}
            secondaryTextWrapLineCount={secondaryTextWrapLineCount}
          >
            {secondaryText}
          </SecondaryText>
        )}
      </>
    );
  }
);

const CellBasic = forwardRef((props: CellBasicProps, _): JSX.Element | null => {
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
          <CellBasicContent {...props} />
        </StyledTableData>
      </Tooltip>
    );
  }
  return (
    <StyledTableData {...props}>
      <CellBasicContent {...props} />
    </StyledTableData>
  );
});

export default CellBasic;
