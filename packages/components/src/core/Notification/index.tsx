import { AlertProps } from "@mui/lab";
import { Box, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import ButtonIcon from "../ButtonIcon";
import Icon from "../Icon";
import { StyledNotification } from "./style";

export interface NotificationProps {
  autoDismiss?: boolean | number;
  buttonOnClick?: (event: React.SyntheticEvent) => void;
  buttonText?: string;
  dismissed?: boolean;
  slideDirection: "left" | "right";
  extraContent?: boolean;
  intent: "info" | "error" | "success" | "warning";
}

export type ExposedNotificationProps = Omit<
  AlertProps,
  "nonce" | "rev" | "rel" | "autoFocus" | "content"
> &
  NotificationProps;

/**
 * @see https://mui.com/material-ui/react-alert/
 */
const Notification = ({
  autoDismiss,
  children,
  dismissed,
  slideDirection = "left",
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
      <Slide
        in={!hide}
        direction={slideDirection}
        mountOnEnter
        unmountOnExit
        timeout={250}
      >
        <Box>
          <StyledNotification
            onClose={onClose ? handleClose : undefined}
            action={
              onClose ? (
                <ButtonIcon
                  onClick={handleClose}
                  sdsSize="small"
                  sdsType="tertiary"
                  data-testid="notificationCloseButton"
                  sdsIcon="xMark"
                />
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
        </Box>
      </Slide>
    </>
  );
};

export default Notification;
