import { InputSlider, InputSliderProps } from "czifui";
import React from "react";

const InputSearchNameSpaceTest = (props: InputSliderProps) => {
  return (
    <InputSlider
      defaultValue={10}
      disabled={false}
      marks={false}
      max={100}
      min={0}
      orientation="horizontal"
      step={1}
      valueLabelDisplay="auto"
    />
  );
};
