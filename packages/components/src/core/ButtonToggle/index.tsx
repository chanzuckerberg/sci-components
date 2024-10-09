import React from "react";
import { ButtonProps } from "@mui/material";
import { IconNameToSizes } from "../Icon";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import { StyledButtonToggle } from "./style";

export interface ButtonToggleProps extends ButtonProps {
  disabled?: boolean;
  icon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsSize?: "small" | "medium" | "large";
  sdsStage?: "on" | "off";
  sdsType?: "primary" | "secondary";
}

/**
 * @see https://mui.com/material-ui/react-button/
 */

const ButtonToggle = React.forwardRef<HTMLButtonElement, ButtonToggleProps>(
  (props, ref) => {
    const {
      icon,
      sdsSize = "medium",
      sdsStage = "off",
      sdsType = "primary",
      ...rest
    } = props;

    if (icon !== undefined) {
      return (
        <StyledButtonToggle
          icon={icon}
          sdsType={sdsType}
          sdsSize={sdsSize}
          sdsStage={sdsStage}
          ref={ref}
          {...rest}
        />
      );
    } else {
      showWarningIfFirstOccurence(SDSWarningTypes.ButtonToggleMissingIconProp);
      return null;
    }
  }
);

export default ButtonToggle;
