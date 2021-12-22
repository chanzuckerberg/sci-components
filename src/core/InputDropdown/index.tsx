import React from "react";
import Icon from "../Icon";
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
      <Icon sdsIcon="chevronDown" sdsSize="s" sdsType="interactive" />
    </StyledInputDropdown>
  );
};

export default InputDropdown;
