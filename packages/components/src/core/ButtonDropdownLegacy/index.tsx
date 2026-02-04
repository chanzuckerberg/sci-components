import React, { ForwardedRef } from "react";
import ButtonLegacy, {
  ButtonLegacyProps,
  ButtonLegacySize,
  ButtonLegacyTypeMap,
} from "src/core/ButtonLegacy";
import Icon, { IconNameToSizes, IconProps } from "src/core/Icon";
import ButtonIcon from "../ButtonIcon";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";

type SdsLegacyProps =
  | {
      sdsStyle: "icon";
      sdsType?: ButtonLegacyTypeMap["icon"];
      icon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
      sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
      sdsSize?: ButtonLegacySize;
    }
  | {
      sdsStyle: "rounded" | "square";
      sdsType?: ButtonLegacyTypeMap["rounded"];
      icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
      sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
      sdsSize?: ButtonLegacySize;
    };

export type ButtonDropdownLegacyProps = ButtonLegacyProps & SdsLegacyProps;

/**
 * @see https://mui.com/material-ui/react-button/
 * @deprecated Use ButtonDropdown instead. ButtonDropdownLegacy will be removed in a future release.
 */
const ButtonDropdownLegacy = React.forwardRef(
  (
    props: ButtonDropdownLegacyProps,
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
        <ButtonLegacy
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

export default ButtonDropdownLegacy;
