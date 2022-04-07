import { AlertProps } from "@mui/lab";
import { Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Icon from "../Icon";
import IconButton from "../IconButton";
import { StyledCallout } from "./style";

export interface CalloutProps {
  autoDismiss?: boolean | number;
  dismissed?: boolean;
  intent: "info" | "error" | "success" | "warning";
}

export type ExposedCalloutProps = AlertProps & CalloutProps;

const Callout = ({
  autoDismiss,
  children,
  dismissed,
  onClose,
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
              <IconButton
                onClick={handleClose}
                sdsSize="small"
                sdsType="tertiary"
                size="large"
              >
                {" "}
                <Icon sdsIcon="xMark" sdsSize="s" sdsType="iconButton" />{" "}
              </IconButton>
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
