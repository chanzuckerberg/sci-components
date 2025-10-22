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
import { EMPTY_OBJECT } from "src/common/utils";

export interface RadioContentProps
  extends Omit<MUIRadioProps, "color" | "defaultChecked"> {
  caption?: React.ReactNode;
  intent?: "default" | "negative" | "notice" | "positive";
  label?: React.ReactNode;
  radioProps?: Partial<MUIRadioProps>;
  stage?: "checked" | "unchecked";
  value?: string;
  classes?: {
    root?: string;
    labelCaptionContainer?: string;
    label?: string;
    caption?: string;
    radioButton?: string;
    radioCheckedIcon?: string;
    radioCheckedIconDot?: string;
    radioDefaultIcon?: string;
  };
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
    classes = EMPTY_OBJECT,
    className,
  } = props;

  // (masoudmanson): We don't need to pass the label prop to the radio component
  // so we are destructuring it here.
  const { label, ...restProps } = props;

  const {
    root,
    labelCaptionContainer,
    label: labelClassName,
    caption: captionClassName,
    radioButton: radioButtonClassName,
    radioCheckedIcon: radioCheckedIconClassName,
    radioCheckedIconDot: radioCheckedIconDotClassName,
    radioDefaultIcon: radioDefaultIconClassName,
  }: RadioProps["classes"] = classes;

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
    <StyledLabelContainer className={labelCaptionContainer}>
      <StyledRadioLabel id={labelId} className={labelClassName}>
        {label}
      </StyledRadioLabel>
      <StyledRadioCaption id={captionId} className={captionClassName}>
        {caption}
      </StyledRadioCaption>
    </StyledLabelContainer>
  ) : (
    <StyledLabelContainer className={labelCaptionContainer}>
      <StyledRadioLabel id={labelId} className={labelClassName}>
        {label}
      </StyledRadioLabel>
    </StyledLabelContainer>
  );

  return (
    <StyledFormControlLabel
      control={
        <StyledRadioButton
          className={radioButtonClassName}
          checkedIcon={
            <StyledRadioCheckedIcon className={radioCheckedIconClassName}>
              <StyledRadioDot className={radioCheckedIconDotClassName} />
            </StyledRadioCheckedIcon>
          }
          icon={
            <StyledRadioDefaultIcon
              intent={intent}
              className={radioDefaultIconClassName}
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
      className={`${root} ${className}`}
    />
  );
};

export default InputRadio;
