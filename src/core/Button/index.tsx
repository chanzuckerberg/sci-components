import { ButtonProps as RawButtonProps } from "@material-ui/core";
import React from "react";
import {
  PrimaryMinimalButton,
  RoundedButton,
  SecondaryMinimalButton,
  SquareButton,
  StyledButton,
} from "./style";

interface SdsProps {
  isAllCaps?: boolean;
  isRounded?: boolean;
  sdsStyle?: "minimal" | "rounded" | "square";
  sdsType?: "primary" | "secondary";
}
export type ButtonProps = RawButtonProps & SdsProps;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref): JSX.Element | null => {
    const sdsStyle = props?.sdsStyle;
    const sdsType = props?.sdsType;
    const isAllCaps = props?.isAllCaps;

    if (!sdsStyle || !sdsType) {
      // eslint-disable-next-line no-console
      console.warn(
        "Warning: Buttons without sdsStyle or sdsType props will be deprecated."
      );
    }
    if (isAllCaps && sdsStyle !== "minimal") {
      // eslint-disable-next-line no-console
      console.warn(
        "Warning: isAllCaps is only applied to buttons with sdsStyle='minimal'."
      );
    }

    switch (true) {
      case sdsStyle === "rounded" && sdsType === "primary":
        return (
          <RoundedButton
            color="primary"
            ref={ref}
            variant="contained"
            {...props}
          />
        );
      case sdsStyle === "rounded" && sdsType === "secondary":
        return (
          <RoundedButton
            color="primary"
            ref={ref}
            variant="outlined"
            {...props}
          />
        );
      case sdsStyle === "square" && sdsType === "primary":
        return (
          <SquareButton
            color="primary"
            ref={ref}
            variant="contained"
            {...props}
          />
        );
      case sdsStyle === "square" && sdsType === "secondary":
        return (
          <SquareButton
            color="primary"
            ref={ref}
            variant="outlined"
            {...props}
          />
        );
      case sdsStyle === "minimal" && sdsType === "primary":
        return (
          <PrimaryMinimalButton
            color="primary"
            ref={ref}
            variant="text"
            {...props}
          />
        );
      case sdsStyle === "minimal" && sdsType === "secondary":
        return (
          <SecondaryMinimalButton
            color="default"
            ref={ref}
            variant="text"
            {...props}
          />
        );
      default:
        return <StyledButton {...props} ref={ref} />;
    }
  }
);

export default Button;
