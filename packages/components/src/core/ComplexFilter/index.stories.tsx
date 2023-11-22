import { Args, Meta } from "@storybook/react";
import React from "react";
import { noop } from "src/common/utils";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "../../common/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { DefaultAutocompleteOption } from "../Autocomplete/components/AutocompleteBase";
import RawComplexFilter from "./index";

const ComplexFilter = <T extends DefaultAutocompleteOption>(
  props: Args
): JSX.Element => {
  return (
    <RawComplexFilter
      label="Click Target"
      onChange={noop}
      options={AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS as T[]}
      DropdownMenuProps={{
        groupBy: (option: DefaultAutocompleteOption) =>
          option.section as string,
      }}
      {...props}
    />
  );
};

const onChangeOptions = [
  noop,
  (value: never) => {
    // eslint-disable-next-line no-console
    console.log(value);
  },
];

export default {
  argTypes: {
    isTriggerChangeOnOptionClick: {
      control: {
        type: "boolean",
      },
    },
    label: {
      control: {
        type: "text",
      },
    },
    multiple: {
      control: {
        type: "boolean",
      },
    },
    onChange: {
      control: {
        labels: ["Noop", "console.log(value)"],
        type: "select",
      },
      mapping: onChangeOptions,
      options: Object.keys(onChangeOptions),
    },
    search: {
      control: {
        type: "boolean",
      },
    },
  },
  component: ComplexFilter,
  title: "ComplexFilter",
} as Meta;

// Default

export const Default = {
  args: {
    isTriggerChangeOnOptionClick: false,
    label: "Click Target",
    multiple: true,
    onChange: onChangeOptions[1],
    search: true,
  },
};

// Live preview

const livePreviewStyles = {
  display: "grid",
  gridColumnGap: 30,
  gridTemplateColumns: "repeat(3, min-content)",
};

const LivePreviewDemo = (): JSX.Element => {
  return (
    <div style={livePreviewStyles as React.CSSProperties}>
      <div style={{ gridArea: "1/1/2/2" }}>
        <RawComplexFilter
          DropdownMenuProps={{
            PopperBaseProps: {
              sx: { width: 160 },
            },
          }}
          label="Filter Label"
          multiple={false}
          search={false}
          onChange={noop}
          options={LIVE_PREVIEW_OPTIONS}
        />
      </div>
      <div style={{ gridArea: "1/2/2/3" }}>
        <RawComplexFilter
          DropdownMenuProps={{
            PopperBaseProps: {
              sx: { width: 160 },
            },
          }}
          label="Filter Label"
          multiple
          search={false}
          onChange={noop}
          options={LIVE_PREVIEW_OPTIONS}
        />
      </div>
    </div>
  );
};

export const LivePreview = {
  args: {
    keepSearchOnSelect: true,
    multiple: false,
    search: false,
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <LivePreviewDemo {...args} />,
};

const LIVE_PREVIEW_OPTIONS = [
  { name: "Filter Item 1" },
  { name: "Filter Item 2" },
  { name: "Filter Item 3" },
];

// Test

const TestDemo = <T extends DefaultAutocompleteOption>(
  props: Args
): JSX.Element => {
  return (
    <RawComplexFilter
      label="Click Target"
      onChange={noop}
      options={AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS as T[]}
      {...props}
    />
  );
};

export const Test = {
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} data-testid="complex-filter" />,
};
