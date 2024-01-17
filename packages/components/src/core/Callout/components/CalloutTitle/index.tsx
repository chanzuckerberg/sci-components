import { AlertTitleProps } from "@mui/material/AlertTitle";
import { StyledCalloutTitle } from "./style";

const CalloutTitle = ({ children }: AlertTitleProps): JSX.Element => {
  return <StyledCalloutTitle>{children}</StyledCalloutTitle>;
};

// Display name required to ensure Callout expand works correctly.
CalloutTitle.displayName = "CalloutTitle";

export default CalloutTitle;
