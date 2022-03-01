import {
  InputAdornment,
  TextField,
  TextFieldProps as RawTextFieldSearchProps,
} from "@material-ui/core";
import React, { ForwardedRef, forwardRef } from "react";
import Icon from "../Icon";
import IconButton from "../IconButton";

interface AccessibleInputSearchProps {
  label: string;
  placeholder?: string;
  id: string;
}

export type InputSearchProps = RawTextFieldSearchProps &
  AccessibleInputSearchProps;

const InputSearch = (
  props: InputSearchProps,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element => {
  const { label, id, placeholder, ...rest } = props;

  const inputProps = {
    "aria-label": `${label}`,
  };

  return (
    <TextField
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
      {...rest}
    />
  );
};

export default forwardRef(InputSearch);
