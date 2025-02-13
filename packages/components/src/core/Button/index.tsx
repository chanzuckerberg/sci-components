import {
  ButtonProps as RawButtonProps,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import React, { ForwardedRef } from "react";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import { StyledButton, StyledButtonLegacy, StyledMinimalButton } from "./style";
import ButtonIcon from "../ButtonIcon";
import { IconNameToSizes, IconProps } from "../Icon";
import { filterProps } from "src/common/utils";
import { Theme } from "../styles";

type ButtonType = "primary" | "secondary" | "tertiary" | "destructive";

type ButtonTypeMap = {
  icon: "primary" | "secondary" | "tertiary";
  minimal: "primary" | "secondary";
  rounded: "primary" | "secondary" | "destructive";
  square: "primary" | "secondary" | "destructive";
};

type ButtonSize = "small" | "medium" | "large";

interface BaseButtonProps {
  customTheme?: "light" | "dark" | "auto";
  children?: React.ReactNode;
  isAllCaps?: boolean;
}

export interface SdsIconButtonProps extends BaseButtonProps {
  sdsStyle: "icon";
  sdsType?: ButtonTypeMap["icon"];
  sdsSize?: ButtonSize;
  icon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
}

export interface SdsMinimalButtonProps extends BaseButtonProps {
  sdsStyle: "minimal";
  sdsType?: ButtonTypeMap["minimal"];
  children: React.ReactNode;
}

export interface SdsButtonProps extends BaseButtonProps {
  sdsStyle: "rounded" | "square";
  isRounded?: boolean;
  sdsType?: ButtonTypeMap["rounded" | "square"];
  children: React.ReactNode;
}

export type SdsProps =
  | SdsIconButtonProps
  | SdsMinimalButtonProps
  | SdsButtonProps;

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
    const { sdsStyle = "square", sdsType, customTheme = "auto" } = props;

    const muiTheme = useTheme();
    const mode = muiTheme?.palette?.mode || "light";
    const componentTheme = customTheme !== "auto" ? customTheme : mode;

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

    type PropsWithDefaultsType = ButtonProps & { isAllCaps?: boolean };
    const propsWithDefault: PropsWithDefaultsType = { ...props, isAllCaps };

    switch (true) {
      case sdsStyle === "icon": {
        const iconProps = props as SdsIconButtonProps;
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
            <ThemeProvider theme={Theme(componentTheme)}>
              <ButtonIcon
                icon={iconProps?.icon}
                {...finalProps}
                sdsType={sdsType as Exclude<ButtonType, "destructive">}
                ref={ref}
              />
            </ThemeProvider>
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
          <ThemeProvider theme={Theme(componentTheme)}>
            <StyledMinimalButton
              color="primary"
              variant="text"
              {...propsWithDefault}
              ref={ref}
              data-style={sdsStyle}
            />
          </ThemeProvider>
        );

      case sdsStyle === "rounded":
      case sdsStyle === "square":
        return (
          <ThemeProvider theme={Theme(componentTheme)}>
            <StyledButton
              color="primary"
              variant={sdsType ? MUI_VARIANT_MAP[sdsType] : "text"}
              {...propsWithDefault}
              ref={ref}
            />
          </ThemeProvider>
        );

      default:
        return (
          <ThemeProvider theme={Theme(componentTheme)}>
            <StyledButtonLegacy {...propsWithDefault} ref={ref} />
          </ThemeProvider>
        );
    }
  }
);

export default Button;
