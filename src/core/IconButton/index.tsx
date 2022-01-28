import { IconButtonProps as RawIconButtonProps } from "@material-ui/core";
import React, { forwardRef } from "react";
import { ExtraProps, StyledIconButton } from "./style";

type IconButtonProps = ExtraProps & RawIconButtonProps;

export { IconButtonProps };

const IconButton = forwardRef<HTMLButtonElement | null, IconButtonProps>(
  (props, ref): JSX.Element => {
    return <StyledIconButton {...props} ref={ref} />;
  }
);

export default IconButton;
