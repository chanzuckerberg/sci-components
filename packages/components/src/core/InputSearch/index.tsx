import { TextFieldProps as RawTextFieldSearchProps } from "@mui/material";
import React, { forwardRef, useRef, useState } from "react";
import Button from "src/core/Button";
import {
  InputSearchExtraProps,
  StyledInputAdornment,
  StyledLabel,
  StyledSearchBase,
} from "./style";
import useDetectUserTabbing from "src/common/helpers/userTabbing";
import { EMPTY_OBJECT, cn } from "src/common/utils";
import Icon from "../Icon";

export interface AccessibleInputSearchProps {
  label: string;
  placeholder?: string;
  id: string;
  handleSubmit?: (value: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  customTheme?: "light" | "dark" | "auto";
  classes?: {
    root?: string;
    label?: string;
    input?: string;
    endAdornment?: string;
    startAdornment?: string;
    clearButton?: string;
    searchButton?: string;
  };
}

export type InputSearchProps = RawTextFieldSearchProps &
  AccessibleInputSearchProps &
  InputSearchExtraProps;

/**
 * @see https://mui.com/material-ui/react-text-field/
 */
const InputSearch = forwardRef<HTMLDivElement, InputSearchProps>(
  function InputSearch(props, ref): JSX.Element {
    const {
      label,
      id,
      placeholder,
      sdsStyle = "square",
      intent = "default",
      handleSubmit,
      onChange,
      disabled,
      classes = EMPTY_OBJECT,
      className,
      value: propValue,
      ...rest
    } = props;

    const {
      root: rootClassName,
      label: labelClassName,
      input: inputClassName,
      endAdornment: endAdornmentClassName,
      startAdornment: startAdornmentClassName,
      clearButton: clearButtonClassName,
      searchButton: searchButtonClassName,
    }: InputSearchProps["classes"] = classes;

    /**
     * (masoudmanson): In case that the ref is not provided, we will create a new one.
     */
    const inputRef = useRef(null);

    /**
     * (masoudmanson): This is a custom hook that listens for keyboard and mouse events
     * and adds a 'user-is-tabbing' class to the body element when the user starts
     * navigating with the keyboard. Unlike button elements which have both :focus
     * and :focus-visible states available to style separately, input elements have
     * identical styles for :focus and :focus-visible states. By detecting when the
     * user is tabbing, we can apply different styles for :focus and :focus-visible states.
     */
    useDetectUserTabbing(
      (ref ? ref : inputRef) as React.RefObject<HTMLElement>
    );

    const [internalValue, setInternalValue] = useState<string>("");

    const isControlled = propValue !== undefined;
    const value = isControlled ? String(propValue ?? "") : internalValue;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(event.target.value);
      }
      if (onChange) onChange(event);
    };

    const clearInput = () => {
      if (!isControlled) {
        setInternalValue("");
      }

      if (handleSubmit) handleSubmit("");

      /**
       * (masoudmanson): Because we are manually firing this event,
       * we must build a onChange event to transmit the updated value to onChange listeners.
       */
      if (onChange) {
        onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const localHandleSubmit = () => {
      if (handleSubmit) handleSubmit(value);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (handleSubmit) handleSubmit(value);
      }
    };

    if (!id || !label) {
      // eslint-disable-next-line no-console
      console.error(
        `Error: @czi-sds/components component InputText requires id and label props for accessibility.`
      );
      return <></>;
    }

    return (
      <div className={cn(rootClassName)}>
        <StyledLabel htmlFor={id} className={cn(labelClassName)}>
          {label}
        </StyledLabel>
        <StyledSearchBase
          id={id}
          ref={ref ? ref : inputRef}
          className={cn(inputClassName, className)}
          // passed to mui Input
          InputProps={{
            endAdornment: value ? (
              <StyledInputAdornment
                position="end"
                className={cn(endAdornmentClassName)}
              >
                <Button
                  aria-label="clear-button"
                  className={cn(
                    "input-search-clear-icon",
                    clearButtonClassName
                  )}
                  onClick={clearInput}
                  sdsType="secondary"
                  size="small"
                  sdsStyle="minimal"
                  disabled={disabled}
                  backgroundOnHover={false}
                >
                  <Icon sdsIcon="XMarkCircle" sdsSize="s" />
                </Button>
              </StyledInputAdornment>
            ) : null,
            startAdornment: (
              <StyledInputAdornment
                position="start"
                className={cn(startAdornmentClassName)}
              >
                <Button
                  aria-label="search-button"
                  onClick={localHandleSubmit}
                  sdsType="secondary"
                  size="large"
                  sdsStyle="minimal"
                  disabled={disabled}
                  backgroundOnHover={false}
                  className={cn(searchButtonClassName)}
                >
                  <Icon sdsIcon="Search" sdsSize="s" />
                </Button>
              </StyledInputAdornment>
            ),
          }}
          type="search"
          variant="outlined"
          size="small"
          placeholder={placeholder}
          value={value}
          sdsStyle={sdsStyle}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          intent={intent}
          disabled={disabled}
          /**
           * (masoudmanson): This prevents the browser's default auto completion
           * menu from being displayed for the InputSearch.
           */
          autoComplete="one-time-code"
          {...rest}
        />
      </div>
    );
  }
);

export default InputSearch;
