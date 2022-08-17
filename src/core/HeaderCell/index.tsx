import React, { forwardRef } from "react";
import Icon, { IconNameToSizes } from "../Icon";
import Tooltip, { TooltipProps } from "../Tooltip";

import {
  HeaderCellExtraProps,
  StyledSortingIcon,
  StyledTableHeader,
} from "./style";

interface HeaderCellContentProps {
  active?: boolean;
  textPosition?: "left" | "right";
  direction?: "asc" | "desc";
  hideSortIcon?: boolean;
  children: string;
}

interface HeaderCellRawProps {
  tooltipText?: string;
  tooltipSubtitle?: string;
  shouldShowTooltipOnHover?: boolean;
  tooltipProps?: Partial<TooltipProps>;
}

export type HeaderCellProps = HeaderCellRawProps &
  HeaderCellExtraProps &
  HeaderCellContentProps;

const HeaderCellContent = forwardRef(
  (props: HeaderCellContentProps, _): JSX.Element | null => {
    const {
      active,
      textPosition,
      children,
      direction = "desc",
      hideSortIcon = false,
    } = props;

    const sdsIconName: keyof IconNameToSizes =
      direction === "asc" ? "chevronUp" : "chevronDown";

    const sortIcon = (
      <StyledSortingIcon
        sdsType="tertiary"
        sdsSize="small"
        active={active}
        textPosition={textPosition}
      >
        <Icon sdsSize="s" sdsIcon={sdsIconName} sdsType="iconButton" />
      </StyledSortingIcon>
    );

    return (
      <>
        <span>{children}</span>
        {!hideSortIcon && sortIcon}
      </>
    );
  }
);

const HeaderCell = forwardRef(
  (props: HeaderCellProps, _): JSX.Element | null => {
    const {
      children,
      shouldShowTooltipOnHover = true,
      tooltipProps,
      tooltipText = props.children,
      tooltipSubtitle,
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
          <StyledTableHeader {...props}>
            <HeaderCellContent {...props}>{children}</HeaderCellContent>
          </StyledTableHeader>
        </Tooltip>
      );
    }
    return (
      <StyledTableHeader {...props}>
        <HeaderCellContent {...props}>{children}</HeaderCellContent>
      </StyledTableHeader>
    );
  }
);

export default HeaderCell;
