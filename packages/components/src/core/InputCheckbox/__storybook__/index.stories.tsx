import { Args, Meta } from "@storybook/react-webpack5";
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
      options: ["default", "negative", "notice", "positive"],
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
    classes: {
      control: { type: "object" },
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
    classes: {
      root: "",
      labelCaptionContainer: "",
      label: "",
      caption: "",
      checkbox: "",
      checkboxCheckedIcon: "",
      checkboxDefaultIcon: "",
      checkboxIndeterminateIcon: "",
    },
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
