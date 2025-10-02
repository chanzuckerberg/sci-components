import { Args } from "@storybook/types";
import RawSegmentedControl from "src/core/SegmentedControl";

export const SegmentedControl = (props: Args): JSX.Element => {
  const { buttonDefinition, ...rest } = props;

  return <RawSegmentedControl buttonDefinition={buttonDefinition} {...rest} />;
};
