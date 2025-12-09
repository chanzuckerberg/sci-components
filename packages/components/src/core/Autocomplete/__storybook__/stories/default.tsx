import { Args } from "@storybook/react-webpack5";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import RawAutocomplete from "src/core/Autocomplete";
import { AUTOCOMPLETE_WRAPPER_STYLES } from "../constants";

export const Autocomplete = <T extends DefaultAutocompleteOption>(
  props: Args
): JSX.Element => {
  const {
    label,
    multiple,
    options = AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
    search,
    keepSearchOnSelect,
  } = props;

  return (
    <div style={AUTOCOMPLETE_WRAPPER_STYLES}>
      <RawAutocomplete
        id="autocomplete-demo"
        disableCloseOnSelect={multiple}
        label={label}
        multiple={multiple}
        keepSearchOnSelect={keepSearchOnSelect}
        options={options}
        search={search}
        getOptionDisabled={(option: T) => {
          return !!option.disabled;
        }}
        {...props}
      />
    </div>
  );
};
