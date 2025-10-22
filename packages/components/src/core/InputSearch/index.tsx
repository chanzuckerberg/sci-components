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
import { EMPTY_OBJECT } from "src/common/utils";

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

    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (onChange) onChange(event);
    };

    const clearInput = () => {
      setValue("");

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
      <div className={rootClassName}>
        <StyledLabel htmlFor={id} className={labelClassName}>
          {label}
        </StyledLabel>
        <StyledSearchBase
          id={id}
          ref={ref ? ref : inputRef}
          className={inputClassName}
          // passed to mui Input
          InputProps={{
            endAdornment: value ? (
              <StyledInputAdornment
                position="end"
                className={endAdornmentClassName}
              >
                <Button
                  aria-label="clear-button"
                  className={"input-search-clear-icon " + clearButtonClassName}
                  onClick={clearInput}
                  sdsType="tertiary"
                  sdsSize="small"
                  sdsStyle="icon"
                  disabled={disabled}
                  icon="XMarkCircle"
                />
              </StyledInputAdornment>
            ) : null,
            startAdornment: (
              <StyledInputAdornment
                position="start"
                className={startAdornmentClassName}
              >
                <Button
                  aria-label="search-button"
                  onClick={localHandleSubmit}
                  sdsType="tertiary"
                  sdsSize="small"
                  sdsStyle="icon"
                  disabled={disabled}
                  icon="Search"
                  className={searchButtonClassName}
                />
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
