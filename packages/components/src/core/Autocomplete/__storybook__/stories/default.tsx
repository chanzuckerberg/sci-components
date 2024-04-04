import { Args } from "@storybook/react";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { SyntheticEvent, useEffect, useState } from "react";
import RawAutocomplete, {
  AutocompleteMultiColumnValue,
  SDSAutocompleteValue,
} from "src/core/Autocomplete";
import TagFilter from "src/core/TagFilter";
import { AutocompleteValue } from "@mui/base";
import {
  AUTOCOMPLETE_DIV_MARGIN,
  AUTOCOMPLETE_WRAPPER_STYLES,
} from "../constants";

export const Autocomplete = <
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
      <div style={AUTOCOMPLETE_WRAPPER_STYLES}>
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
      <div style={{ margin: AUTOCOMPLETE_DIV_MARGIN }}>
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
