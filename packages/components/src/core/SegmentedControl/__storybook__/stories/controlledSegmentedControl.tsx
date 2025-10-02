import { Args } from "@storybook/types";
import { useState } from "react";
import RawSegmentedControl from "src/core/SegmentedControl";

export const ControlledSegmentedControlDemo = (props: Args): JSX.Element => {
  const { buttonDefinition, ...rest } = props;

  const [value, setValue] = useState("C");
  return (
    <RawSegmentedControl
      buttonDefinition={buttonDefinition}
      onChange={(_event, newValue) => {
        console.log(newValue);
        setValue(newValue);
      }}
      value={value}
      {...rest}
    />
  );
};
