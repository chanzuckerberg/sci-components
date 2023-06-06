import { Args, Meta } from "@storybook/react";
import RawInputToggle from "./index";

const InputToggle = (props: Args): JSX.Element => {
  return <RawInputToggle {...props} />;
};

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  },
  component: InputToggle,
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

// Default

export const Default = {};

// Live Preview

const LivePreviewDemo = (props: Args): JSX.Element => {
  return <RawInputToggle {...props} id="togglePreview" />;
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

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <RawInputToggle {...args} data-testid="test-toggle" />
  ),
};
