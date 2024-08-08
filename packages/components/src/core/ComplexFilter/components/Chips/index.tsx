"use client";

import { AutocompleteValue } from "@mui/base";
import { DefaultAutocompleteOption } from "src/core/Autocomplete/components/AutocompleteBase";
import TagFilter from "src/core/TagFilter";

interface Props<
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> {
  value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;
  multiple?: boolean;
  onDelete: (option: DefaultAutocompleteOption) => void;
}

const Chips = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  value,
  multiple = false,
  onDelete,
}: Props<T, Multiple, DisableClearable, FreeSolo>): JSX.Element | null => {
  if (!value) return null;

  if (!multiple) {
    const { name } = value as never;

    return (
      <TagFilter
        label={name}
        onDelete={onDelete}
        onClick={() => onDelete(name)}
      />
    );
  }

  return (
    <>
      {(value as DefaultAutocompleteOption[]).map((item) => {
        const { name } = item;

        return (
          <TagFilter
            key={name}
            label={name}
            onDelete={() => onDelete(item)}
            onClick={() => onDelete(item)}
          />
        );
      })}
    </>
  );
};

export default Chips;
