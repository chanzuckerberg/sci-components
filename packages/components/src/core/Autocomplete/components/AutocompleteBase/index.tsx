import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteFreeSoloValueMapping,
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  AutocompleteValue,
  AutocompleteValueOrFreeSoloValueMapping,
  AutocompleteProps as MuiAutocompleteProps,
  MenuList,
  Popper,
  PopperProps,
  useTheme,
} from "@mui/material";
import React, {
  forwardRef,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForkRef } from "@mui/material/utils";
import { EMPTY_OBJECT, noop } from "@components/src/common/utils";
import Button from "@components/src/core/Button";
import Icon, { IconProps } from "@components/src/core/Icon";
import { InputSearchProps } from "@components/src/core/InputSearch";
import { StyledInputAdornment } from "@components/src/core/InputSearch/style";
import MenuItem, { IconNameToSmallSizes } from "@components/src/core/MenuItem";
import { SDSTheme } from "@components/src/core/styles";
import {
  InputBaseWrapper,
  StyleProps,
  StyledAutocompleteBase,
  StyledMenuInputSearch,
  StyledMenuItemDetails,
  StyledMenuItemText,
  StyledPaper,
} from "./style";
import useDetectUserTabbing from "@components/src/common/helpers/userTabbing";

// (thuang): This requires option to have a `name` property.
// (masoudmanson): Represents a generic autocomplete option with common properties.
interface AutocompleteOptionGeneral {
  name: string; // The name of the autocomplete option.
  section?: string; // An optional section for categorization.
  disabled?: boolean; // An optional disabled flag.
}

// (masoudmanson): Represents a basic autocomplete option.
export interface AutocompleteOptionBasic extends AutocompleteOptionGeneral {
  count?: number; // An optional count associated with the option.
  details?: string; // An optional string for additional details.
  icon?: keyof IconNameToSmallSizes | React.ReactElement<CustomSVGProps>; // An optional icon key.
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

interface ExtraAutocompleteProps<
  T,
  Multiple,
  DisableClearable,
  FreeSolo,
> extends Omit<StyleProps, "groupBy"> {
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
  intent?: InputSearchProps["intent"];
  onClickAway?: (
    event?: MouseEvent | TouchEvent,
    reason?: AutocompleteCloseReason
  ) => void;
  onClick?: (event?: TouchEvent | MouseEvent) => void;
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
    renderValue = defaultRenderValue,
    search = false,
    clearOnBlur = false,
    blurOnSelect = !multiple,
    onClickAway,
    onClick,
    onOpen,
    onClose,
    disabled,
    intent = "default",
  } = props;
  const theme: SDSTheme = useTheme();

  const ref = useRef(null);
  const [inputValue, setInputValue] = useState("");

  useDetectUserTabbing(ref);

  // (v9): MUI Autocomplete's `PaperComponent`/`PopperComponent` props were
  // removed in favor of `slots.paper`/`slots.popper`.
  const defaultPopperComponent = useDefaultPopperComponent();

  // (masoudmanson): Holds the listbox DOM node so we can preserve its scroll
  // position across selections (see defaultOnChange for the full explanation).
  const listboxNodeRef = useRef<HTMLUListElement | null>(null);
  const defaultListboxComponent = useDefaultListboxComponent(listboxNodeRef);

