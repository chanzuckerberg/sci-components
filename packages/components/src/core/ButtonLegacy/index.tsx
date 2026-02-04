import { ButtonProps as RawButtonProps } from "@mui/material";
import React, { ForwardedRef, HTMLAttributeAnchorTarget } from "react";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import { StyledButton, StyledButtonLegacy, StyledMinimalButton } from "./style";
import ButtonIcon from "../ButtonIcon";
import { IconNameToSizes, IconProps } from "../Icon";
import { filterProps } from "src/common/utils";

export type ButtonLegacyType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "destructive";

export type ButtonLegacyTypeMap = {
  icon: "primary" | "secondary" | "tertiary";
  minimal: "primary" | "secondary";
  rounded: "primary" | "secondary" | "destructive";
  square: "primary" | "secondary" | "destructive";
};

export type ButtonLegacySize = "small" | "medium" | "large";

interface BaseButtonLegacyProps extends RawButtonProps {
  children?: React.ReactNode;
  isAllCaps?: boolean;
  target?: HTMLAttributeAnchorTarget;
}

export interface SdsIconButtonLegacyProps extends BaseButtonLegacyProps {
  sdsStyle: "icon";
  sdsType?: ButtonLegacyTypeMap["icon"];
  sdsSize?: ButtonLegacySize;
  icon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
}

export interface SdsMinimalButtonLegacyProps extends BaseButtonLegacyProps {
  sdsStyle: "minimal";
  sdsType?: ButtonLegacyTypeMap["minimal"];
  children: React.ReactNode;
}

export interface SdsButtonLegacyProps extends BaseButtonLegacyProps {
  sdsStyle: "rounded" | "square";
  isRounded?: boolean;
  sdsType?: ButtonLegacyTypeMap["rounded" | "square"];
  children: React.ReactNode;
}

export type SdsLegacyProps =
  | SdsIconButtonLegacyProps
  | SdsMinimalButtonLegacyProps
  | SdsButtonLegacyProps;

export type ButtonLegacyProps = SdsLegacyProps;

/**
 * (masoudmanson): The MUI variant prop is determined by the sdsType prop.
 */
const MUI_VARIANT_MAP: {
  [key in ButtonLegacyType]: ButtonLegacyProps["variant"];
} = {
  destructive: "contained",
  primary: "contained",
  secondary: "outlined",
  tertiary: "text",
};

/**
 * @see https://mui.com/material-ui/react-button/
 * @deprecated Use Button instead. ButtonLegacy will be removed in a future release.
 */
const ButtonLegacy = React.forwardRef(
  (
    props: ButtonLegacyProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const { sdsStyle = "square", sdsType } = props;

    if (!sdsStyle || !sdsType) {
      showWarningIfFirstOccurence(SDSWarningTypes.ButtonMissingSDSProps);
    }

    if (sdsStyle === "icon" && typeof props?.isAllCaps === "boolean") {
      showWarningIfFirstOccurence(SDSWarningTypes.ButtonMinimalIsAllCaps);
    }

    // isAllCaps is only used for the Minimal Button.
    // It defaults to true for the Minimal Button.
    // It defaults to false for all other buttons.
    const isAllCaps =
      typeof props?.isAllCaps === "boolean"
        ? props?.isAllCaps
        : sdsStyle === "minimal";

    type PropsWithDefaultsType = ButtonLegacyProps & { isAllCaps?: boolean };
    const propsWithDefault: PropsWithDefaultsType = { ...props, isAllCaps };

    switch (true) {
      case sdsStyle === "icon": {
        const iconProps = props as SdsIconButtonLegacyProps;
        if (iconProps?.icon !== undefined) {
          // (masoudmanson): We need to remove the props that are not supported by
          // the ButtonIcon component.
          const excludedProps: (keyof PropsWithDefaultsType)[] = [
            "startIcon",
            "endIcon",
            "sdsStyle",
            "isAllCaps",
            "sdsType",
          ];
          const finalProps = filterProps(propsWithDefault, excludedProps);

          return (
            <ButtonIcon
              icon={iconProps?.icon}
              {...finalProps}
              sdsType={sdsType as Exclude<ButtonLegacyType, "destructive">}
              ref={ref}
            />
          );
        } else {
          showWarningIfFirstOccurence(
            SDSWarningTypes.ButtonIconMissingIconProp
          );
          return null;
        }
      }

      case sdsStyle === "minimal":
        return (
          <StyledMinimalButton
            color="primary"
            variant="text"
            {...propsWithDefault}
            ref={ref}
            data-style={sdsStyle}
          />
        );

      case sdsStyle === "rounded":
      case sdsStyle === "square":
        return (
          <StyledButton
            color="primary"
            variant={sdsType ? MUI_VARIANT_MAP[sdsType] : "text"}
            {...propsWithDefault}
            ref={ref}
          />
        );

      default:
        return <StyledButtonLegacy {...propsWithDefault} ref={ref} />;
    }
  }
);

export default ButtonLegacy;
