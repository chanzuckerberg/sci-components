import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { Dialog } from "./stories/default";
import { DIALOG_EXCLUDED_CONTROLS } from "./constants";
import { TestDemo } from "./stories/test";
import { TestNoTitleOnCloseDemo } from "./stories/testNoTitleOnClose";
import { TestButtonPositionLeftDemo } from "./stories/testButtonPositionLeft";

export default {
  argTypes: {
    buttonPosition: {
      control: {
        type: "inline-radio",
      },
      options: ["left", "right"],
    },
    canClickOutsideClose: {
      control: {
        type: "boolean",
      },
    },
    longContent: {
      control: {
        type: "boolean",
      },
    },
    sdsSize: {
      control: {
        type: "inline-radio",
      },
      options: ["xs", "s", "m", "l"],
    },
    titleOnClose: {
      control: {
        type: "boolean",
      },
    },
  },
  component: Dialog,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Dialog",
} as Meta;

// Default

export const Default = {
  args: {
    buttonPosition: "right",
    longContent: true,
    sdsSize: "m",
    titleOnClose: false,
  },
};

// Test

export const Test = {
  parameters: {
    controls: {
      exclude: DIALOG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};

// Test No Title On Close

export const TestNoTitleOnClose = {
  parameters: {
    controls: {
      exclude: DIALOG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestNoTitleOnCloseDemo {...args} />,
};

// Test Button Position Left

export const TestButtonPositionLeft = {
  parameters: {
    controls: {
      exclude: DIALOG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestButtonPositionLeftDemo {...args} />,
};
