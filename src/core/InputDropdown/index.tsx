import React from "react";
import Icon from "../Icon";
import {
  InputDropdownProps,
  MinimalDetails,
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
  const {
    label,
    open,
    sdsType,
    sdsStyle,
    details,
    counter,
    shouldTruncateMinimalDetails,
  } = props;

  const isMinimal = sdsStyle === "minimal";

  if (open !== undefined) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: InputDropdown prop `open` has been replaced by `sdsStage` and will be deprecated."
    );
  }

  const shouldRenderDetails =
    sdsType === "singleSelect" && details && !isMinimal;

  const shouldRenderCounter =
    sdsType === "multiSelect" && counter !== undefined;

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
          {renderLabelText({ counter, details, isMinimal, label })}
        </StyledLabel>
        {shouldRenderDetails && <StyledDetail>{details}</StyledDetail>}
        {shouldRenderCounter && <StyledCounter>{counter}</StyledCounter>}
        <Icon sdsIcon="chevronDown" sdsSize="s" sdsType="interactive" />
      </span>

      {isMinimal && (
        <MinimalDetails
          shouldTruncateMinimalDetails={shouldTruncateMinimalDetails}
        >
          {details}
        </MinimalDetails>
      )}
    </StyledInputDropdown>
  );
};

function renderLabelText({
  counter,
  details,
  isMinimal,
  label,
}: {
  counter: InputDropdownProps["counter"];
  details: InputDropdownProps["details"];
  isMinimal: boolean;
  label: InputDropdownProps["label"];
}) {
  if (isMinimal) {
    return label;
  }

  return counter !== undefined || details ? `${label}:` : label;
}

export default InputDropdown;
