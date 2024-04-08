import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { ScreenshotTestDemo } from "./stories/screenshot";
import {
  BUTTON_ACTIONS,
  BUTTON_EXCLUDED_CONTROLS,
  BUTTON_LARGE_ICON_LABELS,
  BUTTON_LARGE_ICON_OPTIONS,
  BUTTON_SDS_STYLES,
  BUTTON_SDS_TYPES,
  BUTTON_SDS_SIZE,
  BUTTON_SMALL_ICON_LABELS,
  BUTTON_SMALL_ICON_OPTIONS,
  BUTTON_ICON_LABELS,
  BUTTON_ICON_OPTIONS,
} from "./constants";
import { Button } from "./stories/default";
import {
  MinimalLivePreviewDemo,
  RoundedLivePreviewDemo,
  SquareLivePreviewDemo,
} from "./stories/livePreview";

export default {
  argTypes: {
    /**
     * (masoudmanson)
     * Temporary workaround due to Storybook limitations in rendering conditional
     * control options. To address the restriction of having identical keys, a distinct
     * key is used for small icon options. This serves as a temporary solution until
     * Storybook incorporates the feature for conditional control options rendering.
     * When sdsType is "minimal," BUTTON_SMALL_ICON_OPTIONS and BUTTON_SMALL_ICON_LABELS are utilized for
     * startIcon and endIcon. For sdsType other than "minimal," BUTTON_LARGE_ICON_OPTIONS and
     * BUTTON_LARGE_ICON_LABELS are used. The variables startIċon and endIċon serve the same purpose
     * as startIcon and endIcon specifically for sdsStyle "minimal." In the main story
     * definition, conditional rendering for startIcon and endIcon is determined by the sdsStyle:
     *
     * const startIconFinal = startIcon || startIċon;
     * const endIconFinal = endIcon || endIċon;
     */
    endIcon: {
      control: {
        labels: BUTTON_LARGE_ICON_LABELS,
        type: "select",
      },
      if: { arg: "sdsStyle", neq: "minimal" },
      mapping: BUTTON_LARGE_ICON_OPTIONS,
      options: Object.keys(BUTTON_LARGE_ICON_OPTIONS),
    },
    endIċon: {
      control: {
        labels: BUTTON_SMALL_ICON_LABELS,
        type: "select",
      },
      if: { arg: "sdsStyle", eq: "minimal" },
      mapping: BUTTON_SMALL_ICON_OPTIONS,
      options: Object.keys(BUTTON_SMALL_ICON_OPTIONS),
    },
    icon: {
      control: {
        labels: BUTTON_ICON_LABELS,
        type: "select",
      },
      if: { arg: "sdsStyle", eq: "icon" },
      mapping: BUTTON_ICON_OPTIONS,
      options: Object.keys(BUTTON_ICON_OPTIONS),
    },
    onClick: { action: BUTTON_ACTIONS.onClick },
    sdsSize: {
      control: {
        labels: BUTTON_SDS_SIZE,
        type: "select",
      },
      mapping: BUTTON_SDS_SIZE,
      options: Object.keys(BUTTON_SDS_SIZE),
    },
    sdsStyle: {
      control: { type: "select" },
      options: BUTTON_SDS_STYLES,
    },
    sdsType: {
      control: { type: "select" },
      options: BUTTON_SDS_TYPES,
    },
    /**
     * (masoudmanson)
     * Temporary workaround due to Storybook limitations in rendering conditional
     * control options. Same as the endIcon and endIċon, a distinct key is used for
     * startIcon options.
     */
    startIcon: {
      control: {
        labels: BUTTON_LARGE_ICON_LABELS,
        type: "select",
      },
      if: { arg: "sdsStyle", neq: "minimal" },
      mapping: BUTTON_LARGE_ICON_OPTIONS,
      options: Object.keys(BUTTON_LARGE_ICON_OPTIONS),
    },
    startIċon: {
      control: {
        labels: BUTTON_SMALL_ICON_LABELS,
        type: "select",
      },
      if: { arg: "sdsStyle", eq: "minimal" },
      mapping: BUTTON_SMALL_ICON_OPTIONS,
      options: Object.keys(BUTTON_SMALL_ICON_OPTIONS),
    },
    text: {
      control: {
        type: "text",
      },
    },
  },
  component: Button,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  title: "Components/Button [wip]",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    sdsStyle: "rounded",
    sdsType: "primary",
    text: "Label",
  },
};

// Rounded Live Preview

export const RoundedLivePreview = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: BUTTON_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <RoundedLivePreviewDemo {...args} />,
};

// Square Live Preview

export const SquareLivePreview = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: BUTTON_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <SquareLivePreviewDemo {...args} />,
};

// Minimal Live Preview

export const MinimalLivePreview = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: BUTTON_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <MinimalLivePreviewDemo {...args} />,
};

// Screenshot Test

export const ScreenshotTest = {
  args: {
    label: "Label",
  },
  parameters: {
    controls: {
      exclude: BUTTON_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ScreenshotTestDemo {...args} />,
};

// Test

export const Test = {
  args: {
    disabled: false,
    sdsStyle: "rounded",
    sdsType: "primary",
    text: "Label",
  },
  parameters: {
    controls: {
      exclude: BUTTON_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (props: Args) => <Button {...props} data-testid="button" />,
};
