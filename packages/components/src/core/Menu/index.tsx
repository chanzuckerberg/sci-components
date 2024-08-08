"use client";

import { PopoverOrigin, MenuProps as RawMenuProps } from "@mui/material";
import { StyledMenu } from "./style";

const ANCHOR_ORIGIN: PopoverOrigin = {
  horizontal: "center",
  vertical: "bottom",
};

const TRANSFORM_ORIGIN: PopoverOrigin = {
  horizontal: "center",
  vertical: "top",
};

export type MenuProps = RawMenuProps;

/**
 * @see https://mui.com/material-ui/react-menu/
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
