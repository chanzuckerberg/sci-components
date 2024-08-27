import { Args, Meta } from "@storybook/react";
import { InputRadio } from "./stories/default";
import { TestDemo } from "./stories/test";
import { INPUT_RADIO_EXCLUDED_CONTROLS } from "./constants";
import { BADGE } from "src/common/storybook/storybookBadges";

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
      options: ["default", "negative", "notice"],
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
  parameters: {
    badges: [BADGE.STABLE],
  },
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
