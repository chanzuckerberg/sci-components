import { AutocompleteChangeReason, AutocompleteValue } from "@mui/base";
import AutocompleteBase, {
  DefaultAutocompleteOption,
} from "src/core/Autocomplete/components/AutocompleteBase";
import { Args } from "@storybook/react";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { useEffect, useState } from "react";
import {
  AUTOCOMPLETE_DIV_MARGIN,
  AUTOCOMPLETE_WRAPPER_STYLES,
} from "../constants";
import TagFilter from "src/core/TagFilter";

export const AutocompleteSingleColumnDemo = <
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
      <div style={AUTOCOMPLETE_WRAPPER_STYLES}>
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
