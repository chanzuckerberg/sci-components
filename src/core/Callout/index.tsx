import { AlertProps } from "@material-ui/lab";
import React from "react";
import { ReactComponent as IconAlert } from "../../common/svgs/IconAlert.svg";
import { ReactComponent as IconClose } from "../../common/svgs/IconClose.svg";
import { ReactComponent as IconSuccess } from "../../common/svgs/IconSuccess.svg";
import { StyledCallout } from "./style";

export interface CalloutProps {
  intent: "info" | "error" | "success" | "warning";
}

export type ExposedCalloutProps = AlertProps & CalloutProps;

const Callout = ({
  children,
  onClose,
  intent,
  ...rest
}: ExposedCalloutProps): JSX.Element => {
  return (
    <StyledCallout
      {...rest}
      action={onClose ? <IconClose fillContrast="white" /> : null}
      icon={
        intent === "success" ? (
          <IconSuccess fillContrast="white" />
        ) : (
          <IconAlert fillContrast="white" />
        )
      }
      severity={intent}
    >
      {children}
    </StyledCallout>
  );
};

export default Callout;
