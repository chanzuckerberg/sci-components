import { Args } from "@storybook/react";
import RawInputSlider from "src/core/InputSlider";
import {
  INPUT_SLIDER_GENERATE_CUSTOM_MARKS,
  INPUT_SLIDER_LIVE_PREVIEW_ROW_STYLES,
} from "../constants";

export const LivePreviewDemo = (props: Args): JSX.Element => {
  const { marks, max, min } = props;

  const customMarks = INPUT_SLIDER_GENERATE_CUSTOM_MARKS(min, max);

  return (
    <div style={INPUT_SLIDER_LIVE_PREVIEW_ROW_STYLES as React.CSSProperties}>
      <div>
        <RawInputSlider
          step={5}
          valueLabelDisplay="on"
          {...props}
          defaultValue={85}
          marks={marks ? customMarks : false}
          orientation="horizontal"
        />
      </div>

      <div>
        <RawInputSlider
          step={5}
          valueLabelDisplay="on"
          {...props}
          marks={marks ? customMarks : false}
          orientation="horizontal"
        />
      </div>
    </div>
  );
};
