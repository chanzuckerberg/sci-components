import { forwardRef } from "react";
import { InputSliderExtraProps, StyledSlider } from "./style";

export type InputSliderProps = InputSliderExtraProps;

/**
 * @see https://mui.com/material-ui/react-slider/
 */
const InputSlider = forwardRef<HTMLSpanElement, InputSliderExtraProps>(
  (props, ref) => {
    return <StyledSlider ref={ref} {...props} />;
  }
);

export default InputSlider;
