import { Args, Meta } from "@storybook/react-vite";
import { InputText } from "./stories/default";
import { INPUT_TEXT_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";
import { INLINE_RADIO } from "@components/src/common/utils";

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      description: "If `true`, the component is disabled.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    hideLabel: {
      control: { type: "boolean" },
      description: "If true, the label is hidden.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    id: {
      control: { type: "text" },
      description:
        "The id of the `input` element. Use this prop to make `label` and `helperText` accessible for screen readers.",
      required: true,
    },
    intent: {
      control: { type: INLINE_RADIO },
      description: "Alters the border color and visual intent of the input.",
      options: ["default", "negative", "notice", "positive"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    label: {
      control: { type: "text" },
      description: "The label content.",
    },
    placeholder: {
      control: { type: "text" },
      description:
        "The short hint displayed in the `input` before the user enters a value.",
    },
    sdsType: {
      control: { type: INLINE_RADIO },
      description:
        "Defines the type of component to render, with options for a text input or text area.",
      options: ["textField", "textArea"],
      table: {
        defaultValue: { summary: "textField" },
      },
    },
    classes: {
      control: { type: "object" },
      description:
        "Class names for the internal elements: root, label, input, endAdornment, startAdornment, clearButton, and searchButton, alongside MUI's TextField classes.",
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
