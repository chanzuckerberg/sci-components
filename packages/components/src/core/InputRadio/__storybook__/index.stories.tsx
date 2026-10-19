import { Args, Meta } from "@storybook/react-vite";
import { InputRadio } from "./stories/default";
import { TestDemo } from "./stories/test";
import { INPUT_RADIO_EXCLUDED_CONTROLS } from "./constants";

export default {
  argTypes: {
    caption: {
      control: { type: "text" },
      description:
        "The caption of the InputRadio appears beneath the label in a lighter text color.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "If `true`, the component is disabled.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    intent: {
      control: { type: "radio" },
      description:
        "Colors the border of the empty circle. The selected radio always uses the accent color.",
      options: ["default", "negative", "notice", "positive"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    label: {
      control: { type: "text" },
      description: "The label of the InputRadio.",
    },
    stage: {
      control: {
        type: "radio",
      },
      description:
        'Sets the radio as "checked" or "unchecked", overriding checked. Omit it inside a RadioGroup, which drives the selection itself.',
      options: ["checked", "unchecked"],
    },
    classes: {
      control: { type: "object" },
      description:
        "Class names for the internal elements: root, labelCaptionContainer, label, caption, radioButton, radioCheckedIcon, radioCheckedIconDot, and radioDefaultIcon.",
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
    classes: {
      root: "",
      labelCaptionContainer: "",
      label: "",
      caption: "",
      radioButton: "",
      radioCheckedIcon: "",
      radioCheckedIconDot: "",
      radioDefaultIcon: "",
    },
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
