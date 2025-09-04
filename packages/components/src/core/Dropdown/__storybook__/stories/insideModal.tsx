import { Args } from "@storybook/react-webpack5";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { DefaultAutocompleteOption } from "src/core/Autocomplete";
import Dialog from "src/core/Dialog";
import { Dropdown } from "./default";
import { Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)`
  width: 300px;
  max-width: unset !important;
  padding: 50px;
`;

export function InsideModalDemo<
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(props: Args): JSX.Element {
  return (
    <Dialog open disableEnforceFocus PaperComponent={StyledPaper}>
      <Dropdown<T, Multiple, DisableClearable, FreeSolo>
        label="Dropdown"
        options={AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS as T[]}
        multiple
        InputDropdownProps={{ sdsStyle: "square" }}
        {...props}
      />
    </Dialog>
  );
}
