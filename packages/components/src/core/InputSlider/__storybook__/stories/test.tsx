import { Args } from "@storybook/types";
import { useState, useEffect } from "react";
import RawInputSlider from "src/core/InputSlider";
import {
  INPUT_SLIDER_GENERATE_CUSTOM_MARKS,
  INPUT_SLIDER_LIVE_PREVIEW_ROW_STYLES,
} from "../constants";

export const TestDemo = (props: Args): JSX.Element => {
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
    <div style={INPUT_SLIDER_LIVE_PREVIEW_ROW_STYLES as React.CSSProperties}>
      <RawInputSlider
        {...rest}
        max={max}
        min={min}
        value={value}
        onChange={handleChange}
        data-testid="test-input-slider"
        marks={marks ? customMarks : false}
      />
    </div>
  );
};
