import { Menu as RawMenu, MenuProps, PopoverOrigin } from "@material-ui/core";
import React from "react";

const ANCHOR_ORIGIN: PopoverOrigin = {
  horizontal: "center",
  vertical: "bottom",
};

const TRANSFORM_ORIGIN: PopoverOrigin = {
  horizontal: "center",
  vertical: "top",
};

export { MenuProps };

const Menu = (props: MenuProps): JSX.Element => {
  return (
    <RawMenu
      {...props}
      anchorOrigin={ANCHOR_ORIGIN}
      transformOrigin={TRANSFORM_ORIGIN}
    />
  );
};

export default Menu;
