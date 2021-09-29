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
  intent: "info" | "error" | "success" | "warning";
}

export type ExposedNotificationProps = AlertProps & NotificationProps;

const Notification = ({
  children,
  intent,
  onClose,
  sdsAction,
  sdsActionText,
  ...rest
}: ExposedNotificationProps): JSX.Element => {
  return (
    <StyledNotification
      {...rest}
      action={onClose ? <IconClose fillContrast="white" /> : null}
      icon={
        intent === "success" ? (
          <IconSuccess fillContrast="white" />
        ) : (
          <IconAlert fillContrast="white" />
        )
      }
      className="elevated"
      severity={intent}
    >
      {children}
      {sdsAction && (
        <StyledButton onClick={sdsAction}>{sdsActionText}</StyledButton>
      )}
    </StyledNotification>
  );
};

export default Notification;
