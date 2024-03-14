import {
  IconNameToSmallSizes,
  MenuItem,
  MenuItemProps,
} from "@czi-sds/components";
import { noop } from "src/common/utils";

const MenuNameSpaceTest = (
  props: MenuItemProps<keyof IconNameToSmallSizes>
) => {
  return (
    <MenuItem
      onClick={noop}
      column="Text"
      icon="Gear"
      sdsIconProps={{}}
      isMultiSelect
      disabled={false}
      selected
      sdsStyle="determinate"
    >
      Contact us
    </MenuItem>
  );
};
