import { Args, Meta } from "@storybook/react";
import React from "react";
import InputToggle from "./index";

const Demo = (props: Args): JSX.Element => {
  return <InputToggle {...props} />;
};

export const Default = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
};

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  },
  component: Demo,
  parameters: {
    axe: {
      disabledRules: [
        // Unfortunately the MUI Switch component renders an input field without a label, which
        // fails an axe check.
        "label",
      ],
    },
  },
  title: "Inputs/InputToggle",
} as Meta;

// Live Preview

const LivePreviewDemo = (props: Args): JSX.Element => {
  return <InputToggle {...props} id="togglePreview" />;
};

export const LivePreview = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

const TestDemo = (props: Args): JSX.Element => {
  return <InputToggle {...props} data-testid="test-toggle" />;
};

export const Test = {
  render: (args: Args) => <TestDemo {...args} />,
};
