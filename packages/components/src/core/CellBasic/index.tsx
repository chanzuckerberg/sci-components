import React, { forwardRef } from "react";
import Tooltip, { TooltipProps } from "src/core/Tooltip";
import {
  CellBasicExtraProps,
  PrimaryText,
  PrimaryTextComponentSlotBottomWrapper,
  PrimaryTextComponentSlotRightWrapper,
  PrimaryTextWrapper,
  SecondaryText,
  StyledCellContent,
  StyledCellContentWrapper,
  StyledCellIconWrapper,
  StyledTableData,
  TertiaryText,
} from "./style";

interface CellBasicContentProps extends Omit<
  React.HTMLProps<HTMLTableCellElement>,
  "as"
> {
  primaryText: string;
  primaryTextWrapLineCount?: number;
  secondaryText?: string;
  secondaryTextWrapLineCount?: number;
  tertiaryText?: string;
  tertiaryTextWrapLineCount?: number;
  shouldTextWrap?: boolean;
  icon?: React.ReactElement<CustomSVGProps>;
  iconVerticalAlign?: "top" | "center" | "bottom";
  primaryTextComponentSlotRight?: React.ReactNode;
  primaryTextComponentSlotBottom?: React.ReactNode;
  horizontalAlign?: "left" | "right";
  tabularNums?: boolean;
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
    primaryTextComponentSlotRight,
    primaryTextComponentSlotBottom,
    horizontalAlign = "left",
    tabularNums = false,
  } = props;

  return (
    <StyledCellContent>
      {icon && (
        <StyledCellIconWrapper iconVerticalAlign={iconVerticalAlign}>
          {icon}
        </StyledCellIconWrapper>
      )}
      <StyledCellContentWrapper>
        <PrimaryTextWrapper horizontalAlign={horizontalAlign}>
          <PrimaryText
            shouldTextWrap={shouldTextWrap}
            primaryTextWrapLineCount={primaryTextWrapLineCount}
            tabularNums={tabularNums}
          >
            {primaryText}
          </PrimaryText>
          {primaryTextComponentSlotRight && (
            <PrimaryTextComponentSlotRightWrapper>
              {primaryTextComponentSlotRight}
            </PrimaryTextComponentSlotRightWrapper>
          )}
        </PrimaryTextWrapper>

        {!secondaryText && !tertiaryText && primaryTextComponentSlotBottom && (
          <PrimaryTextComponentSlotBottomWrapper>
            {primaryTextComponentSlotBottom}
          </PrimaryTextComponentSlotBottomWrapper>
        )}

        {secondaryText && (
          <SecondaryText
            shouldTextWrap={shouldTextWrap}
            secondaryTextWrapLineCount={secondaryTextWrapLineCount}
            tabularNums={tabularNums}
          >
            {secondaryText}
          </SecondaryText>
        )}

        {tertiaryText && (
          <TertiaryText
            shouldTextWrap={shouldTextWrap}
            tertiaryTextWrapLineCount={tertiaryTextWrapLineCount}
            tabularNums={tabularNums}
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
