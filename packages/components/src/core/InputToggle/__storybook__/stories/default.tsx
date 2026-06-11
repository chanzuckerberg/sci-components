import { Args } from "@storybook/react-vite";
import RawInputToggle from "@components/src/core/InputToggle";

export const InputToggle = (props: Args): JSX.Element => {
  return (
    <RawInputToggle {...props} inputProps={{ "aria-label": "Input Toggle" }} />
  );
};
