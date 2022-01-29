import { ButtonProps as RawButtonProps } from "@material-ui/core";
import React from "react";
import {
  ExtraProps,
  MinimalButton,
  RoundedButton,
  SquareButton,
  StyledButton,
} from "./style";

export type ButtonProps = Omit<RawButtonProps, "color"> & ExtraProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref): JSX.Element | null => {
    const {
      // TEMP(thuang): Set as any to get around the type error.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      color = "" as any,
      sdsStyle,
      sdsType,
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

    const propsWithDefault = { ...props, isAllCaps };

    switch (true) {
      case sdsStyle === "rounded" && sdsType === "primary":
        return (
          <RoundedButton
            color={color || "primary"}
            ref={ref}
            variant="contained"
            {...propsWithDefault}
          />
        );
      case sdsStyle === "rounded" && sdsType === "secondary":
        return (
          <RoundedButton
            color={color || "primary"}
            ref={ref}
            variant="outlined"
            {...propsWithDefault}
          />
        );
      case sdsStyle === "square" && sdsType === "primary":
        return (
          <SquareButton
            color={color || "primary"}
            ref={ref}
            variant="contained"
            {...propsWithDefault}
          />
        );
      case sdsStyle === "square" && sdsType === "secondary":
        return (
          <SquareButton
            color={color || "primary"}
            ref={ref}
            variant="outlined"
            {...propsWithDefault}
          />
        );
      case sdsStyle === "minimal":
        return (
          <MinimalButton
            color={color || "primary"}
            ref={ref}
            variant="text"
            {...propsWithDefault}
          />
        );
      default:
        return <StyledButton color={color} {...propsWithDefault} ref={ref} />;
    }
  }
);

export default Button;
