import { Args } from "@storybook/types";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { useState } from "react";
import RawAutocomplete from "src/core/Autocomplete";
import { AUTOCOMPLETE_WRAPPER_STYLES } from "../constants";

export const ControlledOpenDemo = <T extends DefaultAutocompleteOption>(
  props: Args
): JSX.Element => {
  const {
    label,
    multiple,
    options = AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
  } = props;

  const [open, setOpen] = useState(true);

  return (
    <div style={AUTOCOMPLETE_WRAPPER_STYLES}>
      <RawAutocomplete
        onClickAway={() => {
          setOpen(false);
        }}
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            setOpen(true);
          }
        }}
        open={open}
        id="autocomplete-demo"
        disableCloseOnSelect={multiple}
        label={label}
        multiple={multiple}
        options={options}
        getOptionDisabled={(option: T) => {
          return option.name === "Type: feature request";
        }}
        {...props}
      />
    </div>
  );
};
