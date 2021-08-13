import { CheckboxProps as MUICheckboxProps, SvgIcon } from "@material-ui/core";
import React from "react";
import IconCheckboxChecked from "../../common/svgs/IconCheckboxChecked.svg";
import IconCheckboxIndeterminate from "../../common/svgs/IconCheckboxIndeterminate.svg";
import IconCheckboxUnchecked from "../../common/svgs/IconCheckboxUnchecked.svg";
import { StyledCheckbox } from "./styles";

interface CheckboxProps
  extends Omit<MUICheckboxProps, "color" | "defaultChecked" | "indeterminate"> {
  stage: "checked" | "unchecked" | "indeterminate";
}

const Checkbox = (props: CheckboxProps): JSX.Element => {
  let newProps: MUICheckboxProps;
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
    case "indeterminate":
      newProps = {
        ...props,
        checked: true,
        color: "primary",
        indeterminate: true,
      };
      break;
    default:
      newProps = props;
  }

  return (
    <StyledCheckbox
      {...newProps}
      checkedIcon={
        <SvgIcon fillContrast="white" component={IconCheckboxChecked} />
      }
      icon={<SvgIcon fillContrast="white" component={IconCheckboxUnchecked} />}
      indeterminateIcon={
        <SvgIcon fillContrast="white" component={IconCheckboxIndeterminate} />
      }
    />
  );
};

export default Checkbox;
