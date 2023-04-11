import {
  ButtonDropdown,
  ButtonDropdownProps,
  Icon,
} from "@czifui/sci-components";
import React from "react";

const ButtonDropdownNameSpaceTest = (props: ButtonDropdownProps) => {
  return (
    <ButtonDropdown
      sdsType="primary"
      sdsStyle="rounded"
      icon={<Icon sdsIcon="download" sdsSize="l" sdsType="button" />}
      {...props}
    >
      Button Dropdown
    </ButtonDropdown>
  );
};
