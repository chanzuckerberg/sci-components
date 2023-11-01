import { AutocompleteValue } from "@mui/base";
import React from "react";
import AutocompleteBase, {
  AutocompleteBaseProps,
  DefaultAutocompleteOption,
} from "../AutocompleteBase";
import AutocompleteMultiColumn from "../AutocompleteMultiColumn";
import { IconNameToSizes } from "../Icon";
import { StyleProps } from "./style";

export type AutocompleSingleColumnOption<T> = T;

export type AutocompleteMultiColumnOption<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = {
  options: T[];
  props?: Partial<
    AutocompleteBaseProps<T, Multiple, DisableClearable, FreeSolo>
  >;
  style?: React.CSSProperties;
  value?: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;
  columnWidth?: number;
  columnName?: string;
  sdsIcon?: keyof IconNameToSizes;
};
interface ExtraAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends StyleProps {
  options:
    | AutocompleSingleColumnOption<T>[]
    | AutocompleteMultiColumnOption<T, Multiple, DisableClearable, FreeSolo>[];
}

export type AutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = Omit<
  AutocompleteBaseProps<T, Multiple, DisableClearable, FreeSolo>,
  "options"
> &
  ExtraAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>;

const Autocomplete = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
  const { options, ...rest } = props;

  // Multi-column options
  if (Array.isArray(options) && options.length > 0 && "options" in options[0]) {
    return (
      <AutocompleteMultiColumn
        options={
          options as AutocompleteMultiColumnOption<
            T,
            Multiple,
            DisableClearable,
            FreeSolo
          >[]
        }
        {...rest}
        PopperComponent={undefined}
        open
      />
    );
  } else {
    return (
      <AutocompleteBase
        options={options as AutocompleSingleColumnOption<T>[]}
        {...rest}
      />
    );
  }
};

export default Autocomplete;
