import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { Tabs } from "./stories/default";
import { TABS_EXCLUDED_CONTROLS } from "./constants";
import { LivePreviewDemo } from "./stories/livePreview";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    items: {
      control: { required: true, type: "object" },
      defaultValue: { summary: "-" },
      description:
        "Here is an array of objects, each comprising a label and count for the tabs. Please note that this is specific to Storybook. In an actual implementation, it is recommended to pass the tabs as children of the Tabs component.",
    },
    sdsSize: {
      control: { type: "select" },
      defaultValue: { summary: "large" },
      description: "The size of the tabs",
      options: ["large", "small"],
    },
    underlined: {
      control: {
        type: "boolean",
      },
      defaultValue: { summary: "true" },
      description: "Whether the tabs should be underlined",
    },
  },
  component: Tabs,
  parameters: {
    badges: [BADGE.STABLE],
    // tab indicator bug known by MUI where width for indicator updates once font is loaded in.
    // delay allows for font to load and prevents chromatic from constantly creating new baselines
    // https://github.com/mui/material-ui/blob/v4.x/packages/material-ui/src/Tabs/Tabs.js#L194
    chromatic: { delay: 10000 },
    controls: { expanded: true },
  },
  title: "Components/Tabs",
} as Meta;

// Default

export const Default = {
  args: {
    items: [
      { label: "Upload from Your Computer" },
      { count: 0, label: "Upload from Base Space" },
    ],
    sdsSize: "large",
    underlined: true,
  },
  parameters: {
    // tab indicator bug known by MUI where width for indicator updates once font is loaded in.
    // delay allows for font to load and prevents chromatic from constantly creating new baselines
    // https://github.cwom/mui/material-ui/blob/v4.x/packages/material-ui/src/Tabs/Tabs.js#L194
    chromatic: { delay: 5000 },
  },
};

// LivePreview

export const LivePreview = {
  parameters: {
    chromatic: { delay: 5000 },
    controls: {
      exclude: TABS_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Test

export const Test = {
  parameters: {
    chromatic: { delay: 5000 },
    controls: {
      exclude: TABS_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
