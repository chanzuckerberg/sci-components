import { Args, Meta } from "@storybook/react-vite";
import {
  TAG_COLOR_CONTRAST_RULE,
  TAG_EXCLUDED_CONTROLS,
  TAG_HREF_LABELS,
  TAG_HREF_OPTIONS,
  TAG_ICON_LABELS,
  TAG_ICONS,
  TAG_ON_CLICK_LABELS,
  TAG_ON_CLICK_OPTIONS,
  TAG_PANEL_COLOR_LABELS,
  TAG_PANEL_COLORS,
  TAG_SDS_STYLES,
  TAG_SIZES,
} from "./constants";
import { Tag } from "./stories/default";
import { ScreenshotTestDemo } from "./stories/screenshot";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    color: {
      control: {
        labels: TAG_PANEL_COLOR_LABELS,
        type: "select",
      },
      mapping: TAG_PANEL_COLORS,
      options: Object.keys(TAG_PANEL_COLORS),
    },
    disabled: {
      control: { type: "boolean" },
    },
    href: {
      control: {
        labels: TAG_HREF_LABELS,
        type: "select",
      },
      mapping: TAG_HREF_OPTIONS,
      options: Object.keys(TAG_HREF_OPTIONS),
    },
    icon: {
      control: {
        labels: TAG_ICON_LABELS,
        type: "select",
      },
      mapping: TAG_ICONS,
      options: Object.keys(TAG_ICONS),
    },
    iconOnly: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
      required: true,
    },
    onClick: {
      control: {
        labels: TAG_ON_CLICK_LABELS,
        type: "select",
      },
      mapping: TAG_ON_CLICK_OPTIONS,
      options: Object.keys(TAG_ON_CLICK_OPTIONS),
    },
    sdsStyle: {
      control: { type: "radio" },
      options: TAG_SDS_STYLES,
    },
    showLinkIcon: {
      control: { type: "boolean" },
    },
    size: {
      control: { type: "radio" },
      options: TAG_SIZES,
    },
  },
  component: Tag,
  parameters: {
    a11y: {
      // Several intents, and the disabled state, measure under axe's 4.5:1
      // contrast threshold with the colors the design specifies.
      config: { rules: [{ enabled: false, id: TAG_COLOR_CONTRAST_RULE }] },
    },
  },
  title: "Components/Tag",
} as Meta;

// Default

export const Default = {
  args: {
    disabled: false,
    iconOnly: false,
    label: "Label",
    sdsStyle: "solid",
    showLinkIcon: false,
    size: "medium",
  },
};

// Screenshot tests

export const ScreenshotTest = {
  parameters: {
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (): JSX.Element => <ScreenshotTestDemo />,
};

export const ScreenshotTestDark = {
  globals: {
    theme: "dark",
  },
  parameters: {
    controls: {
      exclude: TAG_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (): JSX.Element => <ScreenshotTestDemo />,
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
