import { AlertProps } from "@mui/lab";
import { StyledAlert } from "./style";

/**
 * @see https://mui.com/material-ui/react-alert/
 */
const Alert = (props: AlertProps): JSX.Element => {
  return <StyledAlert {...props} />;
};

export default Alert;
