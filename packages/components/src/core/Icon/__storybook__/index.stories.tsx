import { Args, Meta } from "@storybook/react";
import RawIcon from "src/core/Icon";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { Icon } from "./stories/default";
import { IconBankDemo } from "./stories/iconBank";

export default {
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["blue", "gray", "green", "purple", "red", "yellow"],
    },
    sdsIcon: {
      control: {
        type: "select",
      },
      options: [
        "CheckCircle",
        "Copy",
        "Edit",
        "LightBulb",
        "LinesHorizontal",
        "Loading",
        "XMark",
      ],
    },
    sdsSize: {
      control: { type: "select" },
      options: ["xs", "s", "l", "xl"],
    },
    shade: {
      control: {
        type: "select",
      },
      options: [100, 200, 300, 400, 500, 600, 700, 800],
    },
  },
  component: Icon,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Icon",
} as Meta;

// Default

export const Default = {
  args: {
    color: "blue",
    sdsIcon: "CheckCircle",
    sdsSize: "xl",
  },
};

// Icon Bank

export const IconBank = {
  args: {
    color: "blue",
  },
  parameters: {
    controls: {
      exclude: ["sdsIcon", "sdsSize", "sdsType", "shade"],
    },
  },
  render: (args: Args) => <IconBankDemo {...args} />,
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: ["color", "sdsIcon", "sdsSize", "sdsType", "shade"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <RawIcon
      sdsIcon="CheckCircle"
      sdsSize="l"
      color="blue"
      data-testid="icon"
      {...args}
    />
  ),
};
