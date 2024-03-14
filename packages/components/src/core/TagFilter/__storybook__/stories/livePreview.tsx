import { Args } from "@storybook/react";
import RawTagFilter from "src/core/TagFilter";

export const LivePreviewDemo = (props: Args): JSX.Element => {
  const { label } = props;

  return <RawTagFilter label={label} onDelete={() => {}} {...props} />;
};
