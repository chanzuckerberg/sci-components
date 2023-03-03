import { InputDropdown, InputDropdownProps } from "czifui";
import React from "react";
import { noop } from "src/common/utils";

const InputDropdownNameSpaceTest = (props: InputDropdownProps) => {
  return (
    <InputDropdown
      disabled={false}
      label="Label"
      onClick={noop}
      sdsStage="userInput"
      sdsStyle="minimal"
      sdsType="singleSelect"
      counter="2"
      details="Details"
      intent="warning"
      shouldPutAColonAfterLabel
    />
  );
};
