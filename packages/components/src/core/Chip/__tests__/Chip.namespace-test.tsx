import { Chip, ChipProps } from "@czi-sds/components";
import React from "react";
import { noop } from "@components/src/common/utils";

const ChipNameSpaceTest = (props: ChipProps) => {
  return (
    <>
      <Chip label="Label" onDelete={noop} />
      <Chip label="Label" onDelete={noop} sdsStyle="outline" />
    </>
  );
};
