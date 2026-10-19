import { Args, Meta } from "@storybook/react-vite";
import {
  DROPDOWN_MENU_DATA_OPTIONS,
  DROPDOWN_MENU_EXCLUDED_CONTROLS,
  DROPDOWN_MENU_GROUP_BY_OPTIONS,
  DROPDOWN_MENU_LABEL,
} from "./constants";
import { DropdownMenu } from "./stories/default";
import { ScreenshotTestDemo } from "./stories/screenshot";
import { TestDemo } from "./stories/test";
import { WithHeaderComponentDemo } from "./stories/withHeaderComponent";

export default {
  argTypes: {
    ClickAwayListenerProps: {
      control: { type: "object" },
      description: "Passes props to the MUI ClickAwayListener.",
    },
    groupBy: {
      control: {
        labels: { none: "No group by", section: "Group by section names" },
        type: "select",
      },
      description: "Groups menu items according to their assigned section.",
      mapping: DROPDOWN_MENU_GROUP_BY_OPTIONS,
      options: Object.keys(DROPDOWN_MENU_GROUP_BY_OPTIONS),
    },
    keepSearchOnSelect: {
      control: { type: "boolean" },
      description:
        "Maintains a search input when a user selects a menu item (only if multiple selections are allowed via the multiple prop; otherwise the dropdown closes upon selection).",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: { type: "text" },
      description: "The placeholder text of the search input.",
      require: true,
      table: {
        defaultValue: { summary: "Search" },
      },
    },
    multiple: {
      control: { type: "boolean" },
      description:
        "Allows user to select multiple menu items; see more in the MUI Autocomplete API.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    open: {
      control: {
        type: "boolean",
      },
      description:
        "Whether the menu is showing. The menu holds no open state of its own, so this and anchorEl are what the opening control sets.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    options: {
      control: {
        labels: {
          oneColumn: "One Column",
          twoColumns: "Two Columns",
          threeColumns: "Three Columns",
        },
        type: "select",
      },
      description:
        "Required. One object per menu item, each needing at least a name. An option that itself has an options array turns the menu into columns, which changes how it is sized.",
      mapping: DROPDOWN_MENU_DATA_OPTIONS,
      options: Object.keys(DROPDOWN_MENU_DATA_OPTIONS),
    },
    search: {
      control: { type: "boolean" },
      description:
        "Provides a search bar at the top of the menu from which users can narrow the list of menu items.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    title: {
      control: { type: "text" },
      description: "Sets a heading for the menu.",
    },
    subTitle: {
      control: { type: "text" },
      description:
        "A second line below the header's title. It is only rendered when title is set as well.",
    },
    width: {
      control: { type: "text" },
      description:
        "The width of the menu, as a number of pixels or any CSS width. The 160px minimum still applies underneath it, and a menu whose options are laid out in columns ignores this and sizes itself to its content.",
      table: {
        defaultValue: { summary: "160" },
      },
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
    a11y: {
      config: {
        rules: [
          { enabled: false, id: "aria-input-field-name" },
          { enabled: false, id: "aria-required-children" },
          { enabled: false, id: "aria-required-parent" },
          { enabled: false, id: "button-name" },
          { enabled: false, id: "color-contrast" },
          { enabled: false, id: "list" },
          { enabled: false, id: "listitem" },
        ],
      },
    },
  },
  title: "Components/Dropdowns/DropdownMenu",
} as Meta;

// Default

export const Default = {
  args: {
    groupBy: DROPDOWN_MENU_GROUP_BY_OPTIONS.section,
    keepSearchOnSelect: true,
    multiple: true,
    open: true,
    options: DROPDOWN_MENU_DATA_OPTIONS.oneColumn,
    search: true,
    title: DROPDOWN_MENU_LABEL,
    width: 300,
  },
};

// Multi Column

export const MultiColumn = {
  args: {
    groupBy: DROPDOWN_MENU_GROUP_BY_OPTIONS.section,
    keepSearchOnSelect: true,
    multiple: true,
    open: true,
    options: DROPDOWN_MENU_DATA_OPTIONS.threeColumns,
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

// Screenshot test

export const ScreenshotTest = {
  parameters: {
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

// With a minimal button at the headerComponentSlot

export const WithHeaderComponent = {
  args: {
    keepSearchOnSelect: false,
    multiple: true,
    search: true,
    title: DROPDOWN_MENU_LABEL,
  },
  parameters: {
    controls: {
      exclude: DROPDOWN_MENU_EXCLUDED_CONTROLS.filter(
        (control) => control !== "search" && control !== "title"
      ),
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <WithHeaderComponentDemo {...args} />,
};
