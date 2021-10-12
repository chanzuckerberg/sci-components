import { Slide, SvgIcon } from "@material-ui/core";
import { AlertProps } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { ReactComponent as IconAlert } from "../../common/svgs/IconAlert.svg";
import { ReactComponent as IconClose } from "../../common/svgs/IconClose.svg";
import { ReactComponent as IconSuccess } from "../../common/svgs/IconSuccess.svg";
import Button from "../Button";
import IconButton from "../IconButton";
import { StyledNotification } from "./style";

export interface NotificationProps {
  autoDismiss?: boolean | number;
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
  dismissDirection = "left",
  intent,
  onClose,
  buttonOnClick,
  buttonText,
  ...rest
}: ExposedNotificationProps): JSX.Element => {
  const [hide, setHide] = useState(dismissed);

  useEffect(() => {
    setHide(dismissed);

    if (autoDismiss) {
      const timeout = typeof autoDismiss === "boolean" ? 8000 : autoDismiss;
      setTimeout(() => {
        setHide(true);
      }, timeout);
    }
  }, [dismissed, autoDismiss]);

  const handleClose = (event: React.SyntheticEvent<Element, Event>) => {
    setHide(true);
    if (onClose) onClose(event);
  };

  return (
    <>
      <Slide in={!hide} direction={dismissDirection} mountOnEnter unmountOnExit>
        <StyledNotification
          onClose={onClose ? handleClose : undefined}
          action={
            onClose ? (
              <IconButton
                onClick={handleClose}
                sdsSize="small"
                sdsType="secondary"
              >
                {" "}
                <SvgIcon
                  fillContrast="white"
                  viewBox="0 0 14 14"
                  component={IconClose}
                />{" "}
              </IconButton>
            ) : null
          }
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
