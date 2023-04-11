import { Menu, MenuItem, MenuProps } from "@czifui/sci-components";
import React from "react";
import { noop } from "src/common/utils";

const MenuNameSpaceTest = (props: MenuProps) => {
  return (
    <Menu anchorEl={null} keepMounted open onClose={noop}>
      <MenuItem onClick={noop}>Contact us</MenuItem>
    </Menu>
  );
};
