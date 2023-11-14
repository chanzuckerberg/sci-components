import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteValue,
} from "@mui/base";
import { Args, Meta } from "@storybook/react";
import { useEffect, useState } from "react";
import { AutocompleteMultiColumnValue } from "../Autocomplete";
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
    // value: propValue,
    label,
  } = props;

  type DisableClearable = false;
  type FreeSolo = false;

  const [selection, setSelection] = useState<string[]>([]);

  const [theValue, setTheValue] =
    useState<
      AutocompleteMultiColumnValue<T, Multiple, DisableClearable, FreeSolo>
    >();

  useEffect(() => {
    setSelection([]);
  }, [multiple]);

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: AutocompleteMultiColumnValue<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<T>
  ) => {
    setTheValue(newValue);
    const newSelection: string[] = [];

    if (multiple) {
      if (newValue) {
        Object.values(newValue).forEach((items) => {
          (items as T[])?.map(({ name }: { name: string }) => {
            newSelection.push(name);
          });
        });
        setSelection(newSelection);
      }
    } else {
      if (newValue) {
        Object.values(newValue).forEach((item) => {
          newSelection.push((item as T).name);
        });
      }
      setSelection(newSelection);
    }
  };

  return (
    <>
      <div style={{ margin: "16px 0 0 24px", width: 300 }}>
        <RawAutocompleteMultiColumn<T, Multiple, DisableClearable, FreeSolo>
          label={label}
          disableCloseOnSelect={false}
          multiple={multiple}
          onChange={handleChange}
          options={options}
          search={search}
          value={theValue}
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

  function handleTagDelete(tag: string) {
    if (multiple) {
      if (theValue) {
        Object.entries(theValue).forEach(([key, values]) => {
          const index = (values as T[])?.findIndex(
            (item: T) => item.name === tag
          );
          if (index > -1) {
            const newValue = [...(values as T[])];
            newValue.splice(index, 1);
            setTheValue((prev) => {
              return {
                ...prev,
                [key]: newValue as AutocompleteValue<
                  T,
                  Multiple,
                  DisableClearable,
                  FreeSolo
                >,
              };
            });

            const newSelection = [...selection];
            const deleteIndex = newSelection.indexOf(tag);
            newSelection.splice(deleteIndex, 1);
            setSelection(newSelection);
          }
        });
      }
    } else {
      if (theValue) {
        Object.entries(theValue).forEach(([key, value]) => {
          if ((value as T).name === tag) {
            const finalValue = { ...theValue };
            delete finalValue[key];
            setTheValue(finalValue);

            const newSelection = [...selection];
            const deleteIndex = newSelection.indexOf(tag);
            newSelection.splice(deleteIndex, 1);
            setSelection(newSelection);
          }
        });
      }
    }
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
    controls: {
      exclude: ["search"],
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

  const [value, setValue] =
    useState<
      AutocompleteMultiColumnValue<T, Multiple, DisableClearable, FreeSolo>
    >();

  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: AutocompleteMultiColumnValue<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<T>
  ) => {
    setValue(newValue);
  };

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
        options={options}
        search={search}
        value={value}
        {...props}
      />
    </div>
  );
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
      exclude: [
        "keepSearchOnSelect",
        "ClickAwayListenerProps",
        "search",
        "multiple",
        "label",
        "groupBy",
        "open",
      ],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <TestDemo {...args} />,
};
