import { MenuItemProps as RawMenuItemProps } from "@mui/material";
import React, { ForwardedRef, forwardRef } from "react";
import Icon, { IconNameToSizes, IconProps } from "src/core/Icon";
import {
  ColumnWrapper,
  ContentWrapper,
  StyledCheck,
  StyledIconWrapper,
  StyledMenuItem,
  StyledMenuItemIcon,
  StyledMinus,
  TextWrapper,
} from "./style";

/* 
  The final goal is to create a typescript interface which only accepts the 
  icons with "xs" or "s" size. At first we create a new TypeScript interface 
  that modifies the IconNameToSizes interface to change the values of icons 
  with 'xs' | 's' | 'l' | 'xl' sizes to 'xs' | 's', allowing for easy 
  filtering of items with 'l' | 'xl' sizes only later on
 */
type ModifiedIconNameToSizes = {
  [K in keyof IconNameToSizes]: IconNameToSizes[K] extends
    | "xs"
    | "s"
    | "l"
    | "xl"
    ? IconNameToSizes[K] extends "l" | "xl"
      ? "l" | "xl"
      : "xs" | "s"
    : IconNameToSizes[K];
};

/* 
  In the second step we create a TypeScript interface that is a subset of 
  the IconNameToSizes interface, containing only those icons that can be "xs" or "s" in size.

  As a result, the MenuItem component accepts a bacteria icon with a 
  size value of "xs" | "s" | "l" | "xl" or a check icon with a size value of "xs" | "s", 
  but not a book icon since it has a size value of "l" | "xl".
 */
export type IconNameToSmallSizes = {
  [K in keyof ModifiedIconNameToSizes as ModifiedIconNameToSizes[K] extends
    | "xs"
    | "s"
    ? K
    : never]: IconNameToSizes[K];
};

export interface MenuItemExtraProps<
  IconName extends keyof IconNameToSmallSizes,
> {
  column?: React.ReactNode;
  isMultiSelect?: boolean;
  icon?: IconName | React.ReactElement<CustomSVGProps>;
  /**
   * @deprecated Use `icon` instead.
   * (masoudmanson): This prop is deprecated and will be removed in the next major version.
   * Please replace instances of `sdsIcon` with `icon`.
   */
  sdsIcon?: IconName | React.ReactElement<CustomSVGProps>;
  sdsIconProps?: Partial<IconProps<IconName>>;
  sdsStyle?: "determinate" | "indeterminate";
}

export type MenuItemProps<IconName extends keyof IconNameToSmallSizes> =
  MenuItemExtraProps<IconName> & RawMenuItemProps;

/**
 * @see https://mui.com/material-ui/react-menu/
 */
const MenuItem = forwardRef(function MenuItem<
  IconName extends keyof IconNameToSmallSizes,
>(props: MenuItemProps<IconName>, ref: ForwardedRef<HTMLLIElement | null>) {
  const {
    children,
    column = null,
    disabled,
    isMultiSelect = false,
    /**
     * After deprecating the `sdsIcon` prop, the `icon` prop will be the only prop
     * utilized for the icon, and there will be no need to alias it as `newIcon`.
     */
    icon: newIcon,
    /**
     * Following the deprecation of the `sdsIcon` prop, it should be excluded from the props object.
     */
    sdsIcon,
    sdsIconProps,
    sdsStyle = "determinate",
    ...originalMenuItemProps
  } = props;
  const { selected = false } = originalMenuItemProps as MenuItemProps<IconName>;

  const selectionIcon = () => {
    if (sdsStyle === "determinate") {
      return (
        <StyledIconWrapper>
          <StyledCheck
            className="check-icon"
            selected={selected}
            color="primary"
            disabled={disabled}
          />
        </StyledIconWrapper>
      );
    }
    return (
      <StyledIconWrapper>
        <StyledMinus
          className="check-icon"
          selected={selected}
          color="primary"
          disabled={disabled}
        />
      </StyledIconWrapper>
    );
  };

  /**
   * Following the deprecation of the `sdsIcon` prop, the `icon` prop will serve as
   * the exclusive property for representing the icon, making this line unnecessary.
   */
  const icon = newIcon || sdsIcon;

  const iconItem = () => {
    if (icon) {
      if (typeof icon !== "string") {
        return (
          <StyledMenuItemIcon disabled={disabled}>{icon}</StyledMenuItemIcon>
        );
      } else {
        return (
          <StyledMenuItemIcon disabled={disabled}>
            <Icon color="blue" {...sdsIconProps} sdsIcon={icon} sdsSize="s" />
          </StyledMenuItemIcon>
        );
      }
    }
  };

  return (
    <StyledMenuItem {...originalMenuItemProps} disabled={disabled} ref={ref}>
      {isMultiSelect && selectionIcon()}

      <ContentWrapper>
        <TextWrapper
          selected={selected}
          className="primary-text"
          disabled={disabled}
        >
          {iconItem()}
          {children}
        </TextWrapper>

        {column && <ColumnWrapper disabled={disabled}>{column}</ColumnWrapper>}
      </ContentWrapper>
    </StyledMenuItem>
  );
});

export default MenuItem;
