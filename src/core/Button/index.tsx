import { Button as RawButton, ButtonProps } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import React from "react";

export const Button = (props: ButtonProps) => {
  return (
    <StylesProvider injectFirst>
      <RawButton {...props} />
    </StylesProvider>
  );
};

export default Button;
