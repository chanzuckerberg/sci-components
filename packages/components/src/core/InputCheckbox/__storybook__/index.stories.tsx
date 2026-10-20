import { Args, Meta } from "@storybook/react-vite";
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
      description:
        "The caption of the InputCheckbox appears beneath the label in a lighter text color.",
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
        "Colors the border of the empty box. The checked box always uses the accent color.",
      options: ["default", "negative", "notice", "positive"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    label: {
      control: { type: "text" },
      description:
        "The label of the InputCheckbox. When omitted, the box renders on its own with no label element.",
    },
    stage: {
      control: {
        type: "radio",
      },
      description:
        "Sets the state of the checkbox. It overrides checked, so a checkbox with a stage only changes when you recompute the stage from an onChange handler. Omit it to let the checkbox manage its own state.",
      options: ["checked", "unchecked", "indeterminate"],
    },
    classes: {
      control: { type: "object" },
      description:
        "Class names for the internal elements: root, labelCaptionContainer, label, caption, checkbox, checkboxCheckedIcon, checkboxDefaultIcon, and checkboxIndeterminateIcon.",
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
