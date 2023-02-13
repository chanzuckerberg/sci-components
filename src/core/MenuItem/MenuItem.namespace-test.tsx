import { Icon, MenuItem, MenuItemProps } from "czifui";
import React from "react";
import { noop } from "src/common/utils";

const MenuNameSpaceTest = (props: MenuItemProps) => {
  return (
    <MenuItem
      onClick={noop}
      column="Text"
      icon={<Icon sdsSize="s" sdsIcon="gear" sdsType="static" />}
      isMultiSelect
      disabled={false}
      selected
    >
      Contact us
    </MenuItem>
  );
};
