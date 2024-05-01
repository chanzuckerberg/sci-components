import { AlertProps } from "@mui/lab";
import { StyledAlert } from "./style";

/**
 * @see https://mui.com/material-ui/react-alert/
 *
 * @deprecated
 * This component is deprecated and will be removed in the next major version.
 * Please use `Callout` or `Notification` instead.
 */
const Alert = (props: AlertProps): JSX.Element => {
  return <StyledAlert {...props} />;
};

export default Alert;
