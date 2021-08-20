import { SvgIcon } from "@material-ui/core";
import React from "react";
import { ReactComponent as IconArrowDown } from "../../common/svgs/IconArrowDown.svg";
import { InputDropdownProps, StyledInputDropdown } from "./styles";

const InputDropdown = (props: InputDropdownProps): JSX.Element => {
  const { label } = props;

  return (
    <StyledInputDropdown {...props}>
      <span>{label}</span>
      <SvgIcon
        viewBox="0 0 14 14"
        component={IconArrowDown}
        fillContrast="white"
      />
    </StyledInputDropdown>
  );
};

export default InputDropdown;
