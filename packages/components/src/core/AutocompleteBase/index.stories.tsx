import { AutocompleteChangeReason, AutocompleteValue } from "@mui/base";
import { Args, Meta } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { GITHUB_LABELS } from "../DropdownMenu/GITHUB_LABELS";
import TagFilter from "../TagFilter";
import RawAutocompleteBase, { DefaultAutocompleteOption } from "./index";

const groupByOptions = [
  undefined,
  (option: DefaultAutocompleteOption) => option.section as string,
];

const AutocompleteBase = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined
>(
  props: Args
): JSX.Element => {
  const {
    label,
    multiple,
    options = GITHUB_LABELS,
    search,
    value: propValue,
    keepSearchOnSelect,
  } = props;

  const isControlled = propValue !== undefined;
  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, false, false>
  >(getInitialValue());
  const [pendingValue, setPendingValue] = useState<
    AutocompleteValue<T, Multiple, false, false>
  >(getInitialValue());

  const [selection, setSelection] = useState<string[]>([]);

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
    }
  }, [isControlled, propValue]);

  useEffect(() => {
    setSelection([]);
  }, [multiple]);

  useEffect(() => {
    console.log({ value });
  }, [value]);

  useEffect(() => {
    console.log({ pendingValue });
  }, [pendingValue]);

  return (
    <div style={{ margin: "16px 0 0 24px", width: 300 }}>
      <RawAutocompleteBase
        id="autocomplete-base-demo"
        disableCloseOnSelect={multiple}
        label={label}
        multiple={multiple}
        onChange={handleChange}
        keepSearchOnSelect={keepSearchOnSelect}
        options={options}
        search={search}
        value={multiple ? pendingValue : value}
        getOptionDisabled={(option: DefaultAutocompleteOption) => {
          return option.name === "Type: feature request";
        }}
        {...props}
      />
      <div style={{ marginTop: 10 }}>
        {selection.length
          ? selection.map((item) => {
              return (
                <TagFilter
                  key={item}
                  label={item}
                  onDelete={() => handleTagDelete(item)}
                />
              );
            })
          : null}
      </div>
    </div>
  );

  function handleChange(
    _event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, false, false>,
    _reason: AutocompleteChangeReason
  ) {
    if (multiple) {
      const newSelection = Array.isArray(newValue)
        ? newValue?.map((item) => item.name)
        : [];
      setSelection(newSelection);
      return setPendingValue(newValue);
    } else {
      if (newValue && !Array.isArray(newValue) && newValue.name) {
        setValue(newValue);
        setSelection([newValue.name]);
      }
    }
  }

  function handleTagDelete(tag: string) {
    if (multiple && Array.isArray(pendingValue)) {
      const index = pendingValue?.findIndex((item) => item.name === tag);
      const newValue = [...pendingValue];
      newValue.splice(index, 1);
      setPendingValue(newValue as AutocompleteValue<T, Multiple, false, false>);

      const newSelection = [...selection];
      const deleteIndex = newSelection.indexOf(tag);
      newSelection.splice(deleteIndex, 1);
      setSelection(newSelection);
    } else {
      setValue(null as unknown as AutocompleteValue<T, Multiple, false, false>);
      setSelection([]);
    }
  }

  function getInitialValue(): AutocompleteValue<T, Multiple, false, false> {
    if (isControlled) {
      return propValue;
    }

    return multiple
      ? ([] as unknown as AutocompleteValue<T, Multiple, false, false>)
      : (null as unknown as AutocompleteValue<T, Multiple, false, false>);
  }
};

export default {
  argTypes: {
    blurOnSelect: {
      control: {
        type: "boolean",
      },
    },
    clearOnBlur: {
      control: {
        type: "boolean",
      },
    },
    groupBy: {
      control: {
        labels: ["No group by", "Group by section names"],
        type: "select",
      },
      mapping: groupByOptions,
      options: Object.keys(groupByOptions),
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
  },
  component: AutocompleteBase,
  // (masoudmanson) For the purpose of storybook, the button is removed
  // from the RawAutocompleteBase component which may cause some accessibility
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
  },
  title: "Dropdowns/AutocompleteBase",
} as Meta;

// Default

export const Default = {
  args: {
    groupBy: groupByOptions[1],
    keepSearchOnSelect: true,
    label: "Search by label",
    multiple: true,
    search: true,
  },
  parameters: {
    controls: {
      exclude: ["search"],
    },
  },
};

// Test

const TestDemo = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined
>(
  props: Args
): JSX.Element => {
  const { multiple, options = GITHUB_LABELS, search, value: propValue } = props;

  const isControlled = propValue !== undefined;
  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, false, false>
  >(getInitialValue());
  const [pendingValue, setPendingValue] = useState<
    AutocompleteValue<T, Multiple, false, false>
  >(getInitialValue());

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
    }
  }, [isControlled, propValue]);

  return (
    <RawAutocompleteBase
      open
      search={search}
      label="Search"
      multiple={multiple}
      value={multiple ? pendingValue : value}
      onChange={handleChange}
      disableCloseOnSelect={multiple}
      options={options}
      groupBy={(option: DefaultAutocompleteOption) => option.section as string}
      {...props}
    />
  );

  function handleChange(
    _event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, false, false>,
    _reason: AutocompleteChangeReason
  ) {
    if (!multiple) {
      setValue(newValue);
    }

    return setPendingValue(newValue);
  }

  // eslint-disable-next-line sonarjs/no-identical-functions
  function getInitialValue(): AutocompleteValue<T, Multiple, false, false> {
    if (isControlled) {
      return propValue;
    }

    return multiple
      ? ([] as unknown as AutocompleteValue<T, Multiple, false, false>)
      : (null as unknown as AutocompleteValue<T, Multiple, false, false>);
  }
};

export const Test = {
  args: {
    keepSearchOnSelect: false,
    multiple: true,
    search: true,
  },
  parameters: {
    controls: {
      exclude: ["search"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <TestDemo data-testid="autocomplete-base" {...args} />
  ),
};
