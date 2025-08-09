import { Args } from "@storybook/react";
import { useState, useEffect } from "react";
import RawInputSlider from "src/core/InputSlider";
import {
  INPUT_SLIDER_DEMO_WRAPPER_STYLES,
  INPUT_SLIDER_GENERATE_CUSTOM_MARKS,
} from "../constants";

export const InputSlider = (props: Args): JSX.Element => {
  const { marks, max, min, defaultValue, ...rest } = props;

  const [value, setValue] = useState(defaultValue);

  // Update internal state when defaultValue changes from Storybook controls
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const customMarks = INPUT_SLIDER_GENERATE_CUSTOM_MARKS(min, max);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  return (
    <div style={INPUT_SLIDER_DEMO_WRAPPER_STYLES as React.CSSProperties}>
      <RawInputSlider
        {...rest}
        max={max}
        min={min}
        value={value}
        onChange={handleChange}
        marks={marks ? customMarks : false}
        aria-label="Input slider demo"
      />
    </div>
  );
};
