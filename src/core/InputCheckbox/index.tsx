import { CheckboxProps as MUICheckboxProps, SvgIcon } from "@mui/material";
import React from "react";
import { ReactComponent as IconCheckboxChecked } from "../../common/svgs/IconCheckboxChecked.svg";
import { ReactComponent as IconCheckboxIndeterminate } from "../../common/svgs/IconCheckboxIndeterminate.svg";
import { ReactComponent as IconCheckboxUnchecked } from "../../common/svgs/IconCheckboxUnchecked.svg";
import {
  CheckboxExtraProps,
  StyledCheckbox,
  StyledFormControlLabel,
} from "./styles";

interface CheckboxContentProps
  extends Omit<MUICheckboxProps, "color" | "defaultChecked" | "indeterminate"> {
  checkboxProps?: Partial<MUICheckboxProps>;
  label?: string;
  stage?: "checked" | "unchecked" | "indeterminate";
}

export type CheckboxProps = CheckboxContentProps & CheckboxExtraProps;

/**
 * @see https://mui.com/material-ui/react-checkbox/
 */
const InputCheckbox = (props: CheckboxProps): JSX.Element => {
  const { caption, checkboxProps, disabled, label, stage } = props;

  if (label === undefined || stage !== undefined) {
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
    <StyledFormControlLabel
      caption={caption}
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
    >
      <div>Content</div>
    </StyledFormControlLabel>
  );
};

export default InputCheckbox;
