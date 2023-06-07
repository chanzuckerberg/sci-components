import { RadioProps as MUIRadioProps, SvgIcon } from "@mui/material";
import { ReactComponent as IconRadioChecked } from "../../common/svgs/IconRadioChecked.svg";
import { ReactComponent as IconRadioUnChecked } from "../../common/svgs/IconRadioUnchecked.svg";
import {
  RadioExtraProps,
  StyledFormControlLabel,
  StyledRadioButton,
} from "./style";

export interface RadioContentProps
  extends Omit<
    MUIRadioProps,
    | "color"
    | "defaultChecked"
    | "nonce"
    | "rev"
    | "rel"
    | "autoFocus"
    | "content"
  > {
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
  const { label, caption, radioProps, stage, value } = props;
  if (label === undefined || stage !== undefined) {
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
  }
  return (
    <StyledFormControlLabel
      caption={caption}
      control={
        <StyledRadioButton
          {...props}
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
          {...radioProps}
        />
      }
      label={label}
      value={value}
    />
  );
};

export default InputRadio;
