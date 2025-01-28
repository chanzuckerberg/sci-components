import React, { forwardRef } from "react";
import { IconNameToSizes } from "src/core/Icon";
import Tooltip, { TooltipProps } from "src/core/Tooltip";
import {
  CellHeaderExtraProps,
  StyledCellHeaderContainer,
  StyledSortingIcon,
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
}

interface CellHeaderRawProps
  extends Omit<React.HTMLProps<HTMLTableCellElement>, "as"> {
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
  } = props;

  const sdsIconName: keyof IconNameToSizes =
    direction === "asc" ? "ChevronUp" : "ChevronDown";

  const sortIcon = (
    <StyledSortingIcon
      aria-label={
        direction === "asc"
          ? "Change sort direction from ascending to descending"
          : "Change sort direction from descending to ascending"
      }
      sdsIcon={sdsIconName}
      sdsSize="xs"
      active={active}
      hideSortIcon={hideSortIcon}
    />
  );

  return (
    <StyledCellHeaderContainer horizontalAlign={horizontalAlign}>
      <span>{children}</span>
      {(!hideSortIcon || active) && hover && sortIcon}
    </StyledCellHeaderContainer>
  );
};

const CellHeader = forwardRef<HTMLTableCellElement, CellHeaderProps>(
  (props, ref): JSX.Element | null => {
    const {
      children,
      shouldShowTooltipOnHover = false,
      tooltipProps,
      tooltipText = "",
      tooltipSubtitle,
      hover = true,
      ...rest
    } = props;

    if (shouldShowTooltipOnHover && hover) {
      return (
        <Tooltip
          arrow
          placement="top-start"
          sdsStyle="dark"
          subtitle={tooltipSubtitle}
          title={tooltipText}
          {...tooltipProps}
        >
          <StyledTableHeader ref={ref} hover={hover} {...rest}>
            <CellHeaderContent {...props} hover={hover}>
              {children}
            </CellHeaderContent>
          </StyledTableHeader>
        </Tooltip>
      );
    }
    return (
      <StyledTableHeader ref={ref} hover={hover} {...rest}>
        <CellHeaderContent hover={hover} {...props}>
          {children}
        </CellHeaderContent>
      </StyledTableHeader>
    );
  }
);

export default CellHeader;
