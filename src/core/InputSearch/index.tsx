import {
  InputAdornment,
  TextFieldProps as RawTextFieldSearchProps,
} from "@material-ui/core";
import React, { forwardRef, useState } from "react";
import Icon from "../Icon";
import IconButton from "../IconButton";
import { ExtraProps, StyledLabel, StyledSearchBase } from "./style";

interface AccessibleInputSearchProps {
  label: string;
  placeholder?: string;
  id: string;
}

export type InputSearchProps = RawTextFieldSearchProps &
  AccessibleInputSearchProps &
  ExtraProps;

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  function InputSearch(props, ref): JSX.Element {
    const {
      label,
      id,
      placeholder,
      sdsStyle = "square",
      intent = "default",
      ...rest
    } = props;

    const [hasValue, setHasValue] = useState<boolean>(false);

    const handleChange = (event: { target: { value: string } }) => {
      if (event.target.value) {
        setHasValue(true);
      } else {
        setHasValue(false);
      }
    };

    if (!id || !label) {
      // eslint-disable-next-line no-console
      console.error(
        `Error: czifui component InputText requires id and label props for accessibility.`
      );
      return <></>;
    }

    const inputProps = {
      "aria-label": `${label}`,
      role: "search",
    };

    return (
      <>
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
        <StyledSearchBase
          ref={ref}
          // passed to html input
          inputProps={inputProps}
          // passed to mui Input
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton sdsType="secondary">
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
          sdsStyle={sdsStyle}
          sdsStage={hasValue ? "userInput" : "default"}
          onChange={handleChange}
          intent={intent}
          {...rest}
        />
      </>
    );
  }
);

export default InputSearch;
