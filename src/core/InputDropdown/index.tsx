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

/**
 * @see https://mui.com/material-ui/react-button/
 */
const InputDropdown = (props: InputDropdownProps): JSX.Element => {
  const { label, open, sdsType, sdsStyle, details, counter } = props;

  // DEBUG
  // DEBUG
  // DEBUG
  console.log("---sdsStyle", sdsStyle);

  const isMinimal = sdsStyle === "minimal";

  // if sdsStyle is minimal, render details in new line, otherwise between label and icon

  if (open !== undefined) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: InputDropdown prop `open` has been replaced by `sdsStage` and will be deprecated."
    );
  }

  return (
    <StyledInputDropdown
      style={{
        alignItems: isMinimal ? "flex-start" : "center",
        flexDirection: isMinimal ? "column" : "row",
      }}
      {...props}
    >
      <span
        style={{
          alignItems: isMinimal ? "center" : undefined,
          display: isMinimal ? "inline-flex" : "contents",
        }}
      >
        <StyledLabel
          className="styled-label"
          details={details}
          counter={counter}
        >
          {counter !== undefined || details ? `${label}:` : label}
        </StyledLabel>
        {sdsType === "singleSelect" && details && (
          <StyledDetail>{details}</StyledDetail>
        )}
        {sdsType === "multiSelect" && counter !== undefined && (
          <StyledCounter>{counter}</StyledCounter>
        )}
        <Icon sdsIcon="chevronDown" sdsSize="s" sdsType="interactive" />
      </span>

      {isMinimal && <div>new minimal details</div>}
    </StyledInputDropdown>
  );
};

export default InputDropdown;
