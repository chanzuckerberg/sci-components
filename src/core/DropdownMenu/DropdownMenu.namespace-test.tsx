import {
  DefaultDropdownMenuOption,
  DropdownMenu,
  DropdownMenuProps,
} from "czifui";
import React from "react";
import { noop } from "src/common/utils";

const OPTIONS = [
  {
    color: "#7057ff",
    description: "Good for newcomers",
    name: "good first issue",
  },
  {
    color: "#008672",
    description: "Extra attention is needed",
    name: "help wanted",
  },
];

const DropdownMenuNameSpaceTest = (
  props: DropdownMenuProps<
    DefaultDropdownMenuOption,
    true,
    undefined,
    undefined
  >
) => {
  return (
    <DropdownMenu
      anchorEl={null}
      disableCloseOnSelect={false}
      id="1"
      multiple
      onChange={noop}
      open
      options={OPTIONS}
      PopperBaseProps={{ sx: { width: 300 } }}
      search
      title="Dropdown Menu Title"
      onClickAway={noop}
      clickAwayListenerProps={{ mouseEvent: false }}
    />
  );
};
