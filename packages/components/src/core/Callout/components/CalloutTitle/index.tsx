import { AlertTitleProps } from "@mui/material/AlertTitle";
import { CALLOUT_TITLE_DISPLAY_NAME } from "src/core/Callout/constants";
import { StyledCalloutTitle } from "./style";

const CalloutTitle = ({ children }: AlertTitleProps): JSX.Element => {
  return <StyledCalloutTitle>{children}</StyledCalloutTitle>;
};

// Display name required to ensure Callout expand works correctly.
CalloutTitle.displayName = CALLOUT_TITLE_DISPLAY_NAME;

export default CalloutTitle;
