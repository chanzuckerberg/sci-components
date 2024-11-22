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
      {(!hideSortIcon || active) && sortIcon}
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
      ...rest
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
          <StyledTableHeader ref={ref} {...rest}>
            <CellHeaderContent {...props}>{children}</CellHeaderContent>
          </StyledTableHeader>
        </Tooltip>
      );
    }
    return (
      <StyledTableHeader ref={ref} {...rest}>
        <CellHeaderContent {...props}>{children}</CellHeaderContent>
      </StyledTableHeader>
    );
  }
);

export default CellHeader;
