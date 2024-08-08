"use client";

import Icon from "src/core/Icon";
import {
  LoadingIndicatorProps as RawLoadingIndicatorProps,
  StyledLoadingIndicator,
  StyledText,
} from "./style";

export type LoadingIndicatorProps = RawLoadingIndicatorProps & {
  "aria-label"?: string;
};

const LoadingIndicator = ({
  "aria-label": ariaLabel,
  sdsStyle,
}: LoadingIndicatorProps): JSX.Element => {
  return (
    <StyledLoadingIndicator sdsStyle={sdsStyle} aria-label="Loading">
      <Icon sdsIcon="Loading" sdsSize="l" sdsType="static" />
      <StyledText aria-label={ariaLabel} aria-live="polite" role="status">
        Loading
      </StyledText>
    </StyledLoadingIndicator>
  );
};

export default LoadingIndicator;
