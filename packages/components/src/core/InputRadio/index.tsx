import { RadioProps as MUIRadioProps } from "@mui/material";
import {
  RadioExtraProps,
  StyledFormControlLabel,
  StyledLabelContainer,
  StyledRadioButton,
  StyledRadioCaption,
  StyledRadioCheckedIcon,
  StyledRadioDefaultIcon,
  StyledRadioDot,
  StyledRadioLabel,
} from "./style";
import React from "react";

export interface RadioContentProps
  extends Omit<MUIRadioProps, "color" | "defaultChecked"> {
  caption?: string;
  intent?: "default" | "negative" | "notice" | "positive";
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
      <StyledRadioCaption id={captionId}>{caption}</StyledRadioCaption>
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
          checkedIcon={
            <StyledRadioCheckedIcon>
              <StyledRadioDot />
            </StyledRadioCheckedIcon>
          }
          icon={<StyledRadioDefaultIcon intent={intent} />}
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
