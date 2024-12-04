import { ButtonProps as RawButtonProps } from "@mui/material";
import React, { ForwardedRef } from "react";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import { StyledButton, StyledButtonLegacy, StyledMinimalButton } from "./style";
import ButtonIcon from "../ButtonIcon";
import { IconNameToSizes, IconProps } from "../Icon";
import { filterProps } from "src/common/utils";

type ButtonType = "primary" | "secondary" | "tertiary" | "destructive";
type ButtonSize = "small" | "medium" | "large";

export interface SdsIconButtonProps {
  sdsStyle?: "icon";
  sdsType?: "primary" | "secondary" | "tertiary";
  isAllCaps?: boolean;
  isRounded?: boolean;
  sdsSize?: ButtonSize;
  icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
}

export interface SdsMinimalButtonProps {
  sdsStyle?: "minimal";
  sdsType?: "primary" | "secondary";
  isAllCaps?: boolean;
  isRounded?: boolean;
}

export interface SdsButtonProps {
  sdsStyle?: "rounded" | "square";
  sdsType?: "primary" | "secondary" | "destructive";
  isAllCaps?: boolean;
  isRounded?: boolean;
}

type SdsProps = SdsIconButtonProps | SdsMinimalButtonProps | SdsButtonProps;

export type ButtonProps = RawButtonProps & SdsProps;

/**
 * (masoudmanson): The MUI variant prop is determined by the sdsType prop.
 */
const MUI_VARIANT_MAP: { [key in ButtonType]: ButtonProps["variant"] } = {
  destructive: "contained",
  primary: "contained",
  secondary: "outlined",
  tertiary: "text",
};

/**
 * @see https://mui.com/material-ui/react-button/
 */
const Button = React.forwardRef(
  (
    props: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const { sdsStyle, sdsType } = props;

    if (!sdsStyle || !sdsType) {
      showWarningIfFirstOccurence(SDSWarningTypes.ButtonMissingSDSProps);
    }

    if (typeof props?.isAllCaps === "boolean" && sdsStyle !== "minimal") {
      showWarningIfFirstOccurence(SDSWarningTypes.ButtonMinimalIsAllCaps);
    }

    // isAllCaps is only used for the Minimal Button.
    // It defaults to true for the Minimal Button.
    // It defaults to false for all other buttons.
    const isAllCaps =
      typeof props?.isAllCaps === "boolean"
        ? props?.isAllCaps
        : sdsStyle === "minimal";

    type PropsWithDefaultsType = ButtonProps & { isAllCaps?: boolean };
    const propsWithDefault: PropsWithDefaultsType = { ...props, isAllCaps };

    switch (true) {
      case sdsStyle === "icon":
        if (props?.icon !== undefined) {
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
              icon={props?.icon}
              {...finalProps}
              sdsType={sdsType as Exclude<ButtonType, "destructive">}
              ref={ref}
            />
          );
        } else {
          showWarningIfFirstOccurence(
            SDSWarningTypes.ButtonIconMissingIconProp
          );
          return null;
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

export default Button;
