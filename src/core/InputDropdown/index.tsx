import { SvgIcon } from "@material-ui/core";
import React from "react";
import { ReactComponent as IconArrowDown } from "../../common/svgs/IconArrowDown.svg";
import { Props } from "../styles";
import { StyledInputDropdown } from "./styles";

export interface InputDropdownProps extends Props {
  disabled?: boolean;
  label: string;
  onClick: () => void;
  sdsStyle?: "minimal" | "square" | "rounded";
}

const InputDropdown = (props: InputDropdownProps): JSX.Element => {
  const { label } = props;

  return (
    <StyledInputDropdown {...props}>
      <span>{label}</span>
      <SvgIcon viewBox="0 0 14 14" component={IconArrowDown} />
    </StyledInputDropdown>
  );
};

export default InputDropdown;
