import {
  AutocompleteFreeSoloValueMapping,
  AutocompleteInputChangeReason,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  InputAdornment,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { noop } from "src/common/utils";
import Icon from "../Icon";
import IconButton from "../IconButton";
import { InputSearchProps } from "../InputSearch";
import {
  InputBaseWrapper,
  StyledAutocomplete,
  StyledMenuInputSearch,
  StyledMenuItem,
  StyledMenuItemCount,
  StyledMenuItemDetails,
  StyleProps,
} from "./style";

// (thuang): This requires option to have a `name` property.
export interface DefaultDropdownMenuOption {
  name: string;
  section?: string;
  details?: string;
  count?: string;
}
interface ExtraProps extends StyleProps {
  keepSearchOnSelect?: boolean;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  onInputChange?: (
    event: React.ChangeEvent<Record<string, unknown>>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
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

export type DropdownMenuProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraProps;

export default function DropdownMenu<
  T extends DefaultDropdownMenuOption,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: DropdownMenuProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element {
  const {
    keepSearchOnSelect = true,
    multiple = false,
    getOptionLabel = defaultGetOptionLabel,
    isOptionEqualToValue = defaultIsOptionEqualToValue,
    renderTags = defaultRenderTags,
    renderOption = defaultRenderOption,
    disableCloseOnSelect = multiple,
    noOptionsText = "No options",
    search = false,
    onInputChange = noop,
    InputBaseProps = {},
  } = props;

  const [inputValue, setInputValue] = useState("");

  return (
    <StyledAutocomplete
      clearOnBlur={false}
      disableCloseOnSelect={disableCloseOnSelect}
      disablePortal
      renderTags={renderTags}
      noOptionsText={noOptionsText}
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      inputValue={inputValue}
      renderInput={(params: AutocompleteRenderInputParams) => (
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
                  <IconButton sdsType="secondary">
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
      onInputChange={(
        event: SyntheticEvent<Element, Event>,
        value: string,
        reason: AutocompleteInputChangeReason
      ) => {
        if (event && event.type === "blur") {
          setInputValue("");
        } else if (
          reason !== "reset" ||
          (reason === "reset" && !keepSearchOnSelect)
        ) {
          setInputValue(value);
        }
        if (onInputChange) onInputChange(event, value, reason);
      }}
    />
  );

  function defaultGetOptionLabel(
    option: T | AutocompleteFreeSoloValueMapping<FreeSolo>
  ): string {
    if (typeof option === "object" && "name" in option) return option.name;
    return option.toString();
  }

  function defaultIsOptionEqualToValue(option: T, value: T): boolean {
    return option.name === value.name;
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
          count={option.count}
        >
          <div>
            {option.name}

            {option.details && (
              <StyledMenuItemDetails>{option.details}</StyledMenuItemDetails>
            )}
          </div>

          {option.count && (
            <StyledMenuItemCount className="menuItem-count">
              {option.count}
            </StyledMenuItemCount>
          )}
        </StyledMenuItem>
      </li>
    );
  }
}
