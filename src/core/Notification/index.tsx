import { AlertProps } from "@material-ui/lab";
import React from "react";
import { ReactComponent as IconAlert } from "../../common/svgs/IconAlert.svg";
import { StyledNotification, StyledNotificationTitle } from "./style";

export { AlertProps };

const Notification = ({
  children,
  title,
  ...rest
}: AlertProps): JSX.Element => {
  return (
    <StyledNotification
      {...rest}
      icon={<IconAlert fillContrast="white" />}
      className="elevated"
    >
      <StyledNotificationTitle>{title}</StyledNotificationTitle>
      {children}
    </StyledNotification>
  );
};

export default Notification;
