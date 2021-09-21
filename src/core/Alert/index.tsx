import { AlertProps } from "@material-ui/lab";
import React from "react";
import { StyledAlert } from "./style";

export { AlertProps };

const Alert = (props: AlertProps): JSX.Element => {
  return <StyledAlert {...props} />;
};

export default Alert;
