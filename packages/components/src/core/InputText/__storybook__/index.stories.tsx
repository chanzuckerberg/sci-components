import { Args, Meta } from "@storybook/react-webpack5";
import { InputText } from "./stories/default";
import { INPUT_TEXT_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    hideLabel: {
      control: { type: "boolean" },
    },
    id: {
      control: { type: "text" },
      required: true,
    },
    intent: {
      control: { type: "inline-radio" },
      options: ["default", "negative", "notice", "positive"],
    },
    label: {
      control: { type: "text" },
    },
    placeholder: {
      control: { type: "text" },
    },
    sdsType: {
      control: { type: "inline-radio" },
      options: ["textField", "textArea"],
    },
    classes: {
      control: { type: "object" },
    },
  },
  component: InputText,
  title: "Components/Inputs/InputText",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    hideLabel: false,
    id: "Test",
    label: "Label",
    placeholder: "Value",
    sdsType: "textField",
    classes: {
      root: "",
      label: "",
      input: "",
    },
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: INPUT_TEXT_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
