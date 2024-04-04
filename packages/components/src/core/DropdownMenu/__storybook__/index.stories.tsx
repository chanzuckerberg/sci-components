import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import {
  DROPDOWN_MENU_DATA_OPTIONS,
  DROPDOWN_MENU_EXCLUDED_CONTROLS,
  DROPDOWN_MENU_GROUP_BY_OPTIONS,
  DROPDOWN_MENU_LABEL,
} from "./constants";
import { DropdownMenu } from "./stories/default";
import { LivePreviewDemo } from "./stories/livePreview";
import { ScreenshotTestDemo } from "./stories/screenshot";
import { TestDemo } from "./stories/test";

export default {
  argTypes: {
    ClickAwayListenerProps: {
      control: { type: "object" },
    },
    groupBy: {
      control: {
        labels: ["No group by", "Group by section names"],
        type: "select",
      },
      mapping: DROPDOWN_MENU_GROUP_BY_OPTIONS,
      options: Object.keys(DROPDOWN_MENU_GROUP_BY_OPTIONS),
    },
    keepSearchOnSelect: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
      require: true,
    },
    multiple: {
      control: { type: "boolean" },
    },
    open: {
      control: {
        type: "boolean",
      },
    },
    options: {
      control: {
        labels: ["One Column", "Two Columns", "Three Columns"],
        type: "select",
      },
      mapping: DROPDOWN_MENU_DATA_OPTIONS,
      options: Object.keys(DROPDOWN_MENU_DATA_OPTIONS),
    },
    search: {
      control: { type: "boolean" },
    },
    title: {
      control: { type: "text" },
    },
    width: {
      control: { type: "number" },
    },
  },
  component: DropdownMenu,
  // (masoudmanson) For the purpose of storybook, the button is removed
  // from the dropdown menu component which may cause some accessibility
  // violations related to ARIA roles and attributes. However, this
  // should not be a concern as the component is always used with a button
  // in real applications. To avoid false positive test failures, the following
  // accessibility rules have been temporarily disabled in the tests
  parameters: {
    axe: {
      disabledRules: [
        "aria-input-field-name",
        "aria-required-children",
        "aria-required-parent",
        "button-name",
        "list",
        "listitem",
      ],
    },
    badges: [BADGE.STABLE],
  },
  title: "Components/Dropdowns/DropdownMenu",
} as Meta;

// Default

export const Default = {
  args: {
    groupBy: DROPDOWN_MENU_GROUP_BY_OPTIONS[1],
    keepSearchOnSelect: true,
    multiple: true,
    open: true,
    options: DROPDOWN_MENU_DATA_OPTIONS[0],
    search: true,
    title: DROPDOWN_MENU_LABEL,
    width: 300,
  },
};

// Multi Column

export const MultiColumn = {
  args: {
    groupBy: DROPDOWN_MENU_GROUP_BY_OPTIONS[1],
    keepSearchOnSelect: true,
    multiple: true,
    open: true,
    options: DROPDOWN_MENU_DATA_OPTIONS[2],
    search: true,
    title: DROPDOWN_MENU_LABEL,
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_MENU_EXCLUDED_CONTROLS,
    },
  },
  render: (args: Args) => <DropdownMenu {...args} />,
};

// Live Preview

export const LivePreview = {
  args: {
    keepSearchOnSelect: true,
    multiple: false,
    search: false,
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_MENU_EXCLUDED_CONTROLS,
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
    axe: {
      timeout: 10 * 1000,
    },
    controls: {
      exclude: DROPDOWN_MENU_EXCLUDED_CONTROLS,
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
    keepSearchOnSelect: false,
    multiple: true,
    search: true,
    title: DROPDOWN_MENU_LABEL,
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_MENU_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo data-testid="dropdown-menu" {...args} />,
};
