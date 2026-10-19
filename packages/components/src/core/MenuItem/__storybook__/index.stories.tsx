import { Args, Meta } from "@storybook/react-vite";
import {
  MENU_ITEM_EXCLUDED_CONTROLS,
  MENU_ITEM_ICON_OPTIONS,
} from "./constants";
import { MenuItem } from "./stories/default";
import { ScreenshotTestDemo } from "./stories/screenshot";
import { INLINE_RADIO } from "@components/src/common/utils";

export default {
  argTypes: {
    column: {
      control: { type: "text" },
      description:
        "The column prop determines the content displayed in the right column of the menu item. This content can be customized to provide additional information or context for the menu item.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "If `true`, the component is disabled.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      control: {
        labels: {
          gear: "SDS Icon: Gear",
          customSdsIcon: "Custom SDS Icon",
          customSvgIcon: "Custom SVG Icon",
        },
        type: "select",
      },
      description:
        "The icon shown at the start of the item, either the name of an SDS icon or an element of your own. Only icons that come in a small size can be named here.",
      mapping: MENU_ITEM_ICON_OPTIONS,
      options: Object.keys(MENU_ITEM_ICON_OPTIONS),
    },
    isMultiSelect: {
      control: { type: "boolean" },
      description:
        "When true, designates that the menu item supports multi-select functionality.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    name: {
      control: { type: "text" },
      description:
        "Story-only: the item's text, which the story renders as the MenuItem's children.",
    },
    sdsIconProps: {
      control: {
        type: "object",
      },
      description:
        "Enables you to pass additional props to customize the SDS icon within the menu item.",
    },
    sdsStyle: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        "Determines the style of the menu item, whether it is determinate or indeterminate.",
      options: ["determinate", "indeterminate"],
      table: {
        defaultValue: { summary: "determinate" },
      },
    },
    sdsType: {
      control: {
        type: INLINE_RADIO,
      },
      description:
        'An "action" item leaves out the selection mark at its start, for a menu whose items run a command rather than choose a value.',
      options: ["default", "action"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    selected: {
      control: { type: "boolean" },
      description: "If `true`, the component is selected.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  component: MenuItem,
  parameters: {
    a11y: {
      config: { rules: [{ enabled: false, id: "aria-required-parent" }] },
    },
  },
  title: "Components/Dropdowns/MenuItem",
} as Meta;

// Default

export const Default = {
  args: {
    column: "123,456",
    disabled: false,
    isMultiSelect: false,
    name: "Text here",
    sdsIconProps: {
      color: "blue",
    },
    sdsStyle: "determinate",
    sdsType: "default",
    selected: false,
  },
};

// ActionType

export const ActionType = {
  args: {
    column: "123,456",
    disabled: false,
    isMultiSelect: false,
    name: "Text here",
    sdsIconProps: {
      color: "blue",
    },
    sdsStyle: "determinate",
    sdsType: "action",
    selected: false,
  },
};

// Screenshot test

export const ScreenshotTest = {
  args: {
    name: "Text here",
  },
  parameters: {
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
    column: "123",
    name: "Test text",
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
