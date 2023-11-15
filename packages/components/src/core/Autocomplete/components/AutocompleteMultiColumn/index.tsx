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
import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AutocompleteMultiColumnOption,
  AutocompleteMultiColumnValue,
} from "../..";
import ButtonIcon from "../../../ButtonIcon";
import Icon from "../../../Icon";
import { InputSearchProps } from "../../../InputSearch";
import { StyledInputAdornment } from "../../../InputSearch/style";
import { SDSTheme } from "../../../styles";
import AutocompleteBase, {
  AutocompleteBaseProps,
  DefaultAutocompleteOption,
} from "../AutocompleteBase";
import {
  StyleProps,
  StyledAutocompleteGroupWrapper,
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
  PopperComponent?: React.JSXElementConstructor<PopperProps>;
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
  FreeSolo extends boolean | undefined
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
    InputBaseProps,
    open = false,
    PaperComponent = StyledPaper,
    PopperComponent = StyledPopper,
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

  const defaultPopperComponent = useCallback(
    () => (popperProps: PopperProps) => {
      return <StyledAutocompletePopper {...popperProps} />;
    },
    []
  );

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
            <StyledAutocompleteGroupWrapper className="SdsAutocomplete-wrapper">
              {options.map((autocompleteOptions) => (
                <RenderAutocompleteGroup
                  autocompleteProps={autocompleteOptions}
                  key={autocompleteOptions.columnName}
                  onValueChange={defaultOnValueChange}
                  value={
                    autocompleteMultiColumnValue
                      ? autocompleteMultiColumnValue[
                          autocompleteOptions.columnName
                        ]
                      : undefined
                  }
                />
              ))}
            </StyledAutocompleteGroupWrapper>
          </PopperComponent>
        )}
      </div>
    </ClickAwayListener>
  );

  function RenderAutocompleteGroup({
    autocompleteProps,
    onValueChange,
    value: propValue,
  }: {
    autocompleteProps: AutocompleteMultiColumnOption<
      T,
      Multiple,
      DisableClearable,
      FreeSolo
    >;
    onValueChange: (
      colum: string,
      event: React.SyntheticEvent,
      value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<T>
    ) => void;
    value?: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;
  }) {
    const {
      columnName,
      columnWidth,
      sdsIcon,
      // value: propValue,
      props: propProps,
    } = autocompleteProps;

    const [value, setValue] = useState<
      AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    >(getInitialValue(multiple, propValue));
    const [pendingValue, setPendingValue] = useState<
      AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
    >(getInitialValue(multiple, propValue));

    useEffect(() => {
      if (propValue !== undefined) {
        setValue(propValue);
      }
    }, [propValue]);

    const handleChange = useCallback(
      (
        event: React.SyntheticEvent,
        newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<T>
      ) => {
        propProps?.onChange?.(event, newValue, reason, details);
        onValueChange(columnName, event, newValue, reason, details);

        if (multiple) {
          setPendingValue(newValue);
        } else {
          if (
            newValue &&
            !Array.isArray(newValue) &&
            Object.prototype.hasOwnProperty.call(newValue, "name")
          ) {
            setValue(newValue);
          }
        }
      },
      [columnName, onValueChange, propProps]
    );

    return (
      <StyledColumn columnWidth={columnWidth}>
        {sdsIcon && (
          <StyledColumnIcon className="SdsAutocompleteMultiColumn-column-relation-icon">
            <Icon sdsIcon={sdsIcon} sdsSize="xs" sdsType="static" />
          </StyledColumnIcon>
        )}
        <StyledColumnTitle className="SdsAutocompleteMultiColumn-column-title">
          {columnName}
        </StyledColumnTitle>
        <AutocompleteBase<T, Multiple, DisableClearable, FreeSolo>
          label={label}
          InputBaseProps={InputBaseProps}
          open={popperOpen}
          multiple={multiple}
          inputValue={inputValue}
          options={autocompleteProps.options as T[]}
          PaperComponent={PaperComponent}
          PopperComponent={defaultPopperComponent()}
          onChange={handleChange}
          value={multiple ? pendingValue : value}
          search={false}
          {...rest}
          {...autocompleteProps.props}
          // (masoudmanson): groupBy option is disabled on MultiColumn dropdowns
          groupBy={undefined}
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
    // setPopperOpen(false);
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

  function getInitialValue(
    isMultiple: boolean | undefined,
    customValue?: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
  ): AutocompleteValue<T, Multiple, DisableClearable, FreeSolo> {
    if (customValue !== undefined) {
      return customValue;
    }

    return isMultiple
      ? ([] as unknown as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >)
      : (null as unknown as AutocompleteValue<
          T,
          Multiple,
          DisableClearable,
          FreeSolo
        >);
  }
};

export default AutocompleteMultiColumn;
