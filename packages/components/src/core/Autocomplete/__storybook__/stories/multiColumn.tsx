import { Args } from "@storybook/react";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import { AUTOCOMPLETE_MULTI_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_MULTI_COLUMN_OPTIONS";
import { useEffect, useState } from "react";
import { AutocompleteMultiColumnValue } from "src/core/Autocomplete";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteValue,
} from "@mui/base";
import {
  AUTOCOMPLETE_DIV_MARGIN,
  AUTOCOMPLETE_WRAPPER_STYLES,
} from "../constants";
import TagFilter from "src/core/TagFilter";
import RawAutocompleteMultiColumn from "src/core/Autocomplete/components/AutocompleteMultiColumn";

export const AutocompleteMultiColumnDemo = <
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
      <div style={AUTOCOMPLETE_WRAPPER_STYLES}>
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
