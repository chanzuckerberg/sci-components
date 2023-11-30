import { TextFieldProps as RawTextFieldSearchProps } from "@mui/material";
import React, { forwardRef, useState } from "react";
import ButtonIcon from "../ButtonIcon";
import {
  InputSearchExtraProps,
  StyledInputAdornment,
  StyledLabel,
  StyledSearchBase,
} from "./style";

export interface AccessibleInputSearchProps {
  label: string;
  placeholder?: string;
  id: string;
  handleSubmit?: (value: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type InputSearchProps = Omit<
  RawTextFieldSearchProps,
  "nonce" | "rev" | "rel" | "content"
> &
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
      ...rest
    } = props;

    const [hasValue, setHasValue] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value) {
        setHasValue(true);
      } else {
        setHasValue(false);
      }
      setValue(event.target.value);
      if (onChange) onChange(event);
    };

    const clearInput = () => {
      setValue("");
      setHasValue(false);

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
      <>
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
        <StyledSearchBase
          ref={ref}
          // passed to mui Input
          InputProps={{
            endAdornment: (
              <StyledInputAdornment position="end">
                <ButtonIcon
                  aria-label="clear-button"
                  className="input-search-clear-icon"
                  onClick={clearInput}
                  sdsType="primary"
                  sdsSize="small"
                  sdsIconProps={{
                    sdsType: "iconButton",
                  }}
                  icon="xMark"
                />
                <ButtonIcon
                  aria-label="search-button"
                  onClick={localHandleSubmit}
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
          type="search"
          id={id}
          variant="outlined"
          size="small"
          placeholder={placeholder}
          value={value}
          sdsStyle={sdsStyle}
          sdsStage={hasValue ? "userInput" : "default"}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          intent={intent}
          /**
           * (masoudmanson): This prevents the browser's default auto completion
           * menu from being displayed for the InputSearch.
           */
          autoComplete="one-time-code"
          {...rest}
        />
      </>
    );
  }
);

export default InputSearch;
