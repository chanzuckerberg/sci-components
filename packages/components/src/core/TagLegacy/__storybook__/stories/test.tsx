import { Args } from "@storybook/react-vite";
import RawTagLegacy from "@components/src/core/TagLegacy";

export const TestDemo = (props: Args): JSX.Element => {
  const { label } = props;
  return <RawTagLegacy label={label} {...props} data-testid="tags" />;
};
