import { Args } from "@storybook/react-vite";
import { useState } from "react";
import RawInputToggle from "@components/src/core/InputToggle";

export const ControlledDemo = (props: Args): JSX.Element => {
  const [isChecked, setIsChecked] = useState(true);

  function handleChange() {
    setIsChecked((currentChecked) => !currentChecked);
  }

  return (
    <RawInputToggle {...props} checked={isChecked} onChange={handleChange} />
  );
};
