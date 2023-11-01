import { AutocompleteValue } from "@mui/base";
import { Args, Meta } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { noop } from "src/common/utils";
import { DefaultDropdownMenuOption } from "../DropdownMenu";
import { GITHUB_LABELS_MULTI_COLUMN } from "../DropdownMenu/GITHUB_LABELS_MULTI_COLUMN";
import TagFilter from "../TagFilter";
import RawAutocompleteMultiColumn from "./index";

const groupByOptions = [
  undefined,
  (option: DefaultDropdownMenuOption) => option.section as string,
];

const AutocompleteMultiColumn = <
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined
>(
  props: Args
): JSX.Element => {
  const {
    multiple,
    options = GITHUB_LABELS_MULTI_COLUMN,
    search,
    value: propValue,
    label,
  } = props;

  type DisableClearable = false;
  type FreeSolo = false;

  const isControlled = propValue !== undefined;
  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue());
  const [pendingValue, setPendingValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue());
  const [selection, setSelection] = useState<string[]>([]);

  useEffect(() => {
    setSelection([]);
  }, [multiple]);

  useEffect(() => {
    if (isControlled) {
      if (multiple) setPendingValue(propValue);
      else setValue(propValue);
    }
  }, [propValue, isControlled, multiple]);

  return (
    <>
      <div style={{ margin: "16px 0 0 24px", width: 300 }}>
        <RawAutocompleteMultiColumn<T, Multiple, DisableClearable, FreeSolo>
          label={label}
          disableCloseOnSelect={false}
          multiple={multiple}
          onChange={handleChange}
          onClickAway={handleClickAway}
          open
          options={options}
          search={search}
          value={multiple ? pendingValue : value}
          {...props}
        />
      </div>
      <div style={{ margin: "10px 0 0 24px" }}>
        {selection.length
          ? selection.map((item) => {
              return (
                <TagFilter
                  key={item}
                  label={item}
                  onDelete={() => handleTagDelete(item)}
                  onClick={() => handleTagDelete(item)}
                />
              );
            })
          : null}
      </div>
    </>
  );

  function handleClickAway() {
    if (multiple) {
      setValue(pendingValue);
    }
  }

  function handleChange(
    _event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    if (multiple) {
      const newSelection = Array.isArray(newValue)
        ? newValue?.map((item) => item.name)
        : [];
      setSelection(newSelection);
      return setPendingValue(
        newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
      );
    } else {
      if (newValue && !Array.isArray(newValue) && newValue.name) {
        setValue(
          newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
        );
        setSelection([newValue.name]);
      }
    }
  }

  function handleTagDelete(tag: string) {
    if (multiple && Array.isArray(pendingValue)) {
      const index = pendingValue?.findIndex((item) => item.name === tag);
      const newValue = [...pendingValue];
      newValue.splice(index, 1);
      setPendingValue(
        newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
      );

      const newSelection = [...selection];
      const deleteIndex = newSelection.indexOf(tag);
      newSelection.splice(deleteIndex, 1);
      setSelection(newSelection);
    } else {
      setValue(
        null as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
      );
      setSelection([]);
    }
  }

  function getInitialValue(): AutocompleteValue<
    T,
    Multiple,
    DisableClearable,
    FreeSolo
  > {
    if (isControlled) {
      return propValue;
    }

    return multiple
      ? ([] as unknown as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >)
      : (null as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>);
  }
};

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
      mapping: groupByOptions,
      options: Object.keys(groupByOptions),
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
  },
  component: AutocompleteMultiColumn,
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
  },
  title: "Dropdowns/AutocompleteMultiColumn",
} as Meta;

// Default

export const Default = {
  args: {
    groupBy: groupByOptions[0],
    keepSearchOnSelect: true,
    label: "Search by label",
    multiple: true,
    search: true,
  },
};

const TestDemo = <
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined
>(
  props: Args
): JSX.Element => {
  const {
    multiple,
    options = GITHUB_LABELS_MULTI_COLUMN,
    search,
    label,
  } = props;

  type DisableClearable = false;
  type FreeSolo = false;

  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue());
  const [pendingValue, setPendingValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue());

  return (
    <div
      style={{ margin: "16px 0 0 24px", width: 300 }}
      data-testid="autocomplete-multi-column"
    >
      <RawAutocompleteMultiColumn<T, Multiple, DisableClearable, FreeSolo>
        label={label}
        disableCloseOnSelect={false}
        multiple={multiple}
        onChange={handleChange}
        onClickAway={noop}
        open
        options={options}
        search={search}
        value={multiple ? pendingValue : value}
        {...props}
      />
    </div>
  );

  function handleChange(
    _event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    if (multiple) {
      return setPendingValue(
        newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
      );
    } else {
      if (newValue && !Array.isArray(newValue) && newValue.name) {
        setValue(
          newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
        );
      }
    }
  }

  function getInitialValue(): AutocompleteValue<
    T,
    Multiple,
    DisableClearable,
    FreeSolo
  > {
    return multiple
      ? ([] as unknown as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >)
      : (null as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>);
  }
};

export const Test = {
  args: {
    keepSearchOnSelect: false,
    multiple: true,
    open: true,
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
  render: (args: Args) => <TestDemo {...args} />,
};
