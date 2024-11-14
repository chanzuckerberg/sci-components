import { Args, Meta } from "@storybook/react";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import {
  AUTOCOMPLETE_DATA_OPTIONS,
  AUTOCOMPLETE_EXCLUDED_CONTROLS,
  AUTOCOMPLETE_GROUP_BY_OPTIONS,
  AUTOCOMPLETE_LABEL,
} from "./constants";
import { Autocomplete } from "./stories/default";
import { AutocompleteSingleColumnDemo } from "./stories/singleColumn";
import { AutocompleteMultiColumnDemo } from "./stories/multiColumn";
import { TestDemo } from "./stories/test";
import { ControlledOpenDemo } from "./stories/controlledOpen";

export default {
  argTypes: {
    groupBy: {
      control: {
        labels: ["No group by", "Group by section names"],
        type: "select",
      },
      mapping: AUTOCOMPLETE_GROUP_BY_OPTIONS,
      options: Object.keys(AUTOCOMPLETE_GROUP_BY_OPTIONS),
    },
    intent: {
      control: { type: "radio" },
      options: ["default", "negative", "notice", "positive"],
    },
    keepSearchOnSelect: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
    },
    multiple: {
      control: { type: "boolean" },
    },
    options: {
      control: {
        labels: ["One Column", "Two Columns", "Three Columns"],
        type: "select",
      },
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
  title: "Components/Dropdowns/Autocomplete",
} as Meta;

// Default

export const Default = {
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS[1],
    keepSearchOnSelect: true,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
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
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS[1],
    keepSearchOnSelect: false,
    label: AUTOCOMPLETE_LABEL,
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
  render: (args: Args) => <AutocompleteSingleColumnDemo {...args} />,
};

// Multi Column Autocomplete

export const MultiColumn = {
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS[1],
    keepSearchOnSelect: false,
    label: AUTOCOMPLETE_LABEL,
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
  render: (args: Args) => <AutocompleteMultiColumnDemo {...args} />,
};

// Controlled Open

export const ControlledOpen = {
  args: {
    groupBy: AUTOCOMPLETE_GROUP_BY_OPTIONS[1],
    keepSearchOnSelect: true,
    label: AUTOCOMPLETE_LABEL,
    multiple: true,
    options: AUTOCOMPLETE_DATA_OPTIONS[1],
    search: true,
  },
  parameters: {
    controls: {
      exclude: ["search"],
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
