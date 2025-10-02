import { Args } from "@storybook/types";
import RawInputToggle from "src/core/InputToggle";

export const InputToggle = (props: Args): JSX.Element => {
  return (
    <RawInputToggle {...props} inputProps={{ "aria-label": "Input Toggle" }} />
  );
};
