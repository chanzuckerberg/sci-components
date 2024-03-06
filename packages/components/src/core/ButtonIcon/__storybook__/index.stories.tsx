import { Args, Meta } from "@storybook/react";
import RawButtonIcon from "src/core/ButtonIcon";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { ButtonIcon } from "./stories/default";
import {
  BUTTON_ICON_EXCLUDED_CONTROLS,
  BUTTON_ICON_ICON_LABELS,
  BUTTON_ICON_ICON_OPTIONS,
} from "./constants";
import { LivePreviewDemo } from "./stories/livePreview";
import { ScreenshotTestDemo } from "./stories/screenshots";

export default {
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
    icon: {
      control: {
        labels: BUTTON_ICON_ICON_LABELS,
        type: "select",
      },
      mapping: BUTTON_ICON_ICON_OPTIONS,
      options: Object.keys(BUTTON_ICON_ICON_OPTIONS),
    },
    on: {
      control: {
        type: "boolean",
      },
    },
    sdsSize: {
      control: {
        type: "select",
      },
      options: ["small", "medium", "large"],
    },
    sdsType: {
      control: {
        type: "select",
      },
      options: ["primary", "secondary", "tertiary"],
    },
  },
  component: ButtonIcon,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  title: "Components/ButtonIcon [wip]",
} as Meta;

// Default

export const Default = {
  args: {
    "aria-label": "info",
    disabled: false,
    icon: "DotsHorizontal",
    sdsSize: "large",
    sdsType: "primary",
  },
};

// Live Preview

export const LivePreview = {
  parameters: {
    controls: {
      exclude: BUTTON_ICON_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Screenshot test

export const ScreenshotTest = {
  parameters: {
    controls: {
      exclude: BUTTON_ICON_EXCLUDED_CONTROLS,
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
      exclude: BUTTON_ICON_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (): JSX.Element => {
    return (
      <RawButtonIcon
        aria-label="dotsHorizontal"
        data-testid="iconButton"
        on
        icon="DotsHorizontal"
        sdsSize="medium"
        sdsType="primary"
      />
    );
  },
};
