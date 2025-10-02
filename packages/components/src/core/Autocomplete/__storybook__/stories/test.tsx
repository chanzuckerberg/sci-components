import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import { AUTOCOMPLETE_WRAPPER_STYLES } from "../constants";
import { Args } from "@storybook/types";
import RawAutocomplete from "src/core/Autocomplete";

export const TestDemo = (props: Args): JSX.Element => {
  const {
    multiple,
    options = AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
    search,
  } = props;

  return (
    <div style={AUTOCOMPLETE_WRAPPER_STYLES}>
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
