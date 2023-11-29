import Icon from "../Icon";
import {
  LoadingIndicatorProps as RawLoadingIndicatorProps,
  StyledLoadingIndicator,
  StyledText,
} from "./style";

export type LoadingIndicatorProps = Omit<
  RawLoadingIndicatorProps,
  "nonce" | "rev" | "rel" | "autoFocus" | "content"
> & {
  "aria-label"?: string;
};

const LoadingIndicator = ({
  "aria-label": ariaLabel,
  sdsStyle,
}: LoadingIndicatorProps): JSX.Element => {
  return (
    <StyledLoadingIndicator sdsStyle={sdsStyle}>
      <Icon sdsIcon="loading" sdsSize="l" sdsType="static" />
      <StyledText aria-label={ariaLabel} aria-live="polite" role="status">
        Loading
      </StyledText>
    </StyledLoadingIndicator>
  );
};

export default LoadingIndicator;
