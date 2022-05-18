import { MenuProps, PopoverOrigin } from "@material-ui/core";
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

/**
 * @see https://v4.mui.com/components/menus/
 */
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
