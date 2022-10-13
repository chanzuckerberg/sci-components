import {
  FormControlLabel,
  RadioProps as MUIRadioProps,
  SvgIcon,
} from "@mui/material";
import React from "react";
import { ReactComponent as IconRadioChecked } from "../../common/svgs/IconRadioChecked.svg";
import { ReactComponent as IconRadioUnChecked } from "../../common/svgs/IconRadioUnchecked.svg";
import { StyledRadioButton } from "./style";

export interface RadioProps
  extends Omit<MUIRadioProps, "color" | "defaultChecked"> {
  label?: string;
  radioProps?: Partial<MUIRadioProps>;
  stage?: "checked" | "unchecked";
  value?: string;
}

/**
 * @see https://v4.mui.com/components/radio-buttons/
 */
const InputRadio = (props: RadioProps): JSX.Element => {
  const { label, stage, radioProps, value } = props;

  if (label === undefined && stage !== undefined) {
    let newProps: MUIRadioProps;
    switch (stage) {
      case "checked":
        newProps = {
          ...props,
          checked: true,
          color: "primary",
        };
        break;
      case "unchecked":
        newProps = {
          ...props,
          checked: false,
          color: "default",
        };
        break;
      default:
        newProps = props;
    }

    return (
      <StyledRadioButton
        {...newProps}
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
      />
    );
  }

  return (
    <FormControlLabel
      control={
        <StyledRadioButton
          checkedIcon={
            <SvgIcon
              fillcontrast="white"
              component={IconRadioChecked}
              viewBox="0 0 16 16"
            />
          }
          data-testid="radioButton"
          icon={
            <SvgIcon
              fillcontrast="white"
              component={IconRadioUnChecked}
              viewBox="0 0 16 16"
            />
          }
          {...radioProps}
        />
      }
      label={label}
      value={value}
    />
  );
};

export default InputRadio;
