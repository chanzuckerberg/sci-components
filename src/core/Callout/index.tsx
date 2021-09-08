import { AlertProps } from "@material-ui/lab";
import React from "react";
import { StyledCallout } from "./style";

export { AlertProps };

const Callout = (props: AlertProps): JSX.Element => {
  return <StyledCallout {...props} />;
};

export default Callout;
