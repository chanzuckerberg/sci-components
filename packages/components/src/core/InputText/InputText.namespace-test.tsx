import { InputText, InputTextProps } from "@czi-sds/components";
import React from "react";

const InputSearchNameSpaceTest = (props: InputTextProps) => {
  return (
    <InputText
      id="1"
      sdsType="textArea"
      label="Label"
      placeholder="Placeholder"
      intent="default"
      hideLabel={false}
      disabled={false}
      name="input-text-name"
    />
  );
};
