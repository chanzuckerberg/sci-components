import { AutocompleteValue } from "@mui/material";
import { Args } from "@storybook/react-webpack5";
import { useEffect, useState } from "react";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import RawDropdown from "src/core/Dropdown";

export const Dropdown = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: Args
): JSX.Element => {
  const {
    multiple,
    options = AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
    DropdownMenuProps,
    ...rest
  } = props;
  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(
    (multiple ? [] : null) as AutocompleteValue<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >
  );

  // Reset value when multiple or options props change
  useEffect(() => {
    const initialValue = (multiple ? [] : null) as AutocompleteValue<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >;
    setValue(initialValue);
  }, [multiple, options]);

  return (
    <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
      label="Click Target"
      onChange={handleChange}
      value={value}
      options={options}
      search={false}
      multiple={multiple}
      DropdownMenuProps={{
        groupBy: (option: T) => option.section as string,
        width: 300,
        ...DropdownMenuProps,
      }}
      {...rest}
    />
  );

  function handleChange(
    _event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    setValue(newValue);
    console.log("Dropdown Value:", newValue);
  }
};
