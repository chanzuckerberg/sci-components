import { Args, Meta } from "@storybook/react";
import React from "react";
import Button from "../Button";
import MenuItem from "../MenuItem";
import RawMenu from "./index";
import { BADGE } from "@geometricpanda/storybook-addon-badges";

const Menu = (props: Args): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
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

export default {
  component: Menu,
  parameters: {
    badges: [BADGE.STABLE],
  },
  title: "Components/Dropdowns/Menu",
} as Meta;

// Default

export const Default = {};

// Custom Placement

export const CustomPlacement = {
  args: {
    anchorOrigin: {
      horizontal: "right",
      vertical: "bottom",
    },
    column: "column value",
    transformOrigin: {
      horizontal: "right",
      vertical: "top",
    },
  },
};
