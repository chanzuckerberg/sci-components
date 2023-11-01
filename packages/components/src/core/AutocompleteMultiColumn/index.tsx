import {
  AutocompleteInputChangeReason,
  AutocompleteRenderInputParams,
  ClickAwayListener,
  ClickAwayListenerProps as MUIClickAwayListenerProps,
  PopperProps,
} from "@mui/material";
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { noop } from "src/common/utils";
import { AutocompleteMultiColumnOption } from "../Autocomplete";
import AutocompleteBase, {
  AutocompleteBaseProps,
  DefaultAutocompleteOption,
} from "../AutocompleteBase";
import ButtonIcon from "../ButtonIcon";
import Icon from "../Icon";
import { InputSearchProps } from "../InputSearch";
import { StyledInputAdornment } from "../InputSearch/style";
import {
  StyleProps,
  StyledAutocomplesWrapper,
  StyledAutocompleteInput,
  StyledAutocompletePopper,
  StyledColumn,
  StyledColumnIcon,
  StyledColumnTitle,
  StyledPaper,
  StyledPopper,
} from "./style";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RenderFunctionType = (props: any) => JSX.Element;

interface ExtraAutocompleteMultiColumnProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
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
  PopperComponent?: typeof StyledPopper | RenderFunctionType;
  PopperPlacement?: "bottom-start" | "top-start" | "bottom-end" | "top-end";
  PaperComponent?: typeof StyledPaper | RenderFunctionType;
  children?: JSX.Element | null;
  onClickAway?: (event: MouseEvent | TouchEvent) => void;
  ClickAwayListenerProps?: Partial<MUIClickAwayListenerProps>;
  options: AutocompleteMultiColumnOption<
    T,
    Multiple,
    DisableClearable,
    FreeSolo
  >[];
}

type CustomAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = Omit<
  AutocompleteBaseProps<T, Multiple, DisableClearable, FreeSolo>,
  "renderInput" | "options" | "nonce" | "rev" | "rel" | "autoFocus" | "content"
>;

export type AutocompleteMultiColumnProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = CustomAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
  ExtraAutocompleteMultiColumnProps<T, Multiple, DisableClearable, FreeSolo>;

const AutocompleteMultiColumn = <
  T extends DefaultAutocompleteOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: AutocompleteMultiColumnProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element => {
  const {
    id,
    InputBaseProps,
    open = false,
    PaperComponent = StyledPaper,
    PopperComponent = StyledPopper,
    PopperPlacement = "bottom-start",
    PopperBaseProps,
    search = false,
    label = "Search",
    onClickAway = noop,
    ClickAwayListenerProps,
    options,
    onInputChange,
    onBlur,
    multiple,
    ...rest
  } = props;
  const [inputValue, setInputValue] = useState("");
  const [popperOpen, setPopperOpen] = useState<boolean>(false);

  const anchorRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    setAnchorEl(anchorRef.current);
  }, []);

  const defaultPopperComponent = useCallback((popperProps: PopperProps) => {
    return <StyledAutocompletePopper {...popperProps} />;
  }, []);

  return (
    <>
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
               * (masoudmansdon): Because the Autocomplete component overrides the
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
                  sdsIcon="xMark"
                  onClick={clearInput}
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
          /**
           * (thuang): Works with css caret-color: "transparent" to hide
           * mobile keyboard
           */
          inputMode: "text",
        }}
        {...InputBaseProps}
      />
      <PopperComponent
        id={id}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ]}
        open={popperOpen}
        anchorEl={anchorEl}
        placement={PopperPlacement}
        {...PopperBaseProps}
      >
        <ClickAwayListener
          onClickAway={onClickAway}
          {...ClickAwayListenerProps}
        >
          <StyledAutocomplesWrapper>
            {options.map((autocompleteOptions, index) => (
              <RenderAutocompletes
                autocompleteProps={autocompleteOptions}
                key={index}
                isLast={index === options.length - 1}
              />
            ))}
          </StyledAutocomplesWrapper>
        </ClickAwayListener>
      </PopperComponent>
    </>
  );

  function RenderAutocompletes({
    autocompleteProps,
    isLast,
  }: {
    autocompleteProps: AutocompleteMultiColumnOption<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >;
    isLast: boolean;
  }) {
    const { columnName, columnWidth, sdsIcon } = autocompleteProps;

    return (
      <StyledColumn columnWidth={columnWidth}>
        {sdsIcon && !isLast && (
          <StyledColumnIcon>
            <Icon sdsIcon={sdsIcon} sdsSize="xs" sdsType="static" />
          </StyledColumnIcon>
        )}
        <StyledColumnTitle>{columnName}</StyledColumnTitle>
        <AutocompleteBase<T, Multiple, DisableClearable, FreeSolo>
          label={label}
          InputBaseProps={InputBaseProps}
          open={open}
          multiple={multiple}
          {...rest}
          {...autocompleteProps.props}
          search={false}
          inputValue={inputValue}
          options={autocompleteProps.options as T[]}
          PaperComponent={PaperComponent}
          PopperComponent={defaultPopperComponent}
        />
      </StyledColumn>
    );
  }

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
    setPopperOpen(false);
    onBlur?.(event);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // (masoudmanson): This prevents Backspace from deselecting selected dropdown options.
    if (event.key === "Backspace") {
      event.stopPropagation();
    }
  }
};

export default AutocompleteMultiColumn;
