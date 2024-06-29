import { forwardRef } from "react";
import { InputSliderExtraProps, StyledSlider } from "./style";

export type InputSliderProps = InputSliderExtraProps;

/**
 * @see https://mui.com/material-ui/react-slider/
 */
const InputSlider = forwardRef<HTMLSpanElement, InputSliderExtraProps>(
  (props, ref) => {
    const { min, max, ...rest } = props;
    return (
      <StyledSlider
        ref={ref}
        min={min}
        max={max}
        {...rest}
        orientation="horizontal"
        aria-label={`Slider - min ${min} to max ${max}`}
      />
    );
  }
);

export default InputSlider;
