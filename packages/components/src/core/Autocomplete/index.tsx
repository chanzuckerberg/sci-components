import {
  AutocompleteFreeSoloValueMapping,
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material";
import React, { ReactNode, SyntheticEvent, useState } from "react";
import { noop } from "src/common/utils";
import ButtonIcon from "../ButtonIcon";
import { IconProps } from "../Icon";
import { InputSearchProps } from "../InputSearch";
import { StyledInputAdornment } from "../InputSearch/style";
import MenuItem, { IconNameToSmallSizes } from "../MenuItem";
import {
  InputBaseWrapper,
  StyleProps,
  StyledAutocomplete,
  StyledMenuInputSearch,
  StyledMenuItemDetails,
  StyledMenuItemText,
  StyledPaper,
} from "./style";

// (thuang): This requires option to have a `name` property.
interface AutocompleteOptionGeneral {
  name: string;
  section?: string;
}
export interface AutocompleteOptionBasic extends AutocompleteOptionGeneral {
  count?: number;
  details?: string;
  sdsIcon?: keyof IconNameToSmallSizes;
  sdsIconProps?: Partial<IconProps<keyof IconNameToSmallSizes>>;
}

export interface AutocompleteOptionComponent extends AutocompleteOptionGeneral {
  component?: ReactNode;
}

type Exclusive<T, U> = T & { [K in Exclude<keyof U, keyof T>]?: undefined };

export type DefaultAutocompleteOption =
  | Exclusive<AutocompleteOptionBasic, AutocompleteOptionComponent>
  | Exclusive<AutocompleteOptionComponent, AutocompleteOptionBasic>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RenderFunctionType = (props: any) => JSX.Element;

interface ExtraAutocompleteProps extends StyleProps {
  keepSearchOnSelect?: boolean;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  onInputChange?: (
    event: SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  InputBaseProps?: Partial<InputSearchProps>;
  label: string;
  PaperComponent?: typeof StyledPaper | RenderFunctionType;
}

type CustomAutocompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = Omit<
  MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput" | "nonce" | "rev" | "rel" | "autoFocus" | "content"
>;

export type AutocompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraAutocompleteProps;

const Autocomplete = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
  const {
    multiple = false,
    disableCloseOnSelect = multiple,
    getOptionLabel = defaultGetOptionLabel,
    InputBaseProps = {},
    isOptionEqualToValue = defaultIsOptionEqualToValue,
    keepSearchOnSelect = false,
    label,
    loading = false,
    loadingText = "",
    noOptionsText = "No options",
    onInputChange = noop,
    PaperComponent = StyledPaper,
    renderOption = defaultRenderOption,
    renderTags = defaultRenderTags,
    search = false,
  } = props;

  const [inputValue, setInputValue] = useState("");

  return (
    <StyledAutocomplete
      clearOnBlur={false}
      disableCloseOnSelect={disableCloseOnSelect}
      disablePortal
      renderTags={renderTags}
      loading={loading}
      loadingText={loadingText}
      noOptionsText={noOptionsText}
      PaperComponent={PaperComponent}
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      inputValue={inputValue}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <InputBaseWrapper search={search}>
          <StyledMenuInputSearch
            id="location-search"
            label={label}
            placeholder={label}
            ref={params.InputProps.ref}
            search={search}
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
                <StyledInputAdornment position="end">
                  {inputValue && (
                    <ButtonIcon
                      aria-label="clear-button"
                      className="input-search-clear-icon"
                      onClick={clearInput}
                      sdsType="primary"
                      sdsSize="small"
                      sdsIconProps={{
                        sdsType: "iconButton",
                      }}
                      sdsIcon="xMark"
                    />
                  )}
                  <ButtonIcon
                    aria-label="search-button"
                    sdsType="secondary"
                    sdsSize="small"
                    sdsIcon="search"
                  />
                </StyledInputAdornment>
              ),
              inputProps: params.inputProps,
            }}
            {...InputBaseProps}
          />
        </InputBaseWrapper>
      )}
      {...props}
      onBlur={(event: React.FocusEvent<HTMLInputElement, Element>) => {
        setInputValue("");
        props.onBlur?.(event);
      }}
      onInputChange={(
        event: SyntheticEvent<Element, Event>,
        value: string,
        reason: AutocompleteInputChangeReason
      ) => {
        if (!multiple) {
          if (reason === "input") {
            setInputValue(value);
          } else {
            setInputValue("");
          }
        } else {
          if (reason === "clear") {
            setInputValue("");
          } else if (
            reason === "input" ||
            (reason === "reset" && !keepSearchOnSelect)
          ) {
            setInputValue(value);
          }
        }

        if (onInputChange) onInputChange(event, value, reason);
      }}
    />
  );

  function clearInput() {
    setInputValue("");
    if (onInputChange)
      onInputChange(
        { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>,
        "",
        "clear"
      );
  }

  function defaultGetOptionLabel(
    option: T | AutocompleteFreeSoloValueMapping<FreeSolo>
  ): string {
    if (typeof option === "object" && "name" in option) return option.name;
    return option.toString();
  }

  function defaultIsOptionEqualToValue(option: T, val: T): boolean {
    return option.name === val.name;
  }

  function defaultRenderTags() {
    return null;
  }

  function defaultRenderOption(
    optionProps: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    { selected }: AutocompleteRenderOptionState
  ) {
    let MenuItemContent;

    const { component, details, count, sdsIcon, sdsIconProps } = option;
    const menuItemLabel = getOptionLabel(option);

    if (component) {
      MenuItemContent = component;
    } else {
      MenuItemContent = (
        <StyledMenuItemText>
          {menuItemLabel}
          {details && (
            <StyledMenuItemDetails className="menuItem-details">
              {details}
            </StyledMenuItemDetails>
          )}
        </StyledMenuItemText>
      );
    }

    return (
      <MenuItem
        column={count}
        disabled={optionProps["aria-disabled"] === true}
        sdsIcon={sdsIcon}
        sdsIconProps={sdsIconProps}
        isMultiSelect={multiple}
        selected={selected}
        {...optionProps}
      >
        {MenuItemContent}
      </MenuItem>
    );
  }
};

export default Autocomplete;
