import { AlertProps } from "@material-ui/lab";
import React from "react";
import { StyledAlert } from "./style";

export type { AlertProps };

const Alert = (props: AlertProps): JSX.Element => {
  return <StyledAlert {...props} />;
};

export default Alert;
