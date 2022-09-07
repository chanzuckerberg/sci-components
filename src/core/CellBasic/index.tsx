import React, { forwardRef } from "react";
import Tooltip, { TooltipProps } from "../Tooltip";
import {
  CellBasicExtraProps,
  PrimaryText,
  SecondaryText,
  StyledTableData,
} from "./style";

interface CellBasicContentProps
  extends Omit<React.HTMLProps<HTMLTableCellElement>, "as"> {
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

const CellBasicContent = (props: CellBasicContentProps): JSX.Element | null => {
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
};

const CellBasic = forwardRef<HTMLTableCellElement, CellBasicProps>(
  (props: CellBasicProps, ref): JSX.Element | null => {
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
          <StyledTableData ref={ref} {...props}>
            <CellBasicContent {...props} />
          </StyledTableData>
        </Tooltip>
      );
    }
    return (
      <StyledTableData ref={ref} {...props}>
        <CellBasicContent {...props} />
      </StyledTableData>
    );
  }
);

export default CellBasic;
