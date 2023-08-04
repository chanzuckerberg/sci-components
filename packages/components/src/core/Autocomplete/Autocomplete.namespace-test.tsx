import { noop } from "src/common/utils";
import Autocomplete, { DefaultAutocompleteOption, SdsAutocomplete } from ".";

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
  props: SdsAutocomplete<DefaultAutocompleteOption, true, undefined, undefined>
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
