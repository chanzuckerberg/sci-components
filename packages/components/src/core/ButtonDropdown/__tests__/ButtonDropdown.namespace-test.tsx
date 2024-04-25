import React from "react";
import { ButtonDropdown, ButtonDropdownProps, Icon } from "@czi-sds/components";

const ButtonDropdownNameSpaceTest = (props: ButtonDropdownProps) => {
  return (
    <ButtonDropdown
      sdsType="primary"
      sdsStyle="rounded"
      icon="Download"
      {...props}
    >
      Button Dropdown
    </ButtonDropdown>
  );
};
