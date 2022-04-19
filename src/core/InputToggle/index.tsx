import React, { useState } from "react";
import { ExtraProps, Toggle } from "./style";

const InputToggle = (props: ExtraProps) => {
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
    >
      {labelValue}
    </Toggle>
  );
};

export default InputToggle;
