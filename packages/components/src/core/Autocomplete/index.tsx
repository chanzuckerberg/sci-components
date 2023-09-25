import {
  AutocompleteFreeSoloValueMapping,
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  AutocompleteProps as MuiAutocompleteProps,
  Popper,
  PopperProps,
} from "@mui/material";
import React, { ReactNode, SyntheticEvent, useCallback, useState } from "react";
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
  StyledListBox,
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
  isMultiColumn?: boolean;
  columnWidth?: number;
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
    isMultiColumn = false,
  } = props;

  const [inputValue, setInputValue] = useState("");

  // (masoudmanson): Utilizing useMemo hook to encapsulate the custom listbox component,
  // mitigates the "Jump to Start" scroll glitch and enhances performance.
  const MultiColumnListbox = React.useMemo(
    () =>
      React.forwardRef<
        HTMLUListElement,
        React.HTMLAttributes<HTMLUListElement>
      >((listboxProps, ref) => <StyledListBox ref={ref} {...listboxProps} />),
    []
  );

  // (masoudmanson): As we required a wider popper for multi-column dropdowns,
  // we enforced an 'auto' width in the style file to the popper component. unfortunately
  // the default popperOffset can not calculate the popper position with a auto width.
  // To achieve the desired placement, we employ popper modifiers to compute the new
  // popper position on the page, relying on the reference element's coordinates.

  const DefaultPopperComponent = useCallback((popperProps: PopperProps) => {
    return (
      <Popper
        {...popperProps}
        modifiers={[
          {
            enabled: false,
            name: "flip",
            options: {
              altBoundary: true,
              rootBoundary: "document",
            },
          },
          {
            enabled: true,
            fn: (params) => {
              const offsetLeft = params.state.rects.reference.x;
              const offsetTop =
                params.state.rects.reference.y +
                params.state.rects.reference.height +
                8;

              params.state.elements.popper.style.transform = `translate3d(${offsetLeft}px, ${offsetTop}px, 0)`;
            },
            name: "resize",
            phase: "afterWrite",
          },
        ]}
        placement="bottom-start"
      />
    );
  }, []);

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
      PopperComponent={DefaultPopperComponent}
      ListboxComponent={isMultiColumn ? MultiColumnListbox : undefined}
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
                  {/**
                   * (masoudmansdon): Because the Autocomplete component overrides the
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
