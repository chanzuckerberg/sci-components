import { MenuProps, PopoverOrigin } from "@mui/material";
import React from "react";
import { StyledMenu } from "./style";

const ANCHOR_ORIGIN: PopoverOrigin = {
  horizontal: "center",
  vertical: "bottom",
};

const TRANSFORM_ORIGIN: PopoverOrigin = {
  horizontal: "center",
  vertical: "top",
};

export type { MenuProps };

const Menu = (props: MenuProps): JSX.Element => {
  return (
    <StyledMenu
      anchorOrigin={ANCHOR_ORIGIN}
      transformOrigin={TRANSFORM_ORIGIN}
      {...props}
    />
  );
};

export default Menu;
