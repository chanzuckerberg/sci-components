import { CheckboxProps as MUICheckboxProps, SvgIcon } from "@mui/material";
import { ReactComponent as IconCheckboxChecked } from "../../common/svgs/IconCheckboxChecked.svg";
import { ReactComponent as IconCheckboxIndeterminate } from "../../common/svgs/IconCheckboxIndeterminate.svg";
import { ReactComponent as IconCheckboxUnchecked } from "../../common/svgs/IconCheckboxUnchecked.svg";
import { CheckboxExtraProps, StyledCheckbox } from "./styles";
import FormControlLabel from "./components/FormControlLabel";

interface CheckboxContentProps
  extends Omit<MUICheckboxProps, "color" | "defaultChecked" | "indeterminate"> {
  caption?: string;
  checkboxProps?: Partial<MUICheckboxProps>;
  intent?: "default" | "error" | "warning";
  label?: string;
  stage?: "checked" | "unchecked" | "indeterminate";
}

export type CheckboxProps = CheckboxContentProps & CheckboxExtraProps;

/**
 * @see https://mui.com/material-ui/react-checkbox/
 */
const InputCheckbox = (props: CheckboxProps): JSX.Element => {
  const {
    caption,
    checkboxProps,
    disabled,
    intent = "default",
    label,
    stage,
    value,
    ...rest
  } = props;

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
    <FormControlLabel
      control={
        <StyledCheckbox
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
          intent={intent}
          {...checkboxProps}
          {...newProps}
        />
      }
      disabled={disabled}
      label={label}
      caption={caption}
      value={value}
    />
  );
};

export default InputCheckbox;
