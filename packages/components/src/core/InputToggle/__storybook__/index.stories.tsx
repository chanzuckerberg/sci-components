import { Args, Meta } from "@storybook/react-vite";
import RawInputToggle from "../index";
import { InputToggle } from "./stories/default";
import { INPUT_TOGGLE_EXCLUDED_CONTROLS } from "./constants";
import { ControlledDemo } from "./stories/controlled";

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      description: "If `true`, the component is disabled.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    offLabel: {
      control: { type: "text" },
      description: "The text displayed within the InputToggle when it's off.",
      table: {
        defaultValue: { summary: "Off" },
      },
    },
    onLabel: {
      control: { type: "text" },
      description: "The text displayed within the InputToggle when it's on.",
      table: {
        defaultValue: { summary: "On" },
      },
    },
    width: {
      control: { type: "number" },
      description:
        "Controls the width of the InputToggle element, in pixels. Increase it when custom labels do not fit.",
      table: {
        defaultValue: { summary: "62" },
      },
    },
  },
  component: InputToggle,
  parameters: {
    a11y: {
      config: {
        rules: [
          // Unfortunately the MUI Switch component renders an input field without a label, which
          // fails an axe check.
          { enabled: false, id: "label" },
        ],
      },
    },
  },
  title: "Components/Inputs/InputToggle",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    width: 62,
  },
};

// Controlled

export const Controlled = {
  parameters: {
    controls: {
      exclude: INPUT_TOGGLE_EXCLUDED_CONTROLS,
    },
    snapshot: {
      /**
       * (thuang): Take snapshot to ensure the controlled demo is working as expected.
       */
      skip: false,
    },
  },
  render: (args: Args) => <ControlledDemo {...args} />,
};

// Test

export const Test = {
  args: {
    disabled: false,
  },
  parameters: {
    controls: {
      exclude: INPUT_TOGGLE_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <RawInputToggle {...args} data-testid="test-toggle" />
  ),
};
