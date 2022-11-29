import { FormControlLabel } from "@mui/material";
import { CheckboxProps, InputCheckbox } from "czifui";
import React from "react";
import { noop } from "src/common/utils";

const InputCheckboxNameSpaceTest = (props: CheckboxProps) => {
  return (
    <FormControlLabel
      control={
        <InputCheckbox
          data-testid="checkbox"
          disabled={false}
          onChange={noop}
          stage="unchecked"
        />
      }
      label="Label"
    />
  );
};
