import React from "react";
import IconButton from "../IconButton";
import { InputDropdownProps, StyledInputDropdown } from "./style";

export { InputDropdownProps };

const InputDropdown = (props: InputDropdownProps): JSX.Element => {
  const { label, open } = props;

  if (open !== undefined) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: InputDropdown prop `open` has been replaced by `sdsStage` and will be deprecated."
    );
  }

  return (
    <StyledInputDropdown {...props}>
      <span>{label}</span>
      <IconButton
        active={open}
        sdsIcon="chevronDown"
        sdsSize="s"
        sdsType="secondary" // TODO: check this against states
      />
    </StyledInputDropdown>
  );
};

export default InputDropdown;
