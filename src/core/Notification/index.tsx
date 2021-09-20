import { AlertProps } from "@material-ui/lab";
import React from "react";
import { ReactComponent as IconAlert } from "../../common/svgs/IconAlert.svg";
import { ReactComponent as IconSuccess } from "../../common/svgs/IconSuccess.svg";
import { StyledNotification, StyledNotificationTitle } from "./style";

export { AlertProps };

const Notification = ({
  children,
  severity,
  title,
  ...rest
}: AlertProps): JSX.Element => {
  return (
    <StyledNotification
      {...rest}
      icon={
        severity === "success" ? (
          <IconSuccess fillContrast="white" />
        ) : (
          <IconAlert fillContrast="white" />
        )
      }
      className="elevated"
      severity={severity}
    >
      <StyledNotificationTitle>{title}</StyledNotificationTitle>
      {children}
    </StyledNotification>
  );
};

export default Notification;
