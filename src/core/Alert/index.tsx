import { StylesProvider } from "@material-ui/core/styles";
import { Alert as RawAlert, AlertProps } from "@material-ui/lab";
import React from "react";

const Alert = (props: AlertProps): JSX.Element => {
  return (
    <StylesProvider injectFirst>
      {/*  eslint-disable-next-line react/jsx-props-no-spreading -- disable prop spread for extension */}
      <RawAlert {...props} />
    </StylesProvider>
  );
};

export default Alert;
