import { AutocompleteValue } from "@mui/material/useAutocomplete";
import React, { ReactNode, useCallback, useState } from "react";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import Dropdown, {
  DropdownProps,
  DropdownInputDropdown,
  DropdownPopper,
} from "src/core/Dropdown";
import { InputDropdownProps as InputDropdownPropsType } from "src/core/InputDropdown";
import Chips from "./components/Chips";
import { StyledChipsWrapper, Wrapper } from "./style";

export {
  DropdownInputDropdown as ComplexFilterInputDropdown,
  DropdownPopper as ComplexFilterPopper,
};

// Helper function to remove item from array
const removeItemFromArray = <T extends DefaultAutocompleteOption>(
  arr: T[],
  tag: string
): boolean => {
  const index = arr.findIndex((item: T) => item.name === tag);
  if (index > -1) {
    arr.splice(index, 1);
    return true;
  }
  return false;
};

// Helper functions for chip deletion
const checkIfSingleColumn = <T extends DefaultAutocompleteOption>(
  checkValue: unknown
): boolean => {
  return ((checkValue && (checkValue as T).name) ||
    (Array.isArray(checkValue) &&
      checkValue.length > 0 &&
      (checkValue as T[])[0].name)) as boolean;
};

export interface ComplexFilterProps<
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends Omit<
    DropdownProps<T, Multiple, DisableClearable, FreeSolo>,
    "onChange" | "label"
  > {
  label: ReactNode;
  onChange?: (
    options: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) => void;
  InputDropdownProps?: Partial<InputDropdownPropsType>;
}

const ComplexFilter = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  label = "",
  multiple = false as Multiple,
  search = false,
  onChange: userOnChange,
  InputDropdownProps = { sdsStyle: "minimal" },
  value: propValue,
  options,
  ...rest
}: ComplexFilterProps<
  T,
  Multiple,
  DisableClearable,
  FreeSolo
>): JSX.Element => {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(
    (multiple ? [] : null) as AutocompleteValue<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >
  );

  // Determine if component is controlled
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : internalValue;

  // Reset value when multiple or options change (for uncontrolled mode)
  React.useEffect(() => {
    if (!isControlled) {
      const resetValue = (multiple ? [] : null) as AutocompleteValue<
        T,
        Multiple,
        DisableClearable,
        FreeSolo
      >;
      setInternalValue(resetValue);
    }
  }, [multiple, options, isControlled]);

  // Handle internal Dropdown onChange
  const handleDropdownChange = useCallback(
    (
      _event: React.SyntheticEvent,
      newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    ) => {
      // Update internal state for uncontrolled mode
      if (!isControlled) {
        setInternalValue(newValue);
      }
      // Always call user's onChange if provided
      if (userOnChange) {
        userOnChange(newValue);
      }
    },
    [isControlled, userOnChange]
  );

  // Helper function to update state
  const updateStateAndNotify = useCallback(
    (
      updatedValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    ) => {
      if (!isControlled) {
        setInternalValue(updatedValue);
      }
      if (userOnChange) {
        userOnChange(updatedValue);
      }
    },
    [isControlled, userOnChange]
  );

  const handleSingleColumnDelete = useCallback(
    (
      tag: string,
      currentValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    ) => {
      if (multiple && Array.isArray(currentValue)) {
        const index = currentValue?.findIndex(
          (item) => (item as T).name === tag
        );
        if (index > -1) {
          const newValue = [...currentValue];
          newValue.splice(index, 1);
          const updatedValue = newValue as AutocompleteValue<
            T,
            Multiple,
            DisableClearable,
            FreeSolo
          >;
          updateStateAndNotify(updatedValue);
        }
      } else {
        // Single selection - clear the value
        const updatedValue = null as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >;
        updateStateAndNotify(updatedValue);
      }
    },
    [multiple, updateStateAndNotify]
  );

  const handleMultipleMultiColumnDelete = useCallback(
    (
      tag: string,
      currentValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    ) => {
      if (
        !currentValue ||
        typeof currentValue !== "object" ||
        Array.isArray(currentValue)
      ) {
        return;
      }

      const newValue = { ...(currentValue as unknown as Record<string, T[]>) };
      let found = false;

      Object.entries(newValue).forEach(([key, values]) => {
        if (Array.isArray(values)) {
          const newArray = [...values];
          if (removeItemFromArray(newArray, tag)) {
            newValue[key] = newArray;
            found = true;
          }
        }
      });

      if (found) {
        updateStateAndNotify(
          newValue as unknown as AutocompleteValue<
            T,
            Multiple,
            DisableClearable,
            FreeSolo
          >
        );
      }
    },
    [updateStateAndNotify]
  );

  const handleSingleMultiColumnDelete = useCallback(
    (
      tag: string,
      currentValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    ) => {
      if (!currentValue || typeof currentValue !== "object") return;

      const newValue = {} as Record<string, T>;

      // Copy all existing values first
      if (
        currentValue &&
        typeof currentValue === "object" &&
        !Array.isArray(currentValue)
      ) {
        Object.assign(newValue, currentValue);
      }

      Object.entries(
        currentValue as unknown as Record<string, unknown>
      ).forEach(([key, val]) => {
        if (
          val &&
          typeof val === "object" &&
          "name" in val &&
          (val as T).name === tag
        ) {
          delete newValue[key];
        }
      });

      const updatedValue = newValue as unknown as AutocompleteValue<
        T,
        Multiple,
        DisableClearable,
        FreeSolo
      >;
      updateStateAndNotify(updatedValue);
    },
    [updateStateAndNotify]
  );

  const handleMultiColumnDelete = useCallback(
    (
      tag: string,
      currentValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    ) => {
      if (!currentValue || typeof currentValue !== "object") return;

      if (multiple) {
        handleMultipleMultiColumnDelete(tag, currentValue);
      } else {
        handleSingleMultiColumnDelete(tag, currentValue);
      }
    },
    [multiple, handleMultipleMultiColumnDelete, handleSingleMultiColumnDelete]
  );

  // Handle chip deletion
  const handleDelete = useCallback(
    (tag: string) => {
      if (!value) return;

      const isSingleColumn = checkIfSingleColumn(value);

      if (isSingleColumn) {
        handleSingleColumnDelete(tag, value);
      } else {
        handleMultiColumnDelete(tag, value);
      }
    },
    [value, handleSingleColumnDelete, handleMultiColumnDelete]
  );

  return (
    <Wrapper>
      <Dropdown<T, Multiple, DisableClearable, FreeSolo>
        label={label}
        multiple={multiple}
        search={search}
        value={value}
        onChange={handleDropdownChange}
        options={options}
        InputDropdownProps={{
          ...InputDropdownProps,
        }}
        buttons
        {...rest}
      />

      <StyledChipsWrapper>
        <Chips<T, Multiple, DisableClearable, FreeSolo>
          value={value}
          multiple={multiple}
          onDelete={handleDelete}
        />
      </StyledChipsWrapper>
    </Wrapper>
  );
};

export default ComplexFilter;
