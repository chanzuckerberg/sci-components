import { AutocompleteValue } from "@mui/base";
import React from "react";
import AutocompleteBase, {
  AutocompleteBaseProps,
  DefaultAutocompleteOption,
} from "../AutocompleteBase";
import AutocompleteMultiColumn from "../AutocompleteMultiColumn";
import { StyleProps } from "./style";

export type AutocompleSingleColumnOption<T> = T;

export type AutocompleteMultiColumnOption<
  T,
  Multiple extends boolean | undefined
> = {
  options: T[];
  props?: Partial<AutocompleteBaseProps<T, Multiple>>;
  style?: React.CSSProperties;
  value?: AutocompleteValue<T, Multiple, false, false>;
};
interface ExtraAutocompleteProps<T, Multiple extends boolean | undefined>
  extends StyleProps {
  options:
    | AutocompleSingleColumnOption<T>[]
    | AutocompleteMultiColumnOption<T, Multiple>[];
  columnWidth?: number;
}

export type AutocompleteProps<T, Multiple extends boolean | undefined> = Omit<
  AutocompleteBaseProps<T, Multiple>,
  "options"
> &
  ExtraAutocompleteProps<T, Multiple>;

const Autocomplete = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined
>(
  props: AutocompleteProps<T, Multiple>
): JSX.Element => {
  const { options, ...rest } = props;

  // Multi-column options
  if (Array.isArray(options) && options.length > 0 && "options" in options[0]) {
    return (
      <AutocompleteMultiColumn
        options={options as AutocompleteMultiColumnOption<T, Multiple>[]}
        {...rest}
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
