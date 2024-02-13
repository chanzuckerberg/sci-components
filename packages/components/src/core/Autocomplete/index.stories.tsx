import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteValue,
} from "@mui/base";
import { Args, Meta } from "@storybook/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { AUTOCOMPLETE_MULTI_COLUMN_OPTIONS } from "../../common/AUTOCOMPLETE_MULTI_COLUMN_OPTIONS";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "../../common/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import TagFilter from "../TagFilter";
import AutocompleteBase, {
  DefaultAutocompleteOption,
} from "./components/AutocompleteBase";
import RawAutocompleteMultiColumn from "./components/AutocompleteMultiColumn";
import RawAutocomplete, {
  AutocompleteMultiColumnValue,
  SDSAutocompleteValue,
} from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const groupByOptions = [
  undefined,
  (option: DefaultAutocompleteOption) => option.section as string,
];

const WRAPPER_STYLES = {
  margin: "16px 0 0 24px",
  width: 274,
};
const DIV_MARGIN = "10px 0 0 24px";
const LABEL = "Search by label";

const dataOptions = [
  AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
  [AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[0], AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[1]],
  [
    AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[0],
    AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[1],
    AUTOCOMPLETE_MULTI_COLUMN_OPTIONS[2],
  ],
];

const Autocomplete = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
>(
  props: Args
): JSX.Element => {
  const {
    label,
    multiple,
    options = AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
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
      <div style={WRAPPER_STYLES}>
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
      <div style={{ margin: DIV_MARGIN }}>
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
    setValue(newValue);
    const newSelection: string[] = [];

    if (
      (newValue as T)?.name ||
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
        labels: ["One Column", "Two Columns", "Three Columns"],
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
    badges: [BADGE.STABLE],
  },
  title: "Components/Dropdowns/Autocomplete",
} as Meta;

// Default

export const Default = {
  args: {
    groupBy: groupByOptions[1],
    keepSearchOnSelect: true,
    label: LABEL,
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

const AutocompleteSingleColumnDemo = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
>(
  props: Args
): JSX.Element => {
  type DisableClearable = false;
  type FreeSolo = false;

  const {
    label,
    multiple,
    options = AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
    search,
    value: propValue,
    keepSearchOnSelect,
  } = props;

  const isControlled = propValue !== undefined;
  const [value, setValue] = useState(getInitialValue());
  const [pendingValue, setPendingValue] = useState(getInitialValue());

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
    <>
      <div style={WRAPPER_STYLES}>
        <AutocompleteBase
          id="autocomplete-base-demo"
          disableCloseOnSelect={multiple}
          label={label}
          multiple={multiple}
          keepSearchOnSelect={keepSearchOnSelect}
          options={options}
          search={search}
          onChange={handleChange}
          value={multiple ? pendingValue : value}
          getOptionDisabled={(option: DefaultAutocompleteOption) => {
            return option.name === "Type: feature request";
          }}
          {...props}
        />
      </div>
      <div style={{ margin: DIV_MARGIN }}>
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

  function handleChange(
    _event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
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
      setPendingValue(
        newValue as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
      );

      const newSelection = [...selection];
      const deleteIndex = newSelection.indexOf(tag);
      newSelection.splice(deleteIndex, 1);
      setSelection(newSelection);
    } else {
      setValue(
        null as unknown as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >
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
      : (null as unknown as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >);
  }
};

export const SingleColumn = {
  args: {
    groupBy: groupByOptions[1],
    keepSearchOnSelect: false,
    label: LABEL,
    multiple: true,
    search: true,
  },
  parameters: {
    controls: {
      exclude: ["search", "options"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <AutocompleteSingleColumnDemo {...args} />,
};

// Multi Column Autocomplete

const AutocompleteMultiColumnDemo = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
>(
  props: Args
): JSX.Element => {
  const {
    multiple,
    options = AUTOCOMPLETE_MULTI_COLUMN_OPTIONS,
    search,
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
      <div style={WRAPPER_STYLES}>
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
      <div style={{ margin: DIV_MARGIN }}>
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

export const MultiColumn = {
  args: {
    groupBy: groupByOptions[1],
    keepSearchOnSelect: false,
    label: LABEL,
    multiple: true,
    search: true,
  },
  parameters: {
    controls: {
      exclude: ["search", "options", "groupBy"],
    },
    snapshot: {
      skip: true,
    },
  },
  render: (args: Args) => <AutocompleteMultiColumnDemo {...args} />,
};

// Test

const TestDemo = (props: Args): JSX.Element => {
  const {
    multiple,
    options = AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
    search,
  } = props;

  return (
    <div style={WRAPPER_STYLES}>
      <RawAutocomplete
        open
        search={search}
        label="Search"
        multiple={multiple}
        disableCloseOnSelect={multiple}
        options={options}
        groupBy={(option: DefaultAutocompleteOption) =>
          option.section as string
        }
        {...props}
      />
    </div>
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
