import { Slide } from "@material-ui/core";
import { AlertProps } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { ReactComponent as IconAlert } from "../../common/svgs/IconAlert.svg";
import { ReactComponent as IconClose } from "../../common/svgs/IconClose.svg";
import { ReactComponent as IconSuccess } from "../../common/svgs/IconSuccess.svg";
import Button from "../Button";
import { StyledNotification } from "./style";

export interface NotificationProps {
  autoDismiss?: boolean;
  buttonOnClick?: (event: React.SyntheticEvent) => void;
  buttonText?: string;
  dismissed?: boolean;
  dismissDirection: "left" | "right";
  extraContent?: boolean;
  intent: "info" | "error" | "success" | "warning";
}

export type ExposedNotificationProps = AlertProps & NotificationProps;

const Notification = ({
  autoDismiss,
  children,
  dismissed,
  dismissDirection,
  intent,
  onClose,
  buttonOnClick,
  buttonText,
  ...rest
}: ExposedNotificationProps): JSX.Element => {
  const [hide, setHide] = useState(dismissed);

  useEffect(() => {
    setHide(dismissed);
  }, [dismissed]);

  // if (autoDismiss) {
  //   console.log('$$$$$$$$$$$$ autodismiss true')
  //   useEffect(() => {
  //     console.log('%%%%%%%%%%% inside useEffect')
  //     setTimeout(() => {
  //       console.log('*********** inside timeout')
  //       setHide(true);
  //     }, 8000);
  //   }, [autoDismiss]);
  // }
  return (
    <>
      <Slide in={!hide} direction={dismissDirection} mountOnEnter unmountOnExit>
        <StyledNotification
          aria-labelledby="alert-notification-title"
          aria-describedby="alert-notification-description"
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
            <Button
              sdsStyle="minimal"
              sdsType="secondary"
              onClick={buttonOnClick}
            >
              {buttonText}
            </Button>
          )}
        </StyledNotification>
      </Slide>
    </>
  );
};

export default Notification;
