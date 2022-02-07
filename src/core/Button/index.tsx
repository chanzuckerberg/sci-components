import { ButtonProps as RawButtonProps } from "@material-ui/core";
import React from "react";
import {
  ExtraProps,
  MinimalButton,
  RoundedButton,
  SecondaryMinimalButton,
  SquareButton,
  StyledButton,
} from "./style";

export interface ButtonProps extends Omit<RawButtonProps, "color">, ExtraProps {
  sdsStyle?: "minimal" | "rounded" | "square";
  sdsType?: "primary" | "secondary";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref): JSX.Element | null => {
    const {
      // TEMP(thuang): Set as any to get around the type error.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      color = undefined as any,
      sdsStyle,
      sdsType,
      ...rest
    } = props;

    if (!sdsStyle || !sdsType) {
      // eslint-disable-next-line no-console
      console.warn(
        "Warning: Buttons without sdsStyle or sdsType props will be deprecated."
      );
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

    const propsWithDefault = { ...rest, color, isAllCaps };

    switch (true) {
      case sdsStyle === "rounded" && sdsType === "primary":
        return (
          <RoundedButton ref={ref} variant="contained" {...propsWithDefault} />
        );
      case sdsStyle === "rounded" && sdsType === "secondary":
        return (
          <RoundedButton ref={ref} variant="outlined" {...propsWithDefault} />
        );
      case sdsStyle === "square" && sdsType === "primary":
        return (
          <SquareButton ref={ref} variant="contained" {...propsWithDefault} />
        );
      case sdsStyle === "square" && sdsType === "secondary":
        return (
          <SquareButton ref={ref} variant="outlined" {...propsWithDefault} />
        );
      case sdsStyle === "minimal" && sdsType === "primary":
        return <MinimalButton ref={ref} variant="text" {...propsWithDefault} />;
      case sdsStyle === "minimal" && sdsType === "secondary":
        return (
          <SecondaryMinimalButton
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
