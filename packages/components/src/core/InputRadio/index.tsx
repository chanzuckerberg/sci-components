import { RadioProps as MUIRadioProps, SvgIcon } from "@mui/material";
import { ReactComponent as IconRadioChecked } from "../../common/svgs/IconRadioChecked.svg";
import { ReactComponent as IconRadioUnChecked } from "../../common/svgs/IconRadioUnchecked.svg";
import { RadioExtraProps, StyledRadioButton } from "./style";
import FormControlLabel from "./components/FormControlLabel";

export interface RadioContentProps
  extends Omit<MUIRadioProps, "color" | "defaultChecked"> {
  caption?: string;
  intent?: "default" | "error" | "warning";
  label?: string;
  radioProps?: Partial<MUIRadioProps>;
  stage?: "checked" | "unchecked";
  value?: string;
}

export type RadioProps = RadioContentProps & RadioExtraProps;

/**
 * @see https://mui.com/material-ui/react-radio-button/
 */
const InputRadio = (props: RadioProps): JSX.Element => {
  const {
    label,
    caption,
    disabled,
    intent = "default",
    radioProps,
    stage,
    value,
  } = props;

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
    <FormControlLabel
      control={
        <StyledRadioButton
          disabled={disabled}
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
          intent={intent}
          {...radioProps}
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

export default InputRadio;
