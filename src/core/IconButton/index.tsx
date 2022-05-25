import { IconButtonProps as RawIconButtonProps } from "@mui/material";
import React, { forwardRef } from "react";
import { IconButtonExtraProps, StyledIconButton } from "./style";

type IconButtonProps = IconButtonExtraProps & RawIconButtonProps;

export type { IconButtonProps };

/**
 * @see https://v4.mui.com/components/buttons/#icon-buttons
 */
const IconButton = forwardRef<HTMLButtonElement | null, IconButtonProps>(
  (props, ref): JSX.Element => {
    return <StyledIconButton {...props} ref={ref} />;
  }
);

export default IconButton;
