import React from "react";
import { InputSliderExtraProps, StyledSlider } from "./style";

/**
 * @see https://v4.mui.com/components/slider/
 */
const InputSlider = (props: InputSliderExtraProps) => {
  return <StyledSlider {...props} />;
};

export default InputSlider;
