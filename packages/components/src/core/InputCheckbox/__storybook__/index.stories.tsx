import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { InputCheckbox } from "./stories/default";
import {
  INPUT_CHECKBOX_EXCLUDED_CONTROLS,
  INPUT_CHECKBOX_TEST_ID,
} from "./constants";
import { TestDemo } from "./stories/test";
import { LivePreviewDemo } from "./stories/livePreview";

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
      options: ["checked", "unchecked", "indeterminate"],
    },
  },
  component: InputCheckbox,
  parameters: {
    badges: [BADGE.BETA],
  },
  title: "Components/Inputs/InputCheckbox [beta]",
} as Meta;

// Default

export const Default = {
  args: {
    caption: "Caption",
    intent: "default",
    label: "Label",
  },
};

// Live Preview

export const LivePreview = {
  parameters: {
    axe: {
      disabledRules: ["label"],
    },
    controls: { exclude: INPUT_CHECKBOX_EXCLUDED_CONTROLS },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

export const Test = {
  args: {
    id: INPUT_CHECKBOX_TEST_ID,
  },
  parameters: {
    controls: {
      exclude: INPUT_CHECKBOX_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="input-checkbox" />,
};