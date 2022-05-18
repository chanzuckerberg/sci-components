import { AlertProps } from "@material-ui/lab";
import React from "react";
import { StyledAlert } from "./style";

export type { AlertProps };

/**
 * @see https://v4.mui.com/components/alert/
 */
const Alert = (props: AlertProps): JSX.Element => {
  return <StyledAlert {...props} />;
};

export default Alert;
