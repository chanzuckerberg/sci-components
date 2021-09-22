import { ButtonProps as RawButtonProps } from "@material-ui/core";
import React from "react";
import { StyledButton } from "./style";

export interface ButtonProps extends RawButtonProps {
  isRounded?: boolean;
  sdsType?: "primary" | "secondary";
  sdsStyle?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref): JSX.Element => {
    return <StyledButton {...props} ref={ref} />;
  }
);

export default Button;
