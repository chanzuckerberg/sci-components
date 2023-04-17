import { RadioGroup } from "@mui/material";
import { Args, Meta } from "@storybook/react";
import React from "react";
import InputRadio from "./index";

const DefaultDemo = (props: Args): JSX.Element => {
  const { caption, label } = props;

  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="demo"
      name="radio-buttons-group"
    >
      <InputRadio caption={caption} label={label} value="demo" {...props} />
    </RadioGroup>
  );
};

export default {
  component: DefaultDemo,
  title: "Inputs/InputRadio",
} as Meta;

export const Default = {
  args: {
    caption: "Caption",
    disabled: false,
    label: "Label",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
};

// Live Preview

const LivePreviewDemo = (props: Args): JSX.Element => {
  const { label } = props;

  return (
    <div>
      <RadioGroup
        aria-labelledby="demo-input-radio-group-label"
        defaultValue="demo1"
        name="input-radio-group"
        data-testid="radioButtonGroup"
      >
        <InputRadio data-testid="inputRadio" label={label} value="demo1" />
        <InputRadio
          caption="Caption"
          data-testid="inputRadio"
          label={label}
          value="demo2"
        />
        <InputRadio
          caption="Caption"
          data-testid="inputRadio"
          label={label}
          value="demo3"
        />
      </RadioGroup>
    </div>
  );
};

export const LivePreview = {
  args: {
    label: "Label",
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

export const Test = {
  args: {
    label: "Test Label",
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};
