import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { Link } from "./stories/default";
import { LINK_EXCLUDED_CONTROLS } from "./constants";
import { ScreenshotTestDemo } from "./stories/screenshot";
import { LongerTextDemo } from "./stories/longText";

export default {
  argTypes: {
    fontWeight: {
      control: {
        type: "radio",
      },
      options: ["normal", "bold"],
    },
    sdsSize: {
      control: { type: "select" },
      options: ["s", "xs"],
    },
    sdsStyle: {
      control: { type: "select" },
      options: ["default", "dashed"],
    },
  },
  component: Link,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Link",
} as Meta;

// Default

export const Default = {
  args: {
    fontWeight: "normal",
    sdsSize: "s",
    sdsStyle: "default",
  },
};

// Longer Text

export const LongerText = {
  render: () => LongerTextDemo(),
};

// Screenshot test

export const ScreenshotTest = {
  parameters: {
    controls: {
      exclude: LINK_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};
