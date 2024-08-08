"use client";

import { RadioProps as MUIRadioProps, SvgIcon } from "@mui/material";
import { ReactComponent as IconRadioChecked } from "../../common/svgs/IconRadioChecked.svg";
import { ReactComponent as IconRadioUnChecked } from "../../common/svgs/IconRadioUnchecked.svg";
import {
  RadioExtraProps,
  StyledFormControlLabel,
  StyledLabelContainer,
  StyledRadioButton,
  StyledRadioCaption,
  StyledRadioLabel,
} from "./style";
import React from "react";

export interface RadioContentProps
  extends Omit<MUIRadioProps, "color" | "defaultChecked"> {
  caption?: string;
  intent?: "default" | "error" | "warning";
  label?: React.ReactNode;
  radioProps?: Partial<MUIRadioProps>;
  stage?: "checked" | "unchecked";
  value?: string;
}

export type RadioProps = RadioContentProps & RadioExtraProps;

/**
 * @see https://mui.com/material-ui/react-radio-button/
 */
const InputRadio = (props: RadioProps): JSX.Element => {
  const {
    caption,
    disabled,
    intent = "default",
    radioProps,
    stage,
    value,
  } = props;

  // (masoudmanson): We don't need to pass the label prop to the radio component
  // so we are destructuring it here.
  const { label, ...restProps } = props;

  let newProps: MUIRadioProps;
  switch (stage) {
    case "checked":
      newProps = {
        ...restProps,
        checked: true,
        color: "primary",
      };
      break;
    case "unchecked":
      newProps = {
        ...restProps,
        checked: false,
        color: "default",
      };
      break;
    default:
      newProps = restProps;
  }

  // (masoudmanson): The id for the label and caption is required for accessibility.
  // Otherwise, the screen reader will read the label twice!
  const labelId = `${value}-label`;
  const captionId = caption ? `${value}-caption` : undefined;

  const finalLabel = caption ? (
    <StyledLabelContainer>
      <StyledRadioLabel id={labelId}>{label}</StyledRadioLabel>
      <StyledRadioCaption disabled={disabled} id={captionId}>
        {caption}
      </StyledRadioCaption>
    </StyledLabelContainer>
  ) : (
    <StyledLabelContainer>
      <StyledRadioLabel id={labelId}>{label}</StyledRadioLabel>
    </StyledLabelContainer>
  );

  return (
    <StyledFormControlLabel
      control={
        <StyledRadioButton
          disabled={disabled}
          checkedIcon={
            <SvgIcon
              fillcontrast="white"
              component={IconRadioChecked}
              viewBox="0 0 16 16"
            />
          }
          icon={
            <SvgIcon
              fillcontrast="white"
              component={IconRadioUnChecked}
              viewBox="0 0 16 16"
            />
          }
          intent={intent}
          {...radioProps}
          {...newProps}
        />
      }
      disabled={disabled}
      label={finalLabel}
      value={value}
    />
  );
};

export default InputRadio;
