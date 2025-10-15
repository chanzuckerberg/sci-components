import { Args } from "@storybook/react-webpack5";
import { AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS } from "src/common/storybook/AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS";
import { DefaultAutocompleteOption } from "src/core/Autocomplete";
import RawComplexFilter from "src/core/ComplexFilter";

export const ComplexFilter = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: Args
): JSX.Element => {
  const {
    DropdownMenuProps = {},
    options = AUTOCOMPLETE_SINGLE_COLUMN_OPTIONS,
    ...rest
  } = props;

  return (
    <RawComplexFilter<T, Multiple, DisableClearable, FreeSolo>
      label="Click Target"
      options={options as T[]}
      DropdownMenuProps={{
        groupBy: (option: DefaultAutocompleteOption) =>
          option.section as string,
        ...DropdownMenuProps,
      }}
      onOpen={(event) => console.log("onOpen complex filter", event)}
      onClose={(_event, reason) =>
        console.log("onClose complex filter", reason)
      }
      buttons={false}
      {...rest}
    />
  );
};
