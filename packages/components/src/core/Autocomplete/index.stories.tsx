import { Args, Meta } from "@storybook/react";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Value } from "../Dropdown";
import { GITHUB_LABELS } from "../DropdownMenu/GITHUB_LABELS";
import TagFilter from "../TagFilter";
import RawAutocomplete, { DefaultAutocompleteOption } from "./index";

export type AutocompleteOptionValue<T, Multiple> = Multiple extends
  | undefined
  | false
  ? T | undefined
  : Array<T> | undefined;

const groupByOptions = [
  undefined,
  (option: DefaultAutocompleteOption) => option.section as string,
];

const Autocomplete = <Multiple extends boolean | undefined = false>(
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
    DefaultAutocompleteOption | DefaultAutocompleteOption[] | null
  >(getInitialValue());
  const [pendingValue, setPendingValue] = useState<
    DefaultAutocompleteOption | DefaultAutocompleteOption[] | null
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

  return (
    <div style={{ margin: "16px 0 0 24px", width: 300 }}>
      <RawAutocomplete
        id="autocomplete-demo"
        disableCloseOnSelect={multiple}
        label={label}
        multiple={multiple}
        onChange={handleChange}
        keepSearchOnSelect={keepSearchOnSelect}
        options={options}
        search={search}
        value={multiple ? pendingValue : value}
        getOptionDisabled={(option: DefaultAutocompleteOption) => {
          return (
            option.name === "Type: feature request" ||
            option.name === "Type: documentation"
          );
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
    _: SyntheticEvent<Element, Event>,
    newValue: DefaultAutocompleteOption | DefaultAutocompleteOption[] | null
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
      setPendingValue(newValue);

      const newSelection = [...selection];
      const deleteIndex = newSelection.indexOf(tag);
      newSelection.splice(deleteIndex, 1);
      setSelection(newSelection);
    } else {
      setValue(null);
      setSelection([]);
    }
  }

  function getInitialValue(): Value<DefaultAutocompleteOption, Multiple> {
    if (isControlled) {
      return propValue;
    }

    return multiple
      ? ([] as unknown as Value<DefaultAutocompleteOption, Multiple>)
      : null;
  }
};

export default {
  argTypes: {
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
    search: {
      control: { type: "boolean" },
    },
  },
  component: Autocomplete,
  // (masoudmanson) For the purpose of storybook, the button is removed
  // from the Autocomplete component which may cause some accessibility
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
  title: "Dropdowns/Autocomplete",
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
};

// Test

const TestDemo = (props: Args): JSX.Element => {
  const { multiple, options = GITHUB_LABELS, search } = props;

  const [value, setValue] = useState<
    null | DefaultAutocompleteOption | DefaultAutocompleteOption[]
  >(multiple ? [] : null);

  const [pendingValue, setPendingValue] = useState<DefaultAutocompleteOption[]>(
    []
  );

  return (
    <RawAutocomplete
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
    _: React.ChangeEvent<unknown>,
    newValue: DefaultAutocompleteOption | DefaultAutocompleteOption[] | null
  ) {
    if (!multiple) {
      setValue(newValue as DefaultAutocompleteOption);
    }

    return setPendingValue(newValue as DefaultAutocompleteOption[]);
  }
};

export const Test = {
  args: {
    keepSearchOnSelect: false,
    multiple: true,
    search: true,
  },
  parameters: {
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo data-testid="autocomplete" {...args} />,
};
