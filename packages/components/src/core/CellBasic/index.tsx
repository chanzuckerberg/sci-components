import React, { forwardRef, useContext } from "react";
import Tooltip, { TooltipProps } from "src/core/Tooltip";
import { RowHoverContext } from "src/core/PreComposedTable";
import {
  CellBasicExtraProps,
  PrimaryText,
  PrimaryTextComponentSlotBottomWrapper,
  PrimaryTextComponentSlotRightWrapper,
  PrimaryTextWrapper,
  SecondaryText,
  StyledCellBasicLink,
  StyledCellContent,
  StyledCellContentWrapper,
  StyledCellIconWrapper,
  StyledTableData,
  TertiaryText,
} from "./style";
import { Link } from "@mui/material";

interface CellBasicContentProps extends Omit<
  React.HTMLProps<HTMLDivElement>,
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
  as?: React.ElementType;
  link?: string;
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  linkComponent?: React.ElementType;
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

const CellBasic = forwardRef<HTMLDivElement, CellBasicProps>(
  (props: CellBasicProps, ref): JSX.Element | null => {
    const {
      primaryText,
      secondaryText,
      shouldShowTooltipOnHover = true,
      tooltipProps,
      as = "td",
      link,
      linkProps,
      linkComponent,
    } = props;

    // Get row hover state from context (fallback to false if not available)
    const { isRowHovered } = useContext(RowHoverContext) || {
      isRowHovered: false,
    };

    // Pass the row hover state to the styled component
    const enhancedProps = { ...props, isRowHovered };

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
          <StyledTableData ref={ref} as={as} {...enhancedProps}>
            {link ? (
              <StyledCellBasicLink
                href={link}
                {...linkProps}
                component={linkComponent}
              >
                <CellBasicContent {...props} />
              </StyledCellBasicLink>
            ) : (
              <CellBasicContent {...props} />
            )}
          </StyledTableData>
        </Tooltip>
      );
    }
    return (
      <StyledTableData ref={ref} as={as} {...enhancedProps}>
        {link ? (
          <Link
            href={link}
            {...linkProps}
            underline="none"
            color="inherit"
            component={linkComponent as React.ElementType}
          >
            <CellBasicContent {...props} />
          </Link>
        ) : (
          <CellBasicContent {...props} />
        )}
      </StyledTableData>
    );
  }
);

CellBasic.displayName = "CellBasic";

export default CellBasic;
