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
import { EMPTY_OBJECT, cn } from "src/common/utils";

export interface CheckboxContentProps
  extends Omit<MUICheckboxProps, "color" | "defaultChecked" | "indeterminate"> {
  caption?: string;
  checkboxProps?: Partial<MUICheckboxProps>;
  intent?: "default" | "negative" | "notice" | "positive";
  label?: React.ReactNode;
  stage?: "checked" | "unchecked" | "indeterminate";
  classes?: {
    root?: string;
    labelCaptionContainer?: string;
    label?: string;
    caption?: string;
    checkbox?: string;
    checkboxCheckedIcon?: string;
    checkboxDefaultIcon?: string;
    checkboxIndeterminateIcon?: string;
  };
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
    classes = EMPTY_OBJECT,
    className,
    ...rest
  } = props;

  const {
    root: rootClassName,
    labelCaptionContainer: labelCaptionContainerClassName,
    label: labelClassName,
    caption: captionClassName,
    checkbox: checkboxClassName,
    checkboxCheckedIcon: checkboxCheckedIconClassName,
    checkboxDefaultIcon: checkboxDefaultIconClassName,
    checkboxIndeterminateIcon: checkboxIndeterminateIconClassName,
  }: CheckboxProps["classes"] = classes;

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
    <StyledLabelContainer className={cn(labelCaptionContainerClassName)}>
      <StyledCheckboxLabel className={cn(labelClassName)}>
        {label}
      </StyledCheckboxLabel>
      <StyledCheckboxCaption className={cn(captionClassName)}>
        {caption}
      </StyledCheckboxCaption>
    </StyledLabelContainer>
  ) : (
    <StyledLabelContainer className={cn(labelCaptionContainerClassName)}>
      <StyledCheckboxLabel className={cn(labelClassName)}>
        {label}
      </StyledCheckboxLabel>
    </StyledLabelContainer>
  );

  return (
    <StyledFormControlLabel
      control={
        <StyledCheckbox
          className={cn(checkboxClassName)}
          checkedIcon={
            <StyledCheckboxCheckedIcon
              className={cn(checkboxCheckedIconClassName)}
            >
              <StyledIcon sdsIcon="Check" sdsSize="xs" />
            </StyledCheckboxCheckedIcon>
          }
          icon={
            <StyledCheckboxDefaultIcon
              intent={intent}
              className={cn(checkboxDefaultIconClassName)}
            />
          }
          indeterminateIcon={
            <StyledCheckboxCheckedIcon
              className={cn(checkboxIndeterminateIconClassName)}
            >
              <StyledIcon sdsIcon="Minus" sdsSize="xs" />
            </StyledCheckboxCheckedIcon>
          }
          intent={intent}
          {...checkboxProps}
          {...newProps}
        />
      }
      disabled={disabled}
      label={label ? finalLabel : null}
      value={value}
      className={cn(rootClassName, className)}
    />
  );
};

export default InputCheckbox;
