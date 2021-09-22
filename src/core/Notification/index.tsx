import { AlertProps } from "@material-ui/lab";
import React from "react";
import { ReactComponent as IconAlert } from "../../common/svgs/IconAlert.svg";
import { ReactComponent as IconSuccess } from "../../common/svgs/IconSuccess.svg";
import Button from "../Button";
import { StyledNotification, StyledNotificationTitle } from "./style";

export { AlertProps };

export interface NotificationProps {
  sdsAction?: (event: React.SyntheticEvent) => void;
  sdsActionText?: string;
}

export type ExposedNotificationProps = AlertProps & NotificationProps;

const Notification = ({
  children,
  severity,
  title,
  sdsAction,
  sdsActionText,
  ...rest
}: ExposedNotificationProps): JSX.Element => {
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
      {sdsAction && (
        <Button sdsType="secondary" sdsStyle="text" onClick={sdsAction}>
          {sdsActionText}
        </Button>
      )}
    </StyledNotification>
  );
};

export default Notification;
