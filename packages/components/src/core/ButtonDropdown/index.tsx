import React, { ForwardedRef } from "react";
import Button, {
  ButtonProps,
  ButtonSize,
  ButtonTypeMap,
} from "src/core/Button";
import Icon, { IconNameToSizes, IconProps } from "src/core/Icon";
import ButtonIcon from "../ButtonIcon";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";

type SdsProps =
  | {
      sdsStyle: "icon";
      sdsType?: ButtonTypeMap["icon"];
      icon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
      sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
      sdsSize?: ButtonSize;
    }
  | {
      sdsStyle: "rounded" | "square";
      sdsType?: ButtonTypeMap["rounded"];
      icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
      sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
      sdsSize?: ButtonSize;
    };

export type ButtonDropdownProps = ButtonProps & SdsProps;

/**
 * @see https://mui.com/material-ui/react-button/
 */
const ButtonDropdown = React.forwardRef(
  (
    props: ButtonDropdownProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const { sdsStyle } = props;

    if (sdsStyle === "icon") {
      if (!props.icon) {
        showWarningIfFirstOccurence(SDSWarningTypes.ButtonIconMissingIconProp);
        return null;
      }
      return <ButtonIcon {...props} ref={ref} />;
    }

    if (sdsStyle === "square" || sdsStyle === "rounded") {
      const iconItem = () => {
        if (props?.icon) {
          return typeof props?.icon === "string" ? (
            <Icon {...props?.sdsIconProps} sdsIcon={props?.icon} sdsSize="s" />
          ) : (
            props?.icon
          );
        }
        return null;
      };

      return (
        <Button
          {...props}
          endIcon={<Icon sdsIcon="ChevronDown" sdsSize="xs" />}
          sdsStyle={sdsStyle}
          ref={ref}
          startIcon={iconItem()}
        />
      );
    }

    showWarningIfFirstOccurence(SDSWarningTypes.ButtonDropdownMinimal);
    return null;
  }
);

export default ButtonDropdown;
