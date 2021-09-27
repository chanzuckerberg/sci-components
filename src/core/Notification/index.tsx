import { AlertProps } from "@material-ui/lab";
import React from "react";
import { ReactComponent as IconAlert } from "../../common/svgs/IconAlert.svg";
import { ReactComponent as IconClose } from "../../common/svgs/IconClose.svg";
import { ReactComponent as IconSuccess } from "../../common/svgs/IconSuccess.svg";
import { StyledButton, StyledNotification } from "./style";

export { AlertProps };

export interface NotificationProps {
  sdsAction?: (event: React.SyntheticEvent) => void;
  sdsActionText?: string;
}

export type ExposedNotificationProps = AlertProps & NotificationProps;

const Notification = ({
  children,
  onClose,
  severity,
  sdsAction,
  sdsActionText,
  ...rest
}: ExposedNotificationProps): JSX.Element => {
  return (
    <StyledNotification
      {...rest}
      action={onClose ? <IconClose fillContrast="white" /> : null}
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
      {children}
      {sdsAction && (
        <StyledButton onClick={sdsAction}>{sdsActionText}</StyledButton>
      )}
    </StyledNotification>
  );
};

export default Notification;
