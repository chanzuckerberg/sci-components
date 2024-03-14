import { Args } from "@storybook/react";
import RawButtonDropdown from "src/core/ButtonDropdown";
import { BUTTON_DROPDOWN_TEXT } from "../constants";

export const ButtonDropdown = (props: Args): JSX.Element => {
  return (
    <RawButtonDropdown {...props}>{BUTTON_DROPDOWN_TEXT}</RawButtonDropdown>
  );
};
