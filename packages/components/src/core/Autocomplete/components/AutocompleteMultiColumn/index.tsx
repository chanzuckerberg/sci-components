import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  AutocompleteValue,
  ClickAwayListener,
  ClickAwayListenerProps as MUIClickAwayListenerProps,
  PopperProps,
  useTheme,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  AutocompleteMultiColumnOption,
  AutocompleteMultiColumnValue,
} from "src/core/Autocomplete";
import ButtonV2 from "src/core/ButtonV2";
import { InputSearchProps } from "src/core/InputSearch";
import { StyledInputAdornment } from "src/core/InputSearch/style";
import { SDSTheme } from "src/core/styles";
import {
  AutocompleteBaseProps,
  DefaultAutocompleteOption,
} from "../AutocompleteBase";
import AutocompleteGroup from "../AutocompleteGroup";
import {
  StyleProps,
  StyledAutocompleteGroupWrapper,
  StyledAutocompleteInput,
  StyledPaper,
  StyledPopper,
} from "./style";
import useDetectUserTabbing from "src/common/helpers/userTabbing";
import { VerticalDivider } from "./components/VerticalDivider";
import Icon from "src/core/Icon";

interface ExtraAutocompleteMultiColumnProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends StyleProps {
  keepSearchOnSelect?: boolean;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  onInputChange?: (
    event: SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  InputBaseProps?: Partial<InputSearchProps>;
  PopperBaseProps?: Partial<PopperProps>;
  label?: string;
  PopperComponent?: React.JSXElementConstructor<PopperProps>;
  PopperPlacement?: "bottom-start" | "top-start" | "bottom-end" | "top-end";
  children?: JSX.Element | null;
  onClickAway?: (
    event?: MouseEvent | TouchEvent,
    reason?: AutocompleteCloseReason
  ) => void;
  onClick?: (event?: TouchEvent | MouseEvent) => void;
  ClickAwayListenerProps?: Partial<MUIClickAwayListenerProps>;
  options: AutocompleteMultiColumnOption<
    T,
    Multiple,
    DisableClearable,
    FreeSolo
  >[];
  value?: AutocompleteMultiColumnValue<T, Multiple, DisableClearable, FreeSolo>;
  onChange?: (
    event: React.SyntheticEvent,
    value: AutocompleteMultiColumnValue<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>
  ) => void;
}

type CustomAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = Omit<
  AutocompleteBaseProps<T, Multiple, DisableClearable, FreeSolo>,
  | "renderInput"
  | "options"
  | "value"
  | "onChange"
  | "nonce"
  | "rev"
  | "rel"
  | "autoFocus"
  | "content"
>;

export type AutocompleteMultiColumnProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraAutocompleteMultiColumnProps<T, Multiple, DisableClearable, FreeSolo>;

const AutocompleteMultiColumn = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>(
  props: AutocompleteMultiColumnProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
  const {
    InputBaseProps,
    open,
    PopperPlacement = "bottom-start",
    PopperBaseProps,
    search = false,
    label = "Search",
    onClickAway,
    onClick,
    ClickAwayListenerProps,
    options,
    onInputChange,
    onBlur,
    multiple,
    value: parentInitialValue,
    onChange,
    PopperComponent = StyledPopper,
    ...rest
  } = props;

  const theme: SDSTheme = useTheme();

  const isOpenControlled = open !== undefined;
  const [inputValue, setInputValue] = useState("");
  const [popperOpen, setPopperOpen] = useState<boolean>(
    isOpenControlled ? open : false
  );

  /**
   * (masoudmanson): This useEffect is used to update the popperOpen state
   * when the open prop is controlled.
   */
  useEffect(() => {
    if (isOpenControlled) {
      setPopperOpen(open);
    }
  }, [isOpenControlled, open]);

  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useDetectUserTabbing(anchorRef);

  useEffect(() => {
    setAnchorEl(anchorRef?.current);
  }, [anchorRef]);

  const [autocompleteMultiColumnValue, setAutocompleteMultiColumnValue] =
    useState<
      AutocompleteMultiColumnValue<T, Multiple, DisableClearable, FreeSolo>
    >({});

  useEffect(() => {
    if (parentInitialValue !== undefined) {
      setAutocompleteMultiColumnValue(parentInitialValue);
    }
  }, [options, parentInitialValue]);

  const defaultOnValueChange = (
    column: string,
    event: React.SyntheticEvent,
    val: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>
  ) => {
    setAutocompleteMultiColumnValue((prev) => {
      return {
        ...prev,
        [column]: val,
      };
    });

    onChange?.(
      event,
      {
        ...autocompleteMultiColumnValue,
        [column]: val,
      },
      reason,
      details
    );
  };

  return (
    <ClickAwayListener
      onClickAway={defaultOnClickAway}
      {...ClickAwayListenerProps}
    >
      <div>
        <StyledAutocompleteInput
          id="location-search"
          label={label}
          placeholder={label}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onBlur={handleInputBlur}
          ref={anchorRef}
          search={search}
          onKeyDown={handleInputKeyDown}
          InputProps={{
            /**
             * (mmoore): passing only the ref along to InputProps to prevent
             * default MUI arrow from rendering in search input.
             * renderInput strips InputProps, so we explicitly pass end adornment here
             */
            ...InputBaseProps?.ref,
            endAdornment: (
              <StyledInputAdornment position="end">
                {/**
                 * (masoudmanson): Because the Autocomplete component overrides the
                 * InputSearch's endAdornment, we must also include the clear IconButton here.
                 */}
                {inputValue && (
                  <ButtonV2
                    aria-label="clear-button"
                    className="input-search-clear-icon"
                    sdsType="secondary"
                    size="large"
                    sdsStyle="minimal"
                    onClick={clearInput}
                    backgroundOnHover={false}
                  >
                    <Icon sdsIcon="XMarkCircle" sdsSize="s" />
                  </ButtonV2>
                )}
              </StyledInputAdornment>
            ),
            /**
             * (thuang): Works with css caret-color: "transparent" to hide
             * mobile keyboard
             */
            inputMode: "text",
            startAdornment: (
              <StyledInputAdornment position="start">
                <ButtonV2
                  aria-label="search-button"
                  sdsType="secondary"
                  size="large"
                  sdsStyle="minimal"
                  backgroundOnHover={false}
                >
                  <Icon sdsIcon="Search" sdsSize="s" />
                </ButtonV2>
              </StyledInputAdornment>
            ),
          }}
          {...InputBaseProps}
        />

        {anchorEl && (
          <PopperComponent
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, theme.app?.spacing.s],
                },
              },
            ]}
            open={popperOpen}
            anchorEl={anchorEl}
            placement={PopperPlacement}
            disablePortal
            {...PopperBaseProps}
          >
            <StyledAutocompleteGroupWrapper className="SdsAutocompleteMultiColumn-wrapper">
              {options.map((autocompleteOptions, index) => (
                <React.Fragment key={autocompleteOptions.name + index}>
                  <AutocompleteGroup
                    autocompleteProps={autocompleteOptions}
                    key={autocompleteOptions.name}
                    onValueChange={defaultOnValueChange}
                    value={
                      autocompleteMultiColumnValue
                        ? autocompleteMultiColumnValue[autocompleteOptions.name]
                        : undefined
                    }
                    multiple={multiple}
                    label={label}
                    /**
                     * (masoudmanson): In a multi-column autocomplete, the search input for
                     * inner autocompletes should remain hidden and unfocused when the parent
                     * input is focused. This prevents blurring of the main search input.
                     */
                    InputBaseProps={{
                      ...InputBaseProps,
                      autoFocus: false,
                      tabIndex: -1,
                    }}
                    popperOpen={popperOpen}
                    inputValue={inputValue}
                    PaperComponent={StyledPaper}
                    {...rest}
                  />
                  {index < options.length - 1 && (
                    <VerticalDivider icon={autocompleteOptions.icon} />
                  )}
                </React.Fragment>
              ))}
            </StyledAutocompleteGroupWrapper>
          </PopperComponent>
        )}
      </div>
    </ClickAwayListener>
  );

  function clearInput() {
    setInputValue("");
    /**
     * (masoudmanson): Because we are manually firing this event,
     * we must build a onChange event to transmit the updated value to onChange listeners.
     */
    onInputChange?.(
      { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>,
      "",
      "clear"
    );
  }

  function handleInputClick(event: React.MouseEvent<HTMLInputElement>) {
    /**
     * (masoudmanson): Because the Autocomplete component overrides the
     * InputSearch's onClick, we must also include the parent onClick here.
     */
    onClick?.(event);

    /**
     * (masoudmanson): If the dropdown is controlled, we call the onClick prop to allow the parent
     * to handle the opening and closing of the dropdown.
     */
    if (isOpenControlled) {
      return;
    }

    /**
     * (masoudmanson): If the dropdown is not controlled, we toggle the dropdown open and closed.
     */
    if (popperOpen) {
      setPopperOpen(false);
    } else {
      setPopperOpen(true);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    if (onInputChange) {
      if (event.target.value === "") {
        onInputChange(event, "", "clear");
      } else {
        onInputChange(event, event.target.value, "input");
      }
    }
  }

  function handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (props.clearOnBlur) setInputValue("");
    onBlur?.(event);
  }

  /**
   * (masoudmanson): This is the default onClickAway handler for the Autocomplete component.
   * It is used to close the dropdown when the user clicks away from the dropdown. It also
   * calls the parent onClickAway prop if it is provided.
   */
  function defaultOnClickAway(event: MouseEvent | TouchEvent) {
    /**
     * (masoudmanson): We only want to close the dropdown if it is open.
     * This may sound unnecessary, but it is to prevent the dropdown from
     * calling the parent onClickAway prop when the dropdown is closed.
     */
    if (popperOpen) {
      onClickAway?.(event, "blur");

      /**
       * (masoudmanson): If the dropdown is controlled, we call the onClickAway prop to allow the parent
       * to handle the closing of the dropdown.
       */
      if (isOpenControlled) return;

      // (masoudmanson): If the dropdown is not controlled, we close the dropdown.
      setPopperOpen(false);
    }
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    /**
     * (masoudmanson): Because the Autocomplete component overrides the
     * InputSearch's onKeyDown, we must also include the user defined onKeyDown here.
     */
    if (props?.onKeyDown) {
      props?.onKeyDown?.(event);
    } else {
      // (masoudmanson): This prevents Backspace from deselecting selected dropdown options.
      if (event.key === "Backspace") {
        event.stopPropagation();
      }

      /**
       * (masoudmanson): This is to handle the Escape key to close the dropdown.
       * If the dropdown is controlled, we call the onClick prop to allow the parent
       * to handle the closing of the dropdown.
       */
      if (event.key === "Escape") {
        if (isOpenControlled) {
          onClick?.();
          return;
        }

        setPopperOpen(false);
      } else {
        // (masoudmanson): This is to open the dropdown when the user types in the search input.
        // especially when the user is tabbing through the input.
        setPopperOpen(true);
      }
    }
  }
};

export default AutocompleteMultiColumn;
