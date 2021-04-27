import { ButtonProps as RawButtonProps } from "@material-ui/core";
import React from "react";
import { StyledButton } from "./style";

export interface ButtonProps extends RawButtonProps {
  isRounded?: boolean;
}

const Button = (props: ButtonProps): JSX.Element => {
  return <StyledButton {...props} />;
};

export default Button;
