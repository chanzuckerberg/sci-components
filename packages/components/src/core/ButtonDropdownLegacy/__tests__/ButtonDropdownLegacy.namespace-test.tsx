import React from "react";
import {
  ButtonDropdownLegacy,
  ButtonDropdownLegacyProps,
  Icon,
} from "@czi-sds/components";

const ButtonDropdownLegacyNameSpaceTest = (
  props: ButtonDropdownLegacyProps
) => {
  return (
    <>
      <ButtonDropdownLegacy sdsType="primary" sdsStyle="rounded">
        Primary Rounded Button Dropdown
      </ButtonDropdownLegacy>

      <ButtonDropdownLegacy sdsType="secondary" sdsStyle="rounded">
        Secondary Rounded Button Dropdown
      </ButtonDropdownLegacy>

      <ButtonDropdownLegacy sdsType="destructive" sdsStyle="rounded">
        Destructive Rounded Button Dropdown
      </ButtonDropdownLegacy>

      <ButtonDropdownLegacy sdsType="primary" sdsStyle="square">
        Primary Square Button Dropdown
      </ButtonDropdownLegacy>

      <ButtonDropdownLegacy sdsType="secondary" sdsStyle="square">
        Secondary Square Button Dropdown
      </ButtonDropdownLegacy>

      <ButtonDropdownLegacy sdsType="destructive" sdsStyle="square">
        Destructive Square Button Dropdown
      </ButtonDropdownLegacy>

      <ButtonDropdownLegacy sdsType="primary" sdsStyle="icon" icon="Download">
        Primary Icon Button Dropdown with SDS Icon
      </ButtonDropdownLegacy>

      <ButtonDropdownLegacy sdsType="secondary" sdsStyle="icon" icon="Download">
        Secondary Icon Button Dropdown with SDS Icon
      </ButtonDropdownLegacy>

      <ButtonDropdownLegacy sdsType="tertiary" sdsStyle="icon" icon="Download">
        Tertiary Icon Button Dropdown with SDS Icon
      </ButtonDropdownLegacy>

      <ButtonDropdownLegacy
        sdsType="primary"
        sdsStyle="icon"
        icon={<Icon sdsSize="xl" sdsIcon="Download" />}
      >
        Primary Icon Button Dropdown with ReactNode icon
      </ButtonDropdownLegacy>
    </>
  );
};
