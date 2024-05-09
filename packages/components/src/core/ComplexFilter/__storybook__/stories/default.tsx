import { Args } from "@storybook/react";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { noop } from "src/common/utils";
import { DefaultAutocompleteOption } from "src/core/Autocomplete";
import RawComplexFilter from "src/core/ComplexFilter";

export const ComplexFilter = <T extends DefaultAutocompleteOption>(
  props: Args
): JSX.Element => {
  return (
    <RawComplexFilter
      label="Click Target"
      onChange={noop}
      options={AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS as T[]}
      DropdownMenuProps={{
        groupBy: (option: DefaultAutocompleteOption) =>
          option.section as string,
        width: 400,
      }}
      {...props}
    />
  );
};
