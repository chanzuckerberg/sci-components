import { Args } from "@storybook/react";
import RawInputSlider from "src/core/InputSlider";
import {
  INPUT_SLIDER_GENERATE_CUSTOM_MARKS,
  INPUT_SLIDER_LIVE_PREVIEW_ROW_STYLES,
} from "../constants";

export const TestDemo = (props: Args): JSX.Element => {
  const { marks, max, min } = props;

  const customMarks = INPUT_SLIDER_GENERATE_CUSTOM_MARKS(min, max);

  return (
    <div style={INPUT_SLIDER_LIVE_PREVIEW_ROW_STYLES as React.CSSProperties}>
      <RawInputSlider
        {...props}
        data-testid="test-input-slider"
        marks={marks ? customMarks : false}
      />
    </div>
  );
};
