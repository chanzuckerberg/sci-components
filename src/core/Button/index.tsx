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

export interface SdsProps {
  isAllCaps?: boolean;
  isRounded?: boolean;
  sdsStyle?: "minimal" | "rounded" | "square";
  sdsType?: "primary" | "secondary";
}

// (thuang): Support `component` prop
// https://stackoverflow.com/a/66123108
export type ButtonProps<C extends React.ElementType = "button"> =
  RawButtonProps<C, { component?: C }> & SdsProps;

/**
 * @see https://v4.mui.com/components/buttons/
 */
const Button = React.forwardRef(
  <C extends React.ElementType>(
    props: ButtonProps<C>,
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element | null => {
    const sdsStyle = props?.sdsStyle;
    const sdsType = props?.sdsType;

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
      default:
        return <StyledButton {...propsWithDefault} ref={ref} />;
    }
  }
);

export default Button;
