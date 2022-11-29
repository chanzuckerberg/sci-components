import React, { useState } from "react";
import { InputToggleExtraProps, Toggle } from "./style";

/**
 * @see https://v4.mui.com/components/switches/
 */
const InputToggle = (props: InputToggleExtraProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const { offLabel = "Off", onChange, onLabel = "On", ...rest } = props;
  const labelValue = checked ? onLabel : offLabel;

  const handleChange = (e: React.ChangeEvent) => {
    setChecked(!checked);
    if (onChange) onChange(e);
  };

  return (
    <Toggle
      checked={checked}
      color="primary"
      onChange={handleChange}
      value={labelValue}
      {...rest}
    />
  );
};

export type { InputToggleExtraProps as InputToggleProps };

export default InputToggle;
