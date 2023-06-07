import { IconButtonProps as RawButtonIconProps } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
import Icon, { IconNameToSizes, IconProps } from "../Icon";
import {
  ButtonIconExtraProps,
  ButtonIconSizeToTypes,
  StyledButtonIcon,
} from "./style";

export type { ButtonIconProps, ButtonIconSizeToTypes };
export interface ButtonIconInternalProps<
  IconName extends keyof IconNameToSizes
> {
  sdsIcon: IconName;
  sdsIconProps?: Partial<IconProps<IconName>>;
}

type ButtonIconProps<
  IconName extends keyof IconNameToSizes,
  ButtonIconSize extends keyof ButtonIconSizeToTypes
> = ButtonIconExtraProps<ButtonIconSize> &
  Omit<RawButtonIconProps, "nonce" | "rev" | "rel" | "autoFocus" | "content"> &
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
  ButtonIconSize extends keyof ButtonIconSizeToTypes
>(
  props: ButtonIconProps<IconName, ButtonIconSize>,
  ref: ForwardedRef<HTMLButtonElement | null>
): JSX.Element {
  const { sdsIcon, sdsSize = "large", sdsIconProps } = props;
  const iconSize = ButtonIconSizeToSdsIconSize[sdsSize];
  return (
    <StyledButtonIcon {...props} ref={ref}>
      <Icon
        sdsType="iconButton"
        {...sdsIconProps}
        sdsIcon={sdsIcon}
        sdsSize={iconSize as IconNameToSizes[IconName]}
      />
    </StyledButtonIcon>
  );
});

export default ButtonIcon;
