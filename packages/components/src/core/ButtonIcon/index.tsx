import { IconButtonProps as RawButtonIconProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
import Icon, { IconNameToSizes, IconProps } from "src/core/Icon";
import {
  ButtonIconExtraProps,
  ButtonIconSizeToTypes,
  StyledButtonIcon,
} from "./style";

export type { ButtonIconProps, ButtonIconSizeToTypes };
export interface ButtonIconInternalProps<
  IconName extends keyof IconNameToSizes,
> {
  icon: IconName | React.ReactElement<CustomSVGProps>;
  /**
   * @deprecated
   * (masoudmanson): This prop is deprecated and will be removed in the next major version.
   * Please use `icon` instead.
   */
  sdsIcon?: IconName | React.ReactElement<CustomSVGProps>;
  sdsIconProps?: Partial<IconProps<IconName>>;
}

type ButtonIconProps<
  IconName extends keyof IconNameToSizes,
  ButtonIconSize extends keyof ButtonIconSizeToTypes,
> = ButtonIconExtraProps<ButtonIconSize> &
  RawButtonIconProps &
  ButtonIconInternalProps<IconName>;

const ButtonIconSizeToSdsIconSize = {
  large: "xl",
  medium: "l",
  small: "s",
};

/**
 * @see https://mui.com/material-ui/react-button/#icon-buttons
 */
const ButtonIcon = forwardRef(function ButtonIcon<
  IconName extends keyof IconNameToSizes,
  ButtonIconSize extends keyof ButtonIconSizeToTypes,
>(
  props: ButtonIconProps<IconName, ButtonIconSize>,
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
            sdsSize={iconSize as IconNameToSizes[IconName]}
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
