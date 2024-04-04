import { Args, Meta } from "@storybook/react";
import { InputSlider } from "./stories/default";
import { LivePreviewDemo } from "./stories/livePreview";
import { TestDemo } from "./stories/test";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { INPUT_SLIDER_EXCLUDED_CONTROLS } from "./constants";

export default {
  argTypes: {
    defaultValue: {
      control: {
        type: "number",
      },
    },
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
    defaultValue: [15, 85],
    disabled: false,
    marks: true,
    max: 100,
    min: 0,
    step: 5,
    valueLabelDisplay: "on",
  },
};

// Live Preview

export const LivePreview = {
  args: {
    defaultValue: [15, 85],
    disabled: false,
    marks: true,
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
  render: (args: Args) => <LivePreviewDemo {...args} />,
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
