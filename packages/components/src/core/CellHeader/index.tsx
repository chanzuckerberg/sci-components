import React, { forwardRef } from "react";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
import Tooltip, { TooltipProps } from "@components/src/core/Tooltip";
import {
  CellHeaderExtraProps,
  StyledCellHeaderContainer,
  StyledCellHeaderText,
  StyledSortAscendingIcon,
  StyledSortDescendingIcon,
  StyledTableHeader,
} from "./style";

export type CellHeaderDirection = "asc" | "desc";

interface CellHeaderContentProps {
  active?: boolean;
  direction?: CellHeaderDirection;
  hideSortIcon?: boolean;
  horizontalAlign?: "left" | "center" | "right";
  children: React.ReactNode;
  hover?: boolean;
  shouldTruncate?: boolean;
}

interface CellHeaderRawProps extends Omit<
  React.HTMLProps<HTMLDivElement>,
  "as"
> {
  as?: React.ElementType;
  tooltipText?: string;
  tooltipSubtitle?: string;
  shouldShowTooltipOnHover?: boolean;
  tooltipProps?: Partial<TooltipProps>;
}

export type CellHeaderProps = CellHeaderRawProps &
  CellHeaderExtraProps &
  CellHeaderContentProps;

const CellHeaderContent = (
  props: CellHeaderContentProps
): JSX.Element | null => {
  const {
    active,
    children,
    direction = "desc",
    hideSortIcon = false,
    horizontalAlign,
    hover,
    shouldTruncate = false,
  } = props;

  const StyledSortingIcon =
    direction === "asc" ? StyledSortAscendingIcon : StyledSortDescendingIcon;

  const sortIcon = (
    <StyledSortingIcon
      {...INTERNAL_ICON_PROPS}
      size={12}
      active={active}
      hideSortIcon={hideSortIcon}
    />
  );

  return (
    <StyledCellHeaderContainer horizontalAlign={horizontalAlign}>
      {typeof children === "string" || typeof children === "number" ? (
        <StyledCellHeaderText shouldTruncate={shouldTruncate}>
          {children}
        </StyledCellHeaderText>
      ) : (
        children
      )}
      {(!hideSortIcon || active) && hover && sortIcon}
    </StyledCellHeaderContainer>
  );
};

const CellHeader = forwardRef<HTMLTableCellElement, CellHeaderProps>(
  (props, ref): JSX.Element | null => {
    const {
      as = "th",
      children,
      shouldShowTooltipOnHover = false,
      tooltipProps,
      tooltipText = "",
      tooltipSubtitle,
      hover = false,
      ...rest
    } = props;

    if (shouldShowTooltipOnHover && hover) {
      return (
        <Tooltip
          arrow
          placement="top-start"
          subtitle={tooltipSubtitle}
          title={tooltipText}
          {...tooltipProps}
        >
          <StyledTableHeader as={as} ref={ref} hover={hover} {...rest}>
            <CellHeaderContent {...props} hover={hover}>
              {children}
            </CellHeaderContent>
          </StyledTableHeader>
        </Tooltip>
      );
    }
    return (
      <StyledTableHeader as={as} ref={ref} hover={hover} {...rest}>
        <CellHeaderContent hover={hover} {...props}>
          {children}
        </CellHeaderContent>
      </StyledTableHeader>
    );
  }
);

export default CellHeader;
