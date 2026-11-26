import { MenuItemProps as RawMenuItemProps } from "@mui/material";
import React, { ForwardedRef, forwardRef } from "react";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
import {
  ColumnWrapper,
  ContentWrapper,
  DotIcon,
  StyledCheckIcon,
  StyledIconWrapper,
  StyledMenuItem,
  StyledMenuItemIcon,
  StyledMinusIcon,
  TextWrapper,
} from "./style";

export interface MenuItemExtraProps {
  column?: React.ReactNode;
  isMultiSelect?: boolean;
  /**
   * The icon shown at the start of the item, usually a Phosphor or
   * `@czi-sds/icons` icon. The item draws it at its own size, in blue unless
   * the icon sets a `color`.
   */
  icon?: React.ReactElement;
  sdsStyle?: "determinate" | "indeterminate";
  sdsType?: "default" | "action";
}

export type MenuItemProps = MenuItemExtraProps & RawMenuItemProps;

/**
 * @see https://mui.com/material-ui/react-menu/
 */
const MenuItem = forwardRef(function MenuItem(
  props: MenuItemProps,
  ref: ForwardedRef<HTMLLIElement | null>
) {
  const {
    children,
    column = null,
    disabled,
    icon,
    isMultiSelect = false,
    sdsStyle = "determinate",
    sdsType = "default",
    ...originalMenuItemProps
  } = props;
  const { selected = false } = originalMenuItemProps;

  // Determine if this is an action-type MenuItem based on onClick presence
  const isActionType = sdsType === "action";

  const selectionIcon = () => {
    if (isMultiSelect) {
      if (sdsStyle === "determinate") {
        return (
          <StyledIconWrapper>
            <StyledCheckIcon
              {...INTERNAL_ICON_PROPS}
              size={12}
              selected={selected}
              disabled={disabled}
            />
          </StyledIconWrapper>
        );
      }
      return (
        <StyledIconWrapper>
          <StyledMinusIcon
            {...INTERNAL_ICON_PROPS}
            size={12}
            selected={selected}
            disabled={disabled}
          />
        </StyledIconWrapper>
      );
    } else {
      return (
        <StyledIconWrapper>
          <DotIcon
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            selected={selected}
            disabled={disabled}
          >
            <circle cx="6" cy="6" r="2" />
          </DotIcon>
        </StyledIconWrapper>
      );
    }
  };

  return (
    <StyledMenuItem {...originalMenuItemProps} disabled={disabled} ref={ref}>
      {!isActionType && selectionIcon()}

      <ContentWrapper>
        <TextWrapper
          selected={selected}
          className="primary-text"
          disabled={disabled}
        >
          {icon && (
            <StyledMenuItemIcon disabled={disabled}>{icon}</StyledMenuItemIcon>
          )}
          {children}
        </TextWrapper>

        {column && <ColumnWrapper disabled={disabled}>{column}</ColumnWrapper>}
      </ContentWrapper>
    </StyledMenuItem>
  );
});

export default MenuItem;
