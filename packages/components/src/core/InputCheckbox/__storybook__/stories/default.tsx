import { Args } from "@storybook/react-webpack5";
import { useState } from "react";
import RawInputCheckbox from "src/core/InputCheckbox";

export const InputCheckbox = (props: Args): JSX.Element => {
  const { disabled } = props;
  const [checked, setChecked] = useState(true);

  const handleChange = () => setChecked((prevState) => !prevState);

  return (
    <RawInputCheckbox
      disabled={disabled}
      onChange={handleChange}
      stage={checked ? "unchecked" : "checked"}
      {...props}
    />
  );
};
