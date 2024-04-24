import { ButtonProps as RawButtonProps } from "@mui/material";
import React, { ForwardedRef } from "react";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import {
  PrimaryMinimalButton,
  RoundedButton,
  SecondaryMinimalButton,
  SquareButton,
  StyledButton,
} from "./style";
import ButtonIcon from "../ButtonIcon";
import { IconNameToSizes, IconProps } from "../Icon";
import { filterProps } from "src/common/utils";

/**
 * (masoudmanson): When sdsStyle="icon", sdsType can be any ButtonType.
 * For other sdsStyle values, sdsType is restricted to "primary" or "secondary".
 * To enforce this, we utilized a union type for the sdsStyle and sdsType props.
 */

type ButtonStyle = "rounded" | "square" | "minimal" | "icon";
type ButtonType = "primary" | "secondary" | "tertiary";
type ButtonSize = "small" | "medium" | "large";

type SdsProps =
  | {
      sdsStyle?: Exclude<ButtonStyle, "icon">;
      sdsType?: Exclude<ButtonType, "tertiary">;
      isAllCaps?: boolean;
      isRounded?: boolean;
      sdsSize?: ButtonSize;
      icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
      sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
    }
  | {
      sdsStyle?: "icon";
      sdsType?: ButtonType;
      isAllCaps?: boolean;
      isRounded?: boolean;
      sdsSize?: ButtonSize;
      icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
      sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
    };

export type ButtonProps = RawButtonProps & SdsProps;

/**
 * @see https://mui.com/material-ui/react-button/
 */
const Button = React.forwardRef(
  (
    props: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const { sdsStyle, sdsType, icon } = props;

    if (!sdsStyle || !sdsType) {
      showWarningIfFirstOccurence(SDSWarningTypes.ButtonMissingSDSProps);
    }

    if (typeof props?.isAllCaps === "boolean" && sdsStyle !== "minimal") {
      showWarningIfFirstOccurence(SDSWarningTypes.ButtonMinimalIsAllCaps);
    }

    // isAllCaps is only used for the Minimal Button.  It defaults to true.
    const isAllCaps =
      typeof props?.isAllCaps === "boolean" ? props?.isAllCaps : true;
    const propsWithDefault = { ...props, isAllCaps };

    switch (true) {
      case sdsStyle === "rounded" && sdsType === "primary":
        return (
          <RoundedButton
            color="primary"
            ref={ref}
            variant="contained"
            {...propsWithDefault}
          />
        );
      case sdsStyle === "rounded" && sdsType === "secondary":
        return (
          <RoundedButton
            color="primary"
            ref={ref}
            variant="outlined"
            {...propsWithDefault}
          />
        );
      case sdsStyle === "square" && sdsType === "primary":
        return (
          <SquareButton
            color="primary"
            ref={ref}
            variant="contained"
            {...propsWithDefault}
          />
        );
      case sdsStyle === "square" && sdsType === "secondary":
        return (
          <SquareButton
            color="primary"
            ref={ref}
            variant="outlined"
            {...propsWithDefault}
          />
        );
      case sdsStyle === "minimal" && sdsType === "primary":
        return (
          <PrimaryMinimalButton
            color="primary"
            ref={ref}
            variant="text"
            {...propsWithDefault}
          />
        );
      case sdsStyle === "minimal" && sdsType === "secondary":
        return (
          <SecondaryMinimalButton
            color="primary"
            ref={ref}
            variant="text"
            {...propsWithDefault}
          />
        );
      case sdsStyle === "icon": {
        if (icon !== undefined) {
          // (masoudmanson): We need to remove the props that are not supported by
          // the ButtonIcon component.
          const excludedProps = [
            "startIcon",
            "endIcon",
            "sdsStyle",
            "isAllCaps",
          ];
          const finalProps = filterProps(propsWithDefault, excludedProps);

          return <ButtonIcon icon={icon} {...finalProps} ref={ref} />;
        } else {
          showWarningIfFirstOccurence(
            SDSWarningTypes.ButtonIconMissingIconProp
          );
          return null;
        }
      }
      default:
        return <StyledButton {...propsWithDefault} ref={ref} />;
    }
  }
);

export default Button;
