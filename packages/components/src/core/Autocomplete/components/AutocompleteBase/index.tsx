import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteFreeSoloValueMapping,
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  AutocompleteValue,
  AutocompleteProps as MuiAutocompleteProps,
  Popper,
  PopperProps,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { ReactNode, SyntheticEvent, useCallback, useState } from "react";
import { EMPTY_OBJECT, noop } from "src/common/utils";
import ButtonIcon from "../../../ButtonIcon";
import { IconProps } from "../../../Icon";
import { InputSearchProps } from "../../../InputSearch";
import { StyledInputAdornment } from "../../../InputSearch/style";
import MenuItem, { IconNameToSmallSizes } from "../../../MenuItem";
import { SDSTheme } from "../../../styles";
import {
  InputBaseWrapper,
  StyleProps,
  StyledAutocompleteBase,
  StyledMenuInputSearch,
  StyledMenuItemDetails,
  StyledMenuItemText,
  StyledPaper,
} from "./style";

// (thuang): This requires option to have a `name` property.
// (masoudmanson): Represents a generic autocomplete option with common properties.
interface AutocompleteOptionGeneral {
  name: string; // The name of the autocomplete option.
  section?: string; // An optional section for categorization.
}

// (masoudmanson): Represents a basic autocomplete option.
export interface AutocompleteOptionBasic extends AutocompleteOptionGeneral {
  count?: number; // An optional count associated with the option.
  details?: string; // An optional string for additional details.
  sdsIcon?: keyof IconNameToSmallSizes; // An optional icon key.
  sdsIconProps?: Partial<IconProps<keyof IconNameToSmallSizes>>; // Optional properties for the associated icon.
}

// (masoudmanson): Represents an autocomplete option that includes a custom React component.
export interface AutocompleteOptionComponent extends AutocompleteOptionGeneral {
  component?: ReactNode; // An optional custom React component.
}

// (masoudmanson): Combines properties from two types while ensuring that overlapping properties are optional.
type Exclusive<T, U> = T & { [K in Exclude<keyof U, keyof T>]?: undefined };

// (masoudmanson): Represents a default autocomplete option that can be either basic or include a custom component.
export type DefaultAutocompleteOption =
  | Exclusive<AutocompleteOptionBasic, AutocompleteOptionComponent> // Represents a basic option with optional custom properties.
  | Exclusive<AutocompleteOptionComponent, AutocompleteOptionBasic>; // Represents an option with a custom component and optional basic properties.

interface ExtraAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>
  extends StyleProps {
  keepSearchOnSelect?: boolean;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  onInputChange?: (
    event: SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  onChange?: (
    event: React.SyntheticEvent,
    value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>
  ) => void;
  InputBaseProps?: Partial<InputSearchProps>;
  label?: string;
}

type CustomAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = Omit<
  MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput" | "nonce" | "rev" | "rel" | "autoFocus" | "content"
>;

export type AutocompleteBaseProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>;

const AutocompleteBase = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: AutocompleteBaseProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
  const {
    multiple,
    disableCloseOnSelect = multiple,
    getOptionLabel = defaultGetOptionLabel,
    InputBaseProps = EMPTY_OBJECT,
    isOptionEqualToValue = defaultIsOptionEqualToValue,
    keepSearchOnSelect = false,
    label = "Label",
    loading = false,
    loadingText = "",
    noOptionsText = "No options",
    onInputChange = noop,
    renderOption = defaultRenderOption,
    renderTags = defaultRenderTags,
    search = false,
    clearOnBlur = false,
    blurOnSelect = !multiple,
  } = props;
  const theme: SDSTheme = useTheme();

  const [inputValue, setInputValue] = useState("");

  return (
    <StyledAutocompleteBase
      clearOnBlur={clearOnBlur}
      disableCloseOnSelect={disableCloseOnSelect}
      disablePortal
      renderTags={renderTags}
      loading={loading}
      loadingText={loadingText}
      noOptionsText={noOptionsText}
      PaperComponent={StyledPaper}
      PopperComponent={useDefaultPopperComponent()}
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      inputValue={inputValue}
      renderInput={defaultRenderInput}
      multiple={multiple}
      {...props}
      // (masoudmanson): For multiple options (multiple = true), setting blurOnSelect to false
      // keeps the dropdown open after selecting an option. This feature enhances user experience
      // by preventing the dropdown from closing, enabling users to select multiple options
      // without having to reopen the menu repeatedly.
      blurOnSelect={multiple ? false : blurOnSelect}
      // (masoudmanson): Given the necessity of maintaining consistent onBlur functionality,
      // and clearing the input value on blur, it's crucial to include the onBlur handler
      // after spreading other props. Furthermore, within the defaultOnBlur function, the
      // actual onBlur function is invoked for completeness.
      onBlur={defaultOnBlur}
      // (masoudmanson): To ensure component-level actions (changing the input field value)
      // trigger upon input changes, it's crucial to position the onInputChange handler after
      // spreading the other props. Furthermore, within the defaultOnInputChange function,
      // the provided onInputChange from props is called at the end to emit the input changes
      // to the user.
      onInputChange={defaultOnInputChange}
    />
  );

  /**
   * (masoudmanson): Using a custom Popper or Paper with the Autocomplete
   * without a useCallback results in scroll jumps while selecting an option!
   */
  function useDefaultPopperComponent() {
    return useCallback((popperProps: PopperProps) => {
      return (
        <Popper
          modifiers={[
            {
              enabled: true,
              name: "offset",
              options: {
                offset: [0, theme.app?.spacing.s],
              },
            },
          ]}
          {...popperProps}
        />
      );
    }, []);
  }

  function defaultRenderInput(params: AutocompleteRenderInputParams) {
    return (
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
                {/**
                 * (masoudmanson): Because the Autocomplete component overrides the
                 * InputSearch's endAdornment, we must also include the clear IconButton here.
                 */}
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
                  sdsIconProps={{
                    sdsType: "interactive",
                  }}
                  sdsIcon="search"
                />
              </StyledInputAdornment>
            ),
            inputProps: params.inputProps,
          }}
          {...InputBaseProps}
        />
      </InputBaseWrapper>
    );
  }

  function defaultOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (clearOnBlur) setInputValue("");
    props.onBlur?.(event);
  }

  function defaultOnInputChange(
    event: SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) {
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
  }

  function clearInput() {
    setInputValue("");
    /**
     * (masoudmanson): Because we are manually firing this event,
     * we must build a onChange event to transmit the updated value to onChange listeners.
     */
    if (onInputChange)
      onInputChange(
        { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>,
        "",
        "clear"
      );
  }

  function defaultGetOptionLabel(
    option:
      | DefaultAutocompleteOption
      | AutocompleteFreeSoloValueMapping<boolean>
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

export default AutocompleteBase;
