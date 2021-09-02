import { RadioProps as MUIRadioProps, SvgIcon } from "@material-ui/core";
import React from "react";
import { ReactComponent as IconRadioChecked } from "../../common/svgs/IconRadioChecked.svg";
import { ReactComponent as IconRadioUnChecked } from "../../common/svgs/IconRadioUnchecked.svg";
import { StyledRadioButton } from "./style";

export interface RadioProps
  extends Omit<MUIRadioProps, "color" | "defaultChecked" | "indeterminate"> {
  stage: "checked" | "unchecked" | "indeterminate";
}

const RadioButton = (props: RadioProps): JSX.Element => {
  let newProps: MUIRadioProps;
  switch (props.stage) {
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
        <SvgIcon fillContrast="white" component={IconRadioChecked} />
      }
      icon={<SvgIcon fillContrast="white" component={IconRadioUnChecked} />}
    />
  );
};

export default RadioButton;
