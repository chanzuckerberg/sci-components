import { AlertProps } from "@mui/lab";
import { Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
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

  // remove prop used only for stories
  const passedProps = { ...rest };
  delete passedProps.extraContent;

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

  const getIcon = () => {
    switch (intent) {
      case "success":
        return <Icon sdsSize="l" sdsIcon="checkCircle" sdsType="static" />;
      case "info":
        return <Icon sdsSize="l" sdsIcon="infoCircle" sdsType="static" />;
      default:
        return (
          <Icon sdsSize="l" sdsIcon="exclamationMarkCircle" sdsType="static" />
        );
    }
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
                sdsType="tertiary"
                data-testid="notificationCloseButton"
                size="large"
              >
                {" "}
                <Icon sdsIcon="xMark" sdsSize="s" sdsType="iconButton" />{" "}
              </IconButton>
            ) : null
          }
          icon={getIcon()}
          className="elevated"
          severity={intent}
          {...passedProps}
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
