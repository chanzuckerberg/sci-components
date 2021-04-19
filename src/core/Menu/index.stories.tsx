import { Args, Story } from "@storybook/react";
import React from "react";
import Button from "../Button";
import MenuItem from "../MenuItem";
import Menu from "./index";

const Demo = (props: Args): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick}>Click me!</Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        {...props}
      >
        <MenuItem onClick={handleClose}>Contact us</MenuItem>
        <MenuItem onClick={handleClose}>Terms of Use</MenuItem>
        <MenuItem onClick={handleClose}>Privacy Policy</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default {
  component: Demo,
  title: "Menu",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});

Default.args = {};
