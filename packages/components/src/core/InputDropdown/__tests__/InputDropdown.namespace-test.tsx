import { InputDropdown, InputDropdownProps } from "@czi-sds/components";
import { noop } from "src/common/utils";

const InputDropdownNameSpaceTest = (props: InputDropdownProps) => {
  return (
    <InputDropdown
      disabled={false}
      label="Label"
      onClick={noop}
      sdsStyle="minimal"
      multiple={false}
      sdsType="label"
      counter="2"
      details="Details"
      intent="notice"
      shouldPutAColonAfterLabel
    />
  );
};
