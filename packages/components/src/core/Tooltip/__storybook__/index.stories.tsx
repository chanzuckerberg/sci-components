import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { Tooltip } from "./stories/default";
import { TOOLTIP_EXCLUDED_CONTROLS } from "./constants";
import { PlacementDemo } from "./stories/placementDemo";
import { ScreenshotTestDemo } from "./stories/screenshot";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    arrowOffset: {
      control: { type: "number" },
    },
    hasInvertedStyle: {
      control: { type: "boolean" },
    },
    placement: {
      control: { type: "select" },
      options: [
        "bottom-start",
        "bottom",
        "bottom-end",
        "left-start",
        "left",
        "left-end",
        "right-start",
        "right",
        "right-end",
        "top-start",
        "top",
        "top-end",
      ],
    },
    title: {
      control: { type: "text" },
    },
    width: {
      control: { type: "radio" },
      options: ["default", "wide"],
    },
  },
  component: Tooltip,
  parameters: {
    badges: [BADGE.STABLE],
    // delay allows for font to load and prevents chromatic from constantly creating new baselines
    chromatic: { delay: 5000 },
  },
  title: "Components/Tooltip",
} as Meta;

// Default

export const Default = {
  args: {
    placement: "top",
    subtitle: "dolor sit amet",
    title: "Lorem ipsum",
    width: "default",
  },
};

// Placement Demo

export const PlacementPreview = {
  parameters: {
    controls: {
      exclude: TOOLTIP_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <PlacementDemo {...args} />,
};

// Screenshot Test

export const ScreenshotTest = {
  parameters: {
    controls: {
      exclude: TOOLTIP_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: TOOLTIP_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <TestDemo title="test" {...args} data-testid="tooltip" />
  ),
};
