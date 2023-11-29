import { CheckboxProps as MUICheckboxProps, SvgIcon } from "@mui/material";
import { ReactComponent as IconCheckboxChecked } from "../../common/svgs/IconCheckboxChecked.svg";
import { ReactComponent as IconCheckboxIndeterminate } from "../../common/svgs/IconCheckboxIndeterminate.svg";
import { ReactComponent as IconCheckboxUnchecked } from "../../common/svgs/IconCheckboxUnchecked.svg";
import {
  CheckboxExtraProps,
  StyledCheckbox,
  StyledFormControlLabel,
} from "./styles";

interface CheckboxContentProps
  extends Omit<
    MUICheckboxProps,
    | "color"
    | "defaultChecked"
    | "indeterminate"
    | "nonce"
    | "rev"
    | "rel"
    | "autoFocus"
    | "content"
  > {
  checkboxProps?: Partial<MUICheckboxProps>;
  label?: string;
  stage?: "checked" | "unchecked" | "indeterminate";
}

export type CheckboxProps = CheckboxContentProps & CheckboxExtraProps;

/**
 * @see https://mui.com/material-ui/react-checkbox/
 */
const InputCheckbox = (props: CheckboxProps): JSX.Element => {
  const { caption, checkboxProps, disabled, label, stage, value, ...rest } =
    props;

  let newProps: MUICheckboxProps;
  switch (stage) {
    case "checked":
      newProps = {
        ...rest,
        checked: true,
        color: "primary",
      };
      break;
    case "unchecked":
      newProps = {
        ...rest,
        checked: false,
        color: "default",
      };
      break;
    case "indeterminate":
      newProps = {
        ...rest,
        checked: true,
        color: "primary",
        indeterminate: true,
      };
      break;
    default:
      newProps = rest;
  }

  return (
    <StyledFormControlLabel
      caption={caption}
      control={
        <StyledCheckbox
          tabIndex={0}
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
          {...newProps}
        />
      }
      label={label}
      value={value}
    />
  );
};

export default InputCheckbox;
