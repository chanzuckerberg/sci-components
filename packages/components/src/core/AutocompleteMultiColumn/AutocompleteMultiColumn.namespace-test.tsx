import {
  AutocompleteMultiColumn,
  AutocompleteMultiColumnProps,
  DefaultAutocompleteOption,
} from "@czi-sds/components";
import { noop } from "src/common/utils";

const OPTIONS = [
  {
    options: [
      {
        description: "Good for newcomers",
        name: "good first issue",
      },
      {
        description: "Extra attention is needed",
        name: "help wanted",
      },
    ],
  },
  {
    options: [
      {
        description: "needs to be fixed",
        name: "bug",
      },
      {
        description: "needs to be implemented",
        name: "feature",
      },
    ],
  },
];

const AutocompleteNameSpaceTest = (
  props: AutocompleteMultiColumnProps<
    DefaultAutocompleteOption,
    true,
    false,
    false
  >
) => {
  return (
    <AutocompleteMultiColumn
      disableCloseOnSelect={false}
      id="1"
      onChange={noop}
      options={OPTIONS}
      label="Dropdown Menu Title"
    />
  );
};
