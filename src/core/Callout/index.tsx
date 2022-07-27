import { AlertProps } from "@mui/lab";
import { Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonIcon from "../ButtonIcon";
import Icon from "../Icon";
import { StyledCallout } from "./style";

export interface CalloutProps {
  autoDismiss?: boolean | number;
  dismissed?: boolean;
  icon?: React.ReactNode;
  intent: "info" | "error" | "success" | "warning";
}

export type ExposedCalloutProps = AlertProps & CalloutProps;

/**
 * @see https://v4.mui.com/components/alert/
 */
const Callout = ({
  autoDismiss,
  children,
  dismissed,
  onClose,
  icon,
  intent,
  ...rest
}: ExposedCalloutProps): JSX.Element => {
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

  const getIcon = () => {
    if (icon) return icon;

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
      <Grow in={!hide}>
        <StyledCallout
          onClose={onClose ? handleClose : undefined}
          action={
            onClose ? (
              <ButtonIcon
                onClick={handleClose}
                sdsSize="small"
                sdsType="tertiary"
                size="large"
              >
                {" "}
                <Icon sdsIcon="xMark" sdsSize="s" sdsType="iconButton" />{" "}
              </ButtonIcon>
            ) : null
          }
          icon={getIcon()}
          severity={intent}
          {...rest}
        >
          {children}
        </StyledCallout>
      </Grow>
    </>
  );
};

export default Callout;
