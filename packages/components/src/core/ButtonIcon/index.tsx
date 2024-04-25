import { IconButtonProps as RawButtonIconProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
import Icon, { IconNameToSizes, IconProps } from "src/core/Icon";
import { ButtonIconExtraProps, StyledButtonIcon } from "./style";

export interface ButtonIconInternalProps {
  icon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  /**
   * @deprecated
   * (masoudmanson): This prop is deprecated and will be removed in the next major version.
   * Please use `icon` instead.
   */
  sdsIcon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
}

export type ButtonIconProps = ButtonIconExtraProps &
  RawButtonIconProps &
  ButtonIconInternalProps;

type IconSizeType = "xs" | "s" | "l" | "xl";

const ButtonIconSizeToSdsIconSize = {
  large: "xl",
  medium: "l",
  small: "s",
};

/**
 * @see https://mui.com/material-ui/react-button/#icon-buttons
 *
 * @deprecated
 * This component is deprecated and will be removed in the next major version.
 * Please use `Button` or `ButtonDropdown` with `sdsStyle: icon` instead.
 */
const ButtonIcon = forwardRef(function ButtonIcon(
  props: ButtonIconProps,
  ref: ForwardedRef<HTMLButtonElement | null>
): JSX.Element {
  /**
   * After deprecating `sdsIcon` prop, we need to remove it from the props object
   * and use `icon` prop instead. The icon prop won't need to be aliased to newIcon
   * in the future.
   */
  const { icon: newIcon, sdsIcon, sdsIconProps, sdsSize = "large" } = props;
  const iconSize = ButtonIconSizeToSdsIconSize[sdsSize];

  /**
   * After deprecating the `sdsIcon` prop, the `icon` prop will be the only prop
   * to be used for the icon.
   */
  const icon = newIcon || sdsIcon;

  const iconItem = () => {
    if (icon) {
      if (typeof icon !== "string") {
        return icon;
      } else {
        return (
          <Icon
            sdsType="iconButton"
            {...sdsIconProps}
            sdsIcon={icon}
            sdsSize={iconSize as IconSizeType}
          />
        );
      }
    }
  };

  return (
    <StyledButtonIcon {...props} ref={ref}>
      {iconItem()}
    </StyledButtonIcon>
  );
});

export default ButtonIcon;
