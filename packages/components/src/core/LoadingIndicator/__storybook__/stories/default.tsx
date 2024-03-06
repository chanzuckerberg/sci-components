import { Args } from "@storybook/react";
import RawLoadingIndicator from "src/core/LoadingIndicator";

export const LoadingIndicator = (props: Args): JSX.Element => {
  const { sdsStyle } = props;
  return <RawLoadingIndicator sdsStyle={sdsStyle} {...props} />;
};
