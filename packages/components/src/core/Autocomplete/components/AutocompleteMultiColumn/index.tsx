import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  AutocompleteValue,
  ClickAwayListener,
  ClickAwayListenerProps as MUIClickAwayListenerProps,
  PopperProps,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  AutocompleteMultiColumnOption,
  AutocompleteMultiColumnValue,
} from "../..";
import ButtonIcon from "../../../ButtonIcon";
import { InputSearchProps } from "../../../InputSearch";
import { StyledInputAdornment } from "../../../InputSearch/style";
import { SDSTheme } from "../../../styles";
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
  onClickAway?: (event: MouseEvent | TouchEvent) => void;
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
    open = false,
    PopperPlacement = "bottom-start",
    PopperBaseProps,
    search = false,
    label = "Search",
    onClickAway = defaultOnClickAway,
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
  const [inputValue, setInputValue] = useState("");
  const [popperOpen, setPopperOpen] = useState<boolean>(open);

  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
    <ClickAwayListener onClickAway={onClickAway} {...ClickAwayListenerProps}>
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
                  <ButtonIcon
                    aria-label="clear-button"
                    className="input-search-clear-icon"
                    sdsType="primary"
                    sdsSize="small"
                    sdsIconProps={{
                      sdsType: "iconButton",
                    }}
                    icon="xMarkCircle"
                    onClick={clearInput}
                  />
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
                <ButtonIcon
                  aria-label="search-button"
                  sdsType="secondary"
                  sdsSize="small"
                  sdsIconProps={{
                    sdsType: "interactive",
                  }}
                  icon="search"
                />
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
              {options.map((autocompleteOptions) => (
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
                  InputBaseProps={InputBaseProps}
                  popperOpen={popperOpen}
                  inputValue={inputValue}
                  PaperComponent={StyledPaper}
                  {...rest}
                />
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

  function handleInputClick(_: React.SyntheticEvent) {
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

  function defaultOnClickAway() {
    setPopperOpen(false);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // (masoudmanson): This prevents Backspace from deselecting selected dropdown options.
    if (event.key === "Backspace") {
      event.stopPropagation();
    }
  }
};

export default AutocompleteMultiColumn;
