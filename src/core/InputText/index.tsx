import { TextFieldProps as RawTextFieldProps } from "@material-ui/core";
import React, { ForwardedRef, forwardRef, useState } from "react";
import { ExtraProps, StyledInputBase, StyledLabel } from "./style";

interface AccessibleInputTextProps {
  label: string;
  placeholder?: string;
  id: string;
}

export type InputTextProps = RawTextFieldProps &
  ExtraProps &
  AccessibleInputTextProps;

const TextInput = (
  props: InputTextProps,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element => {
  const {
    id,
    intent = "default",
    label,
    placeholder,
    sdsType,
    hideLabel,
    ...rest
  } = props;

  const [hasValue, setHasValue] = useState<boolean>(false);

  const handleChange = (event: { target: { value: string } }) => {
    if (event.target.value !== "") {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  };

  const inputProps = {
    "aria-label": `${label}`,
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
      {!hideLabel && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledInputBase
        {...rest}
        ref={ref}
        inputProps={inputProps}
        type="text"
        multiline={sdsType === "textArea" ? true : false}
        minRows={sdsType === "textArea" ? 4 : 2}
        id={id}
        intent={intent}
        variant="outlined"
        size="small"
        placeholder={placeholder}
        sdsStage={hasValue ? "userInput" : "default"}
        sdsType={sdsType}
        onChange={handleChange}
      />
    </>
  );
};

export default forwardRef(TextInput);
