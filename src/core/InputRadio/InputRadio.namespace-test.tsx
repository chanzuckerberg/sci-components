import { RadioGroup } from "@mui/material";
import { InputRadio, RadioProps } from "czifui";
import React from "react";

const InputRadioNameSpaceTest = (props: RadioProps) => {
  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="demo"
      name="radio-buttons-group"
    >
      <InputRadio label="Label" value="demo" />
    </RadioGroup>
  );
};
