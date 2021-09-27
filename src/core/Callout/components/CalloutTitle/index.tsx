import { AlertTitleProps } from "@material-ui/lab/AlertTitle";
import React from "react";
import { StyledCalloutTitle } from "./style";

const CalloutTitle = ({ children }: AlertTitleProps): JSX.Element => {
  return <StyledCalloutTitle>{children}</StyledCalloutTitle>;
};

export default CalloutTitle;
