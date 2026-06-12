import {
  AutocompleteInputChangeReason,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  AutocompleteValueOrFreeSoloValueMapping,
  InputAdornment,
  MenuList,
} from "@mui/material";
import React, { useState } from "react";
import { noop } from "@components/src/common/utils";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "@components/src/common/warnings";
import Button from "@components/src/core/Button";
import { InputSearchProps } from "@components/src/core/InputSearch";
import {
  InputBaseWrapper,
  StyleProps,
  StyledAutocomplete,
  StyledMenuInputSearch,
  StyledMenuItem,
} from "./style";
import Icon from "../Icon";
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
  FreeSolo extends boolean | undefined = undefined,
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput"
>;

export type MenuSelectProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  MenuSelectExtraProps;

/**
 * @see https://mui.com/material-ui/react-autocomplete/
 *
 * @deprecated
 * This component is deprecated and will be removed in the next major version.
 * Please use `Autocomplete` or `Dropdown` instead.
 */
const MenuSelect = <
  T extends DefaultMenuSelectOption,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>(
  props: MenuSelectProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
  const {
    keepSearchOnSelect = true,
    multiple = false,
    getOptionLabel = defaultGetOptionLabel,
    renderValue = defaultRenderValue,
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
      renderValue={renderValue}
      noOptionsText={noOptionsText}
      renderOption={renderOption}
      // (v9): render the listbox as a MenuList so option MenuItems have the
      // required Menu/MenuList context.
      slots={{ listbox: MenuList }}
      getOptionLabel={getOptionLabel}
      inputValue={inputValue}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <InputBaseWrapper search={search}>
          <StyledMenuInputSearch
            id="location-search"
            label="Search for a location"
            placeholder="Search"
            ref={params.slotProps.input.ref}
            search={search}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            // (masoudmanson): This prevents Backspace from deselecting selected dropdown options.
            onKeyDown={(event) => {
              if (event.key === "Backspace") {
                event.stopPropagation();
              }
            }}
            slotProps={{
              htmlInput: params.slotProps.htmlInput,
              input: {
                /**
                 * (thuang): Works with css caret-color: "transparent" to hide
                 * mobile keyboard
                 */
                inputMode: search ? "text" : "none",
                /**
                 * (mmoore): passing only the ref along to the input slot to prevent
                 * default MUI arrow from rendering in search input.
                 * renderInput strips the input slot, so we explicitly pass end adornment here
                 */
                ...params.slotProps.input.ref,
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      size="large"
                      sdsType="secondary"
                      sdsStyle="minimal"
                      backgroundOnHover={false}
                    >
                      <Icon sdsIcon="Search" sdsSize="s" />
                    </Button>
                  </InputAdornment>
                ),
              },
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
    option: AutocompleteValueOrFreeSoloValueMapping<T, FreeSolo>
  ): string {
    if (typeof option === "object" && "name" in option) return option.name;
    return option.toString();
  }

  function defaultRenderValue() {
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
