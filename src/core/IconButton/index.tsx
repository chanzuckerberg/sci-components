import { IconButtonProps as RawIconButtonProps } from "@material-ui/core";
import React from "react";
import { ExtraProps, StyledIconButton } from "./style";

type IconButtonProps = ExtraProps & RawIconButtonProps;

export { IconButtonProps };

// TODO (mlila): allow user to just pass in sdsSize and sdsIcon to get an icon button for
// TODO          any icon in our icon set.
const IconButton = (props: IconButtonProps): JSX.Element => {
  return <StyledIconButton {...props} />;
};

export default IconButton;
