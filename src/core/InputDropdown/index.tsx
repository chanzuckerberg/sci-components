import React from "react";
import Icon from "../Icon";
import {
  InputDropdownProps,
  LabelWrapper,
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
    shouldPutAColonAfterLabel = true,
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
    sdsType === "multiSelect" && counter !== undefined && !isMinimal;

  return (
    <StyledInputDropdown {...props}>
      <LabelWrapper isMinimal={isMinimal}>
        <span style={{ display: "contents" }}>
          <StyledLabel
            className="styled-label"
            details={details}
            counter={counter}
          >
            {renderLabelText({
              counter,
              details,
              isMinimal,
              label,
              shouldPutAColonAfterLabel,
            })}
          </StyledLabel>
          {shouldRenderDetails && <StyledDetail>{details}</StyledDetail>}
          {shouldRenderCounter && <StyledCounter>{counter}</StyledCounter>}
        </span>
        <Icon sdsIcon="chevronDown" sdsSize="s" sdsType="interactive" />
      </LabelWrapper>

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
  shouldPutAColonAfterLabel,
}: {
  counter: InputDropdownProps["counter"];
  details: InputDropdownProps["details"];
  isMinimal: boolean;
  label: InputDropdownProps["label"];
  shouldPutAColonAfterLabel: InputDropdownProps["shouldPutAColonAfterLabel"];
}) {
  if (isMinimal) {
    return label;
  }

  return (counter !== undefined || details) && shouldPutAColonAfterLabel
    ? `${label}:`
    : label;
}

export default InputDropdown;
