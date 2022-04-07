import { InputAdornment } from "@mui/material";
import {
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";
import React from "react";
import { noop } from "src/common/utils";
import Icon from "../Icon";
import IconButton from "../IconButton";
import { InputSearchProps } from "../InputSearch";
import {
  InputBaseWrapper,
  StyledAutocomplete,
  StyledMenuInputSearch,
  StyledMenuItem,
  StyleProps,
} from "./style";

// (thuang): This requires option to have a `name` property.
export interface DefaultMenuSelectOption {
  name: string;
}

interface ExtraProps extends StyleProps {
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  onInputChange?: (event: React.SyntheticEvent) => void;
  InputBaseProps?: Partial<InputSearchProps>;
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
    InputBaseProps = {},
  } = props;

  return (
    <StyledAutocomplete
      clearOnBlur={false}
      open
      disableCloseOnSelect={disableCloseOnSelect}
      disablePortal
      renderTags={renderTags}
      noOptionsText={noOptionsText}
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <InputBaseWrapper search={search}>
          <StyledMenuInputSearch
            id="location-search"
            label="Search for a location"
            placeholder="Search"
            ref={params.InputProps.ref}
            search={search}
            onChange={onInputChange}
            autoFocus
            InputProps={{
              /**
               * (thuang): Works with css caret-color: "transparent" to hide
               * mobile keyboard
               */
              inputMode: search ? "text" : "none",
              /**
               * (mmoore): passing only the ref along to InputProps to prevent
               * default MUI arrow from rendering in search input.
               * renderInput strips InputProps, so we explicitly pass end adornment here
               */
              ...params.InputProps.ref,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton sdsType="secondary" size="large">
                    <Icon sdsIcon="search" sdsSize="s" sdsType="interactive" />
                  </IconButton>
                </InputAdornment>
              ),
              inputProps: params.inputProps,
            }}
            {...InputBaseProps}
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
    optionProps: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    { selected }: AutocompleteRenderOptionState
  ) {
    return (
      <li {...optionProps}>
        <StyledMenuItem
          {...{ component: "div" }}
          isMultiSelect={multiple}
          selected={selected}
        >
          {option.name}
        </StyledMenuItem>
      </li>
    );
  }
}
