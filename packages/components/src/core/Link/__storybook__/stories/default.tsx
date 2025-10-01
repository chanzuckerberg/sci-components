import { Args } from "@storybook/types";
import RawLink from "src/core/Link";

export const Link = (props: Args): JSX.Element => {
  const { sdsStyle } = props;
  return (
    <RawLink href="/" sdsStyle={sdsStyle} {...props}>
      Test Link
    </RawLink>
  );
};
