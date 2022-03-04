import React from "react";
import Icon from "../Icon";
import {
  InputDropdownProps,
  StyledCounter,
  StyledDetail,
  StyledInputDropdown,
  StyledLabel,
} from "./style";

export type { InputDropdownProps };

const InputDropdown = (props: InputDropdownProps): JSX.Element => {
  const { label, open, sdsType, details, counter } = props;

  if (open !== undefined) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: InputDropdown prop `open` has been replaced by `sdsStage` and will be deprecated."
    );
  }

  return (
    <StyledInputDropdown {...props}>
      <StyledLabel details={details}>{label}</StyledLabel>
      {sdsType === "singleSelect" && details && (
        <StyledDetail>{details}</StyledDetail>
      )}
      {sdsType === "multiSelect" && counter && (
        <StyledCounter>{counter}</StyledCounter>
      )}
      <Icon sdsIcon="chevronDown" sdsSize="s" sdsType="interactive" />
    </StyledInputDropdown>
  );
};

export default InputDropdown;
