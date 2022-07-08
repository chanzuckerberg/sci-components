import {
  AutocompleteFreeSoloValueMapping,
  InputAdornment,
} from "@mui/material";
import {
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";
import React, { useState } from "react";
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

let hasWarned = false;
// (thuang): This requires option to have a `name` property.
export interface DefaultMenuSelectOption {
  name: string;
}

interface MenuSelectExtraProps extends StyleProps {
  keepSearchOnSelect?: boolean;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
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
  MenuSelectExtraProps;

/**
 * @see https://v4.mui.com/components/autocomplete/
 */
export default function MenuSelect<
  T extends DefaultMenuSelectOption,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: MenuSelectProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element {
  const {
    keepSearchOnSelect = true,
    multiple = false,
    getOptionLabel = defaultGetOptionLabel,
    renderTags = defaultRenderTags,
    renderOption = defaultRenderOption,
    disableCloseOnSelect = multiple,
    noOptionsText = "No options",
    search = false,
    InputBaseProps = {},
  } = props;

  const [inputValue, setInputValue] = useState("");

  if (!hasWarned) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: MenuSelect will be deprecated and replaced with <DropdownMenu />"
    );
    hasWarned = true;
  }

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
      inputValue={inputValue}
      onInputChange={(event, value, reason) => {
        if (event && event.type === "blur") {
          setInputValue("");
        } else if (
          reason !== "reset" ||
          (reason === "reset" && !keepSearchOnSelect)
        ) {
          setInputValue(value);
        }
      }}
      renderInput={(params) => (
        <InputBaseWrapper search={search}>
          <StyledMenuInputSearch
            id="location-search"
            label="Search for a location"
            placeholder="Search"
            ref={params.InputProps.ref}
            search={search}
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

  function defaultGetOptionLabel(
    option: T | AutocompleteFreeSoloValueMapping<FreeSolo>
  ): string {
    if (typeof option === "object" && "name" in option) return option.name;
    return option.toString();
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
      <StyledMenuItem
        {...{ component: "li" }}
        isMultiSelect={multiple}
        selected={selected}
        {...optionProps}
      >
        {option.name}
      </StyledMenuItem>
    );
  }
}
