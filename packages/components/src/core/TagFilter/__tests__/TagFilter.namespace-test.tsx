import { TagFilter, TagFilterProps } from "@czi-sds/components";
import React from "react";
import { noop } from "@components/src/common/utils";

const TagFilterNameSpaceTest = (props: TagFilterProps) => {
  return <TagFilter label="Label" onDelete={noop} />;
};
