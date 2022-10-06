import {
  CheckboxProps as MUICheckboxProps,
  FormControlLabel,
  SvgIcon,
} from "@mui/material";
import React from "react";
import { ReactComponent as IconCheckboxChecked } from "../../common/svgs/IconCheckboxChecked.svg";
import { ReactComponent as IconCheckboxIndeterminate } from "../../common/svgs/IconCheckboxIndeterminate.svg";
import { ReactComponent as IconCheckboxUnchecked } from "../../common/svgs/IconCheckboxUnchecked.svg";
import { StyledCheckbox } from "./styles";

export interface CheckboxProps
  extends Omit<MUICheckboxProps, "color" | "defaultChecked" | "indeterminate"> {
  checkboxProps?: Partial<MUICheckboxProps>;
  label?: string;
  stage?: "checked" | "unchecked" | "indeterminate";
}

/**
 * @see https://v4.mui.com/components/checkboxes/
 */
const Checkbox = (props: CheckboxProps): JSX.Element => {
  const { stage, label, disabled, checkboxProps } = props;

  if (label === undefined && stage !== undefined) {
    let newProps: MUICheckboxProps;
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
          <SvgIcon
            fillcontrast="white"
            component={IconCheckboxChecked}
            viewBox="0 0 16 16"
          />
        }
        icon={
          <SvgIcon
            fillcontrast="white"
            component={IconCheckboxUnchecked}
            viewBox="0 0 16 16"
          />
        }
        indeterminateIcon={
          <SvgIcon
            fillcontrast="white"
            component={IconCheckboxIndeterminate}
            viewBox="0 0 16 16"
          />
        }
      />
    );
  }

  return (
    <FormControlLabel
      label={label}
      control={
        <StyledCheckbox
          data-testid="labelCheckbox"
          disabled={disabled}
          checkedIcon={
            <SvgIcon
              fillcontrast="white"
              component={IconCheckboxChecked}
              viewBox="0 0 16 16"
            />
          }
          icon={
            <SvgIcon
              fillcontrast="white"
              component={IconCheckboxUnchecked}
              viewBox="0 0 16 16"
            />
          }
          indeterminateIcon={
            <SvgIcon
              fillcontrast="white"
              component={IconCheckboxIndeterminate}
              viewBox="0 0 16 16"
            />
          }
          {...checkboxProps}
        />
      }
    />
  );
};

export default Checkbox;
