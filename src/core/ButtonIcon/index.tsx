import { IconButtonProps as RawButtonIconProps } from "@mui/material";
import React, { forwardRef } from "react";
import { ButtonIconExtraProps, StyledButtonIcon } from "./style";

type ButtonIconProps = ButtonIconExtraProps & RawButtonIconProps;

export type { ButtonIconProps };

/**
 * @see https://mui.com/material-ui/react-button/#icon-buttons
 */
const ButtonIcon = forwardRef<HTMLButtonElement | null, ButtonIconProps>(
  (props, ref): JSX.Element => {
    return <StyledButtonIcon data-testid="iconButton" {...props} ref={ref} />;
  }
);

export default ButtonIcon;
