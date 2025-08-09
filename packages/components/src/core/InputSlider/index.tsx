import { forwardRef } from "react";
import { InputSliderExtraProps, StyledSlider } from "./style";

export type InputSliderProps = InputSliderExtraProps;

/**
 * @see https://mui.com/material-ui/react-slider/
 */
const InputSlider = forwardRef<HTMLSpanElement, InputSliderExtraProps>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      "aria-label": ariaLabel,
      getAriaLabel,
      ...rest
    } = props;

    // Check if this is a range slider
    const isRangeSlider = Boolean(
      Array.isArray(value) || Array.isArray(defaultValue)
    );

    const ariaProps = getAriaLabel
      ? { getAriaLabel }
      : {
          getAriaLabel: isRangeSlider
            ? (index: number) =>
                index === 0 ? "Minimum value" : "Maximum value"
            : () => ariaLabel || "Slider value",
        };

    return (
      <StyledSlider
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        {...rest}
        {...ariaProps}
        orientation="horizontal"
      />
    );
  }
);

InputSlider.displayName = "InputSlider";

export default InputSlider;
