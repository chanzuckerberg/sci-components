import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import {
  MENU_ITEM_EXCLUDED_CONTROLS,
  MENU_ITEM_ICON_OPTIONS,
} from "./constants";
import { MenuItem } from "./stories/default";
import { ScreenshotTestDemo } from "./stories/screenshot";

export default {
  argTypes: {
    column: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    icon: {
      control: {
        labels: ["SDS Icon: Gear", "Custom SDS Icon", "Custom SVG Icon"],
        type: "select",
      },
      mapping: MENU_ITEM_ICON_OPTIONS,
      options: Object.keys(MENU_ITEM_ICON_OPTIONS),
    },
    isMultiSelect: {
      control: { type: "boolean" },
    },
    sdsIconProps: {
      control: {
        type: "object",
      },
    },
    sdsStyle: {
      control: {
        type: "radio",
      },
      options: ["determinate", "indeterminate"],
    },
    selected: {
      control: { type: "boolean" },
    },
  },
  component: MenuItem,
  parameters: {
    axe: {
      disabledRules: ["aria-required-parent"],
    },
    badges: [BADGE.STABLE],
  },
  title: "Components/Dropdowns/MenuItem",
} as Meta;

// Default

export const Default = {
  args: {
    column: "column value here",
    disabled: false,
    isMultiSelect: false,
    name: "text here",
    sdsIconProps: {
      color: "blue",
    },
    sdsStyle: "determinate",
    selected: false,
  },
};

// Screenshot test

export const ScreenshotTest = {
  args: {
    name: "text here",
  },
  parameters: {
    axe: {
      timeout: 10 * 1000,
    },
    controls: {
      exclude: MENU_ITEM_EXCLUDED_CONTROLS,
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
    column: "test column",
    name: "test text",
  },
  parameters: {
    controls: {
      exclude: MENU_ITEM_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <MenuItem {...args} />,
};
