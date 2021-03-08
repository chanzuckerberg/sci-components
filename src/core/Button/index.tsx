import { Button as RawButton, ButtonProps } from "@material-ui/core";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import defaultTheme from "../styles/common/defaultTheme";

export const Button = (props: ButtonProps) => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <RawButton {...props} />
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Button;
