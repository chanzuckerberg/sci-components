import { Args, Meta } from "@storybook/react";
import { InputSlider } from "./stories/default";
import { TestDemo } from "./stories/test";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { INPUT_SLIDER_EXCLUDED_CONTROLS } from "./constants";

export default {
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    marks: {
      control: {
        type: "boolean",
      },
    },
    max: {
      control: {
        type: "number",
      },
    },
    min: {
      control: {
        type: "number",
      },
    },
    step: {
      control: {
        type: "number",
      },
    },
    valueLabelDisplay: {
      control: {
        labels: ["auto", "off", "on"],
        type: "select",
      },
      options: ["auto", "off", "on"],
    },
  },
  component: InputSlider,
  parameters: {
    axe: {
      disabledRules: [
        // FIXME - inputs should have labels
        "label",
      ],
    },
    badges: [BADGE.STABLE],
  },
  title: "Components/Inputs/InputSlider",
} as Meta;

// Default

export const Default = {
  args: {
    defaultValue: 75,
    disabled: false,
    marks: true,
    max: 100,
    min: 0,
    step: 5,
    valueLabelDisplay: "on",
  },
};

// Range Slider

export const RangeSlider = {
  args: {
    defaultValue: [15, 85],
    disabled: false,
    marks: true,
    max: 100,
    min: 0,
    step: 5,
    valueLabelDisplay: "on",
  },
};

// Test

export const Test = {
  args: {
    defaultValue: 15,
    max: 100,
    min: 0,
  },
  parameters: {
    controls: {
      exclude: INPUT_SLIDER_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="input-slider" />,
};
