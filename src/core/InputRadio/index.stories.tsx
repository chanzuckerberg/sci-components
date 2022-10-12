import { FormControlLabel, RadioGroup } from "@mui/material";
import { Args, Story } from "@storybook/react";
import React from "react";
import InputRadio from "./index";

const DefaultDemo = (props: Args): JSX.Element => {
  const { label } = props;

  return (
    <RadioGroup
      aria-labelledby="demo-input-radio-group-label"
      defaultValue="demo"
      name="input-radio-group"
    >
      <FormControlLabel
        control={<InputRadio stage="checked" {...props} />}
        label={label}
        value="demo"
      />
    </RadioGroup>
  );
};

export default {
  component: DefaultDemo,
  title: "Inputs/InputRadio",
};

const DefaultTemplate: Story = (args) => <DefaultDemo {...args} />;

export const Default = DefaultTemplate.bind({});
Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  disabled: false,
  label: "Label",
};

const DefaultLabelDemo = (props: Args): JSX.Element => {
  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="demo"
      name="radio-buttons-group"
    >
      <InputRadio label="TEST" {...props} />
    </RadioGroup>
  );
};

const DefaultLabelTemplate: Story = (args) => <DefaultLabelDemo {...args} />;

export const DefaultLabel = DefaultLabelTemplate.bind({});
DefaultLabel.parameters = {
  snapshot: {
    skip: true,
  },
};

DefaultLabel.args = {
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
      >
        <InputRadio data-testid="inputRadio" label={label} value="demo1" />
        <InputRadio data-testid="inputRadio" label={label} value="demo2" />
        <InputRadio data-testid="inputRadio" label={label} value="demo3" />
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
