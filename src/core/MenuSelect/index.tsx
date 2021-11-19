import { InputAdornment } from "@material-ui/core";
import {
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
} from "@material-ui/lab";
import React from "react";
import { noop } from "src/common/utils";
import {
  InputBaseWrapper,
  StyledAutocomplete,
  StyledInputBase,
  StyledMenuItem,
  StyledSearchIcon,
  StyleProps,
} from "./style";

// (thuang): This requires option to have a `name` property.
export interface DefaultMenuSelectOption {
  name: string;
}

interface ExtraProps extends StyleProps {
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  onInputChange?: (event: React.SyntheticEvent) => void;
}

type CustomAutocompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput"
>;

export type MenuSelectProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraProps;

export default function MenuSelect<
  T extends DefaultMenuSelectOption,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: MenuSelectProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element {
  const {
    multiple = false,
    getOptionLabel = defaultGetOptionLabel,
    renderTags = defaultRenderTags,
    renderOption = defaultRenderOption,
    disableCloseOnSelect = multiple,
    noOptionsText = "No options",
    search = false,
    onInputChange = noop,
  } = props;

  return (
    <StyledAutocomplete
      open
      disableCloseOnSelect={disableCloseOnSelect}
      disablePortal
      renderTags={renderTags}
      noOptionsText={noOptionsText}
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <InputBaseWrapper search={search}>
          <StyledInputBase
            placeholder="Search"
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            onChange={onInputChange}
            autoFocus
            endAdornment={
              <InputAdornment position="end">
                <StyledSearchIcon />
              </InputAdornment>
            }
          />
        </InputBaseWrapper>
      )}
      {...props}
    />
  );

  function defaultGetOptionLabel(option: T): string {
    return option.name;
  }

  function defaultRenderTags() {
    return null;
  }

  function defaultRenderOption(
    option: T,
    { selected }: AutocompleteRenderOptionState
  ) {
    return (
      <StyledMenuItem
        {...{ component: "div" }}
        isMultiSelect={multiple}
        selected={selected}
      >
        {option.name}
      </StyledMenuItem>
    );
  }
}
