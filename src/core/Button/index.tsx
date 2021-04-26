import { Button as RawButton, ButtonProps } from "@material-ui/core";
import React from "react";

export { ButtonProps };

const Button = (props: ButtonProps): JSX.Element => {
  return <RawButton {...props} />;
};

export default Button;
