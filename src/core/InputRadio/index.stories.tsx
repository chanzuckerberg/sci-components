import { RadioGroup } from "@mui/material";
import { Args, Meta, Story } from "@storybook/react";
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

const DefaultTemplate: Story = (args) => <DefaultDemo {...args} />;

export const Default = DefaultTemplate.bind({});
Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  caption: "Caption",
  disabled: false,
  label: "Label",
};

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

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;
export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

LivePreview.args = {
  label: "Label",
};

export const Test = LivePreviewTemplate.bind({});

Test.args = {
  label: "Test Label",
};
