import {
  Autocomplete,
  AutocompleteProps,
  DefaultAutocompleteOption,
} from "@czi-sds/components";
import { noop } from "src/common/utils";

const OPTIONS = [
  {
    color: "#7057ff",
    description: "Good for newcomers",
    name: "good first issue",
  },
  {
    color: "#008672",
    description: "Extra attention is needed",
    name: "help wanted",
  },
];

const AutocompleteNameSpaceTest = (
  props: AutocompleteProps<
    DefaultAutocompleteOption,
    true,
    undefined,
    undefined
  >
) => {
  return (
    <Autocomplete
      disableCloseOnSelect={false}
      id="1"
      onChange={noop}
      options={OPTIONS}
      label="Dropdown Menu Title"
    />
  );
};
