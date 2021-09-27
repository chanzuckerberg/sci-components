import { AlertProps } from "@material-ui/lab";
import React from "react";
import { ReactComponent as IconAlert } from "../../common/svgs/IconAlert.svg";
import { ReactComponent as IconClose } from "../../common/svgs/IconClose.svg";
import { ReactComponent as IconSuccess } from "../../common/svgs/IconSuccess.svg";
import { StyledCallout } from "./style";

export { AlertProps };

const Callout = ({
  children,
  onClose,
  severity,
  ...rest
}: AlertProps): JSX.Element => {
  return (
    <StyledCallout
      {...rest}
      action={onClose ? <IconClose fillContrast="white" /> : null}
      icon={
        severity === "success" ? (
          <IconSuccess fillContrast="white" />
        ) : (
          <IconAlert fillContrast="white" />
        )
      }
      severity={severity}
    >
      {children}
    </StyledCallout>
  );
};

export default Callout;
