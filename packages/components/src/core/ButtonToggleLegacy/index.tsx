import React from "react";
import { ButtonProps } from "@mui/material";
import { IconNameToSizes } from "../Icon";
import {
  SDSWarningTypes,
  showWarningIfFirstOccurence,
} from "src/common/warnings";
import { StyledButtonToggleLegacy } from "./style";

export interface ButtonToggleLegacyProps extends ButtonProps {
  disabled?: boolean;
  icon: keyof IconNameToSizes | React.ReactElement<CustomSVGProps>;
  sdsSize?: "small" | "medium" | "large";
  sdsStage?: "on" | "off";
  sdsType?: "primary" | "secondary";
}

/**
 * @see https://mui.com/material-ui/react-button/
 * @deprecated Use ButtonToggle instead. ButtonToggleLegacy will be removed in a future release.
 */

const ButtonToggleLegacy = React.forwardRef<
  HTMLButtonElement,
  ButtonToggleLegacyProps
>((props, ref) => {
  const {
    icon,
    sdsSize = "medium",
    sdsStage = "off",
    sdsType = "primary",
    ...rest
  } = props;

  if (icon !== undefined) {
    return (
      <StyledButtonToggleLegacy
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
});

export default ButtonToggleLegacy;
