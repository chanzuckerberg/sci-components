import { RadioProps as MUIRadioProps, SvgIcon } from "@material-ui/core";
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
  const { stage } = props;
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
};

export default RadioButton;
