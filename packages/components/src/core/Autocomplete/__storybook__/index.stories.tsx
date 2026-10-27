import { Args, Meta } from "@storybook/react-vite";
import {
  AUTOCOMPLETE_DATA_OPTIONS,
  AUTOCOMPLETE_EXCLUDED_CONTROLS,
  AUTOCOMPLETE_GROUP_BY_OPTIONS,
  AUTOCOMPLETE_LABEL,
  AUTOCOMPLETE_ON_CHANGE_OPTIONS,
} from "./constants";
import { Autocomplete } from "./stories/default";
import { TestDemo } from "./stories/test";
import { ControlledOpenDemo } from "./stories/controlledOpen";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "@components/src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { AUTOCOMPLETE_MULTI_COLUMN_OPTIONS } from "@components/src/common/storybook/AUTOCOMPLETE_MULTI_COLUMN_OPTIONS";

export default {
  argTypes: {
    groupBy: {
      control: {
        labels: { none: "No group by", section: "Group by section names" },
        type: "select",
      },
      description:
        "If provided, the options will be grouped under the returned string. The groupBy value is also used as the text for group headings when `renderGroup` is not provided.",
      mapping: AUTOCOMPLETE_GROUP_BY_OPTIONS,
      options: Object.keys(AUTOCOMPLETE_GROUP_BY_OPTIONS),
    },
    intent: {
      control: { type: "radio" },
      description:
        "Validation styling on the search field. Single column only; the multi-column field does not take it.",
      options: ["default", "negative", "notice", "positive"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    keepSearchOnSelect: {
      control: { type: "boolean" },
      description:
        "For a multi-select, leaves the typed text in place after a selection instead of clearing it.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: { type: "text" },
      description:
        'The search field\'s label and placeholder. It defaults to "Search" when the options are laid out in columns.',
      table: {
        defaultValue: { summary: "Label" },
      },
    },
    multiple: {
      control: { type: "boolean" },
      description:
        "If `true`, `value` must be an array and the menu will support multiple selections.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onChange: {
      control: {
        labels: { noop: "Noop", log: "console.log(value)" },
        type: "select",
      },
      description:
        "Fired on every selection change with the whole value. `details.option` is the one that just changed.",
      mapping: AUTOCOMPLETE_ON_CHANGE_OPTIONS,
      options: Object.keys(AUTOCOMPLETE_ON_CHANGE_OPTIONS),
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
        "The options, or an array of named columns each with their own options.",
      mapping: AUTOCOMPLETE_DATA_OPTIONS,
      options: Object.keys(AUTOCOMPLETE_DATA_OPTIONS),
    },
  },
  component: Autocomplete,
  // (masoudmanson) For the purpose of storybook, the button is removed
  // from the RawAutocomplete component which may cause some accessibility
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
  title: "Components/Dropdowns/Autocomplete",
} as Meta;

// Default

export const Default = {
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS.section,
    keepSearchOnSelect: true,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    onChange: AUTOCOMPLETE_ON_CHANGE_OPTIONS.log,
    search: true,
  },
  parameters: {
    controls: {
      exclude: ["search"],
    },
  },
};

// Single Column Autocomplete

export const SingleColumn = {
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS.section,
    keepSearchOnSelect: false,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    onChange: AUTOCOMPLETE_ON_CHANGE_OPTIONS.log,
    options: AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
    search: true,
  },
  parameters: {
    controls: {
      exclude: AUTOCOMPLETE_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
};

// Multi Column Autocomplete

export const MultiColumn = {
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS.section,
    keepSearchOnSelect: false,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    onChange: AUTOCOMPLETE_ON_CHANGE_OPTIONS.log,
    options: AUTOCOMPLETE_MULTI_COLUMN_OPTIONS,
    search: true,
  },
  parameters: {
    controls: {
      exclude: AUTOCOMPLETE_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
};

// Controlled Open

export const ControlledOpen = {
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS.section,
    keepSearchOnSelect: true,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    options: AUTOCOMPLETE_DATA_OPTIONS.twoColumns,
    search: true,
  },
  parameters: {
    controls: {
      exclude: AUTOCOMPLETE_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <ControlledOpenDemo {...args} />,
};

// Test

export const Test = {
  args: {
    keepSearchOnSelect: false,
    multiple: true,
    search: true,
  },
  parameters: {
    controls: {
      exclude: AUTOCOMPLETE_EXCLUDED_CONTROLS,
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <TestDemo data-testid="autocomplete-base" {...args} />
  ),
};
