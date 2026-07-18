import { AutocompleteValue } from "@mui/material/useAutocomplete";
import styled from "@emotion/styled";
import { Args } from "@storybook/react-vite";
import { useState } from "react";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "@components/src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { DefaultAutocompleteOption } from "@components/src/core/Autocomplete";
import Button from "@components/src/core/Button";
import RawDropdown from "@components/src/core/Dropdown";

export const ControlledDropdownDemo = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: Args
): JSX.Element => {
  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(
    [] as unknown as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  );

  const StyledButton = styled(Button)`
    &:focus {
      outline: none;
    }

    margin: 0 0 24px 0;
  `;

  return (
    <>
      <StyledButton
        onClick={handleClick}
        sdsStyle="minimal"
        sdsType="secondary"
      >
        Click here to select the first three options
      </StyledButton>
      <br />
      <RawDropdown<T, Multiple, DisableClearable, FreeSolo>
        label="Click Target"
        {...props}
        options={AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS as T[]}
        value={value}
        onChange={handleChange}
        data-testid="dropdown"
        DropdownMenuProps={{
          groupBy: (option: DefaultAutocompleteOption) =>
            option.section as string,
          title: "Github Labels",
          width: 300,
        }}
        multiple={true as Multiple}
      />
    </>
  );

  function handleClick() {
    setValue([
      ...AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS.slice(0, 3),
    ] as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>);
  }

  function handleChange(
    event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ) {
    setValue(newValue);
  }
};
