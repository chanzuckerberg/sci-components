import { ButtonProps as RawButtonProps } from "@mui/material";
import React, { ForwardedRef } from "react";
import Button from "src/core/Button";
import Icon, { IconNameToSizes, IconProps } from "src/core/Icon";
import ButtonIcon from "../ButtonIcon";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";

type SdsProps = {
  icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsStyle?: "rounded" | "square" | "icon";
  sdsType?: "primary" | "secondary";
  sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
  sdsSize?: "small" | "medium" | "large";
};

export type ButtonDropdownProps<C extends React.ElementType = "button"> =
  RawButtonProps<C, { component?: C }> & SdsProps;

type IconSizeType = "xs" | "s" | "l" | "xl";

const ButtonIconSizeToSdsIconSize = {
  large: "xl",
  medium: "l",
  small: "s",
};

/**
 * @see https://mui.com/material-ui/react-button/
 */
const ButtonDropdown = React.forwardRef(
  <C extends React.ElementType>(
    props: ButtonDropdownProps<C>,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const { icon, sdsStyle, sdsType, sdsSize = "medium", sdsIconProps } = props;
    const iconSize = ButtonIconSizeToSdsIconSize[sdsSize];

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

    if (sdsStyle === "icon") {
      if (icon !== undefined) {
        return <ButtonIcon icon={icon} {...props} ref={ref} />;
      } else {
        showWarningIfFirstOccurence(SDSWarningTypes.ButtonIconMissingIconProp);
        return null;
      }
    } else {
      return (
        <Button
          {...props}
          endIcon={<Icon sdsIcon="ChevronDown" sdsSize="xs" sdsType="button" />}
          sdsStyle={sdsStyle}
          ref={ref}
          sdsType={sdsType}
          startIcon={iconItem()}
        />
      );
    }
  }
);

export default ButtonDropdown;
