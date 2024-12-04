import { CheckboxProps as MUICheckboxProps } from "@mui/material";
import {
  CheckboxExtraProps,
  StyledCheckbox,
  StyledCheckboxCaption,
  StyledCheckboxCheckedIcon,
  StyledCheckboxDefaultIcon,
  StyledCheckboxLabel,
  StyledFormControlLabel,
  StyledIcon,
  StyledLabelContainer,
} from "./styles";

interface CheckboxContentProps
  extends Omit<MUICheckboxProps, "color" | "defaultChecked" | "indeterminate"> {
  caption?: string;
  checkboxProps?: Partial<MUICheckboxProps>;
  intent?: "default" | "negative" | "notice" | "positive";
  label?: React.ReactNode;
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

  const finalLabel = caption ? (
    <StyledLabelContainer>
      <StyledCheckboxLabel>{label}</StyledCheckboxLabel>
      <StyledCheckboxCaption>{caption}</StyledCheckboxCaption>
    </StyledLabelContainer>
  ) : (
    <StyledLabelContainer>
      <StyledCheckboxLabel>{label}</StyledCheckboxLabel>
    </StyledLabelContainer>
  );

  return (
    <StyledFormControlLabel
      control={
        <StyledCheckbox
          // disabled={disabled}
          checkedIcon={
            <StyledCheckboxCheckedIcon>
              <StyledIcon sdsIcon="Check" sdsSize="xs" />
            </StyledCheckboxCheckedIcon>
          }
          icon={<StyledCheckboxDefaultIcon intent={intent} />}
          indeterminateIcon={
            <StyledCheckboxCheckedIcon>
              <StyledIcon sdsIcon="Minus" sdsSize="xs" />
            </StyledCheckboxCheckedIcon>
          }
          intent={intent}
          {...checkboxProps}
          {...newProps}
        />
      }
      disabled={disabled}
      label={finalLabel}
      value={value}
    />
  );
};

export default InputCheckbox;
