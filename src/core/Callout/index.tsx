import { AlertProps } from "@material-ui/lab";
import React from "react";
import { ReactComponent as IconAlert } from "../../common/svgs/IconAlert.svg";
import { StyledCallout } from "./style";

export { AlertProps };

const Callout = (props: AlertProps): JSX.Element => {
  return <StyledCallout {...props} icon={<IconAlert fillContrast="white" />} />;
};

export default Callout;
