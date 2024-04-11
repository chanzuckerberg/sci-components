import { Args, Meta } from "@storybook/react";
import { InputRadio } from "./stories/default";
import { LivePreviewDemo } from "./stories/livePreview";
import { TestDemo } from "./stories/test";
import { INPUT_RADIO_EXCLUDED_CONTROLS } from "./constants";

export default {
  argTypes: {
    caption: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    intent: {
      control: { type: "radio" },
      options: ["default", "error", "warning"],
    },
    label: {
      control: { type: "text" },
    },
    stage: {
      control: {
        type: "radio",
      },
      options: ["checked", "unchecked"],
    },
  },
  component: InputRadio,
  title: "Components/Inputs/InputRadio",
} as Meta;

// Default

export const Default = {
  args: {
    caption: "Caption",
    disabled: false,
    intent: "default",
    label: "Label",
  },
};

// Live Preview

export const LivePreview = {
  args: {
    label: "Label",
  },
  parameters: {
    axe: {
      disabledRules: ["label"],
    },
    controls: {
      exclude: INPUT_RADIO_EXCLUDED_CONTROLS,
    },
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
    controls: {
      exclude: INPUT_RADIO_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
