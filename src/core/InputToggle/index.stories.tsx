import { Args, Story } from "@storybook/react";
import React from "react";
import InputToggle from "./index";

const Demo = (props: Args): JSX.Element => {
  return <InputToggle {...props} />;
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  snapshot: {
    skip: true,
  },
};

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  },
  component: Demo,
  title: "Inputs/Toggle",
};

const LivePreviewDemo = (props: Args): JSX.Element => {
  return <InputToggle {...props} id="togglePreview" />;
};

const LivePreviewTemplate: Story = (args) => <LivePreviewDemo {...args} />;

export const LivePreview = LivePreviewTemplate.bind({});

LivePreview.parameters = {
  snapshot: {
    skip: true,
  },
};

const TestDemo = (props: Args): JSX.Element => {
  return <InputToggle {...props} data-testid="test-toggle" />;
};

const TestTemplate: Story = (args) => <TestDemo {...args} />;

export const Test = TestTemplate.bind({});
