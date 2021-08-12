import { IconButtonProps as RawIconButtonProps } from "@material-ui/core";
import React from "react";
import { ExtraProps, StyledIconButton } from "./style";

type IconButtonProps = ExtraProps & RawIconButtonProps;

export { IconButtonProps };

const IconButton = (props: IconButtonProps): JSX.Element => {
  return <StyledIconButton {...props} />;
};

export default IconButton;
