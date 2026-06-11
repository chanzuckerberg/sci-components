import { Args } from "@storybook/react-vite";
import { useState } from "react";
import RawInputCheckbox from "@components/src/core/InputCheckbox";

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
