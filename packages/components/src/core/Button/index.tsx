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

type SDSStyleTypeMapping = {
  minimal: "primary" | "secondary";
  rounded: "primary" | "secondary";
  square: "primary" | "secondary";
  icon: "primary" | "secondary" | "tertiary";
};
export interface SdsProps<IconName extends keyof IconNameToSizes> {
  isAllCaps?: boolean;
  isRounded?: boolean;
  sdsStyle?: keyof SDSStyleTypeMapping;
  sdsType?: SDSStyleTypeMapping[keyof SDSStyleTypeMapping];
  sdsSize?: "small" | "medium" | "large";
  icon?: IconName | React.ReactElement<CustomSVGProps>;
  sdsIconProps?: Partial<IconProps<IconName>>;
}

// (thuang): Support `component` prop
// https://stackoverflow.com/a/66123108
export type ButtonProps<
  IconName extends keyof IconNameToSizes,
  C extends React.ElementType = "button",
> = RawButtonProps<C, { component?: C }> & SdsProps<IconName>;

/**
 * @see https://mui.com/material-ui/react-button/
 */
const Button = React.forwardRef(
  <IconName extends keyof IconNameToSizes, C extends React.ElementType>(
    props: ButtonProps<IconName, C>,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const { sdsStyle, sdsType, icon } = props;

    if (!sdsStyle || !sdsType) {
      showWarningIfFirstOccurence(SDSWarningTypes.ButtonMissingSDSProps);
    }

    if (typeof props?.isAllCaps === "boolean" && sdsStyle !== "minimal") {
      // eslint-disable-next-line no-console
      console.warn(
        "Warning: isAllCaps is only applied to buttons with sdsStyle='minimal'."
      );
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
      case sdsStyle === "icon" && icon !== undefined: {
        // (masoudmanson): We need to remove the props that are not supported by
        // the ButtonIcon component.
        const doNotForwardProps = [
          "startIcon",
          "endIcon",
          "sdsStyle",
          "isAllCaps",
        ];
        const finalProps = { ...propsWithDefault };
        doNotForwardProps.forEach((prop) => {
          delete finalProps[prop];
        });
        return <ButtonIcon icon={icon} {...finalProps} />;
      }
      default:
        return <StyledButton {...propsWithDefault} ref={ref} />;
    }
  }
);

export default Button;
