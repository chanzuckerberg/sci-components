import { Args } from "@storybook/react-vite";
import React from "react";
import Button from "@components/src/core/Button";
import MenuItem from "@components/src/core/MenuItem";
import RawMenu from "@components/src/core/Menu";

export const Menu = (props: Args): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        size="large"
        sdsStyle="minimal"
        sdsType="primary"
        onClick={handleClick}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? true : undefined}
      >
        Click me!
      </Button>
      <RawMenu
        id="basic-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
        role="listbox"
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
