import { Args } from "@storybook/react-vite";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "@components/src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { noop } from "@components/src/common/utils";
import { DefaultAutocompleteOption } from "@components/src/core/Autocomplete";
import RawDropdown from "@components/src/core/Dropdown";

export const TestDemo = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: Args
): JSX.Element => {
  return (
    <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
      data-testid="dropdown"
      label="Click Target"
      onChange={noop}
      options={AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS as T[]}
      DropdownMenuProps={{
        width: 300,
      }}
      {...props}
    />
  );
};
