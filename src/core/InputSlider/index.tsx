import React, { forwardRef } from "react";
import { InputSliderExtraProps, StyledSlider } from "./style";

/**
 * @see https://v4.mui.com/components/slider/
 */
const InputSlider = forwardRef<HTMLSpanElement, InputSliderExtraProps>(
  (props, ref) => {
    return <StyledSlider ref={ref} {...props} />;
  }
);

export default InputSlider;
