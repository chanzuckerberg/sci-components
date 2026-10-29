import { Args, Meta } from "@storybook/react-vite";
import { Tooltip } from "./stories/default";
import {
  TOOLTIP_COMPONENT_SLOT_OPTIONS,
  TOOLTIP_EXCLUDED_CONTROLS,
} from "./constants";
import { PlacementDemo } from "./stories/placementDemo";
import { ScreenshotTestDemo } from "./stories/screenshot";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    arrowOffset: {
      control: { type: "number" },
      description:
        "Sets the arrow's left position, in pixels from the tooltip's left edge, instead of letting it be calculated. Values past the tooltip's width move the arrow out of sight.",
    },
    componentSlot: {
      control: {
        labels: {
          placeholder: "Component Placeholder",
          link: "Sample Link",
          empty: "Empty",
        },
        type: "select",
      },
      description:
        "Content below the text, with 12px above it when there is text. The place for anything that is not a string, including TooltipTable.",
      mapping: TOOLTIP_COMPONENT_SLOT_OPTIONS,
      options: Object.keys(TOOLTIP_COMPONENT_SLOT_OPTIONS),
    },
    placement: {
      control: { type: "select" },
      description: "Tooltip placement.",
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
      table: {
        defaultValue: { summary: "bottom" },
      },
    },
    subtitle: {
      control: { type: "text" },
      description:
        "A smaller, dimmer second line under the title, for a detail such as how to use what the tooltip points at.",
    },
    textAlign: {
      control: { type: "radio" },
      description: "Overrides the alignment the width would pick.",
      options: ["left", "center", "right"],
      table: {
        defaultValue: { summary: "center (left when wide)" },
      },
    },
    title: {
      control: { type: "text" },
      description:
        "Tooltip title. Zero-length titles string, undefined, null and false are never displayed.",
    },
    width: {
      control: { type: "radio" },
      description:
        "Caps the tooltip at 250px or 550px. Wide also left-aligns the text.",
      options: ["default", "wide"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
  },
  component: Tooltip,
  parameters: {
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
