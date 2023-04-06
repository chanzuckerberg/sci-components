import { IconNameToSmallSizes, MenuItem, MenuItemProps } from "czifui";
import React from "react";
import { noop } from "src/common/utils";

const MenuNameSpaceTest = (
  props: MenuItemProps<keyof IconNameToSmallSizes>
) => {
  return (
    <MenuItem
      onClick={noop}
      column="Text"
      sdsIcon="gear"
      sdsIconProps={{}}
      isMultiSelect
      disabled={false}
      selected
    >
      Contact us
    </MenuItem>
  );
};
