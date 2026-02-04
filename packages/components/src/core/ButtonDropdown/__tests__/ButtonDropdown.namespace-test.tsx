import React from "react";
import { ButtonDropdown, ButtonDropdownProps } from "@czi-sds/components";

const ButtonDropdownNameSpaceTest = (props: ButtonDropdownProps) => {
  return (
    <>
      <ButtonDropdown sdsType="primary" sdsStyle="solid">
        Primary Solid Button Dropdown
      </ButtonDropdown>

      <ButtonDropdown sdsType="secondary" sdsStyle="solid">
        Secondary Solid Button Dropdown
      </ButtonDropdown>

      <ButtonDropdown sdsType="primary" sdsStyle="outline">
        Primary Outline Button Dropdown
      </ButtonDropdown>

      <ButtonDropdown sdsType="secondary" sdsStyle="outline">
        Secondary Outline Button Dropdown
      </ButtonDropdown>

      <ButtonDropdown sdsType="primary" sdsStyle="minimal">
        Primary Minimal Button Dropdown
      </ButtonDropdown>

      <ButtonDropdown sdsType="secondary" sdsStyle="minimal">
        Secondary Minimal Button Dropdown
      </ButtonDropdown>
    </>
  );
};
