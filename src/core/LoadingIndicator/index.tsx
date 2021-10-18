import React from "react";
import {
  LoadingIndicatorProps,
  StyledIconLoadingAnimated,
  StyledLoadingIndicator,
  StyledText,
} from "./style";

const LoadingIndicator = ({ sdsStyle }: LoadingIndicatorProps): JSX.Element => {
  // TODO (mlila): replace with sds tag when available
  return (
    <StyledLoadingIndicator sdsStyle={sdsStyle}>
      <StyledIconLoadingAnimated fillcontrast="white" />
      <StyledText>Loading</StyledText>
    </StyledLoadingIndicator>
  );
};

export default LoadingIndicator;
