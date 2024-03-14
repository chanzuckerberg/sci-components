import { InputSearch, InputSearchProps } from "@czi-sds/components";
import React from "react";
import { noop } from "src/common/utils";

const InputSearchNameSpaceTest = (props: InputSearchProps) => {
  return (
    <InputSearch
      id="2"
      placeholder="Search ..."
      label="Search Label"
      disabled={false}
      sdsStyle="rounded"
      sdsStage="default"
      intent="default"
      handleSubmit={noop}
      name="input-search-name"
    />
  );
};
