"use client";

import React, { useState } from "react";
import { InputToggleExtraProps, Toggle } from "./style";

/**
 * @see https://mui.com/material-ui/react-switch/
 */
const InputToggle = (props: InputToggleExtraProps) => {
  const isControlled = props.checked !== undefined;

  const [checked, setChecked] = useState<boolean>(false);

  const finalChecked = isControlled ? props.checked : checked;

  const { offLabel = "Off", onChange, onLabel = "On", ...rest } = props;

  const labelValue = finalChecked ? onLabel : offLabel;

  const handleChange = (e: React.ChangeEvent) => {
    setChecked((currentChecked) => !currentChecked);

    onChange?.(e);
  };

  return (
    <Toggle
      checked={finalChecked}
      color="primary"
      onChange={handleChange}
      value={labelValue}
      {...rest}
    />
  );
};

export type { InputToggleExtraProps as InputToggleProps };

export default InputToggle;
