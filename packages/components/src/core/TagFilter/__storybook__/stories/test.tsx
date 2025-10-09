import { Args } from "@storybook/react-webpack5";
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
