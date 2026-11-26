import { LoadingIcon } from "@czi-sds/icons";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
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
      <LoadingIcon {...INTERNAL_ICON_PROPS} size={24} />
      <StyledText aria-label={ariaLabel} aria-live="polite" role="status">
        Loading
      </StyledText>
    </StyledLoadingIndicator>
  );
};

export default LoadingIndicator;
