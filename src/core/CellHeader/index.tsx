import React, { forwardRef } from "react";
import Icon, { IconNameToSizes } from "../Icon";
import Tooltip, { TooltipProps } from "../Tooltip";
import {
  CellHeaderExtraProps,
  StyledSortingIcon,
  StyledTableHeader,
} from "./style";

export type CellHeaderDirection = "asc" | "desc";

interface CellHeaderContentProps {
  active?: boolean;
  direction?: CellHeaderDirection;
  hideSortIcon?: boolean;
  children: string;
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
  const { active, children, direction = "desc", hideSortIcon = false } = props;

  const sdsIconName: keyof IconNameToSizes =
    direction === "asc" ? "chevronUp" : "chevronDown";

  const sortIcon = (
    <StyledSortingIcon sdsType="tertiary" sdsSize="small" active={active}>
      <Icon sdsSize="s" sdsIcon={sdsIconName} sdsType="iconButton" />
    </StyledSortingIcon>
  );

  return (
    <>
      <span>{children}</span>
      {!hideSortIcon && sortIcon}
    </>
  );
};

const CellHeader = forwardRef<HTMLTableCellElement, CellHeaderProps>(
  (props, ref): JSX.Element | null => {
    const {
      children,
      shouldShowTooltipOnHover = false,
      tooltipProps,
      tooltipText = props.children,
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
