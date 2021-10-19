import { SvgIcon } from "@material-ui/core";
import React from "react";
import { ReactComponent as IconArrowDown } from "../../common/svgs/IconArrowDown.svg";
import { InputDropdownProps, StyledInputDropdown } from "./styles";

export { InputDropdownProps };

const InputDropdown = (props: InputDropdownProps): JSX.Element => {
  const { label } = props;

  return (
    <StyledInputDropdown {...props}>
      <span>{label}</span>
      <SvgIcon
        viewBox="0 0 14 14"
        component={IconArrowDown}
        fillcontrast="white"
      />
    </StyledInputDropdown>
  );
};

export default InputDropdown;
