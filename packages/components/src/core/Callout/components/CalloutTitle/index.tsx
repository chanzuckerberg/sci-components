import { AlertTitleProps } from "@mui/material/AlertTitle";
import { StyledCalloutTitle } from "./style";

const CalloutTitle = ({ children }: AlertTitleProps): JSX.Element => {
  return <StyledCalloutTitle>{children}</StyledCalloutTitle>;
};

export default CalloutTitle;
