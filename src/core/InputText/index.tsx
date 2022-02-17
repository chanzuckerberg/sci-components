import { TextFieldProps as RawTextFieldProps } from "@material-ui/core";
import React from "react";
import { StyledInputBase } from "./style";

interface ExtraProps {
  intent?: "default" | "error" | "warning";
  sdsType?: "textField" | "textArea";
  sdsStage?: "default" | "userInput";
}

export type TextFieldProps = RawTextFieldProps & ExtraProps;

// sdsType: "text field" | "text area"
// sdsStage: "default" (blank) | "user input" (active)
// states: default, hover, active, disabled
// intent: default (accept input) | error (incorrect/incomplete input) | warning (needs attention)

const TextInput = ({ id, intent }: TextFieldProps): JSX.Element => {
  return (
    <>
      <label htmlFor={id}>Label</label>
      <StyledInputBase
        type="text"
        id={id}
        variant="outlined"
        size="small"
        placeholder="Value"
      />
    </>
  );
};

export default TextInput;
