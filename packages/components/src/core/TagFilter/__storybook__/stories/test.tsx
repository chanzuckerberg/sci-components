import { Args } from "@storybook/types";
import RawTagFilter from "src/core/TagFilter";

export const TestDemo = (props: Args): JSX.Element => {
  const { label } = props;

  return (
    <RawTagFilter
      data-testid="tag-filter"
      label={label}
      onDelete={() => {}}
      {...props}
    />
  );
};
