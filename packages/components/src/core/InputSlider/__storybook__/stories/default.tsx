import { Args } from "@storybook/react";
import RawInputSlider from "src/core/InputSlider";
import {
  INPUT_SLIDER_DEMO_WRAPPER_STYLES,
  INPUT_SLIDER_GENERATE_CUSTOM_MARKS,
} from "../constants";

export const InputSlider = (props: Args): JSX.Element => {
  const { marks, max, min } = props;

  const customMarks = INPUT_SLIDER_GENERATE_CUSTOM_MARKS(min, max);

  return (
    <div style={INPUT_SLIDER_DEMO_WRAPPER_STYLES as React.CSSProperties}>
      <RawInputSlider {...props} marks={marks ? customMarks : false} />
    </div>
  );
};
