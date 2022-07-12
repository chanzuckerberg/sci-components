import { RadioProps as MUIRadioProps, SvgIcon } from "@mui/material";
import React from "react";
import { ReactComponent as IconRadioChecked } from "../../common/svgs/IconRadioChecked.svg";
import { ReactComponent as IconRadioUnChecked } from "../../common/svgs/IconRadioUnchecked.svg";
import { StyledRadioButton } from "./style";

export interface RadioProps
  extends Omit<MUIRadioProps, "color" | "defaultChecked"> {
  stage: "checked" | "unchecked";
}

/**
 * @see https://v4.mui.com/components/radio-buttons/
 */
const RadioButton = (props: RadioProps): JSX.Element => {
  let newProps: MUIRadioProps;
  const { stage } = props;

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
      data-testid="radioButton"
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
};

export default RadioButton;
