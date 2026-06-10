import { Args } from "@storybook/react-vite";
import RawSegmentedControl from "src/core/SegmentedControl";

export const SegmentedControl = (props: Args): JSX.Element => {
  const { buttonDefinition, ...rest } = props;

  return <RawSegmentedControl buttonDefinition={buttonDefinition} {...rest} />;
};
