import { Args, Meta } from "@storybook/react-vite";
import { InputSlider } from "./stories/default";
import { TestDemo } from "./stories/test";
import { INPUT_SLIDER_EXCLUDED_CONTROLS } from "./constants";

export default {
  argTypes: {
    defaultValue: {
      description:
        "The default value. Use when the component is not controlled. Pass a number for a single thumb, or two numbers for a range.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "If `true`, the component is disabled.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    marks: {
      control: {
        type: "boolean",
      },
      description:
        "Marks indicate predetermined values to which the user can move the slider. If `true` the marks are spaced according the value of the `step` prop. If an array, it should contain objects with `value` and an optional `label` keys.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    max: {
      control: {
        type: "number",
      },
      description:
        "The maximum allowed value of the slider. Should not be equal to min.",
      table: {
        defaultValue: { summary: "100" },
      },
    },
    min: {
      control: {
        type: "number",
      },
      description:
        "The minimum allowed value of the slider. Should not be equal to max.",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    step: {
      control: {
        type: "number",
      },
      description:
        "The granularity with which the slider can step through values. The `min` prop serves as the origin for the valid values, and (max - min) should be evenly divisible by the step. When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.",
      table: {
        defaultValue: { summary: "1" },
      },
    },
    valueLabelDisplay: {
      control: { type: "select" },
      description:
        "Controls when the value label is displayed: `auto` displays it when the thumb is hovered or focused, `on` displays it persistently, and `off` never displays it.",
      options: ["auto", "off", "on"],
      table: {
        defaultValue: { summary: "off" },
      },
    },
  },
  component: InputSlider,
  parameters: {
    a11y: {
      config: {
        rules: [
          // FIXME - inputs should have labels
          { enabled: false, id: "label" },
        ],
      },
    },
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
