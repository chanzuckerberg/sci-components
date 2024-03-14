import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import {
  TAG_COLORS,
  TAG_COLOR_CONTRAST_RULE,
  TAG_EXCLUDED_CONTROLS,
  TAG_HOVER_OPTIONS,
  TAG_ICONS,
  TAG_ICONS_LABELS,
  TAG_PANEL_COLORS,
  TAG_SDS_STYLES,
  TAG_SDS_TYPES,
} from "./constants";
import { Tag } from "./stories/default";
import { LivePreviewDemo } from "./stories/livePreview";
import { ScreenshotTestDemo } from "./stories/mainScreenshot";
import { GrayPrimaryScreenshotTestDemo } from "./stories/grayPrimaryScreenshot";
import { SuccessWarningScreenshotTestDemo } from "./stories/successWarningScreenshot";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    color: {
      control: {
        labels: [
          "accent",
          "info",
          "positive",
          "notice",
          "negative",
          "beta",
          "Custom colors for Label, Background, Icon",
        ],
        type: "select",
      },
      mapping: TAG_PANEL_COLORS,
      options: Object.keys(TAG_PANEL_COLORS),
    },
    hover: {
      control: { type: "boolean" },
    },
    icon: {
      control: {
        labels: TAG_ICONS_LABELS,
        type: "select",
      },
      mapping: TAG_ICONS,
      options: Object.keys(TAG_ICONS),
    },
    label: {
      control: { type: "text" },
      required: true,
    },
    sdsSize: {
      control: { type: "radio" },
      options: ["s", "l"],
    },
    sdsStyle: {
      control: { type: "radio" },
      options: ["rounded", "square"],
    },
    sdsType: {
      control: { type: "radio" },
      options: ["primary", "secondary"],
    },
  },
  component: Tag,
  parameters: {
    axe: {
      disabledRules: [TAG_COLOR_CONTRAST_RULE],
    },
    badges: [BADGE.STABLE],
  },
  title: "Components/Tag",
} as Meta;

// Default

export const Default = {
  args: {
    hover: true,
    label: "Label",
    sdsSize: "s",
    sdsStyle: "square",
    sdsType: "primary",
  },
};

// Live Preview

export const LivePreview = {
  args: {
    color: "info",
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

// Screenshot tests

export const ScreenshotTest = {
  args: {
    color: TAG_COLORS[0],
    hover: TAG_HOVER_OPTIONS[0],
    label: "Label",
    sdsStyle: TAG_SDS_STYLES[0],
    sdsType: TAG_SDS_TYPES[0],
  },
  parameters: {
    axe: {
      timeout: 10 * 1000,
    },
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },

  render: (props: Args): JSX.Element => <ScreenshotTestDemo {...props} />,
};

export const GrayPrimaryScreenshotTest = {
  args: {
    color: TAG_COLORS[0],
    hover: TAG_HOVER_OPTIONS[0],
    label: "Label",
    sdsStyle: TAG_SDS_STYLES[0],
    sdsType: TAG_SDS_TYPES[0],
  },
  parameters: {
    axe: {
      // `color-contrast` is disabled for this test because design tested it with
      // APCA and determined these colors pass, our test just isn't able to use APCA
      // yet; this color was pulled into its own story so the remaining colors can be
      // tested separately
      disabledRules: [TAG_COLOR_CONTRAST_RULE],
      timeout: 10 * 1000,
    },
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },

  render: (props: Args): JSX.Element => (
    <GrayPrimaryScreenshotTestDemo {...props} />
  ),
};

export const SuccessWarningScreenshotTest = {
  args: {
    color: TAG_COLORS[0],
    hover: TAG_HOVER_OPTIONS[0],
    label: "Label",
    sdsStyle: TAG_SDS_STYLES[0],
    sdsType: TAG_SDS_TYPES[0],
  },
  parameters: {
    axe: {
      // `color-contrast` is disabled for this test because it is now a known
      // issue and design will work on adjusting the colors so that they pass;
      // these colors were pulled into their own story so the remaining colors
      // can be tested separately
      disabledRules: [TAG_COLOR_CONTRAST_RULE],
      timeout: 10 * 1000,
    },
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },

  render: (props: Args): JSX.Element => (
    <SuccessWarningScreenshotTestDemo {...props} />
  ),
};

// Test

export const Test = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
