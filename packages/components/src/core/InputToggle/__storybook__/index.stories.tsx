import { Args, Meta } from "@storybook/react";
import RawInputToggle from "../index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { InputToggle } from "./stories/default";
import { INPUT_TOGGLE_EXCLUDED_CONTROLS } from "./constants";
import { ControlledDemo } from "./stories/controlled";

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  },
  component: InputToggle,
  parameters: {
    axe: {
      disabledRules: [
        // Unfortunately the MUI Switch component renders an input field without a label, which
        // fails an axe check.
        "label",
      ],
    },
    badges: [BADGE.STABLE],
  },
  title: "Components/Inputs/InputToggle",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
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
