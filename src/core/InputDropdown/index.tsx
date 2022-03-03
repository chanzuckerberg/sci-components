import React from "react";
import Icon from "../Icon";
import { InputDropdownProps, StyledDetail, StyledInputDropdown } from "./style";

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
      <span>{label}</span>
      {sdsType === "singleSelect" && details && (
        <StyledDetail>{details}</StyledDetail>
      )}
      <Icon sdsIcon="chevronDown" sdsSize="s" sdsType="interactive" />
    </StyledInputDropdown>
  );
};

export default InputDropdown;
