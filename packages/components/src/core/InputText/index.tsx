import { TextFieldProps as RawTextFieldProps } from "@mui/material";
import React, { forwardRef, useState } from "react";
import { InputTextExtraProps, StyledInputBase, StyledLabel } from "./style";

interface AccessibleInputTextProps {
  label: string;
  placeholder?: string;
  id: string;
}

export type InputTextProps = RawTextFieldProps &
  InputTextExtraProps &
  AccessibleInputTextProps;

/**
 * @see https://mui.com/material-ui/react-text-field/
 */
const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText(props, ref): JSX.Element {
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
      if (event.target.value) {
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
        `Error: @czi-sds/components component InputText requires id and label props for accessibility.`
      );
      return <></>;
    }

    return (
      <>
        {!hideLabel && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
        <StyledInputBase
          ref={ref}
          inputProps={inputProps}
          type="text"
          multiline={sdsType === "textArea"}
          minRows={sdsType === "textArea" ? 4 : 2}
          id={id}
          intent={intent}
          variant="outlined"
          size="small"
          placeholder={placeholder}
          sdsStage={hasValue ? "userInput" : "default"}
          sdsType={sdsType}
          onChange={handleChange}
          {...rest}
        />
      </>
    );
  }
);

export default InputText;
