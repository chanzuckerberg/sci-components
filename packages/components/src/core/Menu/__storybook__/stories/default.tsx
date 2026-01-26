import { Args } from "@storybook/react-webpack5";
import React from "react";
import ButtonV2 from "src/core/ButtonV2";
import MenuItem from "src/core/MenuItem";
import RawMenu from "src/core/Menu";

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
      <ButtonV2
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
      </ButtonV2>
      <RawMenu
        id="basic-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
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
