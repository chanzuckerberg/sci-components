import { RadioGroup } from "@mui/material";
import { Args, Meta } from "@storybook/react";
import React from "react";
import RawInputRadio from "./index";

const InputRadio = (props: Args): JSX.Element => {
  const { caption, label } = props;

  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="demo"
      name="radio-buttons-group"
    >
      <RawInputRadio caption={caption} label={label} value="demo" {...props} />
    </RadioGroup>
  );
};

export default {
  component: InputRadio,
  title: "Inputs/InputRadio",
} as Meta;

// Default

export const Default = {
  args: {
    caption: "Caption",
    disabled: false,
    label: "Label",
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
        <RawInputRadio data-testid="inputRadio" label={label} value="demo1" />
        <RawInputRadio
          caption="Caption"
          data-testid="inputRadio"
          label={label}
          value="demo2"
        />
        <RawInputRadio
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
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};
