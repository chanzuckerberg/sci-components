import { AlertProps as RawAlertProps } from "@mui/lab";
import { StyledAlert } from "./style";

export type AlertProps = Omit<
  RawAlertProps,
  "nonce" | "rev" | "rel" | "autoFocus" | "content"
>;

/**
 * @see https://mui.com/material-ui/react-alert/
 */
const Alert = (props: AlertProps): JSX.Element => {
  return <StyledAlert {...props} />;
};

export default Alert;
