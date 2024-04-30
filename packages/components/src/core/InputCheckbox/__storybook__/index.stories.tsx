import { Args, Meta } from "@storybook/react";
import { InputCheckbox } from "./stories/default";
import {
  INPUT_CHECKBOX_EXCLUDED_CONTROLS,
  INPUT_CHECKBOX_TEST_ID,
} from "./constants";
import { TestDemo } from "./stories/test";

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
  title: "Components/Inputs/InputCheckbox",
} as Meta;

// Default

export const Default = {
  args: {
    caption: "Caption",
    intent: "default",
    label: "Label",
  },
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
