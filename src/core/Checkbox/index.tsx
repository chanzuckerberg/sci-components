import { Checkbox as RawCheckbox, CheckboxProps } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import React from "react";

export const Checkbox = (props: CheckboxProps) => {
  return (
    <StylesProvider injectFirst>
      <RawCheckbox {...props} />
    </StylesProvider>
  );
};

export default Checkbox;
