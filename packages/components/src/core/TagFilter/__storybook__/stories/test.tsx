import { Args } from "@storybook/react-vite";
import RawTagFilter from "@components/src/core/TagFilter";

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
