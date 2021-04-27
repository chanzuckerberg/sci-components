import { Checkbox as RawCheckbox, CheckboxProps } from "@material-ui/core";
import React from "react";

export { CheckboxProps };

const Checkbox = (props: CheckboxProps): JSX.Element => {
  return <RawCheckbox {...props} />;
};

export default Checkbox;
