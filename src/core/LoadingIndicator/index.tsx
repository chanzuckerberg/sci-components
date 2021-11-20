import React from "react";
import Icon from "../Icon";
import {
  LoadingIndicatorProps,
  StyledLoadingIndicator,
  StyledText,
} from "./style";

const LoadingIndicator = ({ sdsStyle }: LoadingIndicatorProps): JSX.Element => {
  return (
    <StyledLoadingIndicator sdsStyle={sdsStyle}>
      <Icon sdsIcon="loading" sdsSize="l" />
      <StyledText>Loading</StyledText>
    </StyledLoadingIndicator>
  );
};

export default LoadingIndicator;
