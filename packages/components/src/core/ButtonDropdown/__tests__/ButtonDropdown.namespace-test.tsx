import React from "react";
import { ButtonDropdown, ButtonDropdownProps, Icon } from "@czi-sds/components";

const ButtonDropdownNameSpaceTest = (props: ButtonDropdownProps) => {
  return (
    <>
      <ButtonDropdown sdsType="primary" sdsStyle="rounded">
        Primary Rounded Button Dropdown
      </ButtonDropdown>

      <ButtonDropdown sdsType="secondary" sdsStyle="rounded">
        Secondary Rounded Button Dropdown
      </ButtonDropdown>

      <ButtonDropdown sdsType="destructive" sdsStyle="rounded">
        Destructive Rounded Button Dropdown
      </ButtonDropdown>

      <ButtonDropdown sdsType="primary" sdsStyle="square">
        Primary Square Button Dropdown
      </ButtonDropdown>

      <ButtonDropdown sdsType="secondary" sdsStyle="square">
        Secondary Square Button Dropdown
      </ButtonDropdown>

      <ButtonDropdown sdsType="destructive" sdsStyle="square">
        Destructive Square Button Dropdown
      </ButtonDropdown>

      <ButtonDropdown sdsType="primary" sdsStyle="icon" icon="Download">
        Primary Icon Button Dropdown with SDS Icon
      </ButtonDropdown>

      <ButtonDropdown sdsType="secondary" sdsStyle="icon" icon="Download">
        Secondary Icon Button Dropdown with SDS Icon
      </ButtonDropdown>

      <ButtonDropdown sdsType="tertiary" sdsStyle="icon" icon="Download">
        Tertiary Icon Button Dropdown with SDS Icon
      </ButtonDropdown>

      <ButtonDropdown
        sdsType="primary"
        sdsStyle="icon"
        icon={<Icon sdsSize="xl" sdsIcon="Download" />}
      >
        Primary Icon Button Dropdown with ReactNode icon
      </ButtonDropdown>
    </>
  );
};
