import { Button as RawButton, ButtonProps } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import React from "react";

const Button = (props: ButtonProps): JSX.Element => {
  return (
    <StylesProvider injectFirst>
      {/*  eslint-disable-next-line react/jsx-props-no-spreading -- disable prop spread for extension */}
      <RawButton {...props} />
    </StylesProvider>
  );
};

export default Button;
