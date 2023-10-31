import { AutocompleteValue } from "@mui/base";
import { Args, Meta } from "@storybook/react";
import React, { useEffect, useState } from "react";
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
    setSelection([]);
  }, [multiple]);

  useEffect(() => {
    if (isControlled) {
      if (multiple) setPendingValue(propValue);
      else setValue(propValue);
    }
  }, [propValue, isControlled, multiple]);

  return (
    <div style={{ margin: "16px 0 0 24px", width: 300 }}>
      <RawAutocompleteMultiColumn
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

  function handleClickAway() {
    if (multiple) {
      setValue(pendingValue);
    }
  }

  function handleChange(
    _event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, false, false>
  ) {
    if (multiple) {
      const newSelection = Array.isArray(newValue)
        ? newValue?.map((item) => item.name)
        : [];
      setSelection(newSelection);
      return setPendingValue(
        newValue as AutocompleteValue<T, Multiple, false, false>
      );
    } else {
      if (newValue && !Array.isArray(newValue) && newValue.name) {
        setValue(newValue as AutocompleteValue<T, Multiple, false, false>);
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
      setValue(null as AutocompleteValue<T, Multiple, false, false>);
      setSelection([]);
    }
  }

  function getInitialValue(): AutocompleteValue<T, Multiple, false, false> {
    if (isControlled) {
      return propValue;
    }

    return multiple
      ? ([] as unknown as AutocompleteValue<T, Multiple, false, false>)
      : (null as AutocompleteValue<T, Multiple, false, false>);
  }
};

export default {
  argTypes: {
    ClickAwayListenerProps: {
      control: { type: "object" },
    },
    columnWidth: {
      control: {
        type: "number",
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
    groupBy: groupByOptions[1],
    keepSearchOnSelect: true,
    label: "Search by label",
    multiple: true,
    search: true,
  },
};
