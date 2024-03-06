import { Args } from "@storybook/react";
import RawTag from "src/core/Tag";

export const Tag = (props: Args): JSX.Element => {
  const { label } = props;
  return <RawTag label={label} {...props} />;
};
