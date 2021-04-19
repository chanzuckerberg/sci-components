import { Alert as RawAlert, AlertProps } from "@material-ui/lab";
import React from "react";

const Alert = (props: AlertProps): JSX.Element => {
  return <RawAlert {...props} />;
};

export default Alert;
