import { AlertProps, Box, Slide } from "@mui/material";
import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  XIcon,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { INTERNAL_ICON_PROPS } from "@components/src/common/utils";
import Button from "@components/src/core/Button";
import {
  StyledButtonWrapper,
  StyledCloseButton,
  StyledNotification,
} from "./style";

export type NotificationIntentType =
  | "accent"
  | "info"
  | "negative"
  | "positive"
  | "notice";

export interface NotificationProps {
  autoDismiss?: boolean | number;
  buttonOnClick?: (event: React.SyntheticEvent) => void;
  buttonText?: string;
  buttonPosition?: "left" | "right";
  dismissed?: boolean;
  slideDirection: "left" | "right";
  extraContent?: boolean;
  intent: NotificationIntentType;
  /**
   * Icon displayed to the left of the content, usually a Phosphor or
   * `@czi-sds/icons` icon. The Notification draws it at its own size and color.
   * Defaults to the icon for the current `intent`.
   */
  icon?: React.ReactElement;
}

export type ExposedNotificationProps = AlertProps & NotificationProps;

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
  buttonPosition,
  icon,
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
    if (icon !== undefined) return icon;

    switch (intent) {
      case "positive":
        return <CheckCircleIcon {...INTERNAL_ICON_PROPS} size={16} />;
      case "info":
        return <InfoIcon {...INTERNAL_ICON_PROPS} size={16} />;
      default:
        return <WarningCircleIcon {...INTERNAL_ICON_PROPS} size={16} />;
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
                <StyledCloseButton
                  onClick={handleClose}
                  sdsStyle="minimal"
                  sdsType="secondary"
                  data-testid="notificationCloseButton"
                  backgroundOnHover={false}
                >
                  <XIcon {...INTERNAL_ICON_PROPS} size={16} />
                </StyledCloseButton>
              ) : null
            }
            icon={getIcon()}
            className="elevated"
            intent={intent}
            slideDirection={slideDirection}
            {...passedProps}
          >
            {children}
            {buttonOnClick !== undefined && (
              <StyledButtonWrapper buttonPosition={buttonPosition}>
                <Button
                  sdsStyle="minimal"
                  sdsType="secondary"
                  size="medium"
                  onClick={buttonOnClick}
                >
                  {buttonText}
                </Button>
              </StyledButtonWrapper>
            )}
          </StyledNotification>
        </Box>
      </Slide>
    </>
  );
};

export default Notification;
