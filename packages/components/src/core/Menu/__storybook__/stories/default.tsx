import { Args } from "@storybook/react";
import React from "react";
import Button from "src/core/Button";
import MenuItem from "src/core/MenuItem";
import RawMenu from "src/core/Menu";

export const Menu = (props: Args): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button sdsStyle="minimal" sdsType="secondary" onClick={handleClick}>
        Click me!
      </Button>
      <RawMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        {...props}
      >
        <MenuItem onClick={handleClose}>Contact us</MenuItem>
        <MenuItem onClick={handleClose}>Terms of Use</MenuItem>
        <MenuItem onClick={handleClose}>Privacy Policy</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </RawMenu>
    </div>
  );
};
