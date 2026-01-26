import { AlertProps } from "@mui/lab";
import { Box, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonV2 from "src/core/ButtonV2";
import Icon, { IconNameToSizes, IconProps } from "src/core/Icon";
import { StyledButtonWrapper, StyledNotification } from "./style";

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
  icon?: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsIconProps?: Partial<IconProps<keyof IconNameToSizes>>;
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
  sdsIconProps,
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
    if (icon !== undefined) {
      if (typeof icon !== "string") {
        return icon;
      } else {
        return (
          <Icon
            sdsSize="s"
            sdsIcon={icon as keyof IconNameToSizes}
            {...sdsIconProps}
          />
        );
      }
    } else {
      switch (intent) {
        case "positive":
          return <Icon sdsSize="s" sdsIcon="CheckCircle" />;
        case "info":
          return <Icon sdsSize="s" sdsIcon="InfoCircle" />;
        default:
          return <Icon sdsSize="s" sdsIcon="ExclamationMarkCircle" />;
      }
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
                <ButtonV2
                  onClick={handleClose}
                  sdsStyle="minimal"
                  sdsType="secondary"
                  data-testid="notificationCloseButton"
                >
                  <Icon sdsIcon="XMark" sdsSize="s" />
                </ButtonV2>
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
                <ButtonV2
                  sdsStyle="minimal"
                  sdsType="secondary"
                  size="medium"
                  onClick={buttonOnClick}
                >
                  {buttonText}
                </ButtonV2>
              </StyledButtonWrapper>
            )}
          </StyledNotification>
        </Box>
      </Slide>
    </>
  );
};

export default Notification;
