import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteValue,
} from "@mui/base";
import { useCallback, useEffect, useState } from "react";
import { AutocompleteMultiColumnOption } from "src/core/Autocomplete";
import AutocompleteBase, {
  AutocompleteBaseProps,
  DefaultAutocompleteOption,
} from "../AutocompleteBase";
import { StyledColumn, StyledColumnTitle } from "./style";

interface ExtraAutocompleteGroupProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> {
  autocompleteProps: AutocompleteMultiColumnOption<
    T,
    Multiple,
    DisableClearable,
    FreeSolo
  >;
  onValueChange: (
    column: string,
    event: React.SyntheticEvent,
    value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>
  ) => void;
  value?: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;
  popperOpen?: boolean;
}

type CustomAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = Omit<
  AutocompleteBaseProps<T, Multiple, DisableClearable, FreeSolo>,
  | "renderInput"
  | "options"
  | "value"
  | "onChange"
  | "nonce"
  | "rev"
  | "rel"
  | "autoFocus"
  | "content"
>;

export type AutocompleteGroupProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraAutocompleteGroupProps<T, Multiple, DisableClearable, FreeSolo>;

const AutocompleteGroup = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: AutocompleteGroupProps<T, Multiple, DisableClearable, FreeSolo>
) => {
  const {
    autocompleteProps,
    onValueChange,
    value: propValue,
    multiple,
    label,
    InputBaseProps,
    popperOpen,
    inputValue,
    PaperComponent,
    ...rest
  } = props;

  const { name, width, props: propProps } = autocompleteProps;

  const [value, setValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue(multiple, propValue));
  const [pendingValue, setPendingValue] = useState<
    AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  >(getInitialValue(multiple, propValue));

  useEffect(() => {
    if (propValue !== undefined) {
      setValue(propValue);
    }
  }, [propValue]);

  const handleChange = useCallback(
    (
      event: React.SyntheticEvent,
      newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<T>
    ) => {
      propProps?.onChange?.(event, newValue, reason, details);
      onValueChange(name, event, newValue, reason, details);

      if (multiple) {
        setPendingValue(newValue);
      } else {
        if (
          newValue &&
          !Array.isArray(newValue) &&
          Object.prototype.hasOwnProperty.call(newValue, "name")
        ) {
          setValue(newValue);
        }
      }
    },
    [name, multiple, onValueChange, propProps]
  );

  return (
    <StyledColumn
      width={width}
      className="SdsAutocompleteMultiColumn-column-root"
    >
      <StyledColumnTitle className="SdsAutocompleteMultiColumn-column-title">
        {name}
      </StyledColumnTitle>
      <AutocompleteBase<T, Multiple, DisableClearable, FreeSolo>
        label={label}
        InputBaseProps={InputBaseProps}
        open={popperOpen}
        multiple={multiple}
        inputValue={inputValue}
        options={autocompleteProps.options as T[]}
        onChange={handleChange}
        value={multiple ? pendingValue : value}
        search={false}
        PaperComponent={PaperComponent}
        {...rest}
        {...autocompleteProps.props}
        // (masoudmanson): groupBy option is disabled on MultiColumn dropdowns
        groupBy={undefined}
      />
    </StyledColumn>
  );

  function getInitialValue(
    isMultiple: boolean | undefined,
    customValue?: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ): AutocompleteValue<T, Multiple, DisableClearable, FreeSolo> {
    if (customValue !== undefined) {
      return customValue;
    }

    return isMultiple
      ? ([] as unknown as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >)
      : (null as unknown as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >);
  }
};

export default AutocompleteGroup;
