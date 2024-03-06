import { Args } from "@storybook/react";
import { SegmentedControl } from "./default";

export const TestDemo = (props: Args): JSX.Element => {
  const { buttonDefinition } = props;
  return (
    <SegmentedControl
      buttonDefinition={buttonDefinition}
      data-testid="segmentedControl"
      {...props}
    />
  );
};
