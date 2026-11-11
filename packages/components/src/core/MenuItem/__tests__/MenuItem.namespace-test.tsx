import { MenuItem, MenuItemProps } from "@czi-sds/components";
import { GearIcon } from "@phosphor-icons/react";
import { noop } from "@components/src/common/utils";

const MenuNameSpaceTest = (props: MenuItemProps) => {
  return (
    <MenuItem
      onClick={noop}
      column="Text"
      icon={<GearIcon weight="bold" />}
      isMultiSelect
      disabled={false}
      selected
      sdsStyle="determinate"
    >
      Contact us
    </MenuItem>
  );
};
