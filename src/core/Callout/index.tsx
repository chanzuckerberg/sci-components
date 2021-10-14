import { Grow, SvgIcon } from "@material-ui/core";
import { AlertProps } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { ReactComponent as IconAlert } from "../../common/svgs/IconAlert.svg";
import { ReactComponent as IconClose } from "../../common/svgs/IconClose.svg";
import { ReactComponent as IconInfo } from "../../common/svgs/IconInfo.svg";
import { ReactComponent as IconSuccess } from "../../common/svgs/IconSuccess.svg";
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
        return <IconSuccess fillcontrast="white" />;
      case "info":
        return <IconInfo fillcontrast="white" />;
      default:
        return <IconAlert fillcontrast="white" />;
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
                sdsType="secondary"
              >
                {" "}
                <SvgIcon
                  fillcontrast="white"
                  viewBox="0 0 14 14"
                  component={IconClose}
                />{" "}
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
