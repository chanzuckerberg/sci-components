import {
  AutocompleteMultiColumn,
  AutocompleteMultiColumnProps,
} from "@czi-sds/components";
import { noop } from "src/common/utils";
import { DefaultDropdownMenuOption } from "../DropdownMenu";

const OPTIONS = [
  {
    columnName: "columnOne",
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
    columnName: "columnTwo",
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

const AutocompleteNameSpaceTest = <
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: AutocompleteMultiColumnProps<T, Multiple, DisableClearable, FreeSolo>
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
