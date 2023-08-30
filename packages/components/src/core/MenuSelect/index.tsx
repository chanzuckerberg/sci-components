import {
  AutocompleteFreeSoloValueMapping,
  AutocompleteInputChangeReason,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import { noop } from "src/common/utils";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import ButtonIcon from "../ButtonIcon";
import { InputSearchProps } from "../InputSearch";
import {
  InputBaseWrapper,
  StyleProps,
  StyledAutocomplete,
  StyledMenuInputSearch,
  StyledMenuItem,
} from "./style";
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
  "renderInput" | "nonce" | "rev" | "rel" | "content"
>;

export type MenuSelectProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  MenuSelectExtraProps;

/**
 * @see https://mui.com/material-ui/react-autocomplete/
 */
const MenuSelect = <
  T extends DefaultMenuSelectOption,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: MenuSelectProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
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
    onInputChange = noop,
  } = props;

  const [inputValue, setInputValue] = useState("");

  showWarningIfFirstOccurence(SDSWarningTypes.MenuSelectDeprecated);

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
      renderInput={(params: AutocompleteRenderInputParams) => (
        <InputBaseWrapper search={search}>
          <StyledMenuInputSearch
            id="location-search"
            label="Search for a location"
            placeholder="Search"
            ref={params.InputProps.ref}
            search={search}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            // (masoudmanson): This prevents Backspace from deselecting selected dropdown options.
            onKeyDown={(event) => {
              if (event.key === "Backspace") {
                event.stopPropagation();
              }
            }}
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
                  <ButtonIcon
                    sdsType="secondary"
                    sdsSize="small"
                    sdsIconProps={{
                      sdsType: "interactive",
                    }}
                    sdsIcon="search"
                  />
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
        event: React.SyntheticEvent<Element, Event>,
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
};

export default MenuSelect;
