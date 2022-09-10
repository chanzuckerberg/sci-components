import React, { forwardRef } from "react";
import Tooltip, { TooltipProps } from "../Tooltip";
import {
  CellBasicExtraProps,
  PrimaryText,
  SecondaryText,
  StyledTableData,
  TertiaryText,
} from "./style";

interface CellBasicContentProps
  extends Omit<React.HTMLProps<HTMLTableCellElement>, "as"> {
  primaryText: string;
  primaryTextWrapLineCount?: number;
  secondaryText?: string;
  secondaryTextWrapLineCount?: number;
  tertiaryText?: string;
  tertiaryTextWrapLineCount?: number;
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
    tertiaryText,
    tertiaryTextWrapLineCount,
    shouldTextWrap = true,
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

      {tertiaryText && (
        <TertiaryText
          shouldTextWrap={shouldTextWrap}
          tertiaryTextWrapLineCount={tertiaryTextWrapLineCount}
        >
          {tertiaryText}
        </TertiaryText>
      )}
    </>
  );
};

const CellBasic = forwardRef<HTMLTableCellElement, CellBasicProps>(
  (props: CellBasicProps, ref): JSX.Element | null => {
    const {
      primaryText,
      shouldShowTooltipOnHover = true,
      tooltipProps,
    } = props;

    if (shouldShowTooltipOnHover) {
      return (
        <Tooltip title={primaryText} arrow {...tooltipProps}>
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
