import React from "react";
import Icon from "../Icon";
import {
  IconWrapper,
  LabelWrapper,
  MinimalDetails,
  InputDropdownProps as SdsInputDropdownProps,
  StyledCounter,
  StyledDetail,
  StyledInputDropdown,
  StyledLabel,
} from "./style";

export type InputDropdownProps = SdsInputDropdownProps &
  React.HTMLAttributes<HTMLButtonElement>;

/**
 * @see https://mui.com/material-ui/react-button/
 */
const InputDropdown = (props: InputDropdownProps): JSX.Element => {
  const {
    label,
    open,
    multiple = false,
    sdsStyle,
    sdsType = "label",
    details,
    counter,
    shouldTruncateMinimalDetails,
    shouldPutAColonAfterLabel = true,
    value,
  } = props;

  const isMinimal = sdsStyle === "minimal";

  if (open !== undefined) {
    // eslint-disable-next-line no-console
    console.warn(
      "Warning: InputDropdown prop `open` has been replaced by `sdsStage` and will be deprecated."
    );
  }

  const shouldRenderDetails = !multiple && (details || value) && !isMinimal;
  const shouldRenderInlineMinimalDetails =
    isMinimal && sdsType === "value" && !multiple;
  const shouldRenderMinimalDetails = isMinimal && sdsType === "label";
  const shouldRenderCounter =
    multiple && counter !== undefined && counter !== "0" && !isMinimal;

  return (
    <StyledInputDropdown {...props}>
      <LabelWrapper isMinimal={isMinimal}>
        <StyledLabel
          className="styled-label"
          details={details}
          counter={counter}
          sdsType={sdsType}
        >
          {renderLabelText({
            counter,
            details,
            isMinimal,
            label,
            multiple,
            sdsType,
            shouldPutAColonAfterLabel,
            value,
          })}
        </StyledLabel>
        {shouldRenderDetails && (
          <StyledDetail>
            {renderDetailsText({ details, sdsType, value })}
          </StyledDetail>
        )}
        {shouldRenderInlineMinimalDetails && (
          <StyledDetail>
            {renderDetailsText({ details, sdsType, value })}
          </StyledDetail>
        )}
        {shouldRenderCounter && <StyledCounter>{counter}</StyledCounter>}
        <IconWrapper>
          <Icon sdsIcon="chevronDown" sdsSize="s" sdsType="interactive" />
        </IconWrapper>
      </LabelWrapper>

      {shouldRenderMinimalDetails && (
        <MinimalDetails
          shouldTruncateMinimalDetails={shouldTruncateMinimalDetails}
        >
          {renderDetailsText({ details, sdsType, value })}
        </MinimalDetails>
      )}
    </StyledInputDropdown>
  );
};

interface RenderLabelTextProps {
  counter: InputDropdownProps["counter"];
  details: InputDropdownProps["details"];
  isMinimal: boolean;
  label: InputDropdownProps["label"];
  multiple: InputDropdownProps["multiple"];
  shouldPutAColonAfterLabel: InputDropdownProps["shouldPutAColonAfterLabel"];
  sdsType: InputDropdownProps["sdsType"];
  value: InputDropdownProps["value"];
}

function renderLabelText(props: RenderLabelTextProps) {
  const { sdsType } = props;

  if (sdsType === "label") {
    return renderLabelTypeLabelText(props);
  }

  if (sdsType === "value") {
    return renderValueTypeLabelText(props);
  }

  return null;
}

function renderLabelTypeLabelText({
  isMinimal,
  label,
  counter,
  value,
  shouldPutAColonAfterLabel,
}: RenderLabelTextProps) {
  if (isMinimal) return label;

  return (counter || value) && shouldPutAColonAfterLabel ? `${label}:` : label;
}

function renderValueTypeLabelText({
  value,
  multiple,
  isMinimal,
  label,
  counter,
  details,
  shouldPutAColonAfterLabel,
}: RenderLabelTextProps) {
  if (!value || multiple) {
    if (isMinimal) return label;

    return counter && shouldPutAColonAfterLabel ? `${label}:` : label;
  }

  if (isMinimal) return value;

  return (counter || details) && shouldPutAColonAfterLabel
    ? `${value}:`
    : value;
}

function renderDetailsText({
  details,
  sdsType,
  value,
}: {
  details: InputDropdownProps["details"];
  sdsType: InputDropdownProps["sdsType"];
  value: InputDropdownProps["value"];
}) {
  if (sdsType === "label" && value) {
    return value;
  } else if (sdsType === "value") {
    return details;
  }
}

export default InputDropdown;
