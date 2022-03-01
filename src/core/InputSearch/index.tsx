import {
  InputAdornment,
  TextFieldProps as RawTextFieldSearchProps,
} from "@material-ui/core";
import React, { ForwardedRef, forwardRef } from "react";
import Icon from "../Icon";
import IconButton from "../IconButton";
import { ExtraProps, StyledSearchBase } from "./style";

interface AccessibleInputSearchProps {
  label: string;
  placeholder?: string;
  id: string;
}

export type InputSearchProps = RawTextFieldSearchProps &
  AccessibleInputSearchProps &
  ExtraProps;

const InputSearch = (
  props: InputSearchProps,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element => {
  const { label, id, placeholder, sdsStyle = "square", ...rest } = props;

  const inputProps = {
    "aria-label": `${label}`,
  };

  return (
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
      {...rest}
    />
  );
};

export default forwardRef(InputSearch);
