import React from "react";
import {
  StyledIconLoadingAnimated,
  StyledLoadingIndicator,
  StyledText,
} from "./style";

interface Props {
  sdsStyle: "minimal" | "tag";
}

const LoadingIndicator = ({ sdsStyle }: Props): JSX.Element => {
  // TODO (mlila): replace with sds tag when available
  return (
    <StyledLoadingIndicator sdsStyle={sdsStyle}>
      <StyledIconLoadingAnimated />
      <StyledText>Loading</StyledText>
    </StyledLoadingIndicator>
  );
};

export default LoadingIndicator;
