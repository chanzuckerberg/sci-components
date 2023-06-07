import React, { forwardRef } from "react";
import Tooltip, { TooltipProps } from "../Tooltip";
import {
  CellBasicExtraProps,
  PrimaryText,
  SecondaryText,
  StyledCellContent,
  StyledCellContentWrapper,
  StyledCellIconWrapper,
  StyledTableData,
  TertiaryText,
} from "./style";

interface CellBasicContentProps
  extends Omit<
    React.HTMLProps<HTMLTableCellElement>,
    "as" | "nonce" | "rev" | "rel" | "autoFocus" | "content"
  > {
  primaryText: string;
  primaryTextWrapLineCount?: number;
  secondaryText?: string;
  secondaryTextWrapLineCount?: number;
  tertiaryText?: string;
  tertiaryTextWrapLineCount?: number;
  shouldTextWrap?: boolean;
  icon?: JSX.Element;
  iconVerticalAlign?: "top" | "center" | "bottom";
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
    icon,
    iconVerticalAlign,
  } = props;

  return (
    <StyledCellContent>
      {icon && (
        <StyledCellIconWrapper iconVerticalAlign={iconVerticalAlign}>
          {icon}
        </StyledCellIconWrapper>
      )}
      <StyledCellContentWrapper>
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
      </StyledCellContentWrapper>
    </StyledCellContent>
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
          leaveDelay={0}
          leaveTouchDelay={0}
          sdsStyle="dark"
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