  return (
    <StyledAutocompleteBase
      ref={ref}
      clearOnBlur={clearOnBlur}
      disableCloseOnSelect={disableCloseOnSelect}
      disablePortal
      renderValue={renderValue}
      loading={loading}
      loadingText={loadingText}
      noOptionsText={noOptionsText}
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      inputValue={inputValue}
      renderInput={defaultRenderInput}
      multiple={multiple}
      /**
       * (masoudmanson): Overrides the onOpen and onClose handlers to ensure that
       * the onClick and onClickAway handlers are triggered when a controlled dropdown
       * is opened or closed, respectively.
       */
      onOpen={defaultOnOpen}
      onClose={defaultOnClose}
      {...props}
      /**
       * (masoudmanson): For multiple options (multiple = true), setting blurOnSelect to false
       * keeps the dropdown open after selecting an option. This feature enhances user experience
       * by preventing the dropdown from closing, enabling users to select multiple options
       * without having to reopen the menu repeatedly.
       */
      blurOnSelect={multiple ? false : blurOnSelect}
      /**
       * (masoudmanson): Given the necessity of maintaining consistent onBlur functionality,
       * and clearing the input value on blur, it's crucial to include the onBlur handler
       * after spreading other props. Furthermore, within the defaultOnBlur function, the
       * actual onBlur function is invoked for completeness.
       */
      onBlur={defaultOnBlur}
      /**
       * (masoudmanson): To ensure component-level actions (changing the input field value)
       * trigger upon input changes, it's crucial to position the onInputChange handler after
       * spreading the other props. Furthermore, within the defaultOnInputChange function,
       * the provided onInputChange from props is called at the end to emit the input changes
       * to the user.
       */
      onInputChange={defaultOnInputChange}
      disabled={disabled || !search}
      /**
       * (masoudmanson): Preserves the listbox scroll position across selections.
       * Placed after spreading props so it always wraps the consumer's onChange.
       */
      onChange={defaultOnChange}
      slots={{
        paper: StyledPaper,
        popper: defaultPopperComponent,
        // (v9): MUI's MenuItem now requires a MenuList/Menu context. The default
        // Autocomplete listbox is a plain <ul>, so render the listbox as a
        // MenuList to provide that context to the option MenuItems.
        listbox: defaultListboxComponent,
        ...props.slots,
      }}
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

  /**
   * (masoudmanson): A memoized listbox component is required for the same reason
   * as the Popper above: recreating the component on every render remounts the
   * listbox and loses its scroll position. The wrapper renders a MenuList (to
   * provide the Menu context the option MenuItems need) while also capturing the
   * listbox DOM node so we can restore its scroll after a selection.
   */
  function useDefaultListboxComponent(
    nodeRef: React.MutableRefObject<HTMLUListElement | null>
  ) {
    return useMemo(
      () =>
        forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLElement>>(
          function Listbox(listboxProps, forwardedRef) {
            const handleRef = useForkRef(forwardedRef, nodeRef);
            return <MenuList {...listboxProps} ref={handleRef} />;
          }
        ),
      // (masoudmanson): nodeRef is a stable ref object, so an empty dependency
      // array keeps the component identity constant across renders.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
  }

  function defaultOnChange(
    event: React.SyntheticEvent,
    value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>
  ) {
    /**
     * (masoudmanson): When the popup stays open after a selection (e.g. multi-select
     * or `disableCloseOnSelect`), MUI re-syncs its highlighted option and forces
     * `listbox.scrollTop = 0` once the highlight resets to -1. Because the listbox now
     * renders as a MenuList (the scrollable region), this snaps the list back to the
     * top on every selection. We capture the scroll position here and restore it on the
     * next animation frame, after MUI's re-renders and effects have settled.
     */
    if (listboxNodeRef.current) {
      const scrollTopToRestore = listboxNodeRef.current.scrollTop;
      requestAnimationFrame(() => {
        if (listboxNodeRef.current) {
          listboxNodeRef.current.scrollTop = scrollTopToRestore;
        }
      });
    }
    props.onChange?.(event, value, reason, details);
  }

  function defaultRenderInput(params: AutocompleteRenderInputParams) {
    return (
      <InputBaseWrapper search={search}>
        <StyledMenuInputSearch
          id="location-search"
          aria-label="Search Input"
          // (masoudmanson): This is to ensure that the input field won't be focusable
          // when the search prop is set to false.
          tabIndex={search ? 0 : -1}
          aria-hidden={!search}
          label={label}
          placeholder={label}
          ref={params.slotProps.input.ref}
          search={search}
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
               * (mmoore): passing only the ref along to the input slot to prevent
               * default MUI arrow from rendering in search input.
               * renderInput strips the input slot, so we explicitly pass end adornment here
               */
              ...params.slotProps.input.ref,
              "aria-hidden": !search,
              endAdornment: (
                <StyledInputAdornment position="end">
                  {inputValue && (
                    <Button
                      // (masoudmanson): This is to ensure that the clear button won't be focusable
                      // when the search prop is set to false.
                      tabIndex={search ? 0 : -1}
                      aria-hidden={!search}
                      disabled={!search}
                      aria-label="Clear Button"
                      className="input-search-clear-icon"
                      onClick={clearInput}
                      sdsType="secondary"
                      size="large"
                      sdsStyle="minimal"
                      backgroundOnHover={false}
                    >
                      <Icon sdsIcon="XMarkCircle" sdsSize="s" />
                    </Button>
                  )}
                </StyledInputAdornment>
              ),
              /**
               * (thuang): Works with css caret-color: "transparent" to hide
               * mobile keyboard
               */
              inputMode: search ? "text" : "none",
              startAdornment: (
                <StyledInputAdornment position="start">
                  <Button
                    aria-label="Search Button"
                    // (masoudmanson): This is to ensure that the search button won't be focusable
                    // when the search prop is set to false.
                    tabIndex={search ? 0 : -1}
                    aria-hidden={!search}
                    disabled={!search}
                    sdsType="secondary"
                    size="large"
                    sdsStyle="minimal"
                    backgroundOnHover={false}
                  >
                    <Icon sdsIcon="Search" sdsSize="s" />
                  </Button>
                </StyledInputAdornment>
              ),
            },
          }}
          intent={intent}
          {...InputBaseProps}
        />
      </InputBaseWrapper>
    );
  }

  function defaultOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (clearOnBlur) setInputValue("");
    props.onBlur?.(event);
  }

  /**
   * (masoudmanson): The default onOpen handler is the Callback fired when the popup
   * requests to be opened. This function is responsible for invoking the onOpen and onClick
   * handlers when a controlled dropdown is opening.
   */
  function defaultOnOpen(event: React.SyntheticEvent<Element, Event>) {
    onOpen?.(event);
    onClick?.(event as unknown as TouchEvent | MouseEvent);
  }

  /**
   * (masoudmanson): The default onClose handler is the callback fired when the popup
   * requests to be closed. This function is responsible for invoking the onClose and onClickAway
   * handlers when a controlled dropdown is closing.
   */
  function defaultOnClose(
    event: React.SyntheticEvent<Element, Event>,
    reason: AutocompleteCloseReason
  ) {
    onClose?.(event, reason);
    onClickAway?.(event as unknown as TouchEvent | MouseEvent, reason);
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

  function defaultIsOptionEqualToValue(
    option: T,
    val: AutocompleteValueOrFreeSoloValueMapping<T, FreeSolo>
  ): boolean {
    // (v9): With freeSolo, `val` can be a raw string in addition to an option.
    return typeof val === "object" && val !== null && "name" in val
      ? option.name === val.name
      : option.name === val;
  }

  function defaultRenderValue() {
    return null;
  }

  function defaultRenderOption(
    optionProps: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    { selected }: AutocompleteRenderOptionState
  ) {
    let MenuItemContent;

    const {
      component,
      details,
      count,
      icon,
      sdsIconProps,
      disabled: optionDisabled,
      ...restOptionProps
    } = option;
    const menuItemLabel = getOptionLabel(option);

    if (component) {
      MenuItemContent = component;
    } else {
      MenuItemContent = (
        <StyledMenuItemText>
          {menuItemLabel}
          {details && (
            <StyledMenuItemDetails
              disabled={optionDisabled}
              className="menuItem-details"
            >
              {details}
            </StyledMenuItemDetails>
          )}
        </StyledMenuItemText>
      );
    }

    return (
      <MenuItem
        column={count}
        disabled={optionDisabled || optionProps["aria-disabled"] === true}
        icon={icon}
        sdsIconProps={sdsIconProps}
        isMultiSelect={multiple}
        selected={selected}
        {...optionProps}
        {...restOptionProps}
        key={option.name}
      >
        {MenuItemContent}
      </MenuItem>
    );
  }
};

export default AutocompleteBase;
