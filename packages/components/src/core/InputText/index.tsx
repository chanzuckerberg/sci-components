import { TextFieldProps as RawTextFieldProps } from "@mui/material";
import { forwardRef, useRef, useState } from "react";
import { InputTextExtraProps, StyledInputBase, StyledLabel } from "./style";
import useDetectUserTabbing from "src/common/helpers/userTabbing";

interface AccessibleInputTextProps {
  label: React.ReactNode;
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

    const finalLabel =
      typeof label === "string" ? (
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
      ) : (
        label
      );

    return (
      <>
        {!hideLabel && finalLabel}
        <StyledInputBase
          ref={ref ? ref : inputRef}
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
