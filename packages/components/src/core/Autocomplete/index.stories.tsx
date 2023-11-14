import { AutocompleteValue } from "@mui/base";
import { Args, Meta } from "@storybook/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { DefaultAutocompleteOption } from "../AutocompleteBase";
import { GITHUB_LABELS } from "../DropdownMenu/GITHUB_LABELS";
import { GITHUB_LABELS_MULTI_COLUMN } from "../DropdownMenu/GITHUB_LABELS_MULTI_COLUMN";
import TagFilter from "../TagFilter";
import RawAutocomplete, {
  AutocompleteMultiColumnValue,
  SDSAutocompleteValue,
} from "./index";

const groupByOptions = [
  undefined,
  (option: DefaultAutocompleteOption) => option.section as string,
];

const dataOptions = [GITHUB_LABELS, GITHUB_LABELS_MULTI_COLUMN];

const Autocomplete = <
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

  type DisableClearable = false;
  type FreeSolo = false;

  const isControlled = propValue !== undefined;
  const [value, setValue] = useState<
    SDSAutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(
    (multiple ? [] : null) as SDSAutocompleteValue<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >
  );

  const [selection, setSelection] = useState<string[]>([]);

  useEffect(() => {
    if (isControlled) {
      setValue(propValue);
    }
  }, [isControlled, propValue]);

  useEffect(() => {
    setSelection([]);
    setValue(
      (multiple ? [] : null) as SDSAutocompleteValue<
        T,
        Multiple,
        DisableClearable,
        FreeSolo
      >
    );
  }, [multiple, options]);

  return (
    <>
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
          value={value}
          getOptionDisabled={(option: T) => {
            return option.name === "Type: feature request";
          }}
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

  // eslint-disable-next-line sonarjs/cognitive-complexity
  function handleChange(
    _: SyntheticEvent<Element, Event>,
    newValue: SDSAutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    console.log(newValue);

    setValue(newValue);
    const newSelection: string[] = [];

    if (
      (newValue && (newValue as T).name) ||
      (Array.isArray(newValue) && (newValue as T[])[0].name)
    ) {
      if (multiple) {
        setSelection(
          Array.isArray(newValue) ? newValue?.map((item) => item.name) : []
        );
      } else {
        if (newValue && !Array.isArray(newValue) && newValue.name) {
          setSelection([(newValue as T).name]);
        }
      }
    } else {
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
    }
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  function handleTagDeleteMultiColumn(tag: string) {
    if (multiple) {
      if (value) {
        Object.entries(value).forEach(([key, values]) => {
          const index = (values as T[])?.findIndex(
            (item: T) => item.name === tag
          );
          if (index > -1) {
            const newValue = [...(values as T[])];
            newValue.splice(index, 1);
            setValue((prev) => {
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
      if (value) {
        Object.entries(value).forEach(([key, val]) => {
          if ((val as T).name === tag) {
            const finalValue = { ...value } as AutocompleteMultiColumnValue<
              T,
              Multiple,
              DisableClearable,
              FreeSolo
            >;
            if (finalValue) delete finalValue[key];
            setValue(finalValue);

            const newSelection = [...selection];
            const deleteIndex = newSelection.indexOf(tag);
            newSelection.splice(deleteIndex, 1);
            setSelection(newSelection);
          }
        });
      }
    }
  }

  function handleTagDelete(tag: string) {
    if (
      (value && (value as T).name) ||
      (Array.isArray(value) && (value as T[])[0].name)
    ) {
      if (multiple && Array.isArray(value)) {
        const index = value?.findIndex((item) => item.name === tag);
        const newValue = [...value];
        newValue.splice(index, 1);
        setValue(
          newValue as SDSAutocompleteValue<
            T,
            Multiple,
            DisableClearable,
            FreeSolo
          >
        );

        const newSelection = [...selection];
        const deleteIndex = newSelection.indexOf(tag);
        newSelection.splice(deleteIndex, 1);
        setSelection(newSelection);
      } else {
        setValue(
          null as SDSAutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
        );
        setSelection([]);
      }
    } else {
      handleTagDeleteMultiColumn(tag);
    }
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
    options: {
      control: {
        labels: ["Single Column Autocomplete", "Multi Column Autocomplete"],
        type: "select",
      },
      mapping: dataOptions,
      options: Object.keys(dataOptions),
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
  parameters: {
    controls: {
      exclude: ["search"],
    },
  },
};

// Test

const TestDemo = (props: Args): JSX.Element => {
  const { multiple, options = GITHUB_LABELS, search } = props;

  return (
    <RawAutocomplete
      open
      search={search}
      label="Search"
      multiple={multiple}
      disableCloseOnSelect={multiple}
      options={options}
      groupBy={(option: DefaultAutocompleteOption) => option.section as string}
      {...props}
    />
  );
};

export const Test = {
  args: {
    keepSearchOnSelect: false,
    multiple: true,
    search: true,
  },
  parameters: {
    controls: {
      exclude: [
        "search",
        "keepSearchOnSelect",
        "multiple",
        "blurOnSelect",
        "clearOnBlur",
        "groupBy",
        "label",
        "options",
      ],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => (
    <TestDemo data-testid="autocomplete-base" {...args} />
  ),
};
