import {
  InputAdornment,
  TextFieldProps as RawTextFieldSearchProps,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import Icon from "../Icon";
import IconButton from "../IconButton";
import { InputSearchExtraProps, StyledLabel, StyledSearchBase } from "./style";

export interface AccessibleInputSearchProps {
  label: string;
  placeholder?: string;
  id: string;
  handleSubmit?: (value: string) => void;
}

export type InputSearchProps = RawTextFieldSearchProps &
  AccessibleInputSearchProps &
  InputSearchExtraProps;

/**
 * @see https://v4.mui.com/components/text-fields/
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
        `Error: czifui component InputText requires id and label props for accessibility.`
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
              <InputAdornment position="end">
                <IconButton
                  aria-label="search-button"
                  onClick={localHandleSubmit}
                  data-testId="searchButton"
                  sdsType="secondary"
                  size="large"
                >
                  <Icon sdsIcon="search" sdsSize="s" sdsType="interactive" />
                </IconButton>
              </InputAdornment>
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
          onKeyPress={handleKeyPress}
          intent={intent}
          {...rest}
        />
      </>
    );
  }
);

export default InputSearch;
