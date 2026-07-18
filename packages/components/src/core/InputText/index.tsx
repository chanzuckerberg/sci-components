import { TextFieldProps as RawTextFieldProps } from "@mui/material";
import { forwardRef, useRef } from "react";
import { InputTextExtraProps, StyledInputBase, StyledLabel } from "./style";
import useDetectUserTabbing from "@components/src/common/helpers/userTabbing";
import { EMPTY_OBJECT, cn } from "@components/src/common/utils";

interface AccessibleInputTextProps {
  label: React.ReactNode;
  placeholder?: string;
  id: string;
  classes?: {
    root?: string;
    label?: string;
    input?: string;
  };
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
      classes = EMPTY_OBJECT,
      className,
      slotProps: userSlotProps,
      ...rest
    } = props;

    const {
      root: rootClassName,
      label: labelClassName,
      input: inputClassName,
    }: InputTextProps["classes"] = classes;

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

    // Merge the SDS default slot props with any consumer-provided slot props so
    // overrides still take effect while preserving the SDS defaults (e.g. the
    // generated `aria-label` on the htmlInput slot, which is required for the
    // input's accessible name). Consumer values win on conflict.
    const mergedSlotProps = {
      ...userSlotProps,
      htmlInput: {
        "aria-label": `${label}`,
        ...(typeof userSlotProps?.htmlInput === "object"
          ? userSlotProps.htmlInput
          : {}),
      },
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
        <StyledLabel htmlFor={id} className={cn(labelClassName)}>
          {label}
        </StyledLabel>
      ) : (
        label
      );

    return (
      <div className={cn(rootClassName)}>
        {!hideLabel && finalLabel}
        <StyledInputBase
          className={cn(inputClassName, className)}
          ref={ref ? ref : inputRef}
          slotProps={mergedSlotProps}
          type="text"
          multiline={sdsType === "textArea"}
          minRows={sdsType === "textArea" ? 4 : 2}
          id={id}
          intent={intent}
          variant="outlined"
          size="small"
          placeholder={placeholder}
          sdsType={sdsType}
          {...rest}
        />
      </div>
    );
  }
);

export default InputText;
