import Icon from "../Icon";
import {
  LoadingIndicatorProps as RawLoadingIndicatorProps,
  StyledLoadingIndicator,
  StyledText,
} from "./style";

export type LoadingIndicatorProps = Omit<
  RawLoadingIndicatorProps,
  "nonce" | "rev" | "rel" | "autoFocus" | "content"
>;

const LoadingIndicator = ({ sdsStyle }: LoadingIndicatorProps): JSX.Element => {
  return (
    <StyledLoadingIndicator sdsStyle={sdsStyle}>
      <Icon sdsIcon="loading" sdsSize="l" sdsType="static" />
      <StyledText>Loading</StyledText>
    </StyledLoadingIndicator>
  );
};

export default LoadingIndicator;
