import { AlertProps } from "@material-ui/lab";
import React from "react";
import { ReactComponent as IconAlert } from "../../common/svgs/IconAlert.svg";
import { ReactComponent as IconClose } from "../../common/svgs/IconClose.svg";
import { ReactComponent as IconSuccess } from "../../common/svgs/IconSuccess.svg";
import { StyledButton, StyledNotification } from "./style";

export interface NotificationProps {
  buttonOnClick?: (event: React.SyntheticEvent) => void;
  buttonText?: string;
  intent: "info" | "error" | "success" | "warning";
}

export type ExposedNotificationProps = AlertProps & NotificationProps;

const Notification = ({
  children,
  intent,
  onClose,
  buttonOnClick,
  buttonText,
  ...rest
}: ExposedNotificationProps): JSX.Element => {
  return (
    <StyledNotification
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
      {...rest}
    >
      {children}
      {buttonOnClick && (
        <StyledButton onClick={buttonOnClick}>{buttonText}</StyledButton>
      )}
    </StyledNotification>
  );
};

export default Notification;
