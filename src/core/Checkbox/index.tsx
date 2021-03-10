import { Checkbox as RawCheckbox, CheckboxProps } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import React from "react";

const Checkbox = (props: CheckboxProps) => {
  return (
    <StylesProvider injectFirst>
      {/*  eslint-disable-next-line react/jsx-props-no-spreading -- disable prop spread for extension */}
      <RawCheckbox {...props} />
    </StylesProvider>
  );
};

export default Checkbox;
